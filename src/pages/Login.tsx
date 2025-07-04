import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <section className="container py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Вход в личный кабинет</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Введите ник"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <Button type="submit" className="w-full">Войти</Button>
      </form>
    </section>
  );
};
