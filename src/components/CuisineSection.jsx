import React from 'react';
import './CuisineSection.css';

const cuisines = [
  {
    name: 'North Indian',
    image: 'north-indian.jpg',
    description: 'Rich gravies, butter naan, paneer delicacies, and aromatic spices.',
  },
  {
    name: 'South Indian',
    image: 'south-indian.jpg',
    description: 'Idli, dosa, sambar, coconut chutney, and rice-based dishes.',
  },
  {
    name: 'Mughlai',
    image: 'mughlai.jpg',
    description: 'Royal kebabs, biryanis, creamy curries, and dried fruit flavors.',
  },
  {
    name: 'Tandoori',
    image: 'tandoori.jpg',
    description: 'Clay oven-cooked meats and veggies, infused with smoky flavors.',
  },
];

const CuisineSection = () => {
  return (
    <section className="cuisine-container" id="cuisine">
      <h2 className="cuisine-title">Cuisine Types</h2>
      <div className="cuisine-grid">
        {cuisines.map((cuisine, index) => (
          <div className="cuisine-card" key={index}>
            <img src={cuisine.image} alt={cuisine.name} className="cuisine-img" />
            <div className="cuisine-overlay">
              <h3>{cuisine.name}</h3>
              <p>{cuisine.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CuisineSection;
