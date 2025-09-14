import React from 'react';
import LandingPage from './components/LandingPage';
// import AboutSection from './components/AboutSection';
// import CuisineSection from './components/CuisineSection';
import NavigationMenu from './components/NavigationMenu';
// import "../public/js/main.js";


function App() {
  return (
    <>
    <NavigationMenu />
      <LandingPage />
       
      {/* <div id="main-site" style={{ height: '100vh', backgroundColor: '#fff', padding: '40px' }}> */}
        {/* <h2>Main Website Coming Soon...</h2> */}
        {/* <AboutSection /> */}
        {/* <CuisineSection /> */}
        

      {/* Order Section */}
      {/* <section id="order" style={{ padding: '80px 20px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center' }}>Order Now</h2>
        <p style={{ textAlign: 'center' }}>Coming soon: Online ordering experience!</p>
      </section> */}

      {/* Book Section */}
      {/* <section id="book" style={{ padding: '80px 20px', background: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center' }}>Book a Table</h2>
        <p style={{ textAlign: 'center' }}>Call us or book online (feature coming soon).</p>
      </section> */}

      {/* Contact Section */}
      {/* <section id="contact" style={{ padding: '80px 20px', background: '#fff5e6' }}>
        <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
        <p style={{ textAlign: 'center' }}>Follow us on:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" width="40" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" width="40" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src="/twitter-icon.png" alt="Twitter" width="40" />
          </a>
        </div>
      </section> */}
      {/* </div> */}
    </>
  );
}

export default App;
