import React from 'react';
import Parser from './components/Parser';
import inputData from './input.json';

function App() {
  return (
    <div className="App">
      <Parser data={inputData} />
    </div>
  );
}

export default App;
