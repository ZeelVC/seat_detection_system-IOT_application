import React, { useState, useEffect } from 'react';
import './content.css';
import chairImage1 from './seat1.jpg.png'; // Import the first chair image
import chairImage2 from './seat2.jpg.png'; // Import the second chair image

const Content = () => {
  const [seatOccupancy, setSeatOccupancy] = useState(Array(8).fill(false));

  useEffect(() => {
    const webSocket = new WebSocket('ws://your-websocket-server-address:8080'); // Replace with your WebSocket server address
    webSocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    webSocket.onmessage = (event) => {
      const sensorData = event.data;
      const occupancy = sensorData.split('').map((val) => val === '1');
      setSeatOccupancy(occupancy);
    };
    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <div className="chair-container">
      {seatOccupancy.map((occupied, index) => (
        <img
          key={index}
          src={occupied ? chairImage2 : chairImage1} // Dynamically select the chair image based on occupancy
          alt={`Chair ${index + 1}`}
          className="chair"
        />
      ))}
    </div>
  );
};

export default Content;




/*

import React, { useState } from 'react';
import './content.css'; // Import the CSS file
import chairImage1 from './seat1.jpg.png'; // Import the first chair image
import chairImage2 from './seat2.jpg.png'; // Import the second chair image

const Content = () => {
  const [chairStates, setChairStates] = useState(Array(8).fill(false)); // Initialize all chairs to display chairImage1

  const handleChairClick = (index) => {
    const newChairStates = [...chairStates]; // Create a copy of the chair states array
    newChairStates[index] = !newChairStates[index]; // Toggle the state of the clicked chair
    setChairStates(newChairStates); // Update the chair states
  };

  return (
    <div>
      {chairStates.map((isImage2, index) => (
        <img
          key={`chair${index}`}
          src={isImage2 ? chairImage2 : chairImage1} // Dynamically select the chair image based on the state
          alt={`Chair ${index + 1}`}
          onClick={() => handleChairClick(index)} // Pass the index of the clicked chair
          className="chair-image"
        />
      ))}
    </div>
  );
}

export default Content;

*/
