import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          📚 LiterateAI
        </h1>
        <p className="tagline">
          Your AI-powered reading assistant
        </p>
      </div>
    </header>
  );
};

export default Header;
