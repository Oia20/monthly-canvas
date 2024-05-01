import React, { useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

function App() {
  const [artists, setArtists] = useState([]);
  const supabase = createClient(process.env.supaurl, process.env.supatok);

  useEffect(() => {
    fetchArtists();
  }, []); // Dependency added to re-fetch data when supabase client changes
  async function fetchArtists() {
    try {
      const { data, error } = await supabase.from('paintings').select();
      if (error) {
        throw error;
      }
      setArtists(data);
    } catch (error) {
      console.error('Error fetching artists:', error.message);
    }
  }
  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <div className="card">
          <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
          <ul>
            {artists.map((country) => (
              <li key={country.name}>{country.artist}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
