import React, { useState, useEffect, useMemo } from "react";
import './LandingPage.css';
import { Link } from "react-router-dom";


// Add spicy levels configuration
const spicyLevels = [
  { id: 1, name: "Mild", level: 1, emoji: "🌱" },
  { id: 2, name: "Mild Plus", level: 2, emoji: "🌿" },
  { id: 3, name: "Medium", level: 3, emoji: "🌶️" },
  { id: 4, name: "Medium Plus", level: 4, emoji: "🌶️🌶️" },
  { id: 5, name: "Hot", level: 5, emoji: "🌶️🌶️🌶️" },
  { id: 6, name: "Extra Hot", level: 6, emoji: "🔥" }
];

const defaultMenuItems = [
  { id: 1, name: "Chunky Chicken Pesto Bowl", price: 115, img: "img/img2.jpg", hasSpicyOption: false, category: "appetizers" },
  { id: 2, name: "Signature Roast Chicken Superbow", price: 90, img: "img/img2.jpg", hasSpicyOption: true, category: "appetizers" },
  { id: 3, name: "Chicken Tikka Egg Scramble Protein Plate", price: 150, img: "img/img4.jpeg", hasSpicyOption: true, category: "appetizers" },
  { id: 4, name: "Taiwanese Chicken Ramen", price: 200, img: "img/img5.jpg", hasSpicyOption: true, category: "soups-salads" },
  { id: 5, name: "Californian Double Chicken Burger", price: 80, img: "img/img5.jpg", hasSpicyOption: true, category: "soups-salads" },
  { id: 6, name: "Tex Mex Meaty Omelette", price: 180, img: "img/img7.jpg", hasSpicyOption: true, category: "side-dishes" },
  { id: 7, name: "Cheesey Double XL Buritto", price: 70, img: "img/img8.jpeg", hasSpicyOption: true, category: "side-dishes" },
  { id: 8, name: "Brioche Omelette", price: 60, img: "img/img1.jpg", hasSpicyOption: true, category: "breads" },
  { id: 9, name: "Chunky Chicken Pesto Bowl", price: 115, img: "img/img2.jpg", hasSpicyOption: true, category: "tandoori" },
  { id: 10, name: "Signature Roast Chicken Superbow", price: 90, img: "img/img2.jpg", hasSpicyOption: true, category: "tandoori" },
  { id: 11, name: "Chicken Tikka Egg Scramble Protein Plate", price: 150, img: "img/img4.jpeg", hasSpicyOption: true, category: "chicken" },
  { id: 12, name: "Taiwanese Chicken Ramen", price: 200, img: "img/img5.jpg", hasSpicyOption: true, category: "chicken" },
  { id: 13, name: "Californian Double Chicken Burger", price: 80, img: "img/img5.jpg", hasSpicyOption: true, category: "vegetarian" },
  { id: 14, name: "Tex Mex Meaty Omelette", price: 180, img: "img/img7.jpg", hasSpicyOption: true, category: "vegetarian" },
  { id: 15, name: "Cheesey Double XL Buritto", price: 70, img: "img/img8.jpeg", hasSpicyOption: true, category: "lamb" },
  { id: 16, name: "Brioche Omelette", price: 60, img: "img/img1.jpg", hasSpicyOption: true, category: "seafood" },
  { id: 17, name: "Dutch Truffle Cake", price: 60, img: "img/desert1.jpg", hasSpicyOption: true, category: "desserts" },
  { id: 18, name: "Banana Oatmeal Cake Slice", price: 149, img: "img/desert2.jpeg", hasSpicyOption: true, category: "desserts" },
  { id: 19, name: "Mint Lemonade", price: 39, img: "img/beverage1.jpg", hasSpicyOption: true, category: "beverages" },
  { id: 20, name: "Masala Lemonade", price: 39, img: "img/beverage2.jpg", hasSpicyOption: true, category: "beverages" },
  { id: 21, name: "Fried Fish with Greens", price: 399, img: "img/fish1.png", hasSpicyOption: true, category: "seafood" },
  { id: 22, name: "Lamb Masala", price: 399, img: "img/lamb1.jpg", hasSpicyOption: true, category: "lamb" },
].map(item => ({
  ...item,
  hasSpicyOption: item.hasSpicyOption !== undefined ? item.hasSpicyOption : false
}));
// MenuCard Component
// MenuCard Component - Show total count irrespective of spicy level
const MenuCard = ({ item, cart, addToCart, setCart, onAddWithSpicyLevel }) => {
  // Get total quantity for this item (across all spicy levels)
  const totalQuantity = cart
    .filter(cartItem => cartItem.id === item.id)
    .reduce((total, cartItem) => total + cartItem.qty, 0);
  
  return (
    <div className="menu-card">
      <div className="menu-image-container">
        <img className="menu-image" src={item.img} alt={item.name} />
        {item.hasSpicyOption && (
          <div className="spicy-badge">
            <i className="fas fa-pepper-hot"></i> Custom Spice
          </div>
        )}
      </div>
      <div className="menu-content">
        <h5 className="menu-title">{item.name}</h5>
        {item.hasSpicyOption && (
          <div className="spicy-indicator-small">
            <small className="text-muted">
              <i className="fas fa-pepper-hot"></i> Adjustable spice level
            </small>
          </div>
        )}
        <div className="menu-details">
          <span className="menu-price">₹{item.price}</span>
          {totalQuantity === 0 ? (
            <button
              className="add-to-cart-btn"
              onClick={() => onAddWithSpicyLevel(item)}
            >
              ADD
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => {
                  // Find the most recent cart item for this item to remove from
                  const cartItemsForThisItem = cart.filter(cartItem => cartItem.id === item.id);
                  if (cartItemsForThisItem.length > 0) {
                    // Remove from the first found item (or you can implement more specific logic)
                    const itemToDecrease = cartItemsForThisItem[0];
                    setCart((prevCart) =>
                      prevCart
                        .map((i) =>
                          i.id === itemToDecrease.id && 
                          i.spicyLevel?.id === itemToDecrease.spicyLevel?.id
                            ? { ...i, qty: i.qty - 1 }
                            : i
                        )
                        .filter((i) => i.qty > 0)
                    );
                  }
                }}
              >
                -
              </button>
              <span className="quantity-value">{totalQuantity}</span>
              <button
                className="quantity-btn"
                onClick={() => onAddWithSpicyLevel(item)}
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

// MenuCategory Component
const MenuCategory = ({ category, isActive, onClick, onHover, image }) => {
  return (
    <div 
      className={`menu-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      <div className="d-flex align-items-center">
      <div className="category-icon">
        <i className={category.icon}></i>
      </div>
      <div className="category-content">
        <h4>{category.name}</h4>
        <p>{category.description}</p>
      </div>
      </div>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};



// Admin Panel Component
const AdminPanel = ({ menuItems, onAddItem, onEditItem, onDeleteItem, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    price: '',
    img: '',
    hasSpicyOption: false,
    category: 'appetizers'
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [mobileView, setMobileView] = useState('categories'); // 'categories', 'form', 'items'
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');


  const categories = [
    { id: 'appetizers', name: 'Appetizers', icon: '🥗', color: '#10b981' },
    { id: 'soups-salads', name: 'Soups & Salads', icon: '🍜', color: '#f59e0b' },
    { id: 'side-dishes', name: 'Side Dishes', icon: '🍽️', color: '#ef4444' },
    { id: 'breads', name: 'Breads', icon: '🍞', color: '#f97316' },
    { id: 'tandoori', name: 'Tandoori Specialties', icon: '🔥', color: '#dc2626' },
    { id: 'chicken', name: 'Chicken Dishes', icon: '🍗', color: '#65a30d' },
    { id: 'vegetarian', name: 'Vegetarian Delights', icon: '🥦', color: '#16a34a' },
    { id: 'lamb', name: 'Lamb Specialties', icon: '🥩', color: '#b91c1c' },
    { id: 'seafood', name: 'Seafood', icon: '🐟', color: '#0ea5e9' },
    { id: 'beverages', name: 'Beverages', icon: '🥤', color: '#8b5cf6' },
    { id: 'desserts', name: 'Desserts', icon: '🍰', color: '#ec4899' }
  ];

   // Filter items by selected category
  // Enhanced filtered items with search and sort
  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => 
      item.category === selectedCategory && 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
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

    return items;
  }, [menuItems, selectedCategory, searchTerm, sortBy]);


    // Handle image upload simulation
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setCurrentItem({...currentItem, img: e.target.result});
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };


  // Handle image URL input
  const handleImageUrlChange = (url) => {
    setCurrentItem({...currentItem, img: url});
    setImagePreview(url);
  };

  const resetForm = () => {
    setCurrentItem({
      id: null,
      name: '',
      price: '',
      img: '',
      hasSpicyOption: false,
      category: selectedCategory // Set to current selected category
    });
    setImagePreview('');
    setIsEditing(false);
    setIsUploading(false);
    setSearchTerm('');
    if (window.innerWidth < 768) {
      setMobileView('categories');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onEditItem(currentItem);
    } else {
      onAddItem({
        ...currentItem,
        id: Math.max(...menuItems.map(item => item.id), 0) + 1,
        price: parseInt(currentItem.price) || 0
      });
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setImagePreview(item.img);
    setIsEditing(true);
    setSelectedCategory(item.category);
    if (window.innerWidth < 768) {
      setMobileView('form');
    }
  };

   const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // setCurrentItem(prev => ({ ...prev, category: categoryId }));
    resetForm();
    if (window.innerWidth < 768) {
      setMobileView('items');
      setShowMobileSidebar(false);
    }
  };

  const getCategoryStats = (categoryId) => {
    const items = menuItems.filter(item => item.category === categoryId);
    const totalValue = items.reduce((sum, item) => sum + item.price, 0);
    const avgPrice = items.length > 0 ? Math.round(totalValue / items.length) : 0;
    return { count: items.length, totalValue, avgPrice };
  };

    const getOverallStats = () => {
    const totalItems = menuItems.length;
    const totalValue = menuItems.reduce((sum, item) => sum + item.price, 0);
    const spicyItems = menuItems.filter(item => item.hasSpicyOption).length;
    const avgPrice = totalItems > 0 ? Math.round(totalValue / totalItems) : 0;
    
    return { totalItems, totalValue, spicyItems, avgPrice };
  };


    const mobileNavigation = {
    back: () => {
      if (mobileView === 'items') setMobileView('categories');
      else if (mobileView === 'form') setMobileView(isEditing ? 'items' : 'categories');
    },
    addItem: () => {
      resetForm();
      setMobileView('form');
    }
  };



    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const overallStats = getOverallStats();


    // Mobile navigation functions
  const handleMobileBack = () => {
    if (mobileView === 'items') {
      setMobileView('categories');
    } else if (mobileView === 'form') {
      if (isEditing) {
        setMobileView('items');
      } else {
        setMobileView('categories');
      }
    }
  };

    const handleAddNewItemMobile = () => {
    resetForm();
    setMobileView('form');
  };

  // Responsive layout detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
       <div className="admin-modal-overlay modern-v2">
      <div className="admin-modal modern-v2">
        {/* Enhanced Header */}
        <div className="admin-header modern-v2">
          <div className="header-content">
            <div className="header-main">
              {window.innerWidth < 768 && mobileView !== 'categories' && (
                <button className="btn-back-mobile" onClick={mobileNavigation.back}>
                  <i className="fas fa-arrow-left"></i>
                </button>
              )}
              <div className="header-title">
                <h3 className="modal-header-heading">
                  <i className="fas fa-utensils me-2"></i>
                  Menu Dashboard
                </h3>
              </div>
            </div>
            
            
          </div>
          
          {window.innerWidth < 768 && mobileView === 'items' && (
            <button className="btn-mobile-menu" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
              <i className="fas fa-bars"></i>
            </button>
          )}
          
          <button className="btn-close modern-v2" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
       

        <div className="admin-content modern-v2">
          {/* Mobile Sidebar */}
          {showMobileSidebar && (
            <div className="mobile-sidebar-overlay" onClick={() => setShowMobileSidebar(false)}>
              <div className="mobile-sidebar-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-sidebar-header">
                  <h5>Categories</h5>
                  <button className="btn-close modern-v2" onClick={() => setShowMobileSidebar(false)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="mobile-category-nav">
                  {categories.map(cat => {
                    const stats = getCategoryStats(cat.id);
                    return (
                      <div 
                        key={cat.id}
                        className={`mobile-category-nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => {
                          handleCategoryChange(cat.id);
                          setShowMobileSidebar(false);
                        }}
                        style={{ borderLeftColor: cat.color }}
                      >
                        <div className="category-icon" style={{ color: cat.color }}>{cat.icon}</div>
                        <div className="category-info">
                          <span className="category-name">{cat.name}</span>
                          <span className="category-stats">{stats.count} items</span>
                        </div>
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          {window.innerWidth >= 768 && (
            <div className="admin-sidebar modern-v2">
              <div className="sidebar-header">
                <div className="search-container">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button className="clear-search" onClick={() => setSearchTerm('')}>
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="category-nav">
                {categories.map(cat => {
                  const stats = getCategoryStats(cat.id);
                  return (
                    <div 
                      key={cat.id}
                      className={`category-nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat.id)}
                      style={{ borderLeftColor: cat.color }}
                    >
                      <div className="category-main">
                        <div className="category-icon" style={{ color: cat.color }}>{cat.icon}</div>
                        <div className="category-info">
                          <span className="category-name">{cat.name}</span>
                          <span className="category-stats">
                            {stats.count} items 
                          </span>
                        </div>
                      </div>
                      <div className="category-value">
                        {/* <span>₹{stats.totalValue}</span> */}
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sidebar-footer">
                <button className="btn-add-category" onClick={resetForm}>
                  <i className="fas fa-plus-circle"></i>
                  Add New Category
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="admin-main modern-v2">
            {/* Mobile Categories View */}
            {window.innerWidth < 768 && mobileView === 'categories' && (
              <div className="mobile-categories-view">
                <div className="mobile-categories-header">
                  <h5>Select Category</h5>
                  <p>Choose a category to manage items</p>
                </div>
                <div className="mobile-categories-grid">
                  {categories.map(cat => {
                    const stats = getCategoryStats(cat.id);
                    return (
                      <div 
                        key={cat.id}
                        className="mobile-category-card"
                        onClick={() => handleCategoryChange(cat.id)}
                        style={{ borderLeftColor: cat.color }}
                      >
                        <div className="category-card-content">
                          <div className="category-card-icon" style={{ color: cat.color }}>
                            {cat.icon}
                          </div>
                          <div>
                            <h6>{cat.name}</h6>
                            <span>{stats.count} items</span>
                          </div>
                        </div>
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-primary w-100 mt-3" onClick={mobileNavigation.addItem}>
                  <i className="fas fa-plus me-2"></i>
                  Add New Item
                </button>
              </div>
            )}

            {/* Form Section */}
            {(window.innerWidth >= 768 || mobileView === 'form') && (
              <div className="form-section modern-v2">
                <div className="section-header">
                  <div className="section-title hr-none">
                    <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'} me-2`}></i>
                    {isEditing ? 'Edit Menu Item' : 'Create New Item'}
                  </div>
                  {isEditing && (
                    <button className="btn btn-outline-secondary btn-sm" onClick={resetForm}>
                      <i className="fas fa-plus me-1"></i>New Item
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="admin-form modern-v2">
                  {/* Image Upload Section */}
                  <div className="form-card">
                    <label className="form-label">Item Image</label>
                    <div className="image-upload-card">
                      {imagePreview ? (
                        <div className="image-preview">
                          <img src={imagePreview} alt="Preview" />
                          <button type="button" className="btn-remove-image" onClick={() => {
                            setImagePreview('');
                            setCurrentItem({...currentItem, img: ''});
                          }}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <span>Click to upload or drag & drop</span>
                          <small>PNG, JPG, GIF up to 10MB</small>
                        </div>
                      )}
                      
                      <div className="upload-actions">
                        <label className="upload-btn primary">
                          <i className="fas fa-upload me-2"></i>
                          Upload Image
                          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                        <div className="url-input">
                          <i className="fas fa-link"></i>
                          <input
                            type="text"
                            placeholder="Or enter image URL"
                            value={currentItem.img}
                            onChange={(e) => handleImageUrlChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating modern-v2">
                        <i className="fas fa-tag input-icon"></i>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Item Name"
                          value={currentItem.name}
                          onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                          required
                        />
                        <label>Item Name</label>
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                      <div className="form-floating modern-v2">
                        <i className="fas fa-rupee-sign input-icon"></i>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={currentItem.price}
                          onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                          required
                        />
                        <label>Price (₹)</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-floating modern-v2">
                        <i className="fas fa-layer-group input-icon"></i>
                        <select
                          className="form-control"
                          value={selectedCategory}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                               {cat.name}
                            </option>
                          ))}
                        </select>
                        <label>Category</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check modern-v2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="spicyOption"
                          checked={currentItem.hasSpicyOption}
                          onChange={(e) => setCurrentItem({...currentItem, hasSpicyOption: e.target.checked})}
                        />
                        <label className="form-check-label" htmlFor="spicyOption">
                          <i className="fas fa-pepper-hot me-2"></i>
                          Enable Spicy Level Customization
                          <span>Allow customers to choose spice intensity</span>
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary modern-v2">
                          <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
                          {isEditing ? 'Update Item' : 'Create Item'}
                        </button>
                        {isEditing && (
                          <button type="button" className="btn btn-outline-secondary modern-v2" onClick={resetForm}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Items List Section */}
            {(window.innerWidth >= 768 || mobileView === 'items') && (
              <div className="items-section modern-v2">
                <div className="section-header">
                  <div className="section-info">
                    <h5>
                      {/* <i className="fas fa-list me-2"></i> */}
                      {categories.find(cat => cat.id === selectedCategory)?.name}
                    </h5>
                    <span className="item-count">{filteredItems.length} items</span>
                  </div>
                  <div className="section-controls">
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
                    {window.innerWidth < 768 && (
                      <button className="btn btn-primary btn-sm" onClick={mobileNavigation.addItem}>
                        <i className="fas fa-plus me-1"></i>Add
                      </button>
                    )}
                  </div>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="empty-state modern-v2">
                    <div className="empty-icon">
                      <i className="fas fa-utensils"></i>
                    </div>
                    <h6>No items found</h6>
                    <p>{searchTerm ? 'Try adjusting your search' : 'Start by adding your first menu item'}</p>
                    <button className="btn btn-primary" onClick={resetForm}>
                      <i className="fas fa-plus me-2"></i>Add First Item
                    </button>
                  </div>
                ) : (
                  <div className="items-grid modern-v2">
                    {filteredItems.map(item => {
                      const category = categories.find(cat => cat.id === item.category);
                      return (
                        <div key={item.id} className="admin-item-card modern-v2">
                          <div className="item-image">
                            <img src={item.img} alt={item.name} />
                            {item.hasSpicyOption && (
                              <div className="spicy-badge" title="Spicy option available">
                                <i className="fas fa-pepper-hot"></i>
                              </div>
                            )}
                            <div className="item-category-badge" style={{ backgroundColor: category?.color }}>
                              {category?.icon}
                            </div>
                          </div>
                          
                          <div className="item-info">
                            <h6 className="item-name">{item.name}</h6>
                            <div className="item-meta">
                              <span className="item-price">₹{item.price}</span>
                              <span className="item-category">{category?.name}</span>
                            </div>
                          </div>
                          
                          <div className="item-actions">
                            <button className="btn-action edit" onClick={() => handleEdit(item)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn-action delete" onClick={() => onDeleteItem(item.id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                            <button className="btn-action preview">
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        {/* <div className="admin-footer modern-v2">
          <div className="footer-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-info">
                <span className="stat-value">{overallStats.totalItems}</span>
                <span className="stat-label">Total Items</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-pepper-hot"></i>
              </div>
              <div className="stat-info">
                <span className="stat-value">{overallStats.spicyItems}</span>
                <span className="stat-label">Spicy Items</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-rupee-sign"></i>
              </div>
              <div className="stat-info">
                <span className="stat-value">₹{overallStats.totalValue}</span>
                <span className="stat-label">Total Value</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-calculator"></i>
              </div>
              <div className="stat-info">
                <span className="stat-value">₹{overallStats.avgPrice}</span>
                <span className="stat-label">Avg Price</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};




// Spicy Level Modal Component
const SpicyLevelModal = ({ show, onClose, item, onConfirm }) => {
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState(spicyLevels[2]); // Default to Medium

  const [hoveredLevel, setHoveredLevel] = useState(null);

   // Prevent background scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!show) return null;

  const handleConfirm = () => {
    onConfirm(selectedSpicyLevel);
    onClose();
  };
    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

   const handleModalScroll = (e) => {
    // Prevent the overlay from scrolling
    e.stopPropagation();
  };


  const getSpicyLevelColor = (level) => {
    const colors = [
      '#4CAF50', // Mild - Green
      '#8BC34A', // Mild Plus - Light Green
      '#FFC107', // Medium - Yellow
      '#FF9800', // Medium Plus - Orange
      '#F44336', // Hot - Red
      '#D32F2F'  // Extra Hot - Dark Red
    ];
    return colors[level - 1] || '#FFC107';
  };

   const getSpicyIcon = (level) => {
    const icons = [
      '🌱', // Mild
      '🌿', // Mild Plus
      '🌶️', // Medium
      '🌶️', // Medium Plus
      '🌶️', // Hot
      '🔥'  // Extra Hot
    ];
    return icons[level - 1] || '🌶️';
  };

  const getSpicyDescription = (level) => {
    const descriptions = [
      'Very mild, perfect for beginners',
      'Slight warmth, gentle spice',
      'Balanced heat, noticeable but comfortable',
      'Warm and flavorful, good kick',
      'Spicy and bold, for heat lovers',
      'Extremely hot, proceed with caution!'
    ];
    return descriptions[level - 1] || 'Balanced heat';
  };

  return (
    <div className="spicy-modal-overlay enhanced" onClick={handleOverlayClick}>
      <div 
        className="spicy-modal-content enhanced" 
        onClick={(e) => e.stopPropagation()}
        onScroll={handleModalScroll}
      >
        {/* Animated Header */}
        <div className="spicy-modal-header enhanced">
        
          <div className="header-content">
            <h5>Customize Your Spice Level</h5>
            <p>How spicy would you like it?</p>
          </div>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        
        {/* Scrollable Content */}
        <div className="spicy-modal-scrollable" onScroll={handleModalScroll}>
          {/* Item Preview */}
          <div className="spicy-modal-body enhanced">
            <div className="item-preview enhanced">
              <div className="item-image-container">
                <img src={item.img} alt={item.name} className="item-preview-img" />
                <div className="item-overlay"></div>
              </div>
              <div className="item-preview-info">
                <h6>{item.name}</h6>
                <p className="price">₹{item.price}</p>
                <div className="spicy-preview">
                  <span className="current-level" style={{ color: getSpicyLevelColor(selectedSpicyLevel.id) }}>
                    {getSpicyIcon(selectedSpicyLevel.id)} {selectedSpicyLevel.name}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Spicy Level Selector */}
            <div className="spicy-levels enhanced">
              <div className="level-indicator">
                <div className="level-scale">
                  {spicyLevels.map(level => (
                    <div 
                      key={level.id}
                      className={`scale-mark ${selectedSpicyLevel.id >= level.id ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: selectedSpicyLevel.id >= level.id ? getSpicyLevelColor(level.id) : '#e9ecef'
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="level-labels">
                  {spicyLevels.map(level => (
                    <span 
                      key={level.id}
                      className={`level-label ${selectedSpicyLevel.id === level.id ? 'active' : ''}`}
                      style={{ color: getSpicyLevelColor(level.id) }}
                    >
                      {level.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Spicy Options */}
              <div className="spicy-options enhanced">
                {spicyLevels.map(level => (
                  <div 
                    key={level.id}
                    className={`spicy-option enhanced ${selectedSpicyLevel.id === level.id ? 'selected' : ''} ${hoveredLevel === level.id ? 'hovered' : ''}`}
                    onClick={() => setSelectedSpicyLevel(level)}
                    onMouseEnter={() => setHoveredLevel(level.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    style={{
                      borderColor: selectedSpicyLevel.id === level.id ? getSpicyLevelColor(level.id) : '#e9ecef',
                      background: selectedSpicyLevel.id === level.id ? 
                        `linear-gradient(135deg, ${getSpicyLevelColor(level.id)}15, ${getSpicyLevelColor(level.id)}08)` : 
                        'white'
                    }}
                  >
                    <div className="option-header">
                      <div className="spicy-icon" style={{ color: getSpicyLevelColor(level.id) }}>
                        {getSpicyIcon(level.id)}
                      </div>
                      <div className="option-info">
                        <span className="option-name" style={{ color: getSpicyLevelColor(level.id) }}>
                          {level.name}
                        </span>
                        <span className="option-description">
                          {getSpicyDescription(level.id)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="spicy-visual">
                      <div className="pepper-container">
                        {[...Array(6)].map((_, index) => (
                          <div 
                            key={index}
                            className={`pepper ${index < level.level ? 'active' : ''}`}
                            style={{
                              backgroundColor: index < level.level ? getSpicyLevelColor(level.id) : '#e9ecef',
                              transform: `scale(${index < level.level ? 1 : 0.8})`
                            }}
                          >
                            {index < level.level && <div className="pepper-detail"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="selection-indicator">
                      <div 
                        className="indicator-dot"
                        style={{ 
                          backgroundColor: selectedSpicyLevel.id === level.id ? getSpicyLevelColor(level.id) : 'transparent',
                          borderColor: getSpicyLevelColor(level.id)
                        }}
                      >
                        {selectedSpicyLevel.id === level.id && <div className="indicator-inner"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spicy Meter */}
              <div className="spicy-meter">
                <div className="meter-labels">
                  <span>Mild</span>
                  <span>Hot</span>
                </div>
                <div className="meter-track">
                  <div 
                    className="meter-fill"
                    style={{
                      width: `${(selectedSpicyLevel.id / spicyLevels.length) * 100}%`,
                      background: `linear-gradient(90deg, ${getSpicyLevelColor(1)}, ${getSpicyLevelColor(selectedSpicyLevel.id)})`
                    }}
                  ></div>
                  <div 
                    className="meter-thumb"
                    style={{
                      left: `${((selectedSpicyLevel.id - 0.5) / spicyLevels.length) * 100}%`,
                      backgroundColor: getSpicyLevelColor(selectedSpicyLevel.id)
                    }}
                  >
                    <span className="thumb-label">{selectedSpicyLevel.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fixed Action Buttons */}
        <div className="spicy-modal-footer enhanced">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times me-2"></i>
            Cancel
          </button>
          <button 
            className="btn btn-primary spicy-confirm-btn"
            onClick={handleConfirm}
            style={{
              background: `linear-gradient(135deg, ${getSpicyLevelColor(selectedSpicyLevel.id)}, ${getSpicyLevelColor(Math.max(1, selectedSpicyLevel.id - 1))})`,
              borderColor: getSpicyLevelColor(selectedSpicyLevel.id)
            }}
          >
            <i className="fas fa-pepper-hot me-2"></i>
            Add {selectedSpicyLevel.name} Spice
          </button>
        </div>
      </div>
    </div>
  );
};



const LandingPage = () => {
  const [cart, setCart] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

// In your LandingPage component, add these state variables
const [activeCategory, setActiveCategory] = useState('appetizers');
const [hoveredCategory, setHoveredCategory] = useState(null);
const [categoryImage, setCategoryImage] = useState('img/appetizers.jpg');
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');

  // New state for spicy level modal
  const [showSpicyModal, setShowSpicyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);


  // Define your menu categories and items
const menuCategories = useMemo(() => [
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Crispy and flavorful starters',
    image: 'img/appetizers.jpg',
    icon: 'fas fa-utensils',
    items: menuItems.filter(item => item.category === 'appetizers')
  },
  {
    id: 'soups-salads',
    name: 'Soups & Salads',
    description: 'Fresh and comforting bowls',
    image: 'img/soups-salads.jpg',
    icon: 'fas fa-carrot',
    items: menuItems.filter(item => item.category === 'soups-salads')
  },
  {
    id: 'side-dishes',
    name: 'Side Dishes',
    description: 'Perfect accompaniments',
    image: 'img/side-dishes.jpg',
    icon: 'fas fa-hotdog',
    items: menuItems.filter(item => item.category === 'side-dishes')
  },
  {
    id: 'breads',
    name: 'Breads',
    description: 'Freshly baked traditional breads',
    image: 'img/breads.jpg',
    icon: 'fas fa-bread-slice',
    items: menuItems.filter(item => item.category === 'breads')
  },
  {
    id: 'tandoori',
    name: 'Tandoori Specialties',
    description: 'Clay oven marvels',
    image: 'img/tandoori.jpg',
    icon: 'fas fa-fire',
    items: menuItems.filter(item => item.category === 'tandoori')
  },
  {
    id: 'chicken',
    name: 'Chicken Dishes',
    description: 'Tender and flavorful chicken',
    image: 'img/chicken.jpg',
    icon: 'fas fa-drumstick-bite',
    items: menuItems.filter(item => item.category === 'chicken')
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Delights',
    description: 'Plant-based goodness',
    image: 'img/vegetarian.jpg',
    icon: 'fas fa-leaf',
    items: menuItems.filter(item => item.category === 'vegetarian')
  },
  {
    id: 'lamb',
    name: 'Lamb Specialties',
    description: 'Rich and aromatic lamb dishes',
    image: 'img/lamb.jpg',
     icon: 'fas fa-paw',
    items: menuItems.filter(item => item.category === 'lamb')
  },
  {
    id: 'seafood',
    name: 'Seafood',
    description: 'Fresh catches from the sea',
    image: 'img/seafood.jpg',
    icon: 'fas fa-fish',
    items: menuItems.filter(item => item.category === 'seafood')
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks',
    image: 'img/beverages.jpg',
    icon: 'fas fa-beer',
    items: menuItems.filter(item => item.category === 'beverages')
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings',
    image: 'img/desserts.jpg',
     icon: 'fas fa-ice-cream',
    items: menuItems.filter(item => item.category === 'desserts')
  }
], [menuItems]);


// Filter items based on search query
const filteredItems = menuCategories
  .find(c => c.id === activeCategory)
  ?.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item, spicyLevel = null) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((i) => 
      i.id === item.id && 
      (!item.hasSpicyOption || i.spicyLevel?.id === (spicyLevel?.id || 3)) // Default to Medium if no spicy level provided
    );
    
    if (existingItem) {
      return prevCart.map((i) =>
        i.id === item.id && 
        (!item.hasSpicyOption || i.spicyLevel?.id === (spicyLevel?.id || 3))
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    } else {
      const cartItem = {
        ...item,
        qty: 1,
        spicyLevel: item.hasSpicyOption ? (spicyLevel || spicyLevels[2]) : null // Default to Medium
      };
      return [...prevCart, cartItem];
    }
  });
};

// New function to handle spicy level selection
const handleAddWithSpicyLevel = (item) => {
  if (item.hasSpicyOption) {
    setSelectedItem(item);
    setShowSpicyModal(true);
  } else {
    addToCart(item);
  }
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

{/* <div className="container-xxl py-5" id="order">
  <div className="container">
    <div className="text-center">
      <h5 className="section-title ff-secondary text-center text-primary fw-normal">
        Food Menu
      </h5>
      <h1 className="mb-5">Most Popular Items</h1>
    </div>

    <div className="multi-row-scroll-section">
      <div className="scroll-rows-container">
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
</div> */}
// menu item ends


// checkout UI starts

// const [showCheckout, setShowCheckout] = useState(false);

// const handleCheckout = () => {
//   // Close the sidebar programmatically
//   const cartSidebar = document.getElementById('cartSidebar');
//   if (cartSidebar) {
//     const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartSidebar);
//     if (bsOffcanvas) bsOffcanvas.hide();
//   }
//   // Open the checkout modal
//   setShowCheckout(true);
// };

const [showSidebar, setShowSidebar] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);

const handleCheckout = () => {
  setShowSidebar(false);   // close sidebar
  setShowCheckout(true);   // open checkout modal
};



// Checkout UI Ends


// const [checkoutStep, setCheckoutStep] = useState(1);
const [deliveryAddress, setDeliveryAddress] = useState({
  name: '',
  mobile: '',
  address: 'Himayath Nagar, Hyderabad',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500081'
});
// const [paymentMethod, setPaymentMethod] = useState('');
const [upiId, setUpiId] = useState('');


const [checkoutStep, setCheckoutStep] = useState(1);
const [userLoggedIn, setUserLoggedIn] = useState(false);
const [noContactDelivery, setNoContactDelivery] = useState(true);
const [paymentMethod, setPaymentMethod] = useState('upi');


// Function to reset checkout state
const resetCheckoutState = () => {
  setCheckoutStep(1);
  setUserLoggedIn(false);
  setNoContactDelivery(true);
  setPaymentMethod('upi');
};


// Add this useEffect hook to your component
useEffect(() => {
  let scrollPosition = 0;
  
  if (showCheckout || showAddressForm) {
    // Save the current scroll position
    scrollPosition = window.scrollY;
    
    // Add the modal-open class to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Apply the scroll position to the body to maintain visual position
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    // Remove the modal-open class
    document.body.classList.remove('modal-open');
    
    // Get the saved scroll position
    const savedScrollPosition = parseInt(document.body.style.top || '0');
    
    // Restore the scroll position
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Scroll back to the original position
    window.scrollTo(0, Math.abs(savedScrollPosition));
  }
  
  return () => {
    // Cleanup on unmount
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  };
}, [showCheckout]);


// Function to handle closing the checkout modal
const handleCloseCheckout = () => {
  resetCheckoutState();
  setShowCheckout(false);
   document.body.classList.remove('modal-open');
};

// Function to handle successful order placement
// success placing order modal starts
const [showSuccessModal, setShowSuccessModal] = useState(false);
const handlePlaceOrder = () => {
  // Show success modal
  setShowSuccessModal(true);
  
  // Clear cart and reset checkout state after a delay
  setTimeout(() => {
    setCart([]);
    resetCheckoutState();
    setShowCheckout(false);
    
    // Hide success modal after animation completes
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  }, 2500); // Wait for the animation to complete before closing checkout
};


// Add this state variable to your component
const [showAddressForm, setShowAddressForm] = useState(false);
const [newAddress, setNewAddress] = useState({
  type: 'home',
  name: '',
  mobile: '',
  address: '',
  locality: '',
  city: '',
  state: '',
  pincode: '',
  landmark: ''
});

// Function to handle adding a new address
// const handleAddNewAddress = () => {
//   // Create a new address object with a unique ID
//   const newAddressToAdd = {
//     id: Date.now(), // Simple unique ID using timestamp
//     ...newAddress,
//     isDefault: false // New addresses are not default by default
//   };
  
//   // Add the new address to the saved addresses
//   setSavedAddresses(prevAddresses => [...prevAddresses, newAddressToAdd]);
  
//   // Select the new address
//   setSelectedAddressId(newAddressToAdd.id);
  
//   // Close the form and reset
//   setShowAddressForm(false);
//   setNewAddress({
//     type: 'home',
//     name: '',
//     mobile: '',
//     address: '',
//     locality: '',
//     city: '',
//     state: '',
//     pincode: '',
//     landmark: ''
//   });
  
//   // Optional: Show success message
//   alert('Address added successfully!');
// };

// Function to handle overlay click (close only when clicking outside form)
const handleOverlayClick = (e) => {
  if (e.target === e.currentTarget) {
    setShowAddressForm(false);
  }
};



const [savedAddresses, setSavedAddresses] = useState([
  {
    id: 1,
    type: 'home',
    name: 'John Doe',
    mobile: '9876543210',
    address: 'Himayath Nagar',
    locality: 'Himayath Nagar',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500029',
    landmark: 'Near Metro Station',
    isDefault: true
  },
  {
    id: 2,
    type: 'work',
    name: 'John Doe',
    mobile: '9876543210',
    address: 'Miracle Xprs',
    locality: 'Hi-Tech City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    landmark: 'Office Building',
    isDefault: false
  }
]);

const [selectedAddressId, setSelectedAddressId] = useState(1); // Default to home address

const selectedAddress = savedAddresses.find(address => address.id === selectedAddressId);
const [editingAddress, setEditingAddress] = useState(null);



// Handle adding a new address
const handleAddNewAddress = () => {
  const newAddressToAdd = {
    id: Date.now(),
    ...newAddress,
    isDefault: savedAddresses.length === 0 // Set as default if it's the first address
  };
  
  setSavedAddresses(prevAddresses => [...prevAddresses, newAddressToAdd]);
  setSelectedAddressId(newAddressToAdd.id);
  
  // Reset form and close
  setShowAddressForm(false);
  setNewAddress({
    type: 'home',
    name: '',
    mobile: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
};

// Handle updating an existing address
const handleUpdateAddress = () => {
  setSavedAddresses(prev => 
    prev.map(address => 
      address.id === editingAddress.id 
        ? { ...newAddress, id: editingAddress.id, isDefault: address.isDefault }
        : address
    )
  );
  
  // Reset form and close
  setShowAddressForm(false);
  setEditingAddress(null);
  setNewAddress({
    type: 'home',
    name: '',
    mobile: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
};

// Handle deleting an address
const handleDeleteAddress = (id) => {
  if (savedAddresses.length <= 1) {
    alert("You must have at least one address");
    return;
  }
  
  setSavedAddresses(prev => prev.filter(address => address.id !== id));
  
  // If deleting the selected address, select another one
  if (selectedAddressId === id) {
    const remainingAddress = savedAddresses.find(addr => addr.id !== id);
    if (remainingAddress) {
      setSelectedAddressId(remainingAddress.id);
    }
  }
};

// Handle setting an address as default
const handleSetDefaultAddress = (id) => {
  setSavedAddresses(prev => 
    prev.map(address => ({
      ...address,
      isDefault: address.id === id
    }))
  );
};

// Function to open edit form
const handleEditAddress = (address) => {
  setEditingAddress(address);
  setNewAddress({
    type: address.type,
    name: address.name,
    mobile: address.mobile,
    address: address.address,
    locality: address.locality,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    landmark: address.landmark || ''
  });
  setShowAddressForm(true);
};



// Add this helper function to your component
const getSpicyLevelColor = (level) => {
  const colors = [
    '#4CAF50', // Mild - Green
    '#8BC34A', // Mild Plus - Light Green
    '#FFC107', // Medium - Yellow
    '#FF9800', // Medium Plus - Orange
    '#F44336', // Hot - Red
    '#D32F2F'  // Extra Hot - Dark Red
  ];
  return colors[level - 1] || '#FFC107';
};


 // Admin functions
  const addMenuItem = (newItem) => {
    setMenuItems(prev => [...prev, newItem]);
  };

  const editMenuItem = (updatedItem) => {
    setMenuItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteMenuItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };


   // Add this to your navbar for admin access
  const adminButton = (
    <button
      className="btn btn-outline-primary py-2 px-3"
      onClick={() => setShowAdminPanel(true)}
      style={{ marginRight: "10px", borderRadius: "20px" }}
    >
      <i className="fas fa-cog me-1"></i> Admin
    </button>
  );

  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Parallax Hero Section */}
        <div className="container-xxl position-relative p-0 landing-container">
          <nav className="navbar position-fixed navbar-expand-lg navbar-dark px-4 py-3 nav-mobile nav-position">
            <div className="container-fluid glass-card nav-items py-lg-2">
              <Link to="/" className="navbar-brand p-0">
                <h1 className="text-primary m-0" style={{ fontSize: "28px" }}>
                  <i className="fa fa-utensils me-3"></i>SangEat
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
                    🛒{" "} <span className="badge bg-light text-dark">{cart.length}</span>
                  </button>
                  {/* Add Admin Button */}
                  {adminButton}
                </div>
              </div>
            </div>
          </nav>

          <div className="parallax-hero" id="home">
            <div
              className="parallax-layer parallax-back"
              data-depth="0.1"
            ></div>
            <div
              className="parallax-layer parallax-base"
              data-depth="0.5"
            ></div>
            <div
              className="parallax-layer parallax-front"
              data-depth="0.8"
            ></div>

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
                      Don't wait on hunger! Choose from our wide range of fast
                      food, desi specials, and healthy bites – delivered piping
                      hot in minutes.
                    </p>
                    <Link
                      to=""
                      className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                    >
                      Book A Table
                    </Link>
                  </div>
                  <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                    <img
                      className="img-fluid floating"
                      src="img/hero.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Section */}

        {/* <section className="">
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
        </section> */}

        {/* About Section with Parallax */}
        <div
          className="container-xxl py-5 parallax-about  service-section"
          id="about"
        >
          {/* <div className="parallax-about-bg"  data-depth="0.2"></div> */}
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
                <h5 className="section-title ff-secondary text-start text-primary fw-normal col-white">
                  About Us
                </h5>
                <h1 className="mb-4 col-white">
                  Welcome to{" "}
                  <i className="fa fa-utensils text-primary me-2"></i>
                  SangEat
                </h1>
                <h1 className="mb-4 col-white">
                  An Experience of Royal Indian Dining
                </h1>
                <div className="divider"></div>
                <p className="mb-4 col-white">
                  At SangEat, we bring the flavors of royal Indian cuisine to
                  your table. From fragrant biryanis to elaborate thalis, each
                  dish is a celebration of tradition, taste, and hospitality.
                </p>
                <p className="mb-4 col-white">
                  {" "}
                  Immerse yourself in an ambiance of elegance and cultural
                  richness — perfect for family gatherings, celebrations, or
                  simply treating yourself to authentic flavors.
                </p>
                <div className="divider"></div>
                <p className="mb-4 col-white">
                  {" "}
                  Every plate is carefully crafted using time-honored recipes
                  and the freshest ingredients to deliver a memorable dining
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
                        <p className="mb-0 col-white">Years of</p>
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
                        <p className="mb-0 col-white">Popular</p>
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
        {/* </div> */}

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

        {/* // Replace the existing menu section with this new implementation */}
<div className="container-fluid py-5" id="order">
  <div className="container-fluid">
    <div className="text-center mb-5">
      <h5 className="section-title ff-secondary text-center text-primary fw-normal">
        Food Menu
      </h5>
      <h1 className="mb-4">Explore Our Culinary Categories</h1>
      <p className="text-muted w-75 mx-auto d-none d-md-block">
        Discover our delicious offerings across various categories. Select a category to view our specialties.
      </p>
    </div>

    {/* Search bar for mobile */}
    <div className="row mb-4 d-lg-none">
      <div className="col-12">
        <div className="menu-search-container">
          <i className="fas fa-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>

    <div className="menu-container">
      {/* Mobile category tabs (horizontal scroll) */}
      <div className="d-lg-none mobile-category-tabs">
        <div className="category-scroll-container">
          {menuCategories.map(category => (
            <div
              key={category.id}
              className={`mobile-category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setCategoryImage(category.image);
              }}
            >
              <div className="tab-icon">
                <i className={category.icon}></i>
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-content-wrapper">
        {/* Desktop category sidebar */}
        <div className="category-sidebar d-none d-lg-block">
          <div className="search-container mb-3">
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          
          <div className="category-list">
            {menuCategories.map(category => (
              <MenuCategory
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCategoryImage(category.image);
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Menu items display */}
        <div className="menu-items-display">
          <div className="category-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2>{menuCategories.find(c => c.id === activeCategory)?.name}</h2>
                <p className="text-muted category-description">
                  {menuCategories.find(c => c.id === activeCategory)?.description}
                </p>
              </div>
              <div className="item-count">
                {filteredItems.length} items
              </div>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="menu-items-grid">
              {filteredItems.map(item => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  cart={cart} 
                  addToCart={addToCart} 
                  setCart={setCart} 
                  onAddWithSpicyLevel={handleAddWithSpicyLevel}
                />
              ))}
            </div>
          ) : (
            <div className="no-items-found">
              <i className="fas fa-search fa-3x mb-3"></i>
              <h4>No items found</h4>
              <p className="text-muted">
                {searchQuery 
                  ? `No items match "${searchQuery}" in this category` 
                  : 'No items available in this category'
                }
              </p>
              {searchQuery && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Floating View Cart Button */}
    {cart.length > 0 && (
      <div className="floating-cart-btn-container">
        <button
          className="btn btn-primary floating-cart-btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartSidebar"
        >
          <span className="cart-icon"><i class="fas fa-shopping-cart"></i></span>
          <span className="cart-text">View Cart</span>
          <span className="cart-count-badge">{cart.length}</span>
        </button>
      </div>
    )}
  </div>
</div>


{/* Add the Spicy Level Modal */}
      <SpicyLevelModal
        show={showSpicyModal}
        onClose={() => setShowSpicyModal(false)}
        item={selectedItem}
        onConfirm={(spicyLevel) => {
          if (selectedItem) {
            addToCart(selectedItem, spicyLevel);
          }
        }}
      />



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
                  <div key={`${item.id}-${item.spicyLevel?.id || 'default'}`} className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        {item.spicyLevel && (
                          <small className="text-warning">
                            <i className="fas fa-pepper-hot"></i> {item.spicyLevel.name}
                          </small>
                        )}
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
                  <button className="btn btn-primary w-100 mt-3"  data-bs-dismiss="offcanvas" onClick={() => {
                      resetCheckoutState();
                      setShowCheckout(true);
                    }}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* // Update your checkout modal JSX */}
        {showCheckout && (
          <div
            className="modal fade show d-block checkout-modal"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div
              className="modal-dialog modal-xl modal-dialog-centered"
              role="document"
              style={{ maxWidth: "1100px" }}
            >
              <div
                className="modal-content"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  maxHeight: "90vh",
                }}
              >
                {/* Header with Animated Timeline */}
                <div className="modal-header position-relative border-0 pb-0 pt-4">
                  <div className="w-100 timeline-border">
                    {/* Animated Timeline */}
                    <div className="animated-timeline mb-4">
                      <div className="timeline-container">
                        <div
                          className="timeline-progress"
                          style={{
                            width:
                              checkoutStep === 1
                                ? "0%"
                                : checkoutStep === 2
                                ? "50%"
                                : "100%",
                          }}
                        ></div>
                        <div
                          className={`timeline-step ${
                            checkoutStep >= 1 ? "active" : ""
                          }`}
                          onClick={() => setCheckoutStep(1)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="step-bubble">
                            {checkoutStep > 1 ? (
                              <i className="fas fa-check"></i>
                            ) : (
                              <span>1</span>
                            )}
                          </div>
                          <div className="step-label">Account</div>
                        </div>
                        <div
                          className={`timeline-step ${
                            checkoutStep >= 2 ? "active" : ""
                          }`}
                          onClick={() => checkoutStep > 1 && setCheckoutStep(2)}
                          style={{
                            cursor: checkoutStep > 1 ? "pointer" : "default",
                          }}
                        >
                          <div className="step-bubble">
                            {checkoutStep > 2 ? (
                              <i className="fas fa-check"></i>
                            ) : (
                              <span>2</span>
                            )}
                          </div>
                          <div className="step-label">Address</div>
                        </div>
                        <div
                          className={`timeline-step ${
                            checkoutStep >= 3 ? "active" : ""
                          }`}
                          onClick={() => checkoutStep > 2 && setCheckoutStep(3)}
                          style={{
                            cursor: checkoutStep > 2 ? "pointer" : "default",
                          }}
                        >
                          <div className="step-bubble">
                            <span>3</span>
                          </div>
                          <div className="step-label">Payment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "15px", right: "15px" }}
                    onClick={handleCloseCheckout}
                  ></button>
                </div>

                <div className="modal-body p-0" style={{ overflowY: "auto" }}>
                  <div className="row g-0">
                    {/* Left Column - Checkout Process */}
                    <div
                      className="col-md-7 p-4"
                      style={{ borderRight: "1px solid #eee" }}
                    >
                      {/* Step 1: Login/Signup */}
                      {/* Step 1: Login/Signup */}
                      {checkoutStep === 1 && (
                        <div className="checkout-step animate-fade-in">
                          {/* <div className="text-center mb-5">
      <div className="mb-4">
        <div className="auth-icon-container mb-3">
          <i className="fas fa-user-circle auth-main-icon"></i>
        </div>
        <h3 className="fw-bold text-gradient">Welcome to Sang Eats</h3>
        <p className="text-muted">Sign in or create an account to continue with your order</p>
      </div>
    </div> */}

                          <div className="row g-4">
                            {/* Login Section */}
                            <div className="col-lg-6">
                              <div className="auth-card card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body p-2 text-center">
                                  <div className="auth-icon mb-4">
                                    <i className="fas fa-sign-in-alt"></i>
                                  </div>
                                  <h5 className="card-title mb-3">
                                    Existing Customer
                                  </h5>
                                  <p className="text-muted small mb-4">
                                    Welcome back! Sign in to your account
                                  </p>

                                  <div className="mb-4">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="mobileNumber"
                                        placeholder="9876543210"
                                      />
                                      <label htmlFor="loginEmail">
                                        Mobile Number
                                      </label>
                                    </div>

                                    <div className="form-check text-start mb-3">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="rememberMe"
                                      />
                                      <label
                                        className="form-check-label small"
                                        htmlFor="rememberMe"
                                      >
                                        Remember me
                                      </label>
                                    </div>
                                  </div>

                                  <button
                                    className="btn btn-primary w-100 py-3 mb-3 fw-bold"
                                    onClick={() => {
                                      setUserLoggedIn(true);
                                      setCheckoutStep(2);
                                    }}
                                  >
                                    SIGN IN
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Signup Section */}
                            <div className="col-lg-6">
                              <div className="auth-card card h-100 border-0 shadow-sm hover-lift">
                                <div className="card-body p-2 text-center">
                                  <div className="auth-icon mb-4">
                                    <i className="fas fa-user-plus"></i>
                                  </div>
                                  <h5 className="card-title mb-3">
                                    New Customer
                                  </h5>
                                  <p className="text-muted small mb-4">
                                    Create an account for faster checkout and
                                    order tracking
                                  </p>

                                  <div className="mb-4">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="signUpMobileNummber"
                                        placeholder="9876543210"
                                      />
                                      <label htmlFor="signupPassword">
                                        Mobile Number
                                      </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="signupName"
                                        placeholder="Name"
                                      />
                                      <label htmlFor="signupName"> Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="signupEmail"
                                        placeholder="name@example.com"
                                      />
                <label htmlFor="signupEmail">Email address</label>
                                    </div>
                                  </div>

                                  <div className="form-check text-start mb-4">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="termsAgree"
                                    />
                                    <label
                                      className="form-check-label small"
                                      htmlFor="termsAgree"
                                    >
                                      I agree to the{" "}
                                      <a
                                        href="#terms"
                                        className="text-decoration-none"
                                      >
                                        Terms of Service
                                      </a>{" "}
                                      and{" "}
                                      <a
                                        href="#privacy"
                                        className="text-decoration-none"
                                      >
                                        Privacy Policy
                                      </a>
                                    </label>
                                  </div>

                                  <button
                                    className="btn btn-success w-100 py-3 fw-bold"
                                    onClick={() => {
                                      setUserLoggedIn(true);
                                      setCheckoutStep(2);
                                    }}
                                  >
                                    CREATE ACCOUNT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="divider my-5">
                            <span className="px-3 bg-white text-muted">or</span>
                          </div>

                          {/* Social Login */}
                          <div className="text-center mb-4">
                            <h6 className="mb-3">Quick sign in with</h6>
                            <div className="d-flex justify-content-center gap-3 mb-4">
                              <button className="btn btn-outline-secondary rounded-circle social-btn">
                                <i className="fab fa-google"></i>
                              </button>
                              <button className="btn btn-outline-secondary rounded-circle social-btn">
                                <i className="fab fa-facebook-f"></i>
                              </button>
                              <button className="btn btn-outline-secondary rounded-circle social-btn">
                                <i className="fab fa-apple"></i>
                              </button>
                            </div>
                          </div>

                          {/* Guest Checkout */}
                          <div className="guest-option text-center">
                            <button
                              className="btn btn-outline-primary px-5 py-2"
                              onClick={() => {
                                setUserLoggedIn(false);
                                setCheckoutStep(2);
                              }}
                            >
                              <i className="fas fa-shopping-bag me-2"></i>
                              Continue as Guest
                            </button>
                            <p className="text-muted small mt-2">
        You can create an account later with your order details
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Delivery Address */}
                      {checkoutStep === 2 && (
                        <div className="checkout-step animate-fade-in">
                          <h5 className="mb-4 fw-bold">Delivery Options</h5>

                          {/* Self Pickup Option */}
                          <div className="delivery-options mb-4">
                            <div className={`delivery-option-card  ${selectedAddressId === 'self-pickup' ? 'active' : ''}`}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="deliveryOption"
                                  id="selfPickup"
                                  checked={selectedAddressId === 'self-pickup'}
                                  onChange={() => setSelectedAddressId('self-pickup')}
                                />
                                <label className="form-check-label w-100" htmlFor="selfPickup">
                                  <div className="d-flex align-items-center">
                                    <div className="delivery-icon">
                                      <i className="fas fa-store"></i>
                                    </div>
                                    <div className="ms-3">
                                      <strong>Self Pickup</strong>
                                      <p className="mb-0 small text-muted">
                                        Pick up your order from our restaurant
                                      </p>
                                      <div className="pickup-info mt-2">
                                        <p className="mb-1 small">
                                          <i className="fas fa-map-marker-alt text-primary me-2"></i>
                                          123 Restaurant Street, Food City, FC 12345
                                        </p>
                                        <p className="mb-0 small text-muted">
                                          <i className="fas fa-clock text-primary me-2"></i>
                                          Ready in 20-30 minutes
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>

                            <div className={`delivery-option-card ${selectedAddressId !== 'self-pickup' ? 'active' : ''}`}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="deliveryOption"
                                  id="homeDelivery"
                                  checked={selectedAddressId !== 'self-pickup'}
                                  onChange={() => setSelectedAddressId(savedAddresses[0]?.id || 1)}
                                />
                                <label className="form-check-label w-100" htmlFor="homeDelivery">
                                  <div className="d-flex align-items-center">
                                    <div className="delivery-icon">
                                      <i className="fas fa-truck"></i>
                                    </div>
                                    <div className="ms-3">
                                      <strong>Home Delivery</strong>
                                      <p className="mb-0 small text-muted">
                                        Get your order delivered to your address
                                      </p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Address Selection (Only show for home delivery) */}
                          {selectedAddressId !== 'self-pickup' && (
                            <div className="saved-addresses mb-4">
                              <h6 className="mb-3">Select Delivery Address</h6>
                              {savedAddresses.map((address) => (
                                <div
                                  key={address.id}
                                  className={`address-card ${selectedAddressId === address.id ? 'active' : ''}`}
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="address"
                                      id={`address-${address.id}`}
                                      checked={selectedAddressId === address.id}
                                      onChange={() => setSelectedAddressId(address.id)}
                                    />
                                    <label
                                      className="form-check-label w-100"
                                      htmlFor={`address-${address.id}`}
                                    >
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                          <strong className="text-capitalize">
                                            {address.type}
                                          </strong>
                                          {address.isDefault && (
                                            <span className="badge bg-primary ms-2">Default</span>
                                          )}
                                        </div>
                                        <div className="address-actions">
                                          <button
                                            className="btn btn-sm btn-outline-secondary me-1"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditAddress(address);
                                            }}
                                            title="Edit address"
                                          >
                                            <i className="fas fa-edit"></i>
                                          </button>
                                          {!address.isDefault && (
                                            <button
                                              className="btn btn-sm btn-outline-danger"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm("Are you sure you want to delete this address?")) {
                                                  handleDeleteAddress(address.id);
                                                }
                                              }}
                                              title="Delete address"
                                            >
                                              <i className="fas fa-trash"></i>
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      <p className="mb-1 mt-2">{address.name} • {address.mobile}</p>
                                      <p className="mb-0 text-muted small">
                                        {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}
                                        {address.landmark && `, Landmark: ${address.landmark}`}
                                      </p>

                                      {!address.isDefault && (
                                        <div className="mt-2">
                                          <button
                                            className="btn btn-sm btn-link p-0 text-primary"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSetDefaultAddress(address.id);
                                            }}
                                          >
                                            Set as default
                                          </button>
                                        </div>
                                      )}
                                    </label>
                                  </div>
                                </div>
                              ))}

                              <button
                                className="btn btn-outline-primary w-100 mt-3"
                                onClick={() => {
                                  setEditingAddress(null);
                                  setNewAddress({
                                    type: "home",
                                    name: "",
                                    mobile: "",
                                    address: "",
                                    locality: "",
                                    city: "",
                                    state: "",
                                    pincode: "",
                                    landmark: "",
                                  });
                                  setShowAddressForm(true);
                                }}
                              >
                                <i className="fas fa-plus me-2"></i>Add New Address
                              </button>
                            </div>
                          )}

                          {/* Self Pickup Instructions */}
                          {selectedAddressId === 'self-pickup' && (
                            <div className="self-pickup-info mb-4 p-3 bg-light rounded">
                              <h6 className="mb-2">
                                <i className="fas fa-info-circle text-primary me-2"></i>
                                Self Pickup Instructions
                              </h6>
                              <ul className="small mb-0">
                                <li>Your order will be ready in 20-30 minutes</li>
                                <li>Please bring your order confirmation</li>
                                <li>Parking available in the rear lot</li>
                                <li>Look for the "Pickup Counter" inside</li>
                              </ul>
                            </div>
                          )}

                          {/* No-contact delivery option (Only show for home delivery) */}
                          {selectedAddressId !== 'self-pickup' && (
                            <div className="no-contact-delivery mb-4">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="noContactDelivery"
                                  checked={noContactDelivery}
                                  onChange={(e) => setNoContactDelivery(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="noContactDelivery">
                                  <strong>Opt in for No-contact Delivery</strong>
                                  <p className="mb-0 small text-muted">
                                    Unwell, or avoiding contact? Please select no-contact delivery. 
                                    Partner will safely place the order outside your door (not for COD)
                                  </p>
                                </label>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between mt-4">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => setCheckoutStep(1)}
                            >
                              Back
                            </button>
                            <button
                              className="btn btn-primary px-4"
                              onClick={() => setCheckoutStep(3)}
                            >
                              Continue to Payment
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Payment */}
                      {checkoutStep === 3 && (
                        <div className="checkout-step animate-fade-in">
                          <h5 className="mb-4 fw-bold">Payment</h5>

                          {/* Payment Methods */}
                          <div className="payment-methods mb-4">
                            <h6 className="mb-3">Select payment method</h6>

                            <div
                              className={`payment-option-card mb-2 ${
                                paymentMethod === "upi" ? "active" : ""
                              }`}
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentMethod"
                                  id="upiPayment"
                                  checked={paymentMethod === "upi"}
                                  onChange={() => setPaymentMethod("upi")}
                                />
                        <label className="form-check-label w-100" htmlFor="upiPayment">
                                  <div className="d-flex align-items-center">
                                    <div className="payment-icon">
                                      <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="ms-3">
                                      <strong>UPI</strong>
                              <p className="mb-0 small text-muted">Pay using UPI apps</p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>

                            <div
                              className={`payment-option-card mb-2 ${
                                paymentMethod === "card" ? "active" : ""
                              }`}
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentMethod"
                                  id="cardPayment"
                                  checked={paymentMethod === "card"}
                                  onChange={() => setPaymentMethod("card")}
                                />
                        <label className="form-check-label w-100" htmlFor="cardPayment">
                                  <div className="d-flex align-items-center">
                                    <div className="payment-icon">
                                      <i className="far fa-credit-card"></i>
                                    </div>
                                    <div className="ms-3">
                                      <strong>Credit/Debit Card</strong>
                              <p className="mb-0 small text-muted">Add and secure your card as per RBI guidelines</p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>

                    <div className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentMethod"
                                  id="codPayment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                                />
                        <label className="form-check-label w-100" htmlFor="codPayment">
                                  <div className="d-flex align-items-center">
                                    <div className="payment-icon">
                                      <i className="fas fa-money-bill-wave"></i>
                                    </div>
                                    <div className="ms-3">
                                      <strong>Cash on Delivery</strong>
                              <p className="mb-0 small text-muted">Pay when you receive the order</p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Suggestions */}
                          <div className="suggestions mb-4">
                    <h6 className="mb-3">Any suggestions? We will pass it on...</h6>
                            <textarea
                              className="form-control"
                              placeholder="Add preparation instructions (if any)"
                              rows="3"
                            ></textarea>
                          </div>

                          <div className="d-flex justify-content-between mt-4">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => setCheckoutStep(2)}
                            >
                              Back
                            </button>
                            <button
                              className="btn btn-success px-4 py-2 fw-bold"
                              onClick={handlePlaceOrder}
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Order Summary */}
<div className="col-md-5 p-4" style={{ backgroundColor: '#f8f9fa' }}>
  <div className="sticky-top" style={{ top: '20px' }}>
    <h5 className="mb-4 fw-bold">Order Summary</h5>

    <div className="order-items mb-4">
      {cart.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={`${item.id}-${item.spicyLevel?.id || 'default'}-${index}`} className="order-item-card mb-3 p-3">
            <div className="row align-items-center">
              <div className="col-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded w-100"
                  style={{ height: "60px", objectFit: "cover" }}
                />
              </div>
              <div className="col-9">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h6 className="mb-0">{item.name}</h6>
                  <span className="text-primary fw-bold">₹{item.price}</span>
                </div>
                
                {/* SPICY LEVEL BADGE - This should appear for each item */}
                {item.spicyLevel && (
                  <div className="mb-2">
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: getSpicyLevelColor(item.spicyLevel.id),
                        color: 'white',
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.5rem'
                      }}
                    >
                      <i className="fas fa-pepper-hot me-1"></i>
                      {item.spicyLevel.name} Spice
                    </span>
                  </div>
                )}
                
                <div className="d-flex justify-content-between align-items-center">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        setCart((prevCart) =>
                          prevCart
                            .map((i) =>
                              i.id === item.id ? { ...i, qty: i.qty - 1 } : i
                            )
                            .filter((i) => i.qty > 0)
                        )
                      }
                    >
                      -
                    </button>
                    <span className="mx-2 fw-bold">{item.qty}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => addToCart(item, item.spicyLevel)}
                    >
                      +
                    </button>
                  </div>
                  <span className="fw-bold">₹{item.price * item.qty}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Rest of the bill details remains the same */}
    <div className="bill-details-card">
      <h6 className="mb-3 fw-bold">Bill Details</h6>
      <div className="bill-item d-flex justify-content-between mb-2">
        <span>Item Total</span>
        <span>₹{total}</span>
      </div>
      <div className="bill-item d-flex justify-content-between mb-2">
        <span>Delivery Fee | 6.0 kms</span>
        <span className="text-success">₹30</span>
      </div>
      <div className="bill-item d-flex justify-content-between mb-2">
        <span>GST & Restaurant Charges</span>
        <span>₹{Math.round(total * 0.05)}</span>
      </div>
      <hr />
      <div className="bill-total d-flex justify-content-between fw-bold fs-5 mb-3">
        <span>TO PAY</span>
        <span>₹{total + 30 + Math.round(total * 0.05)}</span>
      </div>
      {checkoutStep === 3 && (
        <button className="btn btn-success w-100 py-3 fw-bold" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  </div>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* // Add the address form modal right after the address cards section */}
        {showAddressForm && (
          <div className="address-form-modal" onClick={handleOverlayClick}>
            <div
              className="address-form-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="address-form-header">
                <h5>{editingAddress ? "Edit Address" : "Add New Address"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                    setNewAddress({
                      type: "home",
                      name: "",
                      mobile: "",
                      address: "",
                      locality: "",
                      city: "",
                      state: "",
                      pincode: "",
                      landmark: "",
                    });
                  }}
                ></button>
              </div>

              <div className="address-form-body">
                <div className="address-type-selector mb-3">
                  <label className="form-label">Address Type</label>
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className={`btn ${
                        newAddress.type === "home"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() =>
                        setNewAddress({ ...newAddress, type: "home" })
                      }
                    >
                      <i className="fas fa-home me-2"></i>Home
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        newAddress.type === "work"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() =>
                        setNewAddress({ ...newAddress, type: "work" })
                      }
                    >
                      <i className="fas fa-building me-2"></i>Work
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        newAddress.type === "other"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() =>
                        setNewAddress({ ...newAddress, type: "other" })
                      }
                    >
                      <i className="fas fa-map-marker-alt me-2"></i>Other
                    </button>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, name: e.target.value })
                        }
                      />
                      <label htmlFor="fullName">Full Name *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        value={newAddress.mobile}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            mobile: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="mobileNumber">Mobile Number *</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="flatHouseNo"
                        placeholder="Flat, House no., Building, Company, Apartment"
                        value={newAddress.address}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            address: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="flatHouseNo">
                        Flat, House no., Building, Company, Apartment *
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="areaLocality"
                        placeholder="Area, Locality"
                        value={newAddress.locality}
                        onChange={(e) => setNewAddress({...newAddress, locality: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="areaLocality">Area, Locality *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      />
                      <label htmlFor="city">City *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="state">State *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="pincode">Pincode *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        placeholder="Landmark (Optional)"
                        value={newAddress.landmark}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            landmark: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="landmark">Landmark (Optional)</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="address-form-footer">
                {/* {editingAddress && (
          <button 
            type="button" 
            className="btn btn-danger me-auto"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this address?')) {
                handleDeleteAddress(editingAddress.id);
                setShowAddressForm(false);
                setEditingAddress(null);
              }
            }}
          >
            <i className="fas fa-trash me-2"></i>Delete
          </button>
        )} */}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                    setNewAddress({
                      type: "home",
                      name: "",
                      mobile: "",
                      address: "",
                      locality: "",
                      city: "",
                      state: "",
                      pincode: "",
                      landmark: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    editingAddress ? handleUpdateAddress : handleAddNewAddress
                  }
                  disabled={
                    !newAddress.name ||
                    !newAddress.mobile ||
                    !newAddress.address ||
                    !newAddress.locality ||
                    !newAddress.city ||
                    !newAddress.state ||
                    !newAddress.pincode
                  }
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </div>
        )}


{/* Success Modal */}
{showSuccessModal && (
  <div className="success-modal-overlay">
    <div className="success-modal">
      <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        
        <div className="confetti">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="confetti-piece"></div>
          ))}
        </div>
        
        <div className="success-icon">
          <i className="fas fa-utensils"></i>
        </div>
      </div>
      
      <div className="success-content">
        <h3>Order Placed Successfully!</h3>
        <p>Your delicious food is being prepared. You'll receive a confirmation shortly.</p>
        
        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order ID:</span>
            <span className="value">#{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Estimated Delivery:</span>
            <span className="value">30-45 minutes</span>
          </div>
          <div className="detail-item">
            <span className="label">Total Amount:</span>
            <span className="value">₹{total + 30 + Math.round(total * 0.05)}</span>
          </div>
        </div>
      </div>
      
      <div className="success-actions">
        <button 
          className="btn btn-primary"
          onClick={() => setShowSuccessModal(false)}
        >
          Track My Order
        </button>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => setShowSuccessModal(false)}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
)}



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
              <p className="w-75 mx-auto mb-5">
                Hear from our satisfied customers about their dining experience
                at SangEat
              </p>
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
                        The food at SangEat is absolutely incredible! The
                        flavors are authentic and every dish tells a story. The
                        Chicken Tikka was perfectly spiced and cooked to
                        perfection.
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
                        I've been to many Indian restaurants, but SangEat stands
                        out with its exceptional service and authentic flavors.
                        The Brioche Omelette is now my weekend favorite!
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
                        The ambiance and food quality make SangEat perfect for
                        family dinners. We celebrated my daughter's birthday
                        here and the staff went above and beyond to make it
                        special.
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
                        As someone from India, I can attest to the authenticity
                        of the flavors at SangEat. Their Signature Roast Chicken
                        Superbow reminds me of home. Highly recommended!
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
                  &copy; <Link to="/">SangEat</Link>, All Right Reserved.
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

         {/* Admin Panel Modal */}
        {showAdminPanel && (
          <AdminPanel
            menuItems={menuItems}
            onAddItem={addMenuItem}
            onEditItem={editMenuItem}
            onDeleteItem={deleteMenuItem}
            onClose={() => setShowAdminPanel(false)}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;