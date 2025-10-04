import React from 'react';

const Settings = () => {
  return (
    <div className="settings-container">
      <header className="page-header">
        <h2>Settings</h2>
        <p>Customize your BusBeacon experience</p>
      </header>

      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Bus Arrival Alerts</strong>
            <p>Get notified when your bus is arriving</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Route Updates</strong>
            <p>Receive updates about route changes</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Location</h3>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Auto-detect Location</strong>
            <p>Automatically find buses near you</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Display</h3>
        <div className="setting-item">
          <div className="setting-info">
            <strong>Dark Mode</strong>
            <p>Use dark theme for the app</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <div className="info-list">
          <div className="info-row">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="info-row">
            <span>City</span>
            <span>Maple Creek</span>
          </div>
          <div className="info-row">
            <span>Support</span>
            <span>support@busbeacon.com</span>
          </div>
        </div>
      </div>

      <button className="danger-btn">Clear Cache</button>
    </div>
  );
};

export default Settings;
