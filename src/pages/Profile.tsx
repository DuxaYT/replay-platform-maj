import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { UserDashboard } from "../components/UserDashboard";

export const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>

      {/* Основной дашборд пользователя с табами и тд */}
      <UserDashboard />

      {/* Кнопка выхода */}
      <button
        onClick={handleLogout}
        className="mt-10 px-8 py-3 bg-red-600 rounded-md hover:bg-red-700 transition font-semibold"
      >
        Выйти
      </button>
    </div>
  );
};
