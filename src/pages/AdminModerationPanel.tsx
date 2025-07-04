import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { addNotification } from "@/lib/notifications";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
} from "lucide-react";

interface Replay {
  id: string;
  userId: string;
  link: string;
  comment: string;
  league: string;
  status: "pending" | "approved" | "rejected";
  modComment?: string;
  createdAt: any;
}

const statusMap = {
  pending: {
    label: "Ожидает",
    color: "bg-yellow-500 text-yellow-900",
    icon: <Clock size={16} />,
  },
  approved: {
    label: "Одобрено",
    color: "bg-green-500 text-green-900",
    icon: <CheckCircle size={16} />,
  },
  rejected: {
    label: "Отклонено",
    color: "bg-red-500 text-red-900",
    icon: <XCircle size={16} />,
  },
};

export const AdminModerationPanel = () => {
  const [replays, setReplays] = useState<Replay[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "replays"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Replay[];
      setReplays(list);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (
    id: string,
    status: Replay["status"],
    modComment?: string
  ) => {
    setUpdatingId(id);
    try {
      const replayRef = doc(db, "replays", id);
      const replaySnap = await getDoc(replayRef);
      const replayData = replaySnap.exists() ? replaySnap.data() : null;

      if (!replayData) throw new Error("Replay not found");

      await updateDoc(replayRef, {
        status,
        modComment: modComment || "",
      });

      if (status === "approved") {
        await addNotification({
          userId: replayData.userId,
          type: "success",
          message: "✅ Ваш реплей одобрен модератором!",
          link: "/profile",
        });
      } else if (status === "rejected") {
        await addNotification({
          userId: replayData.userId,
          type: "error",
          message: "❌ Реплей отклонён. Проверьте комментарий модератора.",
          link: "/profile",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при обновлении");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteReplay = async (id: string) => {
    if (!confirm("Удалить реплей?")) return;
    await deleteDoc(doc(db, "replays", id));
  };

  const filteredReplays = replays.filter((r) => {
    const matchesStatus =
      statusFilter === "all" || r.status === statusFilter;
    const matchesSearch =
      r.link.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">🛠️ Модерация Реплеев</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-white/10 px-3 py-2 rounded"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search size={18} />
          <input
            type="text"
            placeholder="Поиск по ссылке / комменту"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border border-white/10 px-3 py-2 rounded w-full md:w-64"
          />
        </div>
      </div>

      {!filteredReplays.length && (
        <p className="text-gray-400">Ничего не найдено по фильтру.</p>
      )}

      {filteredReplays.map((r) => (
        <div
          key={r.id}
          className="border border-white/10 bg-[#1f1f1f] p-5 rounded-xl mb-6 shadow-lg space-y-4"
        >
          <div className="flex justify-between items-center">
            <span
              className={`flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${statusMap[r.status].color}`}
            >
              {statusMap[r.status].icon}
              {statusMap[r.status].label}
            </span>

            <button
              onClick={() => deleteReplay(r.id)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Удалить
            </button>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <b>Ссылка:</b>{" "}
              <a
                href={r.link}
                target="_blank"
                className="text-blue-400 underline"
              >
                {r.link}
              </a>
            </p>
            <p>
              <b>Комментарий:</b> {r.comment || "—"}
            </p>
            <p>
              <b>Лига:</b> {r.league}
            </p>
            <p>
              <b>Дата:</b>{" "}
              {r.createdAt?.toDate
                ? r.createdAt.toDate().toLocaleString()
                : "-"}
            </p>
            {r.modComment && (
              <p className="text-gray-400 italic">
                💬 Комментарий модератора: {r.modComment}
              </p>
            )}
          </div>

          <textarea
            placeholder="Комментарий модератора..."
            className="w-full mt-2 rounded-lg bg-gray-700 p-2 text-sm text-white border border-white/10"
            value={r.modComment || ""}
            onChange={(e) =>
              setReplays((prev) =>
                prev.map((item) =>
                  item.id === r.id
                    ? { ...item, modComment: e.target.value }
                    : item
                )
              )
            }
          />

          <div className="flex gap-3">
            <button
              onClick={() => updateStatus(r.id, "approved", r.modComment)}
              disabled={updatingId === r.id}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2"
            >
              {updatingId === r.id ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CheckCircle size={16} />
              )}
              Одобрить
            </button>

            <button
              onClick={() => updateStatus(r.id, "rejected", r.modComment)}
              disabled={updatingId === r.id}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2"
            >
              {updatingId === r.id ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <XCircle size={16} />
              )}
              Отклонить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
