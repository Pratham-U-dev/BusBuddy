import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">🏠</div>
        <span>Home</span>
      </NavLink>
      
      <NavLink to="/stops" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">📍</div>
        <span>Stops</span>
      </NavLink>
      
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">⚙️</div>
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
