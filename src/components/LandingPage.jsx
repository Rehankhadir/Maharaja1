import React, { useState, useEffect, useMemo, useRef } from "react";
import './LandingPage.css';
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


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
  { id: 1, name: "Root & leaf samosa", price: 5.99, img: "img/samosa.jpg", hasSpicyOption: false, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 2, name: "Chef’s blend pakora", price: 5.99, img: "img/pakora.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 3, name: "Crispy golden aloo tikki", price: 5.99, img: "img/alootikki.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 4, name: "Gilded paneer Pakora", price: 7.99, img: "img/paneerpakora.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 5, name: "Cauliflower Cloud Fritters", price: 6.99, img: "img/cauliflower-fritter.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 6, name: "Herb & Spice Marinated Chicken Pakora", price: 7.99, img: "img/chicken-pakora.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 7, name: "Chef's crafted chat samosa ", price: 6.99, img: "img/samosa-chaat.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 8, name: "Chef’s crafted chat tikki", price: 6.99, img: "img/chaat-tikki.webp", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 9, name: "Mixed platter", price: 8.99, img: "img/platter.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 10, name: "Gourmet Chili Gobi", price: 9.99, img: "img/gobi-chilli.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 11, name: "Spiced chicken 65*", price: 9.99, img: "img/chicken65.jpeg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 12, name: "Wedge potato ", price: 5.99, img: "img/potato-wedges.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 13, name: "Masala papad", price: 4.99, img: "img/masala-papad.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 14, name: "Papdi chat", price: 6.99, img: "img/Papdi-Chat.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 15, name: "Heirloom Tomato soup", price: 5.99, img: "img/Heirloom-Tomato-Soup.jpg", hasSpicyOption: true, category: "soups",ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 16, name: "Lemon & Herb Infused Chicken Soup", price: 5.99, img: "img/Lemon-Herb-Infused-Chicken-Soup.webp", hasSpicyOption: true, category: "soups", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 17, name: "Artisanal Lentil Soup", price: 5.99, img: "img/lentil-soup.webp", hasSpicyOption: true, category: "soups", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 18, name: "Hot & sour soup ", price: 5.99, img: "img/Hot-and-sour-soup.webp", hasSpicyOption: true, category: "soups", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 19, name: "South touch sambar soup", price: 5.99, img: "img/South-Indian-Sambar.jpg", hasSpicyOption: true, category: "soups", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 20, name: "Tandoor-Kissed Naan", price: 2.99, img: "img/tandoor-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 21, name: "Garlic butter naan", price: 3.99, img: "img/garlic-butternaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 22, name: "Butter Roti", price: 2.99, img: "img/butter-roti.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 23, name: "Tandoor-Baked Onion Naan ", price: 3.99, img: "img/onion-naan.webp", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 24, name: "The Royal Paneer Naan", price: 3.99, img: "img/paneer-naan.webp", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 25, name: "Amritsari Aloo Kulcha", price: 3.99, img: "img/aloo-kulcha.webp", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 26, name: "Chef special naan ", price: 4.99, img: "img/special-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 27, name: "Peshwari Naan", price: 4.99, img: "img/peshwari-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 28, name: "Keema Naan", price: 4.99, img: "img/keema-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 29, name: "Spiced chilli Naan", price: 3.99, img: "img/chilli-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 30, name: "Veggie pulao", price: 15.99, img: "img/veg-pulao.webp", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 31, name: "Chicken biryani", price: 15.99, img: "img/Chicken-Biryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 32, name: "Lamb biryani", price: 16.99, img: "img/Lamb-Biryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 33, name: "Chef special Goat biryani", price: 16.99, img: "img/goat-biryani.webp", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 34, name: "Shrimp Briyani", price: 16.99, img: "img/shrimp-Biryani.webp", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 35, name: "Royal biryani", price: 16.99, img: "img/royal-biryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 36, name: "Jira Rice", price: 6.99, img: "img/jeera-rice.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},

  { id: 37, name: "Veggie jalfrezi", price: 14.99, img: "img/vegetable-jalfrezi.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 38, name: "Spiced Blossom (Aloo Gobi)", price: 14.99, img: "img/Aloo-Gobi.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 39, name: "Classic punjabi dal Tadka", price: 14.99, img: "img/dal-tadka.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 40, name: "House-Spiced Dal Makhani", price: 14.99, img: "img/Dal-Makhani.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 41, name: "Punjab's Finest Chana Masala", price: 14.99, img: "img/chana-masala.webp", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 42, name: "Bindi masala Punjabi style", price: 14.99, img: "img/bhindi-masala.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 43, name: "From the Fire ( baigan ka bartha )", price: 14.99, img: "img/baigan-bharta.webp", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 44, name: "Chef special malai kofta ", price: 14.99, img: "img/Malai-Kofta.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 45, name: "Navratan korma ", price: 14.99, img: "img/navratan-korma.webp", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 46, name: "Palak Chole, Punjabi Style", price: 14.99, img: "img/PalakChole.webp", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 47, name: "Creamy aloo saag ", price: 14.99, img: "img/Saag-Aloo.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 48, name: "Aromatic Mushroom & Saag", price: 14.99, img: "img/mashroom-saag.jpeg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 49, name: "Restaurant Style Aloo mutter", price: 14.99, img: "img/aloo-matar.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 50, name: "Punjabi Kadhi, Aromatic & Creamy", price: 14.99, img: "img/punjabi-kadhi.webp", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 51, name: "Veggie makhni", price: 14.99, img: "img/veg-makhni.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },

  { id: 52, name: "Royal Paneer butter masala", price: 15.99, img: "img/paneer-butter-masala.webp", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 53, name: "Signature Palak Paneer", price: 15.99, img: "img/palak-paneer.webp", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 54, name: "Paneer Bhurji Nawabi", price: 15.99, img: "img/Paneer-Bhurji.webp", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 55, name: "The Paneer Kadai", price: 15.99, img: "img/Kadai-Paneer.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 56, name: "Chef's Special Paneer Tikka Masala", price: 15.99, img: "img/paneer-tikkamasala.webp", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 57, name: "Shahi mutter Paneer", price: 15.99, img: "img/shahi-matar-paneer.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 58, name: "Kajju Butter Masala", price: 15.99, img: "img/kaju-butter-masala.webp", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 59, name: "Paneer Angara", price: 15.99, img: "img/paneer-angara.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },

  { id: 60, name: "Gourmet Chicken Tikka Masala", price: 15.99, img: "img/chickken-tikkka-masala.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 61, name: "Royal butter chicken", price: 15.99, img: "img/butter-chicken.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 62, name: "Authentic chicken curry ", price: 15.99, img: "img/Chicken-Curry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 63, name: "Shahi chicken korma", price: 15.99, img: "img/shahi-chicken-korma.webp", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 64, name: "Spiced & tangy Chicken vindaloo", price: 15.99, img: "img/chicken-vindaloo.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 65, name: "The chicken kadai ", price: 15.99, img: "img/kadai-chicken.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 66, name: "Punjab’s finest chicken saag ", price: 15.99, img: "img/Chicken-Saag.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 67, name: "Chicken jalfrezi", price: 15.99, img: "img/Chicken-Jalfrezi.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 68, name: "Chicken leg lovers (curry style)", price: 15.99, img: "img/Chicken-leg-curry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 69, name: "Aromatic Chicken Rogani", price: 15.99, img: "img/chicken-rogan.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 70, name: "Fine Egg curry", price: 14.99, img: "img/egg-curry.webp", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 71, name: "Coconut-Kissed Chicken Madras", price: 15.99, img: "img/chicken-madras.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 72, name: "Fiery Angara Chicken with Aromatic Herbs", price: 15.99, img: "img/angara-chicken.webp", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 73, name: "Chicken pasanda", price: 15.99, img: "img/chicken-pasanda.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 74, name: "Chef's Special Kashmiri Chicken", price: 15.99, img: "img/kashmiri-chicken.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 75, name: "Mango chicken masala", price: 15.99, img: "img/Mango-Chicken-Curry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },



  { id: 76, name: "Authentic lamb curry ", price: 16.99, img: "img/lamb-curry.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 77, name: "Gourmet lamb tikka masala ", price: 16.99, img: "img/LambTikkaMasala.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 78, name: "Butter lamb ", price: 16.99, img: "img/butter-lamb.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 79, name: "Buna gost", price: 16.99, img: "img/Bhuna-Mutton.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 80, name: "Lamb psanda ", price: 16.99, img: "img/Lamb_Pasanda.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 81, name: "Lamb kadai ", price: 16.99, img: "img/lamb-karahi.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 82, name: "Lamb rogan josh ", price: 16.99, img: "img/lamb-rogan-josh.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 83, name: "Lamb korma ", price: 16.99, img: "img/lamb-kkorma.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 84, name: "Lamb saag", price: 16.99, img: "img/lamb-saag.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 85, name: "Lamb angara", price: 16.99, img: "img/lamb-angara.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 86, name: "Goat curry", price: 16.99, img: "img/goat-mutton-curry.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},


  { id: 87, name: "Tandoori chicken(6)", price: 16.99, img: "img/Chicken-Tandoori.webp", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 88, name: "Chicken tikka", price: 16.99, img: "img/chickentikka.webp", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 89, name: "Seekh kabab", price: 16.99, img: "img/seekh-kabab.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 90, name: "tandoori fish ", price: 16.99, img: "img/tandoori-fish.jpeg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 91, name: "Tandoori shrimp", price: 16.99, img: "img/tandoori-shrimp.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 92, name: "Mix Grill ", price: 17.99, img: "img/tandoori-mix-grill.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 93, name: "Malai kabab", price: 15.99, img: "img/malai-kabab.webp", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 94, name: "Lamb chop", price: 21.99, img: "img/lamb-chops.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},


  { id: 95, name: "Fish or shrimp curry ", price: 16.99, img: "img/fish-curry.jpg", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 96, name: "Fish or shrimp tikka masala ", price: 16.99, img: "img/Fish-Tikka-Masala.jpg", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 97, name: "Butter shrimp or fish ", price: 16.99, img: "img/butter-fish.webp", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 98, name: "Fish or shrimp vindaloo", price: 16.99, img: "img/fish-vindaloo.webp", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 99, name: "Fish or shrimp saag", price: 16.99, img: "img/Fish-Sagwala.jpg", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 100, name: "Fish or shrimp korma ", price: 16.99, img: "img/fish-korma.webp", hasSpicyOption: true, category: "seafood", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},



  { id: 101, name: "Chilli paneer", price: 16.99, img: "img/chilli-paneer.jpg", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 102, name: "Vegi manchurian", price: 16.99, img: "img/veg-manchurian.jpg", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 103, name: "Chilli chicken", price: 16.99, img: "img/chilli-chicken.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 104, name: "Lamb chilli", price: 16.99, img: "img/lamb-chilli.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 105, name: "Wok-Tossed chicken fried rice", price: 16.99, img: "img/chicken-fried-rice.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 106, name: "Wok-Tossed Egg Fried Rice", price: 16.99, img: "img/EggFriedRice.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},


  { id: 107, name: "Mango lassi ", price: 4.99, img: "img/Mango-Lassi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 108, name: "Sweet lassi ", price: 4.99, img: "img/sweet-lassi.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 109, name: "Salty lassi with jeera ", price: 4.99, img: "img/salted-lassi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 110, name: "Badam milk ", price: 4.99, img: "img/badam-milk.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 111, name: "Mango milk shake", price: 4.99, img: "img/MangoMilkshake.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 112, name: "Orange juice ", price: 2.99, img: "img/orange-juice.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 113, name: "Pineapple juice ", price: 2.99, img: "img/pineapple-juice.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 114, name: "Indian Lime soda ", price: 4.99, img: "img/lime-soda.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 115, name: "Pepsi", price: 2.99, img: "img/pepsi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 116, name: "Diet Pepsi", price: 2.99, img: "img/diet-pepsi.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 117, name: "Lemonade", price: 2.99, img: "img/lemonade.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 118, name: "Starry", price: 2.99, img: "img/starry.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 119, name: "Mt. Dew", price: 2.99, img: "img/Mountain-Dew.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 120, name: "Root Beer", price: 2.99, img: "img/root-beer.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 121, name: "Water Bottle", price: 1.99, img: "img/water.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 122, name: "Chai", price: 2.99, img: "img/chai.jpg", hasSpicyOption: false, category: "hot-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 123, name: "Indian style coffee ", price: 3.99, img: "img/coffee1.jpg", hasSpicyOption: false, category: "hot-beverages", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 124, name: "Rasmalai", price: 4.99, img: "img/rasmalai.webp", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 125, name: "Gulab jamun ", price: 3.99, img: "img/gulabjamun.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 126, name: "Badam kheer", price: 3.99, img: "img/Badam-Kheer.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 127, name: "Gajar halwa", price: 4.99, img: "img/gajarhalwa.webp", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 128, name: "Kulfi ", price: 3.99, img: "img/kulfi.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 129, name: "Pishtasho kulfi", price: 3.99, img: "img/pistakulfi.webp", hasSpicyOption: false, category: "desserts", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 130, name: "Raita", price: 2.99, img: "img/raita.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 131, name: "Plain yogurt", price: 2.99, img: "img/plain-yogurt.webp", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 132, name: "Mint chutney", price: 1.99, img: "img/Mint-Chutney.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 133, name: "Tamred chutney", price: 1.99, img: "img/tamarind-chutney.webp", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 134, name: "Indian pickle ( achar )", price: 1.99, img: "img/pickle.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 135, name: "Mango chutney", price: 2.99, img: "img/mango-chutney.webp", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 136, name: "Coconut chutney", price: 2.99, img: "img/coconut-chutner.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 137, name: "House Green salad", price: 2.99, img: "img/salad.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  
  

  // bar menus
  { id: 138, name: "Cabernet-Sauvignon", price: 2.99, img: "img/Cabernet-Sauvignon.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "bar" },
  { id: 139, name: "Malbec", price: 2.99, img: "img/malbec.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar" },
  { id: 140, name: "Pinot Noir", price: 2.99, img: "img/Pinot-Noir.webp", hasSpicyOption: false, category: "wines", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar" },
  { id: 141, name: "Chardonnay", price: 2.99, img: "img/Chardonnay.png", hasSpicyOption: false, category: "wines", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar" },
  { id: 142, name: "Moscato", price: 2.99, img: "img/Moscato.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar" },
  
  
  { id: 143, name: "Heineken", price: 6.00, img: "img/heineken.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 144, name: "Corona Extra", price: 6.00, img: "img/corona-extra-beer.jpeg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 145, name: "Stella", price: 6.00, img: "img/stella.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 146, name: "Modelo", price: 6.00, img: "img/modelo.webp", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 147, name: "Riggs", price: 6.00, img: "img/riggs.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 148, name: "Anti Hero", price: 6.00, img: "img/anti-hero.jpeg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 149, name: "Golden Monkey", price: 6.00, img: "img/golden-monkey.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 150, name: "Samuel Adam", price: 6.00, img: "img/samuel-adams.webp", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 151, name: "Blue Moon", price: 6.00, img: "img/bluemoon.webp", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] , type: "bar" },
  { id: 152, name: "N.A. Beer", price: 6.00, img: "img/bluemoon.webp", hasSpicyOption: false, category: "beers", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  
  
  
  { id: 153, name: "Haywords 5000", price: 8.00, img: "img/HAYWARDS.jpg", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 154, name: "Taj Mahal", price: 8.00, img: "img/tajmahal.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 155, name: "Flying Horse", price: 8.00, img: "img/flying-horse.jpg", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 156, name: "Kingfisher", price: 6.00, img: "img/kingfisher.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 157, name: "Maharaja", price: 6.00, img: "img/maharaja-beer.jpg", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 158, name: "Beera", price: 6.00, img: "img/bira.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  
  
  { id: 159, name: "Blue Label", price: 24.00, img: "img/blue-label.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 160, name: "The Macallan 15", price: 20.00, img: "img/macallan.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 161, name: "Glenlivet 18", price: 17.00, img: "img/glenlivet-18.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 162, name: "The Macallan 12", price: 17.00, img: "img/macallan12.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 163, name: "Glenlivet 12", price: 13.00, img: "img/Glenlivet.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 164, name: "Glenfiddich 12", price: 13.00, img: "img/Glenfiddich-12.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 165, name: "Black Label", price: 13.00, img: "img/blacklabel.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 166, name: "Indri", price: 13.00, img: "img/indri.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 167, name: "Woodford Reserve", price: 10.00, img: "img/woodford.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 168, name: "Hennessy", price: 10.00, img: "img/hennessy.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 169, name: "Red Label", price: 10.00, img: "img/redlabel.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 170, name: "Jack Deniel", price: 7.00, img: "img/jackdaniels.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 171, name: "Dewar's", price: 7.00, img: "img/dewars.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] , type: "bar" },
  { id: 172, name: "Crown Royal", price: 7.00, img: "img/crown-royal.png", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 173, name: "Jameson", price: 7.00, img: "img/jameson.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 174, name: "Patiala Peg", price: 7.00, img: "img/patialapeg.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] , type: "bar" },
  { id: 175, name: "Our Choice", price: 11.00, img: "img/ourchoise.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 176, name: "Guest Choice", price: 24.00, img: "img/guestchoise.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  
  
  { id: 177, name: "Grey Goose", price: 13.00, img: "img/Grey-Goose.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 178, name: "Absolute", price: 7.00, img: "img/absolutevodka.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 179, name: "Tito's", price: 7.00, img: "img/titosvodka.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 180, name: "Smirnoff", price: 7.00, img: "img/smirnoff.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 181, name: "Don Julio Anejo", price: 10.00, img: "img/donjulio.webp", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 182, name: "Don Julio Repesado", price: 10.00, img: "img/Don-Julio-Reposado.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 183, name: "Patron Anejo", price: 10.00, img: "img/patron.webp", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 184, name: "Patron Blanco", price: 7.00, img: "img/patronblanco.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 185, name: "1800", price: 7.00, img: "img/1800.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 186, name: "Jose Cuervo", price: 5.00, img: "img/jose.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  
  
  { id: 187, name: "Dirty Martini", price: 10.00, img: "img/martini.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 188, name: "Sex on the Beach", price: 10.00, img: "img/sotb.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 189, name: "Mojito's", price: 10.00, img: "img/mojito.webp", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 190, name: "Bloody Marry", price: 10.00, img: "img/bloodmarry.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 191, name: "Blue Hawaii", price: 10.00, img: "img/BlueHawaii.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  { id: 192, name: "Long Island Ice Tea", price: 10.00, img: "img/longisland.webp", hasSpicyOption: false, category: "cocktails", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"], type: "bar"  },
  
].map(item => ({
  ...item,
  hasSpicyOption: item.hasSpicyOption !== undefined ? item.hasSpicyOption : false,
  ingredients: item.ingredients || [],    // Ensure ingredients array exists
  type: item.type || (['wines', 'beers', 'indian-beer', 'whiskey', 'vodka', 'cocktails'].includes(item.category) ? 'bar' : 'food') // Default to 'food' for existing items 
}));



// Menu Type Filter Component - Place this outside LandingPage
const MenuTypeFilter = ({ menuTypes, activeType, onTypeChange }) => {
  return (
    <div className="menu-type-filter">
      <div className="filter-buttons">
        {menuTypes.map(type => (
          <button
            key={type.id}
            className={`filter-btn ${activeType === type.id ? 'active' : ''}`}
            onClick={() => onTypeChange(type.id)}
          >
            <i className={type.icon}></i>
            <span>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


// MenuCard Component - Show total count irrespective of spicy level
const MenuCard = ({ item, cart, addToCart, setCart, onAddWithSpicyLevel }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const totalQuantity = cart
    .filter(cartItem => cartItem.id === item.id)
    .reduce((total, cartItem) => total + cartItem.qty, 0);

  // Detect mobile and handle body scroll
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (showIngredients) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, [showIngredients]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowIngredients(false);
    };

    if (showIngredients) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showIngredients]);

  return (
    <>
      <div className="menu-card">
        <div className="menu-image-container">
          <img className="menu-image" src={item.img} alt={item.name} />
          {item.hasSpicyOption && (
            <div className="spicy-badge">
              <i className="fas fa-pepper-hot"></i> 
            </div>
          )}
          {/* Ingredients Toggle Button */}
          {item.ingredients && item.ingredients.length > 0 && (
            <button 
              className="ingredients-toggle-btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                setShowIngredients(true);
              }}
              title="View Ingredients"
            >
              <i className="fas fa-list-alt"></i>
            </button>
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
            <span className="menu-price">${item.price}</span>
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
                    const cartItemsForThisItem = cart.filter(cartItem => 
                      cartItem.id === item.id && 
                      (!item.hasSpicyOption || cartItem.spicyLevel?.id === cartItem.spicyLevel?.id)
                    );
                    if (cartItemsForThisItem.length > 0) {
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

      {/* Responsive Ingredients Popup */}
      {showIngredients && (
        <div className="ingredients-responsive-overlay" onClick={() => setShowIngredients(false)}>
          <div 
            className={`ingredients-responsive-modal ${isMobile ? 'mobile' : 'desktop'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-headerr p-0">
              <div className="header-content">
                <div className="dish-info">
                  <img src={item.img} alt={item.name} className="dish-thumbnail" />
                 
                </div>
                 
                <button 
                  className="close-modal-btn" style={{top: '5px', right: '5px', position: 'absolute'}}
                  onClick={() => setShowIngredients(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="modal-contentt">
              <div className="ingredients-section">
                <div className="dish-details mb-3">
                    <h3 style={{color:'#000'}}>{item.name}</h3>
                    <div className="dish-meta">
                      <span className="price">${item.price}</span>
                      {/* {item.hasSpicyOption && (
                        <span className="spicy-indicator">
                          <i className="fas fa-pepper-hot"></i> Customizable Spice
                        </span>
                      )} */}
                    </div>
                  </div>
                <div className="section-title2">
                  <i className="fas fa-seedling"></i>
                  <h4>Fresh Ingredients</h4>
                  <span className="ingredients-count">{item.ingredients.length} items</span>
                </div>
                
                <div className="ingredients-list">
                  {item.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      <div className="ingredient-check">
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quality-badge">
                <i className="fas fa-award"></i>
                <span>Made with premium, fresh ingredients</span>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowIngredients(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  onAddWithSpicyLevel(item);
                  setShowIngredients(false);
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
const AdminPanel = ({ 
  menuItems, 
  onAddItem, 
  onEditItem, 
  onDeleteItem, 
  onClose
 }) => {
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

   // Filter items by selected category
  // Enhanced filtered items with search and sort
const filteredItems = useMemo(() => {
  let items = menuItems.filter(item => {
    // Only filter by category and search - ignore menuType
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sorting logic remains the same
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

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;

   return (
    <div className="admin-modal-overlay modern-enhanced">
      <div className="admin-modal modern-enhanced">
        {/* Enhanced Header */}
        <div className="admin-header modern-enhanced">
          <div className="header-content">
            <div className="header-main">
              {/* {isMobile && mobileView !== 'categories' && (
                <button className="btn-back-mobile" onClick={handleMobileBack}>
                  <i className="fas fa-arrow-left"></i>
                </button>
              )} */}
              <div className="header-title">
                <div className="header-icon btn-primary">
                  <i className="fas fa-utensils"></i>
                </div>
                <div>
                  <h3>Menu Dashboard</h3>
                  <p>Manage your restaurant menu items</p>
                </div>
              </div>
            </div>
            
            <div className="header-stats">
              <div className="stat-badge">
                <i className="fas fa-utensils"></i>
                <span>{overallStats.totalItems} Items</span>
              </div>
              <div className="stat-badge">
                <i className="fas fa-pepper-hot"></i>
                <span>{overallStats.spicyItems} Spicy</span>
              </div>
            </div>
          </div>
          
          {isMobile && mobileView === 'items' && (
            <button className="btn-mobile-menu" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
              <i className="fas fa-bars"></i>
            </button>
          )}
          
          <button className="btn-close modern-enhanced" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="admin-content modern-enhanced">
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
          {!isMobile && (
            <div className="admin-sidebar modern-enhanced">
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
                    >
                      <div className="category-main">
                        <div className="category-icon" style={{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}40)` }}>
                          <span style={{ color: cat.color }}>{cat.icon}</span>
                        </div>
                        <div className="category-info">
                          <span className="category-name">{cat.name}</span>
                          <span className="category-stats">
                            {stats.count} items • ${stats.avgPrice} avg
                          </span>
                        </div>
                      </div>
                      <div className="category-value">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile Categories View */}
          {isMobile && mobileView === 'categories' && (
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
              <button className="btn btn-primary w-100 mt-3" onClick={handleAddNewItemMobile}>
                <i className="fas fa-plus me-2"></i>
                Add New Item
              </button>
            </div>
          )}

          {/* Main Content - Show for desktop OR when mobile is in form/items view */}
          <div className="admin-main modern-enhanced">

             {/* Items List Section - Show on desktop OR when mobile is in items view */}
            {(!isMobile || mobileView === 'items') && (
              <div className="items-section modern-enhanced">
                <div className="section-header">
                  <div className="section-info d-flex align-items-start">
                     {isMobile && mobileView !== 'categories' && (
                        <button className="btn-back-mobile" onClick={handleMobileBack}>
                          <i className="fas fa-arrow-left"></i>
                        </button>
                      )}
                    <div className="category-header mb-0">
                      <div className="category-icon-large" style={{ 
                        background: `linear-gradient(135deg, ${categories.find(cat => cat.id === selectedCategory)?.color}20, ${categories.find(cat => cat.id === selectedCategory)?.color}40)` 
                      }}>
                        <span style={{ color: categories.find(cat => cat.id === selectedCategory)?.color }}>
                          {categories.find(cat => cat.id === selectedCategory)?.icon}
                        </span>
                      </div>
                      <div>
                        <h5>{categories.find(cat => cat.id === selectedCategory)?.name}</h5>
                        <span className="item-count">{filteredItems.length} items</span>
                      </div>
                    </div>
                    
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
                    {isMobile && (
                      <button className="btn btn-primary btn-sm" onClick={handleAddNewItemMobile}>
                        <i className="fas fa-plus me-1"></i>Add
                      </button>
                    )}
                  </div>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="empty-state modern-enhanced">
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
                  <div className="items-grid modern-enhanced">
                    {filteredItems.map(item => {
                      const category = categories.find(cat => cat.id === item.category);
                      return (
                        <div key={item.id} className="admin-item-card modern-enhanced">
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
                              <span className="item-price">${item.price}</span>
                              <span className="item-category">{category?.name}</span>
                            </div>
                          </div>
                          
                          <div className="item-actions">
                            <button className="btn-action edit" onClick={() => handleEdit(item)} title="Edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn-action delete" onClick={() => onDeleteItem(item.id)} title="Delete">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Form Section - Show on desktop OR when mobile is in form view */}
            {(!isMobile || mobileView === 'form') && (
              <div className="form-section modern-enhanced">
                <div className="section-header">
                  <div className="section-title1">
                    <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'} me-2`}></i>
                    {isEditing ? 'Edit Menu Item' : 'Create New Item'}
                  </div>
                  {isEditing && (
                    <button className="btn btn-outline btn-sm" onClick={resetForm}>
                      <i className="fas fa-plus me-1"></i>New Item
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="admin-form modern-enhanced">
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
                        <label className="upload-btn btn-primary">
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
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <div className="form-floating modern-enhanced">
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
                    
                    <div className="form-group">
                      <div className="form-floating modern-enhanced">
                        <i className="fas fa-rupee-sign input-icon"></i>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={currentItem.price}
                          onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                          required
                        />
                        <label>Price ($)</label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-floating modern-enhanced">
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

                    <div className="form-group full-width">
                      <div className="form-check modern-enhanced">
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

                    <div className="form-group full-width">
                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary modern-enhanced">
                          <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
                          {isEditing ? 'Update Item' : 'Create Item'}
                        </button>
                        {isEditing && (
                          <button type="button" className="btn btn-outline modern-enhanced" onClick={resetForm}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

           
          </div>
        </div>
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
            {/* <p>How spicy would you like it?</p> */}
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
                <p className="price">${item.price}</p>
                <div className="spicy-preview">
                  <span className="current-level" style={{ color: getSpicyLevelColor(selectedSpicyLevel.id) }}>
                    {getSpicyIcon(selectedSpicyLevel.id)} {selectedSpicyLevel.name}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Spicy Level Selector */}
            <div className="spicy-levels enhanced">
              {/* <div className="level-indicator">
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
              </div> */}

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

  // Add menu type filter state
  const [menuType, setMenuType] = useState('food');

  // Define menu types
  const menuTypes = [
    { id: 'food', name: 'Food Menu', icon: 'fas fa-utensils' },
    { id: 'bar', name: 'Bar Menu', icon: 'fas fa-glass-cheers' }
  ];

  // New state for spicy level modal
  const [showSpicyModal, setShowSpicyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);


  // Define your menu categories and items
const menuCategories = useMemo(() => [
  {
    id: 'appetizers',
    name: 'Appetizer & Chat',
    description: 'Crispy and flavorful starters',
    image: 'img/appetizers.jpg',
    icon: 'fas fa-utensils',
    type: 'food',
    items: menuItems.filter(item => item.category === 'appetizers')
  },
  {
    id: 'soups',
    name: 'Soup',
    description: 'Fresh and comforting bowls',
    image: 'img/soups-salads.jpg',
    icon: 'fas fa-carrot',
    type: 'food',
    items: menuItems.filter(item => item.category === 'soups')
  },
  {
    id: 'breads',
    name: 'Breads Naan',
    description: 'Freshly baked traditional breads',
    image: 'img/breads.jpg',
    icon: 'fas fa-bread-slice',
    type: 'food',
    items: menuItems.filter(item => item.category === 'breads')
  },
  {
    id: 'pulao',
    name: 'Pulao & Biryani',
    description: 'Perfect accompaniments',
    image: 'img/side-dishes.jpg',
    icon: 'fas fa-hotdog',
    type: 'food',
    items: menuItems.filter(item => item.category === 'pulao')
  },
  {
    id: 'vegetarian',
    name: 'Vegetable Entrees',
    description: 'Plant-based goodness',
    image: 'img/vegetarian.jpg',
    icon: 'fas fa-leaf',
    type: 'food',
    items: menuItems.filter(item => item.category === 'vegetarian')
  },
  {
    id: 'paneer',
    name: 'Paneer Entrees',
    description: 'Plant-based goodness',
    image: 'img/vegetarian.jpg',
    icon: 'fas fa-leaf',
    type: 'food',
    items: menuItems.filter(item => item.category === 'paneer')
  },
  {
    id: 'chicken',
    name: 'Chicken Entrees',
    description: 'Tender and flavorful chicken',
    image: 'img/chicken.jpg',
    icon: 'fas fa-drumstick-bite',
    type: 'food',
    items: menuItems.filter(item => item.category === 'chicken')
  },
  {
    id: 'lamb',
    name: 'Lamb & Goat Entrees',
    description: 'Rich and aromatic lamb dishes',
    image: 'img/lamb.jpg',
     icon: 'fas fa-paw',
     type: 'food',
    items: menuItems.filter(item => item.category === 'lamb')
  },
  {
    id: 'tandoori',
    name: 'Tandoori & Kabab',
    description: 'Clay oven marvels',
    image: 'img/tandoori.jpg',
    icon: 'fas fa-fire',
    type: 'food',
    items: menuItems.filter(item => item.category === 'tandoori')
  },
  {
    id: 'seafood',
    name: 'Seafood Items',
    description: 'Fresh catches from the sea',
    image: 'img/seafood.jpg',
    icon: 'fas fa-fish',
    type: 'food',
    items: menuItems.filter(item => item.category === 'seafood')
  },
  {
    id: 'indo-chinese',
    name: 'Indo Chinese Entrees',
    description: 'Fusion flavors',
    image: 'img/side-dishes.jpg',
    icon: 'fas fa-hotdog',
    type: 'food',
    items: menuItems.filter(item => item.category === 'indo-chinese')
  },
  {
    id: 'cold-beverages',
    name: 'Cold Beverage',
    description: 'Refreshing drinks',
    image: 'img/beverages.jpg',
    icon: 'fas fa-beer',
    type: 'food',
    items: menuItems.filter(item => item.category === 'cold-beverages')
  },
  {
    id: 'hot-beverages',
    name: 'Hot Beverage',
    description: 'Refreshing drinks',
    image: 'img/beverages.jpg',
    icon: 'fas fa-beer',
    type: 'food',
    items: menuItems.filter(item => item.category === 'hot-beverages')
  },
  {
    id: 'desserts',
    name: 'Dessert',
    description: 'Sweet endings',
    image: 'img/desserts.jpg',
     icon: 'fas fa-ice-cream',
     type: 'food',
    items: menuItems.filter(item => item.category === 'desserts')
  },
  {
    id: 'salad',
    name: 'Salad',
    description: 'Fresh and healthy salads',
    image: 'img/side-dishes.jpg',
    icon: 'fas fa-hotdog',
    type: 'food',
    items: menuItems.filter(item => item.category === 'salad')
  }
  
], [menuItems]);


  // Define bar categories
  const barCategories = useMemo(() => [
     {
      id: 'wines',
      name: 'Wine',
      description: 'Fine wines and sparkling',
      image: 'img/wines.jpg',
      icon: 'fas fa-wine-glass-alt',
      type: 'bar'
    },
    {
      id: 'beers',
      name: 'Imported & Domestic Beer',
      description: 'Craft and premium beers',
      image: 'img/beers.jpg',
      icon: 'fas fa-beer',
      type: 'bar'
    },
    {
      id: 'indian-beer',
      name: 'Indian Beer',
      description: 'Craft and premium beers',
      image: 'img/beers.jpg',
      icon: 'fas fa-beer',
      type: 'bar'
    },
     {
      id: 'whiskey',
      name: 'Whiskey',
      description: 'Premium whiskeys and scotch',
      image: 'img/whiskeys.jpg',
      icon: 'fas fa-glass-whiskey',
      type: 'bar'
    },
    {
      id: 'vodka',
      name: 'Vodka & Tequila',
      description: 'Smooth vodkas and tequilas',
      image: 'img/shots.jpg',
      icon: 'fas fa-wine-bottle',
      type: 'bar'
    },
   
    {
      id: 'cocktails',
      name: 'Cocktails',
      description: 'Signature and classic cocktails',
      image: 'img/cocktails.jpg',
      icon: 'fas fa-cocktail',
      type: 'bar'
    },
    
  ], []);;

    // Combine all categories
  const allCategories = [...menuCategories, ...barCategories];

    // Get current categories based on menu type
  const currentCategories = menuType === 'food' ? menuCategories : barCategories;

    // Filter items based on current menu type and active category
// Filter items based on current menu type, active category, and search query
// Filter items based on current menu type, active category, and search query
const filteredItems = useMemo(() => {
  return menuItems.filter(item => {
    const matchesType = item.type === menuType;
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesCategory && matchesSearch;
  });
}, [menuItems, menuType, activeCategory, searchQuery]);



    // Update menuCategories to use currentCategories
const menuCategories1 = useMemo(() => {
  const categories = menuType === 'food' ? menuCategories : barCategories;
  
  return categories.map(category => ({
    ...category,
    items: menuItems.filter(item => 
      item.category === category.id && item.type === menuType
    )
  }));
}, [menuType, menuItems, menuCategories, barCategories]);


  // Handle menu type change
const handleMenuTypeChange = (type) => {
  setMenuType(type);
  
  // Reset to first category of the new menu type
  const categories = type === 'food' ? menuCategories : barCategories;
  const firstCategory = categories[0];
  if (firstCategory) {
    setActiveCategory(firstCategory.id);
    setCategoryImage(firstCategory.image);
  }
  setSearchQuery(''); // Also clear search when switching menu types
};



// Filter items based on search query
// const filteredItems = menuCategories
//   .find(c => c.id === activeCategory)
//   ?.items.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   ) || [];

  // Enhanced parallax effect
//  useEffect(() => {
//   const handleScroll = () => {
//     const position = window.scrollY;
//     setScrollPosition(position);
    
//     // Hero section parallax
//     const heroLayers = document.querySelectorAll('.parallax-hero-modern .parallax-layer');
//     heroLayers.forEach(element => {
//       const speed = element.getAttribute('data-speed') || 0.5;
//       const yPos = -(position * speed);
//       element.style.transform = `translateY(${yPos}px)`;
//     });

//     // About section parallax
//     const aboutLayers = document.querySelectorAll('.parallax-about-modern .parallax-layer');
//     aboutLayers.forEach(element => {
//       const speed = element.getAttribute('data-speed') || 0.5;
//       const yPos = -(position * speed);
//       // element.style.transform = `translateY(${yPos}px)`;
//     });

//     // Floating animation for hero image
//     const heroImage = document.querySelector('.hero-image-modern');
//     if (heroImage) {
//       const floatY = Math.sin(position * 0.005) * 20;
//       // heroImage.style.transform = `translateY(${floatY}px)`;
//     }
//   };

//   window.addEventListener('scroll', handleScroll, { passive: true });
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);



    // Add mouse move parallax effect
// useEffect(() => {
//   const handleMouseMove = (e) => {
//     const mouseX = e.clientX / window.innerWidth - 0.5;
//     const mouseY = e.clientY / window.innerHeight - 0.5;
    
//     const parallaxElements = document.querySelectorAll('.parallax-mouse');
//     parallaxElements.forEach(element => {
//       const depth = element.getAttribute('data-depth') || 20;
//       const xMove = mouseX * depth;
//       const yMove = mouseY * depth;
//       element.style.transform = `translate(${xMove}px, ${yMove}px)`;
//     });
//   };

//   window.addEventListener('mousemove', handleMouseMove);
//   return () => window.removeEventListener('mousemove', handleMouseMove);
// }, []);


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


const [showReservationForm, setShowReservationForm] = useState(false);
const [showReservationSuccess, setShowReservationSuccess] = useState(false);
const [reservationData, setReservationData] = useState({
  name: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  specialRequest: ''
});

// Add this function to handle reservation form submission
const handleReservationSubmit = (e) => {
  e.preventDefault();
  // Handle form submission logic here
  console.log('Reservation data:', reservationData);
  
  // Show success modal
  setShowReservationSuccess(true);
  setShowReservationForm(false);
  
  // Reset form
  setReservationData({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequest: ''
  });
};

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray(".panel");

  // Create pinned scroll transitions between each section
  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });
  });

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


// Enhanced Scroll Effects (Compatible with existing parallax)
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Text reveal animations that don't interfere with parallax
  gsap.utils.toArray('.panel').forEach((section, index) => {
    // Only animate elements that aren't part of parallax
    const nonParallaxElements = section.querySelectorAll(
      'h1:not(.parallax-layer):not(.parallax-mouse), ' +
      'h2:not(.parallax-layer):not(.parallax-mouse), ' +
      'p:not(.parallax-layer):not(.parallax-mouse), ' +
      '.menu-card:not(.parallax-layer), ' +
      '.team-item:not(.parallax-layer)'
    );

    gsap.fromTo(nonParallaxElements,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false // Remove in production
        }
      }
    );
  });

  // Enhanced counter animations
  gsap.utils.toArray('[data-toggle="counter-up"]').forEach(counter => {
    const target = +counter.innerText;
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(counter, 
          { innerText: 0 },
          { 
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
          }
        );
      }
    });
  });

}, []);



  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Parallax Hero Section */}
        <div className="container-xxl position-relative p-0 landing-container panel">
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
                     onClick={() => scrollToSection("bookTable")}
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
                  {adminButton}
                </div>
              </div>
            </div>
          </nav>

          {/* Enhanced Parallax Hero */}
          <div className="parallax-hero-modern" id="home">
            {/* Background layers with different parallax speeds */}
            <div 
              className="parallax-layer parallax-back-modern" 
              data-speed="0.1"
            ></div>
            <div 
              className="parallax-layer parallax-base-modern" 
              data-speed="0.3"
            ></div>
            <div 
              className="parallax-layer parallax-front-modern" 
              data-speed="0.5"
            ></div>
            
            {/* Floating particles */}
            <div className="floating-particles">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="hero-content-modern">
              <div className="container my-5 py-5">
                <div className="row align-items-center g-5" style={{ paddingTop: "200px" }}>
                  <div className="col-lg-6 text-center text-lg-start">
                    <div className="hero-text-modern">
                      <h1 className="display-3 text-white animated slideInLeft hero-title-modern">
                        Enjoy Our
                        <br />
                        <span className="text-primary">Delicious Meal</span>
                      </h1>
                      <p className="text-white animated slideInLeft mb-4 pb-2 hero-subtitle">
                        Don't wait on hunger! Choose from our wide range of fast
                        food, desi specials, and healthy bites – delivered piping
                        hot in minutes.
                      </p>
                      <div className="hero-buttons">
                        <button
                          className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft hero-btn-modern" onClick={() => scrollToSection("bookTable")}
                        >
                          Book A Table
                        </button>
                        <button
                          className="btn btn-outline-light py-sm-3 px-sm-5 animated slideInLeft hero-btn-modern" onClick={() => scrollToSection("order")}
                        >
                          View Menu
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                    <div className="hero-image-container parallax-mouse" data-depth="15">
                      <img
                        className="img-fluid floating hero-image-modern"
                        src="img/hero.png"
                        alt="Delicious Food"
                      />
                      <div className="floating-elements">
                        <div className="floating-element element-1" data-speed="0.8">
                          <i className="fas fa-utensils"></i>
                        </div>
                        <div className="floating-element element-2" data-speed="1.2">
                          <i className="fas fa-pepper-hot"></i>
                        </div>
                        <div className="floating-element element-3" data-speed="0.6">
                          <i className="fas fa-leaf"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            {/* <div className="scroll-indicator-modern">
              <div className="scroll-arrow"></div>
            </div> */}
          </div>
        </div>


        

        {/* About Section with Parallax */}
        <div className="container-xxl py-5 service-section panel"  id="about">
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
                  <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                    About Us
                  </h5>
                <h1 className="mb-4">
                    Welcome to{" "}
                    <i className="fa fa-utensils text-primary me-2"></i>
                  SangEat
                  </h1>
                <h1 className="mb-4">
                    An Experience of Royal Indian Dining
                </h1>
                <div className="divider"></div>
                <p className="mb-4" style={{color: '#000'}}>
                    At SangEat, we bring the flavors of royal Indian cuisine to
                    your table. From fragrant biryanis to elaborate thalis, each
                    dish is a celebration of tradition, taste, and hospitality.
                  </p>
                <p className="mb-4" style={{color: '#000'}}>
                  {" "}
                    Immerse yourself in an ambiance of elegance and cultural
                    richness — perfect for family gatherings, celebrations, or
                    simply treating yourself to authentic flavors.
                  </p>
                <div className="divider"></div>
                <p className="mb-4" style={{color: '#000'}}>
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
                        <p className="mb-0"  style={{color: '#000'}}>Years of</p>
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
                        <p className="mb-0"  style={{color: '#000'}}>Popular</p>
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
      
<div className="container-fluid py-3 " id="order" style={{ backgroundColor: '#f8f9fa',height: '125vh  !important', position: 'relative' }}>
  <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}>
    <div className="text-center">
      <h5 className="section-title ff-secondary text-center text-primary fw-normal">
         {menuType === 'food' ? 'Food Menu' : 'Bar Menu'}
      </h5>
      <h1 className="mb-4">Explore Our Culinary Categories</h1>
      <p className="text-muted w-75 mx-auto d-none d-md-block">
        Discover our delicious offerings across various categories. Select a category to view our specialties.
      </p>
    </div>


      {/* Menu Type Filter */}
    <div className="row mb-4">
      <div className="col-12">
        <MenuTypeFilter
          menuTypes={menuTypes}
          activeType={menuType}
          onTypeChange={handleMenuTypeChange}
        />
      </div>
    </div>

    {/* Search bar for mobile */}
    <div className="row mb-4 d-lg-none">
      <div className="col-12">
        <div className="menu-search-container">
          <i className="fas fa-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder={`Search ${menuType === 'food' ? 'food' : 'drink'} items...`}
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

    <div className="menu-container panel">
      {/* Mobile category tabs (horizontal scroll) */}
      <div className="d-lg-none mobile-category-tabs">
        <div className="category-scroll-container">
          {menuCategories1.map(category => (
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
            {menuCategories1.map(category => (
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
                <h2>{menuCategories1.find(c => c.id === activeCategory)?.name}</h2>
                <p className="text-muted category-description">
                  {menuCategories1.find(c => c.id === activeCategory)?.description}
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
                {cart.map((item, index) => (
  <div key={`${item.id}-${item.spicyLevel?.id || 'default'}-${index}`} className="mb-3">
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
          <small className="text-muted">${item.price} x {item.qty}</small>
          <div className="ms-auto">
            <div className="counter-container">
              <button
                className="counter-btn"
                onClick={() =>
                  setCart((prevCart) =>
                    prevCart
                      .map((i) =>
                        // Match by both ID and spicy level
                        i.id === item.id && 
                        i.spicyLevel?.id === item.spicyLevel?.id
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
                onClick={() => addToCart(item, item.spicyLevel)} // Pass the existing spicy level
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
                
              </>
            )}
          </div>
          <div className="border-top p-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>${total}</h5>
                  </div>
                  <button className="btn btn-primary w-100 mt-3"  data-bs-dismiss="offcanvas" onClick={() => {
                      resetCheckoutState();
                      setShowCheckout(true);
                    }}>
                    Checkout
                  </button>
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
                      className="col-md-7 p-3"
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
          <span className="text-primary fw-bold">${item.price}</span>
        </div>
        
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
                      i.id === item.id && 
                      i.spicyLevel?.id === item.spicyLevel?.id
                        ? { ...i, qty: i.qty - 1 }
                        : i
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
              onClick={() => addToCart(item, item.spicyLevel)} // Pass existing spicy level
            >
              +
            </button>
          </div>
          <span className="fw-bold">${item.price * item.qty}</span>
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
                            <span>${total}</span>
                          </div>
                          <div className="bill-item d-flex justify-content-between mb-2">
                            <span>Delivery Fee | 6.0 kms</span>
                            <span className="text-success">$30</span>
                          </div>
                          <div className="bill-item d-flex justify-content-between mb-2">
                            <span>GST & Restaurant Charges</span>
                            <span>${Math.round(total * 0.05)}</span>
                          </div>
                          <hr />
                          <div className="bill-total d-flex justify-content-between fw-bold fs-5 mb-3">
                            <span>TO PAY</span>
                            <span>${total + 30 + Math.round(total * 0.05)}</span>
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
            <span className="value">${total + 30 + Math.round(total * 0.05)}</span>
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
  <div id="bookTable"   className=" py-5 px-0 wow fadeInUp panel " style={{background: '#fff'}}
       data-wow-delay="0.1s"
       >
  <div className="row g-0" style={{ width: '-webkit-fill-available'}}>
    <div className="col-md-6">
      <div className="video">
        <button
          type="button"
          className="btn-play"
          data-bs-toggle="modal"
          data-src=""
          data-bs-target="#videoModal"
        >
          <span></span>
        </button>
      </div>
    </div>
    <div className="col-md-6 bg-dark d-flex align-items-center justify-content-center">
      <div className="p-3 wow fadeInUp" data-wow-delay="0.2s">
        <h5 className="section-title ff-secondary text-start text-primary fw-normal">
          Reservation
        </h5>
        <h1 className="text-white mb-4">Book A Table Online</h1>
        <p className="text-white mb-4">Experience fine dining with our easy online booking system</p>
        
        <div className="reservation-features mb-4">
          <div className="row text-white">
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-primary me-2"></i>
                <small>Instant Confirmation</small>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-primary me-2"></i>
                <small>Best Tables Reserved</small>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-primary me-2"></i>
                <small>Special Occasions</small>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-primary me-2"></i>
                <small>24/7 Support</small>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary w-100 py-3 fw-bold modern-reservation-btn"
          onClick={() => setShowReservationForm(true)}
        >
          <i className="fas fa-calendar-check me-2"></i>
          Book Table Now
        </button>
      </div>
    </div>
  </div>
</div>

{/* Modern Reservation Form Modal */}
{showReservationForm && (
  <div className="modern-modal-overlay" onClick={() => setShowReservationForm(false)}>
    <div className="modern-modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modern-modal-header">
        <div className="modal-header-content">
          <div className="modal-icon">
            <i className="fas fa-utensils"></i>
          </div>
          <div>
            <h3 className="modal-title">Table Reservation</h3>
            <p className="modal-subtitle">Secure your dining experience</p>
          </div>
        </div>
        <button 
          className="modern-close-btn"
          onClick={() => setShowReservationForm(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleReservationSubmit} className="modern-reservation-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-user icon"></i>
              Full Name
            </label>
            <input
              type="text"
              className="form-control-modern"
              placeholder="Enter your full name"
              value={reservationData.name}
              onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
              required
            />
          </div>

          {/* <div className="form-group">
            <label className="form-label">
              <i className="fas fa-envelope icon"></i>
              Email Address
            </label>
            <input
              type="email"
              className="form-control-modern"
              placeholder="your@email.com"
              value={reservationData.email}
              onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
              required
            />
          </div> */}

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-calendar icon"></i>
              Date
            </label>
            <input
              type="date"
              className="form-control-modern"
              value={reservationData.date}
              onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-clock icon"></i>
              Time
            </label>
            <select
              className="form-control-modern"
              value={reservationData.time}
              onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
              required
            >
              <option value="">Select time</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-users icon"></i>
              Number of Guests
            </label>
            <select
              className="form-control-modern"
              value={reservationData.guests}
              onChange={(e) => setReservationData({...reservationData, guests: e.target.value})}
              required
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9+ People</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">
              <i className="fas fa-edit icon"></i>
              Special Requests
            </label>
            <textarea
              className="form-control-modern"
              placeholder="Any special requirements or occasions..."
              rows="3"
              value={reservationData.specialRequest}
              onChange={(e) => setReservationData({...reservationData, specialRequest: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline-modern"
            onClick={() => setShowReservationForm(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            <i className="fas fa-check me-2"></i>
            Confirm Reservation
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Modern Success Popup Modal */}
{showReservationSuccess && (
  <div className="modern-modal-overlay success" onClick={() => setShowReservationSuccess(false)}>
    <div className="modern-modal-content success" onClick={(e) => e.stopPropagation()}>
      <div className="success-animation-container">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        
        <div className="success-confetti">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="confetti-piece"></div>
          ))}
        </div>
      </div>

      <div className="success-content">
        {/* <div className="success-icon">
          <i className="fas fa-calendar-check"></i>
        </div> */}
        <h3 className="success-title">Reservation Confirmed!</h3>
        <p className="success-message">
          Your table has been successfully booked. We look forward to serving you!
        </p>

        <div className="success-notes">
          <div className="note-item">
            <i className="fas fa-info-circle"></i>
            <small>Please arrive 10 minutes before your reservation time</small>
          </div>
          <div className="note-item">
            <i className="fas fa-envelope"></i>
            <small>Confirmation sent to {reservationData.email}</small>
          </div>
        </div>
      </div>

      <div className="success-actions success-actions1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowReservationSuccess(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
        {/* <!-- Reservation Ends --> */}

        {/* <!-- Team Start --> */}
        <div className="container-xxl pt-3 pb-3 panel team-mobile" style={{background:'#f8f9fa'}} >
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Team Members
              </h5>
              <h1 className="mb-3">Our Master Chefs</h1>
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

        <div className="panel" id="testimonials" style={{background:'#fff !important'}}>
          <div className="container" style={{width: '100vw',maxWidth: '100vw !important'}}>
            <div className="text-center mb-2">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal mt-3">
                Testimonials
              </h5>
              <h1 className="mb-4">What Our Clients Say</h1>
              <p className="w-75 mx-auto mb-3">
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
        <div className="container-xxl py-3 panel contact-mobile" id="contact"  style={{background: '#f1f1f1' }}>
          <div className="container">
            <div className="text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Contact Us
              </h5>
              <h1 className="mb-3">Get In Touch</h1>
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
        <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn panel footer-style" data-wow-delay="0.1s"style={{background: '#f1f1f1 !important'}}>
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