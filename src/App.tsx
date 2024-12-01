import React from 'react';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dots and Boxes Challenge</h1>
      <p className="text-gray-600 mb-8">Connect dots to create squares and score points!</p>
      <GameBoard width={5} height={4} spacing={80} />
    </div>
  );
}

export default App;