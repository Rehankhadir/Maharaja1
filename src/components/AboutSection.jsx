import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-container" id="about">
      <div className="about-content">
        <h2 className="about-title">SangEat – An Experience of Royal Indian Dining</h2>
        
        <div className="divider"></div>

        <p>
          At SangEat, we bring the flavors of royal Indian cuisine to your table. From fragrant biryanis
          to elaborate thalis, each dish is a celebration of tradition, taste, and hospitality.
        </p>

        <p>
          Immerse yourself in an ambiance of elegance and cultural richness — perfect for family gatherings,
          celebrations, or simply treating yourself to authentic flavors.
        </p>

        <div className="divider"></div>

        <p>
          Every plate is carefully crafted using time-honored recipes and the freshest ingredients to deliver
          a memorable dining experience.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
