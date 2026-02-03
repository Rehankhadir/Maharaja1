import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Footer = ({ onBookTable, scrollToSection: externalScrollToSection }) => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (externalScrollToSection) {
      externalScrollToSection(id);
    } else {
      // Default behavior: navigate to home and scroll
      if (id === 'order') {
        navigate('/');
        setTimeout(() => {
          const menuSection = document.getElementById('order');
          if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };


  return (
    <div className="container-fluid text-light footer wow fadeIn panel footer-style" data-wow-delay="0.1s" style={{background: 'rgb(92 0 23/var(--tw-bg-opacity,1)) !important'}}>
      <div className="container-fluid py-5">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            {/* <h4 className=" ff-secondary text-start fw-normal mb-4" style={{color: 'rgb(246 226 195/var(--tw-text-opacity,1))', fontFamily: `'Playfair Display', 'Georgia', serif`, fontSize: '1.5rem'}} >
              Sang Eats
            </h4> */}
            <img src="img/logo1.png" alt="Sangeeth" className="nav-logo-image footer-logo" />

            <p className="footer-text-color">Experience authentic Indian cuisine in an elegant, royal setting. Where tradition meets modern dining.</p>
            
            <div className="d-flex pt-2">
              <Link className="btn btn-social" to="/">
                <i className="fab fa-twitter footer-text-color"></i>
              </Link>
              <Link className="btn btn-social" to="/">
                <i className="fab fa-facebook-f footer-text-color"></i>
              </Link>
              <Link className="btn btn-social" to="/">
                <i className="fab fa-youtube footer-text-color"></i>
              </Link>
              <Link className="btn btn-social" to="/">
                <i className="fab fa-linkedin-in footer-text-color"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4 className="ff-secondary text-start fw-normal mb-4"  style={{color: '#fff', fontFamily: `'Playfair Display', 'Georgia', serif`, fontSize: '1.125rem'}} >
              Quick Links
            </h4>
            <Link 
              className="btn btn-link"
              to="#order"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('order');
              }}
            >
              Menu
            </Link>
            <Link className="btn btn-link" to="/booking">
              Book A Table
            </Link>
            <Link className="btn btn-link" to="/admin">
              Admin Panel
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4 className="ff-secondary text-start fw-normal mb-4"  style={{color: '#fff', fontFamily: `'Playfair Display', 'Georgia', serif`, fontSize: '1.125rem'}}>
              Contact Us
            </h4>
            <p className="mb-2 footer-text-color">
              <i className="fa fa-map-marker-alt me-3" style={{color: 'rgb(196 30 58/var(--tw-text-opacity,1))'}}></i>123 Street, New
              York, USA
            </p>
            <p className="mb-2 footer-text-color">
              <i className="fa fa-phone-alt me-3" style={{color: 'rgb(196 30 58/var(--tw-text-opacity,1))'}}></i>+012 345 67890
            </p>
            <p className="mb-2 footer-text-color">
              <i className="fa fa-envelope me-3" style={{color: 'rgb(196 30 58/var(--tw-text-opacity,1))'}}></i>info@example.com
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright">
        <div className="">
          <div className="row">
            <div className="col-md-12 text-center text-md-center mb-3 mb-md-0 footer-text-color">
              &copy; 2026 SangEat, All Right Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

