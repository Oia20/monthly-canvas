import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState(null); // State to store fetched data
  const [image, setImage] = useState(null)
  useEffect(() => {
    fetch('/api/metmuseum/title') // Assuming your backend has a route '/api/metmuseum/paintings'
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      // Work with the JSON data
      const title = data.title;
      console.log(title);
      setTitle(title); // Set the fetched title into state
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
        <p>{title}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
