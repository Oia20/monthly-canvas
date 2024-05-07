import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './nav.jsx'
import Comments from './comments.jsx'
import { createClient } from '@supabase/supabase-js';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei'
import { supabase } from './supabaseClient'

function ThreeDScene() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1}} camera={{ fov: 130, position: [-10, -10, -10] }}>
      <Sparkles scale={200} color={"#be8ebb"} size={50} count={1000} speed={1}/>
    </Canvas>
  );
}
function App() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('886728_1_x.webp');
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("Month");
  const [user, setUser] = useState(null)


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
        <ThreeDScene />
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
