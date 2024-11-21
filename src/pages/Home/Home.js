import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <div className="content">
        <p>This is a simple home page built with React</p>
        <section className="features">
          <h2>Our Features</h2>
          <ul>
            <li>Easy to use</li>
            <li>Fast performance</li>
            <li>Responsive design</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
