import React from 'react';
import { Link } from 'react-router-dom';

function HomeButton({ onReturnHome }) {
  return (
    <button onClick={onReturnHome} className="home-button">
      Home
    </button>
  );
}

export default HomeButton;