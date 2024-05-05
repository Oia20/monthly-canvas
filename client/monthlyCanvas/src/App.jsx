import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './nav.jsx'
import Comments from './comments.jsx'
import { createClient } from '@supabase/supabase-js';

function App() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('886728_1_x.webp');
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(true);
  const [user, setUser] = useState(null)

  const supabase = createClient(
    "https://gliscfokeivkvdrwzlsv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaXNjZm9rZWl2a3Zkcnd6bHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDQ0MDEsImV4cCI6MjAzMDA4MDQwMX0.XTXSScKdkRFNKbvB5lbPy8-XBtEec7oMac29BSb71Is"
  );

  useEffect(() => {
    fetchArtists();
    fetchUser();
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user.aud)
    setUser(user.aud)
  }
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
      // console.error('There was a problem with the fetch operation:', error);
      fetchArtists()
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

          <h3>{title}</h3>
          </ div>
          <div className="plaque-title">


          <h3>By: {artist}</h3>
          </div>
        </div>
        <Comments />
        </>
      )}
    </>
  );
}

export default App;
