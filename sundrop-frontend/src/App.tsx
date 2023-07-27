import React from 'react';
import LocationInput from './features/weather/LocationInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>SUNDROP</div>
      </header>
      <main>
        <LocationInput />
      </main>
    </div>
  );
}

export default App;
