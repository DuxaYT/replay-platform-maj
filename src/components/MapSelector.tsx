import React from "react";

interface Props {
  maps: { id: string; label: string }[];
  selectedMap: string;
  onSelect: (id: string) => void;
}

export const MapSelector: React.FC<Props> = ({ maps, selectedMap, onSelect }) => {
  return (
    <div className="flex gap-4 mb-6 flex-wrap justify-center">
      {maps.map((map) => (
        <button
          key={map.id}
          onClick={() => onSelect(map.id)}
          className={`px-4 py-2 rounded font-semibold transition ${
            selectedMap === map.id
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white"
          }`}
        >
          {map.label}
        </button>
      ))}
    </div>
  );
};
