import React, { createContext, useContext, useState } from 'react';

const ComicContext = createContext();

export const ComicProvider = ({ children }) => {
  const [comicData, setComicData] = useState({
    comicImageUrls: Array(10).fill(''),
    setImageLoaded: Array(10).fill(''),
    imageLoaded: Array(10).fill(''),
    annotations: Array(10).fill(''),
  });

  return (
    <ComicContext.Provider value={{ comicData, setComicData }}>
      {children}
    </ComicContext.Provider>
  );
};

export const useComicContext = () => {
  const context = useContext(ComicContext);
  if (!context) {
    throw new Error('useComicContext must be used within a ComicProvider');
  }
  return context;
};
