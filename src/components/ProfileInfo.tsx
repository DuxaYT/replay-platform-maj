import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";

export const ProfileInfo = () => {
  const user = auth.currentUser;
  const [username, setUsername] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUsername(user?.displayName || "");
  }, [user]);

  const saveProfile = async () => {
    if (!username || username.length < 3) {
      setMessage("Ник должен быть минимум 3 символа");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile(auth.currentUser!, {
        displayName: username,
      });
      setMessage("Профиль обновлен успешно!");
    } catch (err) {
      setMessage("Ошибка при обновлении профиля");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="bg-card p-8 rounded-lg max-w-md mx-auto shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Мой профиль</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full rounded-md border border-border bg-input px-4 py-2 cursor-not-allowed text-muted-foreground"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold">Ник</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={saving}
          className="w-full rounded-md border border-border bg-input px-4 py-2 focus:outline-none focus:border-red-600 transition"
          placeholder="Введите ник"
        />
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-4 text-center ${
            message.includes("Ошибка") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </motion.p>
      )}

      <button
        onClick={saveProfile}
        disabled={saving}
        className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-md font-semibold text-white disabled:opacity-50"
      >
        {saving ? "Сохраняем..." : "Сохранить"}
      </button>
    </motion.div>
  );
};
