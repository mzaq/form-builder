import React from 'react';
import document from './document.svg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <div className="mb-0 text-white mx-auto">
        <img src={document} alt="document" /> <h2>Form Builder</h2>
      </div>
    </nav>
  );
};

export default Navbar;
