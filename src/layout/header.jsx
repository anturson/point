import React from 'react';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">MyPoint</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#entities">Entities</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
