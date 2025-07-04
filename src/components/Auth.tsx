// src/components/Auth.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const toggleMode = (newMode: "login" | "register") => {
    setError("");
    setMode(newMode);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (mode === "register" && !username)) {
      setError("Пожалуйста, заполните все поля");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, username);
        alert("Регистрация успешна! Теперь войдите.");
        toggleMode("login");
        setLoading(false);
        return;
      }
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        className="bg-card p-10 rounded-xl shadow-xl w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center mb-8 space-x-4 bg-muted rounded-full p-1 text-sm">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => toggleMode(tab as "login" | "register")}
              className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-300 ${
                mode === tab
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-muted-foreground hover:text-red-500"
              }`}
              aria-pressed={mode === tab}
            >
              {tab === "login" ? "Вход" : "Регистрация"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={mode}
            onSubmit={handleSubmit}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
            noValidate
          >
            <label className="block">
              <span className="text-muted-foreground">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md bg-input border border-border px-4 py-2 text-foreground focus:outline-none focus:border-red-500 transition"
                placeholder="example@mail.com"
                required
                disabled={loading}
              />
            </label>

            <label className="block">
              <span className="text-muted-foreground">Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md bg-input border border-border px-4 py-2 text-foreground focus:outline-none focus:border-red-500 transition"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </label>

            {mode === "register" && (
              <label className="block">
                <span className="text-muted-foreground">Ник</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full rounded-md bg-input border border-border px-4 py-2 text-foreground focus:outline-none focus:border-red-500 transition"
                  placeholder="Ваш ник"
                  required
                  disabled={loading}
                />
              </label>
            )}

            {error && (
              <p className="text-red-500 text-sm animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 rounded-md font-semibold text-white hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Пожалуйста, подождите..."
                : mode === "login"
                ? "Войти"
                : "Зарегистрироваться"}
            </button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
