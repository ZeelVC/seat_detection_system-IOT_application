import React, { useState, useEffect } from 'react';
import './content.css';
import chairImage1 from './seat1.jpg.png'; // Import the first chair image
import chairImage2 from './seat2.jpg.png'; // Import the second chair image

const Content = () => {
  const [seatOccupancy, setSeatOccupancy] = useState(Array(6).fill(false));

  useEffect(() => {
    const webSocket = new WebSocket('ws://192.168.137.27:80');

    webSocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    webSocket.onmessage = (event) => {
      const sensorData = event.data;
      if (sensorData.length === 6) {
        const occupancy = sensorData.split('').map((val) => val === '0');
        setSeatOccupancy(occupancy);
      } else {
        console.error('Invalid sensor data:', sensorData);
      }
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
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
          src={occupied ? chairImage2 : chairImage1}
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
