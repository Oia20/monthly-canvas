import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState(null); // State to store fetched data
  const [image, setImage] = useState(null)
  const [artist, setArtist] = useState(null)
    // List<string> ids = new List<string> { "437984", "13344", "437991", "437532", "10186", "11040", "36029", "36081", "437149", "435690" };
  const ide=  437984
  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' +ide) // Assuming your backend has a route '/api/metmuseum/paintings'
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      // Work with the JSON data
      const title = data.title;
      const name = data.artistDisplayName
      console.log(title);
      console.log(data);
      setTitle(title); // Set the fetched title into state
      setArtist(name)
    })
    .catch(error => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });

    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+ide) // Assuming your backend has a route '/api/metmuseum/paintings'
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      // Work with the JSON data
      const image = data.primaryImage;
      console.log(image);
      setImage(image); // Set the fetched title into state
    })
    .catch(error => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
  
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <h1>{artist}</h1>
        <h1>{title}</h1>
      </div>
      <img src={image}/>
    </>
  )
}

export default App
