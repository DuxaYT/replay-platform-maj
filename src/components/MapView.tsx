import React, { useState } from "react";

interface Marker {
  id: number;
  top: string;
  left: string;
  youtubeUrl: string;  // теперь ссылка на YouTube
}

interface Props {
  mapImage: string;
  markers: Marker[];
}

export const MapView: React.FC<Props> = ({ mapImage, markers }) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <img src={mapImage} alt="Карта" className="w-full rounded-lg shadow-lg" />
      {markers.map(({ id, top, left, youtubeUrl }) => (
        <div
          key={id}
          className="absolute cursor-pointer text-white font-bold bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
          style={{ top, left, transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setActiveMarker(id)}
          onMouseLeave={() => setActiveMarker(null)}
        >
          {id}
          {activeMarker === id && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 h-36 bg-black rounded shadow-lg z-20">
              <iframe
                width="100%"
                height="100%"
                src={youtubeUrl.replace("watch?v=", "embed/")}
                title="Видео"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
