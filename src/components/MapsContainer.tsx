import React, { useState } from "react";

const maps = {
  zavod: {
    img: "/maps/zavod.png",
    markers: [
      { id: 1, top: "30%", left: "40%", youtubeUrl: "https://www.youtube.com/embed/ID_ВИДЕО1" },
      { id: 2, top: "60%", left: "50%", youtubeUrl: "https://www.youtube.com/embed/ID_ВИДЕО2" },
    ],
  },
  bizwar: {
    img: "/maps/bizwar.png",
    markers: [
      { id: 1, top: "20%", left: "25%", youtubeUrl: "https://www.youtube.com/embed/ID_ВИДЕО3" },
    ],
  },
  // добавь остальные карты
};

export const MapsContainer = () => {
  const [selectedMap, setSelectedMap] = useState("zavod");
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const map = maps[selectedMap];

  return (
    <div>
      {/* Выбор карты */}
      <div className="mb-4">
        {Object.keys(maps).map((mapKey) => (
          <button
            key={mapKey}
            onClick={() => {
              setSelectedMap(mapKey);
              setActiveMarker(null);
            }}
            className={`mr-2 px-4 py-2 rounded ${
              selectedMap === mapKey ? "bg-red-600 text-white" : "bg-gray-300"
            }`}
          >
            {mapKey.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Карта с метками */}
      <div style={{ position: "relative", width: "800px", height: "800px" }}>
        <img src={map.img} alt={selectedMap} style={{ width: "100%", height: "100%" }} />

        {map.markers.map(({ id, top, left }) => (
          <button
            key={id}
            onClick={() => setActiveMarker(id === activeMarker ? null : id)}
            style={{
              position: "absolute",
              top,
              left,
              transform: "translate(-50%, -50%)",
              background: "red",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            title={`Залез ${id}`}
          >
            {id}
          </button>
        ))}

        {/* Видео при активной метке */}
        {activeMarker !== null && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.8)",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <iframe
              width="320"
              height="180"
              src={map.markers.find((m) => m.id === activeMarker)?.youtubeUrl}
              title="Видео залаза"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setActiveMarker(null)}
              style={{
                marginTop: "8px",
                color: "white",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
