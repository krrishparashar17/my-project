import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Dockerized React App</h1>
        <p>Successfully running in a Docker container with Nginx!</p>
        
        <div className="counter-section">
          <h2>Counter: {count}</h2>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>
              Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
              Decrement
            </button>
            <button onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3>Multi-Stage Docker Build ✅</h3>
          <ul>
            <li>Built with Node.js Alpine</li>
            <li>Served with Nginx Alpine</li>
            <li>Optimized production bundle</li>
            <li>Minimal image size</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
