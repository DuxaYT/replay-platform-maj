import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const isValidYoutubeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "youtu.be"
    );
  } catch {
    return false;
  }
};

export const Upload = () => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [league, setLeague] = useState("MCL");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError("Пожалуйста, войдите, чтобы загрузить реплей");
      return;
    }

    if (!isValidYoutubeUrl(link)) {
      setError("Введите корректную ссылку на YouTube");
      return;
    }

    try {
      await addDoc(collection(db, "replays"), {
        userId: currentUser.uid,
        link,
        comment,
        league,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      setSubmitted(true);
      setError("");
      setLink("");
      setComment("");
      setLeague("MCL");

      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Ошибка при загрузке. Попробуйте позже.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg max-w-xl w-full space-y-6 border border-white/10"
      >
        <h1 className="text-3xl font-bold text-center">Загрузка Реплея</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {submitted && (
          <div className="text-green-400 text-center font-medium">
            Реплей успешно отправлен!
          </div>
        )}

        <label className="block mb-1 text-sm font-medium">Ссылка на видео (YouTube)</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://youtube.com/..."
          required
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded focus:outline-none focus:ring focus:border-white"
          disabled={!currentUser}
        />

        <label className="block mb-1 text-sm font-medium">Комментарий (опционально)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded focus:outline-none focus:ring"
          placeholder="Например: хочу разбор на миде..."
          disabled={!currentUser}
        />

        <label className="block mb-1 text-sm font-medium">МПШКА</label>
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded focus:outline-none focus:ring"
          disabled={!currentUser}
        >
          <option value="MCL">MCL</option>
          <option value="VZZ">VZZ</option>
          <option value="Capt">Capt</option>
        </select>

        <button
          type="submit"
          disabled={!currentUser}
          className={`w-full font-semibold py-2 px-4 rounded transition ${
            currentUser
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};
