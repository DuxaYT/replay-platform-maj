import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Replay {
  id: string;
  link: string;
  comment: string;
  league: string;
  status: "pending" | "processing" | "done" | "error" | "approved" | "rejected";
  createdAt: any;
  modComment?: string;
}

const statusStyles: Record<
  Replay["status"],
  { label: string; icon: JSX.Element; class: string }
> = {
  pending: { label: "Ожидает", icon: <Clock size={16} />, class: "bg-yellow-400 text-yellow-900" },
  processing: { label: "В обработке", icon: <Clock size={16} />, class: "bg-blue-400 text-blue-900" },
  done: { label: "Готово", icon: <CheckCircle size={16} />, class: "bg-green-400 text-green-900" },
  error: { label: "Ошибка", icon: <XCircle size={16} />, class: "bg-red-400 text-red-900" },
  approved: { label: "Одобрено", icon: <CheckCircle size={16} />, class: "bg-green-500 text-white" },
  rejected: { label: "Отклонено", icon: <XCircle size={16} />, class: "bg-red-500 text-white" },
};

const getEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;

    if (host.includes("youtu.be") || host.includes("youtube.com")) {
      const videoId =
        host === "youtu.be"
          ? parsed.pathname.slice(1)
          : parsed.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (host.includes("vk.com")) {
      return url.replace("vk.com/video", "vk.com/video_ext.php?oid");
    }

    if (host.includes("rutube.ru")) {
      const match = url.match(/video\/([a-zA-Z0-9-]+)/);
      return match ? `https://rutube.ru/play/embed/${match[1]}` : "";
    }

    return "";
  } catch {
    return "";
  }
};

export const ReplayHistory = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [replays, setReplays] = useState<Replay[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingReplay, setEditingReplay] = useState<Replay | null>(null);
  const [editLink, setEditLink] = useState("");
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setReplays([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "replays"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    let prevMap = new Map<string, Replay>();

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Replay[];

        for (const replay of newData) {
          const prev = prevMap.get(replay.id);
          if (prev) {
            if (prev.status !== replay.status) {
              toast.success(`🟢 Статус реплея обновлён: ${statusStyles[replay.status].label}`);
            }
            if (!prev.modComment && replay.modComment) {
              toast.info(`💬 Комментарий модератора: ${replay.modComment}`);
            }
          }
          prevMap.set(replay.id, replay);
        }

        setReplays(newData);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error("Ошибка onSnapshot:", err);
        setError("Ошибка при загрузке истории.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот реплей?")) return;
    try {
      await deleteDoc(doc(db, "replays", id));
    } catch {
      alert("Ошибка при удалении реплея");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingReplay) return;
    try {
      await updateDoc(doc(db, "replays", editingReplay.id), {
        link: editLink,
        comment: editComment,
      });
      setEditingReplay(null);
    } catch {
      alert("Ошибка при сохранении");
    }
  };

  const filteredReplays = replays.filter((r) => {
    const matchLeague = selectedLeague === "all" || r.league === selectedLeague;
    const createdDate = r.createdAt?.toDate?.();
    const matchFrom = dateFrom ? createdDate >= new Date(dateFrom) : true;
    const matchTo = dateTo ? createdDate <= new Date(dateTo + "T23:59:59") : true;
    return matchLeague && matchFrom && matchTo;
  });

  if (!currentUser) return <p>Пожалуйста, войдите, чтобы увидеть историю.</p>;
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!replays.length) return <p>История реплеев пуста.</p>;

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="bg-card p-6 rounded-lg max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold mb-4">История реплеев</h2>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Лига</label>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-md"
            >
              <option value="all">Все</option>
              <option value="MCL">MCL</option>
              <option value="VZZ">VZZ</option>
              <option value="Capt">Capt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">С даты</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">По дату</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-md"
            />
          </div>
        </div>

        {/* Модальное окно редактирования */}
        {editingReplay && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-[#1f1f1f] p-6 rounded-xl w-full max-w-md space-y-4 border border-white/10">
              <h3 className="text-xl font-bold">Редактировать</h3>

              <label className="block text-sm">Ссылка</label>
              <input
                type="url"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded"
              />

              <label className="block text-sm">Комментарий</label>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded"
              />

              <div className="flex justify-end gap-2">
                <button onClick={() => setEditingReplay(null)} className="text-white">
                  Отмена
                </button>
                <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Реплеи */}
        <AnimatePresence>
          {filteredReplays.map(({ id, link, comment, league, status, createdAt, modComment }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-border rounded p-4 flex flex-col gap-3 bg-muted"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    statusStyles[status]?.class
                  }`}
                >
                  {statusStyles[status]?.icon}
                  {statusStyles[status]?.label}
                </span>

                <div className="space-x-2 text-sm">
                  <button
                    onClick={() => {
                      setEditingReplay({ id, link, comment, league, status, createdAt });
                      setEditLink(link);
                      setEditComment(comment);
                    }}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Редактировать
                  </button>

                  {status === "done" && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Посмотреть
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {getEmbedUrl(link) && (
                <div className="aspect-video">
                  <iframe
                    src={getEmbedUrl(link)}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}

              <p><b>Ссылка:</b> <a href={link} className="text-primary underline">{link}</a></p>
              {comment && <p><b>Комментарий:</b> {comment}</p>}
              {modComment && <p className="italic text-gray-400">💬 Комментарий модератора: {modComment}</p>}
              <p><b>Лига:</b> {league}</p>
              <p><b>Дата:</b> {createdAt?.toDate ? createdAt.toDate().toLocaleString() : "-"}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
