import React, { useState, useEffect } from 'react';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

const App = () => {

  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null});
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState(initialLocationState); // here 'location' is destructured 

  let mounted = true; // for more complex cleanup of an event listener or a subscription 

  useEffect(() => { 
    document.title = `You have clicked ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation); // this subscription is going to be cleaned up using the variable 'mounted'
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false; // to clean up the geolocation subscription 
    }
  }, [count]);

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
  
  }

  const handleOnline = () => {
    setStatus(true);
  }

  const handleOffline = () => {
    setStatus(false);
  }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>

      <div style={{ height: "50px" }}></div>

      <h2>Toggle Light</h2>
      <img 
        src={
          isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'
        }
        style={{ height: "50px", width: "50px"}}
        alt="Flashlight" onClick={toggleLight} />

      <div style={{ height: "50px" }}></div>

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}

      <div style={{ height: "50px" }}></div>

      <h2>Network Status</h2>
      <p>You are <strong>{status ? "online" : "offline"}</strong></p>

      <div style={{ height: "50px" }}></div>

      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>
    </div>
  );
}

export default App;
