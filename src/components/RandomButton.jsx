// src/components/RandomButton.js
import React from 'react';

function RandomButton({ onGenerateRandomLinks }) {
  return (
    <button className="random-button" onClick={onGenerateRandomLinks}>
      Random
    </button>
  );
}

export default RandomButton;