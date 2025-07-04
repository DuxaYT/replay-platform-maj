import React, { useState } from "react";

interface Marker {
  id: number;
  x: number; // координаты в процентах (от 0 до 100) по ширине карты
  y: number; // координаты в процентах (от 0 до 100) по высоте карты
  title: string;
  videoUrl: string;
}

const markers: Marker[] = [
  {
    id: 1,
    x: 20,
    y: 30,
    title: "Залез 1",
    videoUrl: "https://www.youtube.com/watch?v=imBOLepx-kI",
  },
  {
    id: 2,
    x: 50,
    y: 50,
    title: "Залез 2",
    videoUrl: "https://youtu.be/пример_ссылки2",
  },
  // Добавляй сколько нужно
];

export const GameMap = () => {
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg">
      {/* Карта - замените на свою картинку */}
      <img
        src="/images/game-map.jpg" // Путь к картинке карты (положи в public/images/)
        alt="Game Map"
        className="w-full rounded-lg"
      />

      {/* Маркеры */}
      {markers.map((marker) => (
        <button
          key={marker.id}
          onMouseEnter={() => setHoveredMarker(marker)}
          onMouseLeave={() => setHoveredMarker(null)}
          style={{
            position: "absolute",
            top: `${marker.y}%`,
            left: `${marker.x}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
          className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center cursor-pointer"
          aria-label={marker.title}
        >
          {marker.id}
        </button>
      ))}

      {/* Видео с подсказкой */}
      {hoveredMarker && (
        <div
          className="absolute z-20 p-2 bg-black bg-opacity-80 rounded shadow-lg"
          style={{
            top: `calc(${hoveredMarker.y}% + 2.5rem)`,
            left: hoveredMarker.x > 70 ? "auto" : `calc(${hoveredMarker.x}% + 2.5rem)`,
            right: hoveredMarker.x > 70 ? `calc(100% - ${hoveredMarker.x}%)` : "auto",
            width: "320px",
            maxWidth: "90vw",
          }}
        >
          <p className="text-white font-semibold mb-1">{hoveredMarker.title}</p>
          <iframe
            width="100%"
            height="180"
            src={hoveredMarker.videoUrl.replace("watch?v=", "embed/")}
            title={hoveredMarker.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
