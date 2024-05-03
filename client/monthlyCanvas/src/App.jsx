import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './nav.jsx'
function App() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      const response = await fetch('http://localhost:5102/api/Artworks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const date = new Date();
      const month = date.getMonth();
      const currentData = data[month + 1];
      const monthName = date.toLocaleString('default', { month: 'long' });
      setMonth(monthName)
      setArtist(currentData.artist);
      setTitle(currentData.title);
      setImage(currentData.image);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      {loading ? (
        <div className='div-ld'>
        <div className="loader">
          <img src='886728_1_x.webp'/>
        </div>
        </div>
      ) : (
        <>
        <Nav />
        <div className='content'>
        <div className="plaque">
          <h1>{month}'s Painting</h1>
      </div>

          <img src={image} alt="Artwork"/>
        <div className="plaque-title">

          <h1>{title}</h1>
          </ div>
          <div className="plaque-title">


          <h1>By: {artist}</h1>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default App;
