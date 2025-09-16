import React, { useState, useEffect } from "react";
import './LandingPage.css';
import { Link } from "react-router-dom";


// MenuCard Component
const MenuCard = ({ item, cart, addToCart, setCart }) => {
  const cartItem = cart.find((i) => i.id === item.id);
  
  return (
    <div className="menu-card">
      <div className="menu-image-container">
        <img
          className="menu-image"
          src={item.img}
          alt={item.name}
        />
        {/* <div className="menu-overlay">
          <button 
            className="quick-view-btn"
            onClick={() => {
              // Add quick view functionality here
              console.log("Quick view:", item.name);
            }}
          >
            Quick View
          </button>
        </div> */}
      </div>
      <div className="menu-content">
        <h5 className="menu-title">{item.name}</h5>
        <div className="menu-details">
          <span className="menu-price">₹{item.price}</span>
          {!cartItem ? (
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(item)}
            >
              ADD
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() =>
                  setCart(
                    (prevCart) =>
                      prevCart
                        .map((i) =>
                          i.id === item.id
                            ? { ...i, qty: i.qty - 1 }
                            : i
                        )
                        .filter((i) => i.qty > 0)
                  )
                }
              >
                -
              </button>
              <span className="quantity-value">
                {cartItem.qty}
              </span>
              <button
                className="quantity-btn"
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  { id: 1, name: "Chunky Chicken Pesto Bowl", price: 115, img: "img/img2.jpg" },
  { id: 2, name: "Signature Roast Chicken Superbow", price: 90, img: "img/img2.jpg" },
  { id: 3, name: "Chicken Tikka Egg Scramble Protein Plate", price: 150, img: "img/img4.jpeg" },
  { id: 4, name: "Taiwanese Chicken Ramen", price: 200, img: "img/img5.jpg" },
  { id: 5, name: "Californian Double Chicken Burger", price: 80, img: "img/img5.jpg" },
  { id: 6, name: "Tex Mex Meaty Omelette", price: 180, img: "img/img7.jpg" },
  { id: 7, name: "Cheesey Double XL Buritto", price: 70, img: "img/img8.jpeg" },
  { id: 8, name: "Brioche Omelette", price: 60, img: "img/img1.jpg" },
  { id: 9, name: "Chunky Chicken Pesto Bowl", price: 115, img: "img/img2.jpg" },
  { id: 10, name: "Signature Roast Chicken Superbow", price: 90, img: "img/img2.jpg" },
  { id: 11, name: "Chicken Tikka Egg Scramble Protein Plate", price: 150, img: "img/img4.jpeg" },
  { id: 12, name: "Taiwanese Chicken Ramen", price: 200, img: "img/img5.jpg" },
  { id: 13, name: "Californian Double Chicken Burger", price: 80, img: "img/img5.jpg" },
  { id: 14, name: "Tex Mex Meaty Omelette", price: 180, img: "img/img7.jpg" },
  { id: 15, name: "Cheesey Double XL Buritto", price: 70, img: "img/img8.jpeg" },
  { id: 16, name: "Brioche Omelette", price: 60, img: "img/img1.jpg" },
];

const LandingPage = () => {
  const [cart, setCart] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  // testimonials starts
  // Testimonial carousel functionality
useEffect(() => {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected slide
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  // Next slide function
  function nextSlide() {
    let nextIndex = (currentSlide + 1) % testimonialSlides.length;
    showSlide(nextIndex);
  }

  // Previous slide function
  function prevSlide() {
    let prevIndex = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(prevIndex);
  }

  // Add event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Auto slide every 5 seconds
  const autoSlide = setInterval(nextSlide, 5000);

  // Clean up interval on component unmount
  return () => clearInterval(autoSlide);
}, []);

// testimonials ends


// menu items starts
useEffect(() => {
  const scrollRows = document.querySelectorAll('.scroll-row-inner');
  if (!scrollRows.length) return;
  
  // Initialize each row with its own state
  const rowStates = Array.from(scrollRows).map(row => ({
    position: 0,
    velocity: 0,
    isTouched: false,
    touchStartX: 0,
    touchStartPosition: 0
  }));
  
  let animationId = null;
  
  // Smooth scrolling function
  const smoothScroll = () => {
    let stillMoving = false;
    
    scrollRows.forEach((row, index) => {
      const state = rowStates[index];
      
      if (Math.abs(state.velocity) > 0.1) {
        state.position += state.velocity;
        state.velocity *= 0.85; // Deceleration factor
        
        // Apply boundaries
        const maxPosition = 0;
        const minPosition = -1 * (row.scrollWidth - row.parentElement.offsetWidth);
        state.position = Math.max(minPosition, Math.min(maxPosition, state.position));
        
        // Apply transformation
        row.style.transform = `translateX(${state.position}px)`;
        stillMoving = true;
      }
    });
    
    if (stillMoving) {
      animationId = requestAnimationFrame(smoothScroll);
    } else {
      animationId = null;
    }
  };
  
  // Handle vertical scroll to control horizontal movement for specific row
  const handleVerticalScroll = () => {
    // Find which row is currently in view or being hovered
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    scrollRows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const state = rowStates[index];
      
      // If this row is in the viewport, apply scroll to it
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollDelta = scrollY - (state.lastScrollY || scrollY);
        const speed = 0.8 + (index * 0.3);
        state.velocity = -scrollDelta * speed;
        state.lastScrollY = scrollY;
      }
    });
    
    // Start animation if not already running
    if (!animationId) {
      animationId = requestAnimationFrame(smoothScroll);
    }
  };
  
  // Handle horizontal wheel events for specific row
  const handleHorizontalWheel = (e, row, index) => {
    // Only handle horizontal wheel events
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const state = rowStates[index];
      state.velocity = -e.deltaX * 0.5;
      
      // Start animation if not already running
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    }
  };
  
  // Handle touch events for mobile for specific row
  const handleTouchStart = (e, row, index) => {
    const state = rowStates[index];
    state.touchStartX = e.touches[0].clientX;
    state.touchStartPosition = state.position;
    state.isTouched = true;
  };
  
  const handleTouchMove = (e, row, index) => {
    const state = rowStates[index];
    if (!state.isTouched) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - state.touchStartX;
    
    // Calculate new position
    const newPosition = state.touchStartPosition + deltaX;
    
    // Apply boundaries
    const maxPosition = 0;
    const minPosition = -1 * (row.scrollWidth - row.parentElement.offsetWidth);
    state.position = Math.max(minPosition, Math.min(maxPosition, newPosition));
    
    // Apply transformation
    row.style.transform = `translateX(${state.position}px)`;
  };
  
  const handleTouchEnd = (e, row, index) => {
    const state = rowStates[index];
    if (state.isTouched) {
      const currentX = e.changedTouches[0].clientX;
      const deltaX = currentX - state.touchStartX;
      state.velocity = deltaX * 0.1; // Reduced momentum for better control
      
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    }
    state.isTouched = false;
  };
  
  // Set up event listeners for each row
  scrollRows.forEach((row, index) => {
    // Initialize row position
    row.style.transform = `translateX(0px)`;
    
    // Horizontal wheel events
    row.addEventListener('wheel', (e) => handleHorizontalWheel(e, row, index), { passive: false });
    
    // Touch events for mobile
    row.addEventListener('touchstart', (e) => handleTouchStart(e, row, index), { passive: true });
    row.addEventListener('touchmove', (e) => handleTouchMove(e, row, index), { passive: true });
    row.addEventListener('touchend', (e) => handleTouchEnd(e, row, index), { passive: true });
    
    // Mouse enter/leave to track which row is active
    row.addEventListener('mouseenter', () => {
      rowStates[index].isHovered = true;
    });
    
    row.addEventListener('mouseleave', () => {
      rowStates[index].isHovered = false;
    });
  });
  
  window.addEventListener('scroll', handleVerticalScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleVerticalScroll);
    
    scrollRows.forEach((row, index) => {
      row.removeEventListener('wheel', (e) => handleHorizontalWheel(e, row, index));
      row.removeEventListener('touchstart', (e) => handleTouchStart(e, row, index));
      row.removeEventListener('touchmove', (e) => handleTouchMove(e, row, index));
      row.removeEventListener('touchend', (e) => handleTouchEnd(e, row, index));
    });
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}, []);

<div className="container-xxl py-5" id="order">
  <div className="container">
    <div className="text-center">
      <h5 className="section-title ff-secondary text-center text-primary fw-normal">
        Food Menu
      </h5>
      <h1 className="mb-5">Most Popular Items</h1>
    </div>

    <div className="multi-row-scroll-section">
      <div className="scroll-rows-container">
        {/* First row */}
        <div className="scroll-row">
          <div className="scroll-row-inner" id="row-1">
            {menuItems.slice(0, 6).map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                cart={cart} 
                addToCart={addToCart} 
                setCart={setCart} 
              />
            ))}
          </div>
        </div>

        {/* Second row */}
        <div className="scroll-row">
          <div className="scroll-row-inner" id="row-2">
            {menuItems.slice(6, 12).map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                cart={cart} 
                addToCart={addToCart} 
                setCart={setCart} 
              />
            ))}
          </div>
        </div>

        {/* Third row */}
        <div className="scroll-row">
          <div className="scroll-row-inner" id="row-3">
            {menuItems.slice(12).map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                cart={cart} 
                addToCart={addToCart} 
                setCart={setCart} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="scroll-instruction">
      <div className="mouse-container">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-arrow"></div>
      </div>
      <p>Scroll vertically or horizontally to navigate menu</p>
      <div className="scroll-directions">
        <span className="scroll-direction">↑↓ Vertical</span>
        <span className="scroll-direction">←→ Horizontal</span>
      </div>
    </div>
  </div>
</div>
// menu item ends

  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Parallax Hero Section */}
        <div className="container-xxl position-relative p-0 landing-container">
          <nav className="navbar position-fixed navbar-expand-lg navbar-dark px-4 py-3 nav-mobile nav-position">
            <div className="container-fluid glass-card nav-items py-lg-2">
              <Link to="/" className="navbar-brand p-0">
                <h1 className="text-primary m-0">
                  <i className="fa fa-utensils me-3"></i>Sang Eats
                </h1>
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
                <div className="navbar-nav ms-auto py-0">
                  <button
                    type="button"
                    className="nav-item nav-link btn btn-link p-0 text-primary mobile-margin"
                    onClick={() => scrollToSection("home")}
                  >
                    Home
                  </button>

                  <button
                    type="button"
                    className="nav-item nav-link btn btn-link p-0 text-primary mobile-margin"
                    onClick={() => scrollToSection("about")}
                  >
                    About
                  </button>

                  <button
                    type="button"
                    className="nav-item nav-link btn btn-link p-0 text-primarymobile-margin"
                    onClick={() => scrollToSection("order")}
                  >
                    Menu
                  </button>

                  <button
                    type="button"
                    className="nav-item nav-link btn btn-link p-0 text-primary mobile-margin"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </button>

                <button
                  type="button"
                  className="btn btn-primary py-2 px-4 mr-2 mobile-margin" style={{ marginRight: "10px", borderRadius: "20px" }}
                  >
                  Book A Table
                </button>

                <button
                  type="button"
                  className="btn btn-primary py-2 px-4 mr-2" style={{ marginRight: "10px", borderRadius: "20px"  }} onClick={() => scrollToSection("order")}
                  >
                  Order Now
                </button>

                <button
                  className="btn py-2 px-2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#cartSidebar"
                  >
                  🛒 <span className="badge bg-light text-dark">{cart.length}</span>
                </button>
                  </div>
              </div>
            </div>
          </nav>

          <div className="parallax-hero" id="home">
            <div className="parallax-layer parallax-back" data-depth="0.1"></div>
            <div className="parallax-layer parallax-base" data-depth="0.5"></div>
            <div className="parallax-layer parallax-front" data-depth="0.8"></div> 
            
            <div className="hero-content">
              <div className="container my-5 py-5">
                <div className="row align-items-center g-5">
                  <div className="col-lg-6 text-center text-lg-start">
                    <h1 className="display-3 text-white animated slideInLeft">
                      Enjoy Our
                      <br />
                      Delicious Meal
                    </h1>
                    <p className="text-white animated slideInLeft mb-4 pb-2">
                      Don't wait on hunger! Choose from our wide range of fast food,
                      desi specials, and healthy bites – delivered piping hot in
                      minutes.
                    </p>
                    <Link
                      to=""
                      className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                    >
                      Book A Table
                    </Link>
                  </div>
                  <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                    <img className="img-fluid floating" src="img/hero.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Section */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-4">
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="service-item rounded pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                    <h5>Master Chefs</h5>
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                      amet diam
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="service-item rounded pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                    <h5>Quality Food</h5>
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                      amet diam
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="service-item rounded pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                    <h5>Online Order</h5>
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                      amet diam
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="service-item rounded pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                    <h5>24/7 Service</h5>
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                      amet diam
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section with Parallax */}
        <div className="container-xxl py-5 parallax-about" id="about">
          <div className="parallax-about-bg" style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}></div>
          <div className="container position-relative">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <div className="row g-3">
                  <div className="col-6 text-start">
                    <img
                      className="img-fluid rounded w-100 wow zoomIn"
                      data-wow-delay="0.1s"
                      src="img/about-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-6 text-start">
                    <img
                      className="img-fluid rounded w-75 wow zoomIn "
                      data-wow-delay="0.3s"
                      src="img/about-2.jpg"
                      alt=""
                      style={{ marginTop: "25%" }}
                    />
                  </div>
                  <div className="col-6 text-end">
                    <img
                      className="img-fluid rounded w-75 wow zoomIn "
                      data-wow-delay="0.5s"
                      src="img/about-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-6 text-end">
                    <img
                      className="img-fluid rounded w-100 wow zoomIn "
                      data-wow-delay="0.7s"
                      src="img/about-4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                  About Us
                </h5>
                <h1 className="mb-4">
                  Welcome to <i className="fa fa-utensils text-primary me-2"></i>
                  Sang Eats
                </h1>
                <h1 className="mb-4">An Experience of Royal Indian Dining</h1>
                <div className="divider"></div>
                <p className="mb-4">
                  At Sang Eats, we bring the flavors of royal Indian cuisine to
                  your table. From fragrant biryanis to elaborate thalis, each
                  dish is a celebration of tradition, taste, and hospitality.
                </p>
                <p className="mb-4">
                  {" "}
                  Immerse yourself in an ambiance of elegance and cultural
                  richness — perfect for family gatherings, celebrations, or
                  simply treating yourself to authentic flavors.
                </p>
                <div className="divider"></div>
                <p className="mb-4">
                  {" "}
                  Every plate is carefully crafted using time-honored recipes and
                  the freshest ingredients to deliver a memorable dining
                  experience.
                </p>
                <div className="row g-4 mb-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                      <h1
                        className="flex-shrink-0 display-5 text-primary mb-0"
                        data-toggle="counter-up"
                      >
                        15
                      </h1>
                      <div className="ps-4">
                        <p className="mb-0">Years of</p>
                        <h6 className="text-uppercase mb-0">Experience</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                      <h1
                        className="flex-shrink-0 display-5 text-primary mb-0"
                        data-toggle="counter-up"
                      >
                        50
                      </h1>
                      <div className="ps-4">
                        <p className="mb-0">Popular</p>
                        <h6 className="text-uppercase mb-0">Master Chefs</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/about" className="btn btn-primary py-3 px-5 mt-2">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        {/* <div className="container-xxl py-5" id="order">
          <div className="container">
            <div className="text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Food Menu
              </h5>
              <h1 className="mb-5">Most Popular Items</h1>
            </div>

            <div className="row g-4">
              {menuItems.map((item) => {
                const cartItem = cart.find((i) => i.id === item.id);

                return (
                  <div key={item.id} className="col-lg-3 border-bottom">
                    <div
                      className="d-flex align-items-center flex-column"
                      style={{ width: "90%" }}
                    >
                      <img
                        className="flex-shrink-0 img-fluid rounded mb-3 floating"
                        src={item.img}
                        alt={item.name}
                        style={{ width: "100%" }}
                      />
                      <div className="w-100 d-flex flex-column text-start">
                        <div className="d-flex flex-column">
                          <h5 className="pb-2">{item.name}</h5>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-primary mb-0">₹{item.price}</h5>

                            {!cartItem ? (
                              <button
                                className="counter-container"
                                style={{
                                  border: "none",
                                  justifyContent: "center",
                                }}
                                onClick={() => addToCart(item)}
                              >
                                ADD
                              </button>
                            ) : (
                              <div className="d-flex align-items-center">
                                <div className="counter-container">
                                  <button
                                    className="counter-btn"
                                    onClick={() =>
                                      setCart(
                                        (prevCart) =>
                                          prevCart
                                            .map((i) =>
                                              i.id === item.id
                                                ? { ...i, qty: i.qty - 1 }
                                                : i
                                            )
                                            .filter((i) => i.qty > 0)
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="counter-value">
                                    {cartItem.qty}
                                  </span>
                                  <button
                                    className="counter-btn"
                                    onClick={() => addToCart(item)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}






      <div className="container-xxl py-5" id="order">
  <div className="container">
    <div className="text-center">
      <h5 className="section-title ff-secondary text-center text-primary fw-normal">
        Food Menu
      </h5>
      <h1 className="mb-5">Most Popular Items</h1>
    </div>

    <div className="multi-row-scroll-section">
      <div className="scroll-rows-container">
        {/* Map through all menu items and create rows dynamically */}
        {(() => {
          const rows = [];
          const itemsPerRow = 6;
          
          for (let i = 0; i < menuItems.length; i += itemsPerRow) {
            const rowItems = menuItems.slice(i, i + itemsPerRow);
            const rowIndex = i / itemsPerRow;
            
            rows.push(
              <div key={`row-${rowIndex}`} className="scroll-row">
                <div className="scroll-row-inner" id={`row-${rowIndex}`}>
                  {rowItems.map((item) => (
                    <MenuCard 
                      key={item.id} 
                      item={item} 
                      cart={cart} 
                      addToCart={addToCart} 
                      setCart={setCart} 
                    />
                  ))}
                  {/* Add empty spacers if needed to fill row */}
                  {rowItems.length < itemsPerRow && 
                    Array.from({ length: itemsPerRow - rowItems.length }).map((_, idx) => (
                      <div key={`spacer-${rowIndex}-${idx}`} className="menu-card-spacer"></div>
                    ))
                  }
                </div>
              </div>
            );
          }
          
          return rows;
        })()}
      </div>
    </div>

    {/* <div className="scroll-instruction">
      <div className="mouse-container">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-arrow"></div>
      </div>
      <p>Scroll vertically or hover and scroll horizontally on any row</p>
      <div className="scroll-directions">
        <span className="scroll-direction">↑↓ Vertical</span>
        <span className="scroll-direction">←→ Horizontal</span>
      </div>
    </div> */}
  </div>
</div>

        {/* Cart Sidebar */}
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartSidebar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Your Cart</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            {cart.length === 0 ? (
              <div>
                <div className="text-center mb-3">
                  <img src="img/food.svg" alt="Food" />
                </div>
                <p className="text-center">Your cart is empty</p>
                <p className="text-center">
                  Add some delicious food available on our menu to checkout.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-primary text-center"
                    data-bs-dismiss="offcanvas"  onClick={() => scrollToSection("order")}
                  >
                    Browse Food
                  </button>
                </div>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="mb-3">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="rounded me-3"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{item.name}</h6>
                      <div className="d-flex align-items-center">
                        <small className="text-muted">₹{item.price} x {item.qty}</small>
                        <div className="ms-auto">
                          <div className="counter-container">
                            <button
                              className="counter-btn"
                              onClick={() =>
                                setCart(
                                  (prevCart) =>
                                    prevCart
                                      .map((i) =>
                                        i.id === item.id
                                          ? { ...i, qty: i.qty - 1 }
                                          : i
                                      )
                                      .filter((i) => i.qty > 0)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="counter-value">{item.qty}</span>
                            <button
                              className="counter-btn"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>₹{total}</h5>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>


        {/* <!-- Reservation Start --> */}
      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Reservation
              </h5>
              <h1 className="text-white mb-4">Book A Table Online</h1>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name" autoComplete="on"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email" autoComplete="on"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date3"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        id="datetime"
                        placeholder="Date & Time"
                        data-target="#date3"
                        data-toggle="datetimepicker"
                      />
                      <label htmlFor="datetime">Date & Time</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select1">
                        <option value="1">People 1</option>
                        <option value="2">People 2</option>
                        <option value="3">People 3</option>
                      </select>
                      <label htmlFor="select1">No Of People</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- 16:9 aspect ratio --> */}
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src="null"
                  title="Video Player"
                  id="video"
                  allowFullScreen
                  allowscriptaccess="always"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Reservation Start --> */}

      {/* <!-- Team Start --> */}
      <div className="container-xxl pt-5 pb-3">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Team Members
            </h5>
            <h1 className="mb-5">Our Master Chefs</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src="img/team-1.jpg" alt="" />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
                <div className="d-flex justify-content-center mt-3">
                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-instagram"></i>
                  </button>

                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src="img/team-2.jpg" alt="" />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
                <div className="d-flex justify-content-center mt-3">
                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-instagram"></i>
                  </button>

                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src="img/team-3.jpg" alt="" />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
                <div className="d-flex justify-content-center mt-3">
                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-instagram"></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src="img/team-4.jpg" alt="" />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
                <div className="d-flex justify-content-center mt-3">
                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-square btn-primary mx-1">
                    <i className="fab fa-instagram"></i>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}

      {/* <!-- Testimonial Start --> */}

      <div className="container-xxl py-5" id="testimonials">
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Testimonials
            </h5>
            <h1 className="mb-4">What Our Clients Say</h1>
            <p className="w-75 mx-auto mb-5">Hear from our satisfied customers about their dining experience at Sang Eats</p>
          </div>
          
          <div className="testimonial-carousel">
            <div className="testimonial-track">
              <div className="testimonial-slide active">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="testimonial-content">
                    <i className="fa fa-quote-left quote-icon"></i>
                    <p className="testimonial-text">
                      The food at Sang Eats is absolutely incredible! The flavors are authentic and every dish tells a story. The Chicken Tikka was perfectly spiced and cooked to perfection.
                    </p>
                    <i className="fa fa-quote-right quote-icon"></i>
                  </div>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src="img/testimonial-1.jpg"
                      alt="Sarah Johnson"
                    />
                    <div className="author-info">
                      <h5 className="mb-0">Sarah Johnson</h5>
                      <small>Food Blogger</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="testimonial-content">
                    <i className="fa fa-quote-left quote-icon"></i>
                    <p className="testimonial-text">
                      I've been to many Indian restaurants, but Sang Eats stands out with its exceptional service and authentic flavors. The Brioche Omelette is now my weekend favorite!
                    </p>
                    <i className="fa fa-quote-right quote-icon"></i>
                  </div>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src="img/testimonial-2.jpg"
                      alt="Michael Chen"
                    />
                    <div className="author-info">
                      <h5 className="mb-0">Michael Chen</h5>
                      <small>Regular Customer</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">☆</span>
                  </div>
                  <div className="testimonial-content">
                    <i className="fa fa-quote-left quote-icon"></i>
                    <p className="testimonial-text">
                      The ambiance and food quality make Sang Eats perfect for family dinners. We celebrated my daughter's birthday here and the staff went above and beyond to make it special.
                    </p>
                    <i className="fa fa-quote-right quote-icon"></i>
                  </div>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src="img/testimonial-3.jpg"
                      alt="Priya Sharma"
                    />
                    <div className="author-info">
                      <h5 className="mb-0">Priya Sharma</h5>
                      <small>Local Guide</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="testimonial-content">
                    <i className="fa fa-quote-left quote-icon"></i>
                    <p className="testimonial-text">
                      As someone from India, I can attest to the authenticity of the flavors at Sang Eats. Their Signature Roast Chicken Superbow reminds me of home. Highly recommended!
                    </p>
                    <i className="fa fa-quote-right quote-icon"></i>
                  </div>
                  <div className="testimonial-author">
                    <img
                      className="testimonial-avatar"
                      src="img/testimonial-4.jpg"
                      alt="Raj Patel"
                    />
                    <div className="author-info">
                      <h5 className="mb-0">Raj Patel</h5>
                      <small>Food Critic</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-nav">
              <button className="nav-btn prev-btn">
                <i className="fa fa-chevron-left"></i>
              </button>
              <div className="nav-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button className="nav-btn next-btn">
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
            
      {/* <!-- Testimonial End --> */}


        {/* Contact Section */}
        <div className="container-xxl py-5" id="contact">
          <div className="container">
            <div className="text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Contact Us
              </h5>
              <h1 className="mb-5">Get In Touch</h1>
            </div>
            <div className="row g-4">
              <div className="col-12">
                <div className="row gy-4">
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      Booking
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      book@sangeats.com
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      General
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      info@sangeats.com
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      Technical
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      tech@sangeats.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                  frameBorder="0"
                  style={{ minHeight: "350px", border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
              <div className="col-md-6">
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: "150px" }}
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                  Company
                </h4>
                <Link className="btn btn-link" to="/about">
                  About Us
                </Link>
                <Link className="btn btn-link" to="/contact">
                  Contact Us
                </Link>
                <Link className="btn btn-link" to="/">
                  Reservation
                </Link>
                <Link className="btn btn-link" to="/">
                  Privacy Policy
                </Link>
                <Link className="btn btn-link" to="/">
                  Terms & Condition
                </Link>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                  Contact
                </h4>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-3"></i>123 Street, New
                  York, USA
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-3"></i>info@example.com
                </p>
                <div className="d-flex pt-2">
                  <Link className="btn btn-outline-light btn-social" to="/">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-outline-light btn-social" to="/">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-outline-light btn-social" to="/">
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link className="btn btn-outline-light btn-social" to="/">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                  Opening
                </h4>
                <h5 className="text-light fw-normal">Monday - Saturday</h5>
                <p>09AM - 09PM</p>
                <h5 className="text-light fw-normal">Sunday</h5>
                <p>10AM - 08PM</p>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                  Newsletter
                </h4>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
                  <input
                    className="form-control border-primary w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy; <Link to="/">Sang Eats</Link>, All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="footer-menu">
                    <Link to="/">Home</Link>
                    <Link to="/">Cookies</Link>
                    <Link to="/">Help</Link>
                    <Link to="/">FQAs</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;