import React from "react";
import { MapsContainer } from "../components/MapsContainer";

const MapPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-6">Карта залов</h1>
      <MapsContainer />
    </div>
  );
};

export default MapPage;
