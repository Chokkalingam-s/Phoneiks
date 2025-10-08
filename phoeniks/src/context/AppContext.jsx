import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // 'en', 'hi', 'ta', 'ml', 'te'
  const [zoom, setZoom] = useState(1); // zoom from 0.5 to 2

  // Zoom in by 0.1 step max 2
  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  // Zoom out by 0.1 step min 0.5
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  return (
    <AppContext.Provider
      value={{ language, setLanguage, zoom, zoomIn, zoomOut }}
    >
      {children}
    </AppContext.Provider>
  );
};
