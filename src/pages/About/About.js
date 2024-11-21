import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to our pizza store! We've been serving delicious pizzas since 2010,
            combining traditional Italian recipes with modern culinary innovations.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to providing the highest quality pizzas using fresh,
            locally sourced ingredients and creating unforgettable dining experiences
            for our customers.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact Information</h2>
          <p>
            Address: 123 Pizza Street, Food City<br />
            Phone: (555) 123-4567<br />
            Email: info@pizzastore.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
