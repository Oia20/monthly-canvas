import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);


  useEffect(() => {
    fetchArtists();
  }, []); // Dependency added to re-fetch data when supabase client changes
  async function fetchArtists() {
    try {
      const response = await fetch('http://localhost:5102/api/Artworks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const date = new Date();
      const month = date.getMonth()
      const data = await response.json();
      console.log(data);
      setArtist(data[month + 1].artist)
      setTitle(data[month + 1].title)
      setImage(data[month + 1].image)

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  return (
    <>
      <div>
        <h1>{artist}</h1>
        <h2>{title}</h2>
        <div className="card">
          <img src={image}/>
        </div>
      </div>
    </>
  );
}

export default App;
