import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Header = ({ cart = [], showAdminButton = true, onBookTable, scrollToSection: externalScrollToSection }) => {
  const navigate = useNavigate();

  const closeNavbar = () => {
    const collapseEl = document.getElementById('navbarCollapse');
    const toggler = document.querySelector('.navbar-toggler');
    if (collapseEl?.classList.contains('show')) {
      collapseEl.classList.remove('show');
      if (toggler) {
        toggler.setAttribute('aria-expanded', 'false');
        toggler.classList.add('collapsed');
      }
    }
  };

  const scrollToSection = (id) => {
    if (externalScrollToSection) {
      externalScrollToSection(id);
    } else {
      // Default behavior: navigate to home and scroll
      if (id === 'home' || id === 'about' || id === 'order' || id === 'contact' || id === 'bookTable') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    closeNavbar();
  };

  const handleBookTable = () => {
    navigate('/booking');
    closeNavbar();
  };

  const adminButton = showAdminButton ? (
    <Link
      to="/admin"
      className="btn btn-outline-primary py-2 px-3 mobile-margin"
      style={{ borderRadius: "20px", textDecoration: "none" }}
      onClick={closeNavbar}
    >
      <i className="fas fa-cog me-1"></i> Admin
    </Link>
  ) : null;

  return (
    <>
      {/* Top Info Bar */}
      {/* <div className="top-info-bar">
        <div className="container-fluid" style={{padding: "0 2rem"}}>
          <div className="row align-items-center justify-content-between">
            <div className="col-md-10 top-info-item">
              <i className="fas fa-map-marker-alt me-2"></i>
              <span>123 Spice St, Springfield</span>
              <div className="top-info-item" style={{marginLeft: "10px"}}>
                <i className="fas fa-clock me-2"></i>
                <span>Mon-Sun: 11am-10pm</span>
              </div>
            </div>
            
            <div className="col-md-2 top-info-item text-md-end d-flex justify-content-md-end">
              <i className="fas fa-phone me-2"></i>
              <span>Call: +1 (123) 456-7890</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Navbar */}
      <nav className="navbar position-fixed navbar-expand-lg navbar-dark nav-mobile nav-position nav-redesign">
        <div className="container-fluid nav-redesign-container">
          <Link to="/" className="navbar-brand p-0">
            {/* <h1 className="nav-logo-text m-0">
              <i className="far fa-heart me-3"></i>SangEat
            </h1> */}
            <img src="img/logo2.png" alt="SangEat" className="nav-logo-image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 align-items-center">
              <button
                type="button"
                className="nav-item nav-link-redesign btn btn-link p-0 mobile-margin"
                onClick={() => scrollToSection("home")}
              >
                Home
              </button>
              <button
                type="button"
                className="nav-item nav-link-redesign btn btn-link p-0 mobile-margin"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>
              {/* <button
                type="button"
                className="nav-item nav-link-redesign btn btn-link p-0 mobile-margin"
                onClick={() => scrollToSection("order")}
              >
                Menu
              </button> */}
              {/* <button
                type="button"
                className="nav-item nav-link-redesign btn btn-link p-0 mobile-margin"
                onClick={() => scrollToSection("contact")}
              >
                Visit
              </button> */}
              <button
                type="button"
                className="btn btn-view-menu mobile-margin"
                onClick={() => scrollToSection("order")}
              >
                View Menu
              </button>
              <button
                type="button"
                className="nav-item nav-link-redesign btn btn-link py-2 px-2 mr-2 mobile-margin"
                style={{ margin: "0px" }}
                onClick={handleBookTable}
              >
                Book A Table
              </button>
              {cart && cart.length >= 0 && (
                <button
                  className="btn py-2 px-2 mobile-margin"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#cartSidebar"
                  onClick={closeNavbar}
                >
                  🛒{" "} <span className="badge bg-light text-dark">{cart.length}</span>
                </button>
              )}
              {/* {adminButton} */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

