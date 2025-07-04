import { Bell, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

export const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications", user.uid, "items"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(items);
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    const hasNew = notifications.some((n) => !n.read);
    if (hasNew) {
      const audio = new Audio("/notif.mp3");
      audio.play();
    }
  }, [notifications]);

  const markAsRead = async (id: string) => {
    if (!user) return;
    await updateDoc(doc(db, "notifications", user.uid, "items", id), {
      read: true,
    });
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="text-white" />
        {notifications.some((n) => !n.read) && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-ping">
            !
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-800 text-white rounded-lg shadow-lg z-50 border border-white/10 p-2 space-y-2">
          <h3 className="font-bold text-lg mb-2">Уведомления</h3>
          {!notifications.length && <p className="text-sm text-gray-400">Пусто</p>}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2 rounded-md text-sm flex justify-between items-start gap-2 border ${
                n.read ? "opacity-70" : "border-green-500"
              }`}
            >
              <div className="flex-1">
                <p>{n.message}</p>
                {n.link && (
                  <a
                    href={n.link}
                    className="text-blue-400 underline text-xs"
                    target="_blank"
                  >
                    Перейти
                  </a>
                )}
              </div>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-green-400 hover:text-green-300"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
