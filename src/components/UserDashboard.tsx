import React, { useState } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { ReplayHistory } from "./ReplayHistory";
import { Subscription } from "./Subscription";
import { Settings } from "./Settings";

const tabs = [
  { id: "profile", label: "Профиль" },
  { id: "history", label: "История реплеев" },
  { id: "subscription", label: "Подписка" },
  { id: "settings", label: "Настройки" },
];

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-lg min-h-[500px]">
      <nav className="flex border-b border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 -mb-px border-b-2 font-semibold transition ${
              activeTab === tab.id
                ? "border-red-600 text-red-600"
                : "border-transparent hover:text-red-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div>
        {activeTab === "profile" && <ProfileInfo />}
        {activeTab === "history" && <ReplayHistory />}
        {activeTab === "subscription" && <Subscription />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};
