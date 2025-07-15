import React, { useState, useRef } from 'react';
import './styles.css';
import logo from './assets/font.png';
import sound from './assets/Avengers.mp3';

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  }

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    college:""
  });

  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, contact, college } = user;

    try {
      const databaseURL =
        "https://codefusionpaymentgateway-default-rtdb.firebaseio.com"; 
      const path = "/users.json"; 

      const response = await fetch(`${databaseURL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          college
        })
      });

      if (response.ok) {
        console.log("Data successfully posted.");
      } else {
        console.error("Failed to post data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="Background">
      <form>
        <img src={logo} alt="Logo" width="200px" />
        <div className="input">
          <label htmlFor="fname">Name:</label>
          <input type="text" id="fname" value={user.name}
            onChange={getUserData}
            name="name" required />
        </div>
        <div className="input">
          <label htmlFor="femail">Email:</label>
          <input type="text" id="femail" value={user.email}
            onChange={getUserData}
            name="email" required />
        </div>
        <div className="input">
          <label htmlFor="fcontact">Contact:</label>
          <input type="text" id="fcontact" value={user.contact}
            onChange={getUserData}
            name="contact"  required />
        </div>
        <div className="input">
          <label htmlFor="fcontact">College:</label>
          <input type="text" id="fcontact" name="college" value={user.college} onChange={getUserData} />
        </div>
        <button type="button" className="btn" onClick={postData}>
          Make Payment
        </button>
        <button type="button"  onClick={togglePlay}>
          {isPlaying ? 'Pause Sound' : 'Play Sound'}
        </button>
      </form>
      <audio ref={audioRef} src={sound} />
    </div>
  );
}