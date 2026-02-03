import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import './LandingPage.css';
import { defaultMenuItems } from './LandingPage';
import Header from './Header';
import Footer from './Footer';

// Get initial menu items from localStorage or use defaults
const getInitialMenuItems = () => {
  const stored = localStorage.getItem('menuItems');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        // Merge descriptions from defaultMenuItems into existing items
        return parsed.map(item => {
          const defaultItem = defaultMenuItems.find(d => d.id === item.id);
          return {
            ...item,
            description: item.description || (defaultItem?.description || 'No description available')
          };
        });
      }
      return defaultMenuItems;
    } catch (e) {
      return defaultMenuItems;
    }
  }
  return defaultMenuItems;
};

const categories = [
  { id: 'appetizers', name: 'Appetizer & Chat', icon: '🥗', color: '#10b981', gradient: 'from-emerald-500 to-green-400' },
  { id: 'soups', name: 'Soup', icon: '🍜', color: '#f59e0b', gradient: 'from-amber-500 to-yellow-400' },
  { id: 'breads', name: 'Breads Naan', icon: '🍞', color: '#f97316', gradient: 'from-orange-500 to-red-400' },
  { id: 'pulao', name: 'Pulao & Biryani', icon: '🍽️', color: '#ef4444', gradient: 'from-red-500 to-pink-500' },
  { id: 'vegetarian', name: 'Vegetable Entrees', icon: '🥦', color: '#16a34a', gradient: 'from-green-500 to-emerald-400' },
  { id: 'paneer', name: 'Paneer Entrees', icon: '🥦', color: '#16a34a', gradient: 'from-green-500 to-emerald-400' },
  { id: 'chicken', name: 'Chicken Entrees', icon: '🍗', color: '#65a30d', gradient: 'from-lime-600 to-green-500' },
  { id: 'lamb', name: 'Lamb & Goat Entrees', icon: '🥩', color: '#b91c1c', gradient: 'from-rose-700 to-pink-600' },
  { id: 'tandoori', name: 'Tandoori & Kabab', icon: '🔥', color: '#dc2626', gradient: 'from-red-600 to-orange-500' },
  { id: 'seafood', name: 'Seafood Items', icon: '🐟', color: '#0ea5e9', gradient: 'from-sky-500 to-blue-400' },
  { id: 'indo-chinese', name: 'Indo Chinese Entrees', icon: '🍽️', color: '#ef4444', gradient: 'from-red-500 to-pink-500' },
  { id: 'cold-beverages', name: 'Cold Beverage', icon: '🥤', color: '#8b5cf6', gradient: 'from-purple-500 to-violet-400' },
  { id: 'hot-beverages', name: 'Hot Beverage', icon: '🥤', color: '#8b5cf6', gradient: 'from-purple-500 to-violet-400' },
  { id: 'desserts', name: 'Dessert', icon: '🍰', color: '#ec4899', gradient: 'from-pink-500 to-rose-400' },
  { id: 'salad', name: 'Salad', icon: '🍽️', color: '#ef4444', gradient: 'from-red-500 to-pink-500' },
  { id: 'wines', name: 'Wine', icon: '🍷', color: '#8b0000', gradient: 'from-red-800 to-pink-600' },
  { id: 'beers', name: 'Imported & Domestic Beer', icon: '🍺', color: '#ffd700', gradient: 'from-yellow-500 to-amber-400' },
  { id: 'indian-beer', name: 'Indian Beer', icon: '🍺', color: '#ffd700', gradient: 'from-yellow-500 to-amber-400' },
  { id: 'whiskey', name: 'Whiskey', icon: '🥃', color: '#8b4513', gradient: 'from-amber-800 to-orange-600' },
  { id: 'vodka', name: 'Vodka & Tequila', icon: '🍹', color: '#4ecdc4', gradient: 'from-teal-400 to-cyan-400' },
  { id: 'cocktails', name: 'Cocktails', icon: '🍸', color: '#ff6b6b', gradient: 'from-pink-500 to-rose-400' },
];

const Admin = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
  });
  
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  const [menuItems, setMenuItems] = useState(getInitialMenuItems);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    img: '',
    hasSpicyOption: false,
    category: 'appetizers',
    type: 'non-vegetarian',
    isCustomizable: false,
    isAvailable: true
  });

  const [imagePreview, setImagePreview] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, _setSortBy] = useState('name');
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Scroll to top when navigating to Admin (e.g. from header or footer)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showFormModal || showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFormModal, showDeleteModal]);

  // Sync menuItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  // Handle scroll button visibility and position
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Show button by default (always show)
      setShowScrollButton(true);

      // Check if near bottom (within 100px of footer)
      setIsAtBottom(scrollBottom >= documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize isAvailable property for items that don't have it (only on mount)
  useEffect(() => {
    const itemsNeedUpdate = menuItems.some(item => item.isAvailable === undefined);
    if (itemsNeedUpdate) {
      setMenuItems(prev => prev.map(item => ({
        ...item,
        isAvailable: item.isAvailable !== undefined ? item.isAvailable : true
      })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group items by category
  const groupedItems = useMemo(() => {
    let items = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort items within each category
    switch(sortBy) {
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'spicy':
        items.sort((a, b) => b.hasSpicyOption - a.hasSpicyOption);
        break;
      default:
        break;
    }

    // Group by category
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    // Return grouped items with category info
    return categories
      .filter(cat => grouped[cat.id] && grouped[cat.id].length > 0)
      .map(cat => ({
        category: cat,
        items: grouped[cat.id]
      }));
  }, [menuItems, searchTerm, sortBy]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setCurrentItem({...currentItem, img: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url) => {
    setCurrentItem({...currentItem, img: url});
    setImagePreview(url);
  };

  const resetForm = () => {
    setCurrentItem({
      id: null,
      name: '',
      description: '',
      price: '',
      img: '',
      hasSpicyOption: false,
      category: 'appetizers',
      type: 'non-vegetarian',
      isCustomizable: false,
      isAvailable: true
    });
    setImagePreview('');
    setIsEditing(false);
    setShowFormModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMenuItems(prev => prev.map(item => 
        item.id === currentItem.id ? currentItem : item
      ));
    } else {
      setMenuItems(prev => [...prev, {
        ...currentItem,
        id: Math.max(...prev.map(item => item.id), 0) + 1,
        price: parseInt(currentItem.price) || 0
      }]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setCurrentItem({
      ...item,
      type: item.type || (item.category === 'vegetarian' || item.category === 'paneer' ? 'vegetarian' : 'non-vegetarian'),
      isCustomizable: item.isCustomizable || false,
      isAvailable: item.isAvailable !== false
    });
    setImagePreview(item.img);
    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleAddNew = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Default admin credentials (you can change these)
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    if (loginCredentials.username === adminUsername && loginCredentials.password === adminPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setLoginCredentials({ username: '', password: '' });
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
    setLoginCredentials({ username: '', password: '' });
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      setMenuItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      setShowDeleteModal(false);
      const deletedItemName = itemToDelete.name;
      setItemToDelete(null);
      
      // Show success toast
      setToastMessage(`${deletedItemName} successfully deleted`);
      setShowToast(true);
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const scrollToSection = (id) => {
    if (id === 'home' || id === 'about' || id === 'order' || id === 'contact' || id === 'bookTable') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Header 
          cart={[]} 
          showAdminButton={true}
          scrollToSection={scrollToSection}
        />
        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="admin-login-header">
              <h2>Admin Login</h2>
              <p>Enter your credentials to access the admin dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              {loginError && (
                <div className="admin-login-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {loginError}
                </div>
              )}
              
              <div className="admin-login-field">
                <label htmlFor="username">
                  <i className="fas fa-user"></i>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={loginCredentials.username}
                  onChange={(e) => setLoginCredentials({...loginCredentials, username: e.target.value})}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>
              
              <div className="admin-login-field">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </div>
              
              <button type="submit" className="admin-login-submit">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </button>
            </form>
            
            <div className="admin-login-footer">
              <p>Default credentials: admin / admin123</p>
            </div>
          </div>
        </div>
        <Footer onBookTable={() => {}} scrollToSection={scrollToSection} />
      </>
    );
  }

  return (
    <>
      {/* Header Component */}
      <Header 
        cart={[]} 
        showAdminButton={true}
        scrollToSection={scrollToSection}
      />

      <div className="admin-page-container bg-gradient-to-black from-black bg-gradient-to-black">
        <div className="admin-modal modern-enhanced">
        <div className="admin-header modern-enhanced">
          <div className="header-content">
            <div className="header-main">
              <div className="header-title">
                
                <div>
                  <h3>Admin Dashboard</h3>
                  <p>Manage your menu items and restaurant settings</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="admin-search-box">
              <span className="admin-search-icon" aria-hidden="true">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="search"
                className="admin-search-input"
                placeholder="Search dishes by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search menu items"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="admin-search-clear"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <div className="admin-header-buttons">
              <button className="btn btn-primary" onClick={handleAddNew} style={{background:'rgb(212 175 55/var(--tw-bg-opacity,1))', color:'rgb(26 26 26/var(--tw-text-opacity,1))'}}>
                <i className="fas fa-plus me-2"></i>Add Dish
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </div>
          </div>
        </div>

        <div className="admin-content modern-enhanced">
          {/* Search and Sort Controls */}
          {/* <div className="admin-controls-bar"> */}
            
            {/* <div className="controls-right">
              <select 
                className="form-control form-control-sm" 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="spicy">Spicy First</option>
              </select>
              <button className="btn btn-primary" onClick={handleAddNew}>
                <i className="fas fa-plus me-2"></i>Add Dish
              </button>
            </div> */}
          {/* </div> */}

          {/* All Items Grouped by Category */}
          <div className="admin-main modern-enhanced">
            {groupedItems.length === 0 ? (
              <div className="empty-state modern-enhanced">
                <div className="empty-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <h6>No items found</h6>
                <p>{searchTerm ? 'Try adjusting your search' : 'Start by adding your first menu item'}</p>
                <button className="btn btn-primary" onClick={handleAddNew}>
                  <i className="fas fa-plus me-2"></i>Add First Item
                </button>
              </div>
            ) : (
              <div className="all-items-container">
                {groupedItems.map(({ category, items }) => (
                  <div key={category.id} className="category-section">
                    <div className="category-section-header" >
                      {/* <div className="category-header-icon" style={{ backgroundColor: `${category.color}20` }}>
                        <span style={{ color: category.color, fontSize: '1.5rem' }}>{category.icon}</span>
                      </div> */}
                      <div className="category-header-info">
                        <h3>{category.name}</h3>
                        {/* <span className="category-item-count">{items.length} items</span> */}
                      </div>
                    </div>
                    <div className="items-grid modern-enhanced">
                      {items.map(item => (
                        <div key={item.id} className="admin-item-card modern-enhanced">
                          <div className="item-container">
                            <div className="item-info">
                              <h6 className="item-name">{item.name}</h6>
                              <p className="item-description">{item.description || 'No description available'}</p>
                              <div className="item-meta">
                                <span className="item-price">${item.price}</span>
                              </div>
                            </div>
                            
                            <div className="item-image">
                              <img src={item.img} alt={item.name} style={{ width: '150px', height: '150px', objectFit: 'cover', flexShrink: 0 }} />
                              {/* {item.hasSpicyOption && (
                                <div className="spicy-badge" title="Spicy option available">
                                  <i className="fas fa-pepper-hot"></i>
                                </div>
                              )} */}
                              {/* <div className="item-category-badge" style={{ backgroundColor: category.color }}>
                                {category.icon}
                              </div> */}
                            </div>
                          </div>
                          
                          
                          <div className="item-footer-actions">
                            <div className="availability-toggle-container">
                              <label className="availability-toggle-label">
                                <input
                                  type="checkbox"
                                  className="availability-toggle"
                                  checked={item.isAvailable !== false}
                                  onChange={(e) => {
                                    setMenuItems(prev => prev.map(i => 
                                      i.id === item.id ? { ...i, isAvailable: e.target.checked } : i
                                    ));
                                  }}
                                />
                                <span className="toggle-slider"></span>
                                <span>Available</span>

                              </label>
                            </div>
                            
                            <div className="item-actions">
                              <button className="btn-action edit" onClick={() => handleEdit(item)} title="Edit">
                                <i className="far fa-edit"></i>
                              </button>
                              <button className="btn-action delete" onClick={() => handleDeleteClick(item)} title="Delete">
                                <i className="far fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showFormModal && (
          <div className="admin-form-modal-overlay" onClick={() => setShowFormModal(false)}>
            <div className="admin-form-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="form-modal-header">
                <h4>
                  {isEditing ? 'Edit Dish' : 'Create Dish'}
                </h4>
                <button className="admin-form-modal-close-btn" onClick={() => setShowFormModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <hr className="form-modal-divider" />

              <form onSubmit={(e) => { handleSubmit(e); setShowFormModal(false); }} className="admin-form modern-enhanced">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label-new">Dish Name</label>
                    <input
                      type="text"
                      className="form-input-new"
                      placeholder="Enter dish name"
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="form-label-new">Description</label>
                    <textarea
                      className="form-input-new"
                      placeholder="Enter dish description"
                      value={currentItem.description || ''}
                      onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                      rows="4"
                      style={{ minHeight: '100px', resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label-new">Dish Image</label>
                    <div className="image-upload-section">
                      {imagePreview || currentItem.img ? (
                        <div className="image-preview-container">
                          <img src={imagePreview || currentItem.img} alt="Preview" className="preview-image" />
                          <button 
                            type="button" 
                            className="btn-remove-image" 
                            onClick={() => {
                              setImagePreview('');
                              setCurrentItem({...currentItem, img: ''});
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="image-upload-placeholder">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>No image selected</p>
                        </div>
                      )}
                      <div className="image-upload-options">
                        <label className="btn-upload-image">
                          <i className="fas fa-upload"></i>
                          Upload Image
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            hidden 
                          />
                        </label>
                        <div className="image-url-input">
                          <i className="fas fa-link"></i>
                          <input
                            type="text"
                            className="form-input-new"
                            placeholder="Or enter image URL"
                            value={currentItem.img}
                            onChange={(e) => handleImageUrlChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label-new">Price</label>
                    <input
                      type="number"
                      className="form-input-new"
                      placeholder="0.00"
                      step="0.01"
                      value={currentItem.price}
                      onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label-new">Category</label>
                    <select
                      className="form-input-new"
                      value={currentItem.category}
                      onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label-new">Type</label>
                    <select
                      className="form-input-new"
                      value={currentItem.type || 'non-vegetarian'}
                      onChange={(e) => setCurrentItem({...currentItem, type: e.target.value})}
                    >
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-Vegetarian</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <div className="form-checkboxes">
                      <div className="form-check-item">
                        <input
                          type="checkbox"
                          className="form-checkbox-new"
                          id="available"
                          checked={currentItem.isAvailable !== false}
                          onChange={(e) => setCurrentItem({...currentItem, isAvailable: e.target.checked})}
                        />
                        <label className="form-check-label-new" htmlFor="available">
                          Available
                        </label>
                      </div>
                      <div className="form-check-item">
                        <input
                          type="checkbox"
                          className="form-checkbox-new"
                          id="customizable"
                          checked={currentItem.isCustomizable || false}
                          onChange={(e) => setCurrentItem({...currentItem, isCustomizable: e.target.checked})}
                        />
                        <label className="form-check-label-new" htmlFor="customizable">
                          Customizable
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <div className="form-actions-new">
                      <button type="submit" className="btn-submit-new">
                        {isEditing ? 'Update Dish' : 'Create Dish'}
                      </button>
                      <button type="button" className="btn-cancel-new" onClick={() => setShowFormModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

      {/* Footer Component */}
      <Footer scrollToSection={scrollToSection} />

      {/* Scroll to Top/Bottom Button */}
      {showScrollButton && (
        <button
          className="admin-scroll-button"
          onClick={isAtBottom ? scrollToTop : scrollToFooter}
          title={isAtBottom ? 'Scroll to Top' : 'Scroll to Footer'}
        >
          <i className={`fas ${isAtBottom ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </button>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="admin-delete-modal-overlay" onClick={handleDeleteCancel}>
          <div className="admin-delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <div className="delete-modal-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Delete Item</h3>
              <p>Are you sure you want to delete <strong>"{itemToDelete.name}"</strong>?</p>
              <p className="delete-warning">This action cannot be undone.</p>
            </div>
            <div className="delete-modal-actions">
              <button className="btn-delete-cancel" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="btn-delete-confirm" onClick={handleDeleteConfirm}>
                <i className="fas fa-trash-alt"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="admin-toast-container">
          <div className="admin-toast success">
            <div className="toast-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="toast-content">
              <p className="toast-message">{toastMessage}</p>
            </div>
            <button className="toast-close" onClick={() => setShowToast(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;

