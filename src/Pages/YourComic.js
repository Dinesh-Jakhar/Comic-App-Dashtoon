import React from 'react'
import Loading from '../Components/Loading';
import { useLocation } from 'react-router-dom';
import { useComicContext } from '../ComicContext';
import './YourComic.css';
const YourComic = () => {
    const location = useLocation();
   const { comicData } = useComicContext();
   const {
    comicImageUrls,
    setImageLoaded,
    imageLoaded,
    annotations,
  } = comicData;

  if (!comicImageUrls) {
    
    return <Loading />;
  }
  return (
    
     <div>  
        <h1>MY COMIC</h1>
      <div className="comic-display">
         {
          
          
            comicImageUrls.map((imageUrl, index) => (
            <div key={index} className="comic-panel">
              
              <img src={imageUrl} alt={``}  
              onLoad={() => setImageLoaded(prevState => {
                  const newState = [...prevState];
                   newState[index] = true;
                   return newState;
                 })}
               />
               {imageLoaded[index]&&annotations[index] && (

                 <div class="widget-wrap">

                  
                   <div className="speech left">
                     <p>{annotations[index]}</p>
                   </div>
                 </div>
               )}
             </div>
           ))
         }
      </div> 
     </div> 
  
  )
}

export default YourComic
