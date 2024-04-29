import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [content, setContent] = useState(null); // State to store fetched data
  const [image, setImage] = useState(null)
  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/438815')
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
      setContent(title); // Set the fetched title into state
    })
    .catch(error => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
      
      fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/438815')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        // Work with the JSON data
        console.log(data);
        setImage(data.primaryImage); // Set the fetched data into state
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
        {content && (
          <p>{JSON.stringify(content)}</p> // Display the fetched data
        )}
      </div>
      <img src={image} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
