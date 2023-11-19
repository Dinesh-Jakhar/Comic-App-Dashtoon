import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComicGenerator from './Pages/ComicGenerator';
import YourComic from './Pages/YourComic';
import './App.css';
import { ComicProvider } from './ComicContext';
import Homepage from './Pages/Homepage';
import Error from './Pages/Error';

function App() {
  return (
    
      <div>
        <ComicProvider>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path='/comic-form' element={<ComicGenerator/>}/>
          <Route path="/enjoy-your-comic" element={<YourComic/>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
        </ComicProvider>
      </div>
    
  );
}

export default App;
