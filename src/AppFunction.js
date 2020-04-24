import React, { useState, useEffect } from 'react';

const App = () => {

  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => { document.title = `You have clicked ${count} times`})

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

      <div style={{ height: "70px" }}></div>

      <h2>Toggle Light</h2>
      <img 
        src={
          isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'
        }
        style={{ height: "50px", width: "50px"}}
        alt="Flashlight" onClick={toggleLight} />
    </div>
  );
}

export default App;
