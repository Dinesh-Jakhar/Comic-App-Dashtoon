import React, { useState, useEffect } from 'react';
import query from '../data/query';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import { useComicContext } from '../ComicContext';
import './ComicGenerator.css';

const ComicGenerator = () => {
  const navigate = useNavigate();
  const { comicData, setComicData } = useComicContext();

  const [loading, setLoading] = useState(false);

  const { comicImageUrls, setImageLoaded, imageLoaded, annotations } = comicData;

  const handlePanelTextChange = (index, value) => {
    setComicData((prevData) => ({
      ...prevData,
      annotations: prevData.annotations.map((ann, i) => (i === index ? value : ann)),
    }));
  };



  
  const handleAnnotationChange = (index, value) => {
    setComicData((prevData) => ({
      ...prevData,
      annotations: prevData.annotations.map((ann, i) => (i === index ? value : ann)),
    }));
  };

  const handleGenerateComic = async () => {
  try {
    setLoading(true);
    const panelsWithText = annotations.filter((text) => text.trim() !== '');
    const imagePromises = panelsWithText.map((text, index) => {
      const combinedText = `${text}`.trim();
      return query({ inputs: combinedText });
    });

    const images = await Promise.all(imagePromises);
    const newComicImageUrls = images.map((imageBlob) =>
      URL.createObjectURL(imageBlob)
    );

    setComicData({
      comicImageUrls: newComicImageUrls,
      setImageLoaded: (index) => handleImageLoaded(index),
      imageLoaded: Array(10).fill(false),
      annotations: annotations,
    });

    navigate('/enjoy-your-comic');
  } catch (error) {
    console.error('Error generating comic:', error);
  } finally {
    setLoading(false);
  }
};

const handleImageLoaded = (index) => {
  setComicData((prevData) => ({
    ...prevData,
    imageLoaded: prevData.imageLoaded.map((loaded, i) => (i === index ? true : loaded)),
  }));
};

  
  useEffect(() => {
    if (imageLoaded.every(Boolean)) {
      navigate('/enjoy-your-comic');
    }
  }, [imageLoaded, navigate]);

  return (
    <div className='parent'>
      <h1>Enter Comic Details</h1>
      <div className="comic-generator">
        <form className="form-container">
          {comicData.annotations.map((text, index) => (
            <div key={index} className="panel">
              <label>{`Panel ${index + 1}:`}</label>
              <textarea
                placeholder={`Enter text for Panel ${index + 1}`}
                value={text}
                onChange={(e) => handlePanelTextChange(index, e.target.value)}
              />
              {/* <input
                className='annotations'
                type="text"
                placeholder={`Annotation for Panel ${index + 1}`}
                value={annotations[index]}
                onChange={(e) => handleAnnotationChange(index, e.target.value)}
              /> */}
            </div>
          ))}
          <button type="button" onClick={handleGenerateComic}>
            Generate Comic
          </button>
          {loading && <Loading />}
        </form>
      </div>
    </div>
  );
};

export default ComicGenerator;
