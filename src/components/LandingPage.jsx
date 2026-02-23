import React, { useState, useEffect, useMemo, useRef } from "react";
import './LandingPage.css';
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from './Header';
import Footer from './Footer';
import { setPageSEO } from '../utils/usePageSEO';

gsap.registerPlugin(ScrollTrigger);



// Add spicy levels configuration - all 6 levels
const spicyLevels = [
  { id: 1, name: "Mild", level: 1, chiliCount: 1 },
  { id: 2, name: "Mild Plus", level: 2, chiliCount: 2 },
  { id: 3, name: "Medium", level: 3, chiliCount: 2 },
  { id: 4, name: "Medium Plus", level: 4, chiliCount: 3 },
  { id: 5, name: "Hot", level: 5, chiliCount: 3 },
  { id: 6, name: "Extra Hot", level: 6, chiliCount: 4 }
];

export const defaultMenuItems = [
  { id: 1, name: "Root & leaf samosa", description: "Seasoned potatoes filled in crisp turnover.", price: 5.99, img: "img/Root&leafsamosa.jpg", hasSpicyOption: false, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 2, name: "Chef's blend pakora", description: "Vegetables in a lightly seasoned lentil flour batter, then deep fried.", price: 5.99, img: "img/pakora1.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 3, name: "Crispy golden aloo tikki", description: "Mildly spiced minced deep fried potatoes with gram flour.", price: 5.99, img: "img/Crispygoldenalootikki.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 4, name: "Gilded paneer Pakora", description: "Cubes of homemade cheese, deep fried, served with chutney.", price: 7.99, img: "img/Gildedpaneerpakora.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 5, name: "Cauliflower Cloud Fritters", description: "Light and fluffy cauliflower florets coated in spiced batter, fried until crispy and served with mint chutney.", price: 6.99, img: "img/cauliflower-fritter.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 6, name: "Herb & Spice Marinated Chicken Pakora", description: "Mildly spiced boneless chicken fritters flavored with fresh onion, garlic and ginger.", price: 7.99, img: "img/Herb&SpiceMarinatedChickenPakora.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 7, name: "Chef's crafted chat samosa ", description: "one samosa topped with Punjabi chickpeas, vegetable, and chutney.", price: 6.99, img: "img/Chefscraftedchatsamosa.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 8, name: "Chef's crafted chat tikki", description: "two aloo tikka topped with Punjabi chickpeas, vegetable, and chutney.", price: 6.99, img: "img/Chefscraftedchattikki.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 9, name: "Mixed platter", description: "A delightful assortment of our finest appetizers including samosas, pakoras, and tikkis served with dipping sauces.", price: 8.99, img: "img/platter.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 10, name: "Gourmet Chili Gobi", description: "Deep fried crispy cauliflower  cooked with hot & tangy sauce.", price: 9.99, img: "img/GourmetChilliGobi.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 11, name: "Spiced chicken 65*", description: "Deep fried chicken cooked with mustrad seed, carry leaves, whole red chillies and tossed  with hot sauce.", price: 9.99, img: "img/chicken65.jpeg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 12, name: "Wedge potato ", description: "Crispy potato wedges seasoned with aromatic spices and herbs, served hot with your choice of dipping sauce.", price: 5.99, img: "img/Wedgepotato.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 13, name: "Masala papad", description: "Crispy lentil wafers topped with fresh onions, tomatoes, cilantro, and a blend of tangy spices.", price: 4.99, img: "img/Masalapapad.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 101, name: "Chilli paneer", description: "Cubes of paneer sauteed with onion and bell peppers in a tangy sauce.", price: 12.99, img: "img/chilli-paneer.jpg", hasSpicyOption: true, category: "appetizers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 14, name: "Papdi chat", description: "Crispy flour crackers topped with spiced chickpeas, yogurt, tamarind chutney, and fresh herbs for a tangy treat.", price: 6.99, img: "img/Papdichat.jpg", hasSpicyOption: true, category: "appetizers", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 15, name: "Heirloom Tomato soup", description: "Tomato extract in cream sauce.", price: 5.99, img: "img/HeirloomTomatosoup.jpg", hasSpicyOption: true, category: "soups",ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 16, name: "Lemon & Herb Infused Chicken Soup", description: "Delicately spiced chicken soup.", price: 5.99, img: "img/Lemon&Herbinfusedchickensoup.jpg", hasSpicyOption: true, category: "soups", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 17, name: "Artisanal Lentil Soup", description: "Pureed lentils with delicate spice.", price: 5.99, img: "img/ArtisanalLentilsoup.jpg", hasSpicyOption: true, category: "soups", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 18, name: "Hot & sour soup ", description: "Tangy and spicy soup with vegetables, tofu, and aromatic spices, balancing heat and sourness perfectly.", price: 5.99, img: "img/Hot-and-sour-soup.webp", hasSpicyOption: true, category: "soups", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  // { id: 19, name: "South touch sambar soup", description: "Traditional South Indian lentil soup with vegetables, tamarind, and aromatic spices, served hot and tangy.", price: 5.99, img: "img/South-Indian-Sambar.jpg", hasSpicyOption: true, category: "soups", ingredients: [ "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },


  { id: 20, name: "Tandoor-Kissed Naan", description: "Baked unleavened whole wheat bread.", price: 2.99, img: "img/TandoorKissedNaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 21, name: "Garlic butter naan", description: "Bread topped with fresh garlic and herbs.", price: 3.99, img: "img/GarlicbutterNaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 22, name: "Butter Roti", description: "Baked unleavened whole wheat bread.", price: 2.99, img: "img/ButterRoti.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 23, name: "Tandoor-Baked Onion Naan ", description: "Naan filled with onion homemade cheese, and spices.", price: 3.99, img: "img/TandoorBakedOnionNaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 24, name: "The Royal Paneer Naan", description: "Naan filled with homemade cheese, and spice.", price: 3.99, img: "img/TheRoyalPaneerNaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 26, name: "Chef special naan ", description: "Naan stuffed with chicken, onion, home made cheese & light spices.", price: 3.99, img: "img/special-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 28, name: "Keema Naan", description: "Naan filled with lamb meat and spiced.", price: 4.99, img: "img/Keemanaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 29, name: "Spiced chilli Naan", description: "Naan filled with spicy chilis.", price: 4.99, img: "img/chilli-naan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 25, name: "Amritsari Aloo Kulcha", description: "Naan filled with spiced potatoes.", price: 4.99, img: "img/AmritsariAlooKulcha.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 27, name: "Peshwari Naan", description: "Sweet naan stuffed with a mixture of nuts, raisins, and coconut, offering a delightful dessert-like flavor.", price: 3.99, img: "img/PeshwariNaan.jpg", hasSpicyOption: false, category: "breads", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },


  { id: 30, name: "Veggie pulao", description: "Rice cooked with vegetable and spices.", price: 15.99, img: "img/VeggiePulao.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 31, name: "Chicken biryani", description: "Basmati rice cooked with boneless chicken.", price: 15.99, img: "img/ChickenBiryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 32, name: "Lamb biryani", description: "Basmati rice cooked with boneless lamb.", price: 16.99, img: "img/LambBiryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 33, name: "Chef special Goat biryani", description: "Rice cooked with goat meat.", price: 16.99, img: "img/ChefspecialGoatBiryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 34, name: "Shrimp Briyani", description: "Shrimp cooked with rice and spices.", price: 16.99, img: "img/ShrimpBriyani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 35, name: "Royal biryani", description: "Lamb, chicken, shrimp, goat, and vegetable cooked with spices with rice.", price: 16.99, img: "img/royal-biryani.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 36, name: "Jira Rice", description: "", price: 6.99, img: "img/JeeraRice.jpg", hasSpicyOption: true, category: "pulao", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},

  { id: 37, name: "Mix vegitable", description: "Fresh vegetable cooked with spices onion, green peppers, and tomatoes.", price: 14.99, img: "img/Mixvegitable.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 38, name: "Spiced Blossom (Aloo Gobi)", description: "Cauliflower and potatoes cooked with fresh spices and ginger.", price: 14.99, img: "img/SpicedBlossom(AlooGobi).jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 39, name: "Classic punjabi dal Tadka", description: "Yellow lentils with blended spices.", price: 14.99, img: "img/ClassicpunjabiDaltadka.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 40, name: "House-Spiced Dal Makhani", description: "Black lentils with aromatic spices in a creamy sauce.", price: 14.99, img: "img/House-SpiccedDalMakhni.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 41, name: "Punjab's Finest Chana Masala", description: "Chickpeas cooked with herbs and spices, Punjabi style.", price: 14.99, img: "img/Punjab'sFinestChanaMasala.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: ["Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 42, name: "Bindi masala Punjabi style", description: "", price: 14.99, img: "img/bhindi-masala.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 43, name: "From the Fire ( baigan ka bartha )", description: "Chopped eggplant cooked with tomatoes, onion, green peas, and tasty spice.", price: 14.99, img: "img/FromtheFireBaigankabartha.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 45, name: "Navratan korma ", description: " Nine fresh vegetable with nuts in a mildly spiced, thick yogurt sauce.", price: 14.99, img: "img/Navratankorma.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 46, name: "Palak Chole, Punjabi Style", description: "Spinach and chickpeas cooked in tomato and onion gravy with light cream.", price: 14.99, img: "img/PalakCholePunjabstyle.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 47, name: "Creamy aloo saag ", description: "Potato cubes cooked with spinach and light spices.", price: 14.99, img: "img/Creamyaloosaag.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 48, name: "Aromatic Mushroom & Saag", description: "Tender mushrooms cooked with spinach, tomato, and onion sauce.", price: 14.99, img: "img/AromaticMushrom&Saag.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 49, name: "Restaurant Style Aloo mutter", description: "Potatoes cooked with green peas and spices.", price: 14.99, img: "img/RestaurantStyleAlooMutter.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 50, name: "Punjabi Kadhi, Aromatic & Creamy", description: "Crispy pastry dumplings stuffed with mildly spicy vegetable and cooked in a light yogurt sauce.", price: 14.99, img: "img/PunjabiKadhiAromatic&Creamy.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 51, name: "Veggie makhni", description: " Vegetable cooked in a tomato and cream sauce.", price: 14.99, img: "img/VeggieMakhni.jpg", hasSpicyOption: true, category: "vegetarian", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },    

  { id: 52, name: "Royal Paneer butter masala", description: "Cubes of paneer cooked in a mild cream sauce.", price: 15.99, img: "img/RoyalPaneerButterMasala.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 53, name: "Signature Palak Paneer", description: "Fresh spinach cooked with homemade cheese cubed in a special blend of spices.", price: 15.99, img: "img/SignaturePalakPaneer.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 54, name: "Paneer Bhurji Nawabi", description: "Homemade cheese cooked with fresh tomatoes, onion, spices in dry version.", price: 15.99, img: "img/PaneerBhurjiNawabi.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 55, name: "The Paneer Kadai", description: "Pieces of cheese sautéed with onion, green peppers, tomatoes, and exotic spices.", price: 15.99, img: "img/ThePaneerKadai.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 56, name: "Chef's Special Paneer Tikka Masala", description: "Homemade cheese cooked with a flavorful tomato sauce.", price: 15.99, img: "img/Chef'sSpecialPaneerTikkaMasala.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 57, name: "Shahi mutter Paneer", description: "Homemade cheese cooked with fresh tomatoes, onion, spices and creamy gravy.", price: 15.99, img: "img/ShahimutterPaneer.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 58, name: "Kajju Butter Masala", description: "", price: 15.99, img: "img/KajjuButterMasala.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 59, name: "Paneer Angara", description: "", price: 15.99, img: "img/paneer-angara.jpg", hasSpicyOption: true, category: "paneer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 44, name: "Chef special malai kofta ", description: " Fresh vegetables and cheese croquettes simmered in a mild cream sauce.", price: 15.99, img: "img/ChefSpecialMalaikofta.jpg", hasSpicyOption: true, category: "paneer", ingredients: [" Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },



  { id: 60, name: "Gourmet Chicken Tikka Masala", description: "Tender pieces of chicken tikka cooked with garlic, ginger, tomatoes and herbs.", price: 15.99, img: "img/GourmetChickeTikkaMasala.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 61, name: "Royal butter chicken", description: "Tender pieces of chicken tikka cooked in a mild, rich tomato sauce.", price: 15.99, img: "img/RoyalButterchicken.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 62, name: "Authentic chicken curry", description: "Mildly spiced pieces of chicken cooked in mild spices.", price: 15.99, img: "img/Authenticchickencurry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 63, name: "Shahi chicken korma", description: "Chicken cooked in a creamy sauce with cashews.", price: 15.99, img: "img/shahi-chicken-korma.webp", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 64, name: "Spiced & tangy Chicken vindaloo", description: "Chicken cooked in hot spices potatoes, and vinegar.", price: 15.99, img: "img/Spiced&tangyChickenvindaloo.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 65, name: "The chicken kadai ", description: "Chicken sautéed with onion, green peppers, tomatoes, and spices.", price: 15.99, img: "img/Thechickenkadai.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 66, name: "Punjab's finest chicken saag ", description: "Chicken cooked with mildly-spiced spinach, cream, and herbs.", price: 15.99, img: "img/Punjab'sfinestchickensaag.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 67, name: "Chicken jalfrezi", description: "", price: 15.99, img: "img/Chicken-Jalfrezi.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 68, name: "Chicken leg lovers (curry style)", description: "", price: 15.99, img: "img/Chicken-leg-curry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 69, name: "Aromatic Chicken Rogani", description: "Tender chunks of savory chicken cooked in yogurt , herb and spices", price: 15.99, img: "img/AromaticchickenRogani.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 70, name: "Fine Egg curry", description: "boiled eggs cooked in a blend of onion,tomato, ginger,garlic and spices.", price: 14.99, img: "img/FineEggcurry.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 71, name: "Coconut-Kissed Chicken Madras", description: "Boneless chicken pieces cooked in a coconut sauce.", price: 15.99, img: "img/CoconutKissedChickenMadras.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 72, name: "Fiery Angara Chicken with Aromatic Herbs", description: " Chicken pieces in a special garlic sauce.", price: 15.99, img: "img/angara-chicken.webp", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  // { id: 73, name: "Chicken pasanda", description: "", price: 15.99, img: "img/chicken-pasanda.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 74, name: "Chef's Special Kashmiri Chicken", description: "", price: 15.99, img: "img/kashmiri-chicken.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 75, name: "Mango chicken masala", description: "Chicken cooked with mango pulp.", price: 15.99, img: "img/Mangochickenmasala.jpg", hasSpicyOption: true, category: "chicken", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },



  { id: 76, name: "Authentic lamb curry ", description: "Tender pieces of lamb cooked in freshly ground spices and sauce.", price: 16.99, img: "img/Authenticlambcurry.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 77, name: "Gourmet lamb tikka masala ", description: "Tender pieces of lamb with garlic, ginger, and herbs.", price: 16.99, img: "img/Gourmetlambtikkamasala.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 78, name: "Butter lamb ", description: "cubed lamb cooked in rich and flavorful sauce.", price: 16.99, img: "img/Butterlamb.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 79, name: "Buna gost", description: "Pieces of lamb cooked with onion ginger, green peas, and spices.", price: 16.99, img: "img/Bunagost.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  // { id: 80, name: "Lamb psanda ", description: "", price: 16.99, img: "img/Lamb_Pasanda.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 81, name: "Lamb kadai ", description: "Lamb sauteed with onion, green peppers,tomatoes, and spices.", price: 16.99, img: "img/LambKadai.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 82, name: "Lamb rogan josh ", description: "Tender morsels of lamb cooked in freshly ground spices and mild sauce, with a touch of yogurt.", price: 16.99, img: "img/Lambroganjosh.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 83, name: "Lamb korma ", description: "Pieces of lamb cooked in a yogurt sauce with cashews.", price: 16.99, img: "img/Lambkorma.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 84, name: "Lamb saag", description: " Cubed lamb cooked with freshly chopped spinach in a rich sauce.", price: 16.99, img: "img/Lambsaag.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 85, name: "Lamb angara", description: "Lamb pieces cooked in a special garlic sauce.", price: 16.99, img: "img/lamb-angara.webp", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 86, name: "Goat curry", description: "Tender pieces of goat cooked with freshly graound spices and ssauce.", price: 16.99, img: "img/Goatcurry.jpg", hasSpicyOption: true, category: "lamb", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},





  { id: 87, name: "Tandoori chicken(6)", description: "Chicken legs marinated in homemade fresh yogurt and freshly ground herbs, tenderly barbecued in our clay oven.", price: 16.99, img: "img/Tandoorichicken.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 88, name: "Chicken tikka", description: "Succulent cubes of chicken  breast, subtly marinated in yogurt and specially blended spices and broiled in tandoor.", price: 16.99, img: "img/Chickentikka.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 89, name: "Seekh kabab", description: "Finely minced chicken seasoned with fresh onion and herbs, cooked on skewers.", price: 16.99, img: "img/Seekhkabab.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 90, name: "tandoori fish ", description: "Salmon marinated in aromatic herbs and spices, then broiled in the tandoor.", price: 16.99, img: "img/TandooriFish.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"],type: "food" },
  { id: 91, name: "Tandoori shrimp", description: "Subtly seasoned shrimp with spices and green herbs, simmerd in our clay oven .", price: 16.99, img: "img/Tandoorishrimp.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  { id: 92, name: "Mix Grill ", description: "An assortment of chicken, lamb and shrimp, individuallyy marinated and reasted.", price: 17.99, img: "img/MixGrill.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  // { id: 93, name: "Malai kabab", description: "", price: 15.99, img: "img/malai-kabab.webp", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},
  // { id: 94, name: "Lamb chop", description: "", price: 21.99, img: "img/lamb-chops.jpg", hasSpicyOption: true, category: "tandoori", ingredients: ["Grilled chicken", "Fresh basil pesto", "Cherry tomatoes", "Mixed greens", "Parmesan cheese", "Pine nuts"] ,type: "food"},



  { id: 95, name: "Fish or shrimp curry ", description: " Shrimp or salmon cooked in a mildly spices sauce.", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 96, name: "Fish or shrimp tikka masala ", description: "Shrimp or salmon cooked with spices in a light cream sauce.", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 97, name: "Butter shrimp or fish ", description: "Shrimp or salmon cooked in a rich sauce with mild spices.", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 98, name: "Fish or shrimp vindaloo", description: "Shrimp or salmon cooked in tangy tomato and curry saice with cubed potatoes and fresh spices.", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 99, name: "Fish or shrimp saag", description: "Shrimp or salmon cooked with mildly spiced spinach and touch of cream .", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 100, name: "Fish or shrimp korma ", description: "Shrimp or salmon cooked in creamy sauce with cashews.", price: 16.99, img: "", hasSpicyOption: true, category: "seafood", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},



  // { id: 101, name: "Chilli paneer", description: " Cubes of paneer sauteed with onion and bell peppers in a tangy sauce.", price: 12.99, img: "img/chilli-paneer.jpg", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 102, name: "Vegi manchurian", description: "", price: 12.99, img: "img/veg-manchurian.jpg", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 103, name: "Chilli chicken", description: "Batter fried chicken cubes tossed with diced bell pappers, onoin,ginger and garlic finished with a spicy sauce.", price: 13.99, img: "img/chilli-chicken.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 104, name: "Lamb chilli", description: "", price: 14.99, img: "img/lamb-chilli.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 105, name: "Wok-Tossed chicken fried rice", description: "Basmati rice sauteed with chicken cubes, carrots,cabbage,bell pappeer and garnish with spring onion.", price: 9.99, img: "img/chicken-fried-rice.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 106, name: "Wok-Tossed Egg Fried Rice", description: "Basmati rice sauteed with Eggs, carrots,cabbage,bell pappeer and garnish with spring onion.", price: 10.99, img: "img/EggFriedRice.webp", hasSpicyOption: true, category: "indo-chinese", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},


  { id: 107, name: "Mango lassi ", description: "A refreshing yogurt drink,with and sugar.", price: 4.99, img: "img/Mangolassi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food"},
  { id: 108, name: "Sweet lassi ", description: "A cool yogurt drink.", price: 4.99, img: "img/Sweetlassi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 109, name: "Salty lassi with jeera ", description: "A cool yogurt drink with salt and crushed cumin.", price: 4.99, img: "img/salted-lassi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 110, name: "Badam milk ", description: "", price: 4.99, img: "img/BadamMilk.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  // { id: 111, name: "Mango milk shake", description: "", price: 4.99, img: "img/MangoMilkshake.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 112, name: "Orange juice ", description: "", price: 2.99, img: "img/Orangejuice.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 113, name: "Pineapple juice ", description: "", price: 2.99, img: "img/Pineapplejuice.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 114, name: "Indian Lime soda ", description: "", price: 4.99, img: "img/lime-soda.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  { id: 115, name: "Pepsi", description: "", price: 2.99, img: "img/pepsi.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 116, name: "Diet Pepsi", description: "", price: 2.99, img: "img/diet-pepsi.webp", hasSpicyOption: false, category: "cold-beverages", ingredients:["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 117, name: "Lemonade", description: "", price: 2.99, img: "img/lemonade.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 118, name: "Starry", description: "", price: 2.99, img: "img/starry.webp", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 119, name: "Mt. Dew", description: "", price: 2.99, img: "img/Mountain-Dew.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 120, name: "Root Beer", description: "", price: 2.99, img: "img/root-beer.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 121, name: "Water Bottle", description: "", price: 1.99, img: "img/water.jpg", hasSpicyOption: false, category: "cold-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },


  { id: 122, name: "Chai", description: "", price: 2.99, img: "img/Chai.jpg", hasSpicyOption: false, category: "hot-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] ,type: "food"},
  // { id: 123, name: "Indian style coffee ", description: "", price: 3.99, img: "img/coffee1.jpg", hasSpicyOption: false, category: "hot-beverages", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },


  { id: 124, name: "Rasmalai", description: "Homemade cheese pieces dipped in sweetened milk, flavored with pistachios and rose water,served cold ", price: 4.99, img: "img/Rasmalai.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 125, name: "Gulab jamun ", description: "Homemade soft milk balls dipped in honey syrup", price: 3.99, img: "img/Gulabjamun.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 126, name: "Badam kheer", description: "Homemade rice pudding flavored with cardamom", price: 3.99, img: "img/Badamkheer.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 127, name: "Gajar halwa", description: "Carrot halwa is a classic sweet dish made with carrot,sugar,card-amom powder and milk", price: 4.99, img: "img/Gajarhalwa.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 128, name: "Kulfi ", description: "Indian style ice cream with nutty taste of pistachios,almonds and touch of rosewater", price: 3.99, img: "img/Kulfi.jpg", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  // { id: 129, name: "Pishtasho kulfi", description: "", price: 3.99, img: "img/pistakulfi.webp", hasSpicyOption: false, category: "desserts", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },


  { id: 130, name: "Raita", description: "Homemade yogurt with cucumber, potatoes and mild spice", price: 2.99, img: "img/Raita.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 131, name: "Plain yogurt", description: "", price: 2.99, img: "img/Plainyogurt.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 132, name: "Mint chutney", description: "", price: 1.99, img: "img/Mintchutney.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 133, name: "Tamred chutney", description: "", price: 1.99, img: "img/Tamarindchutney.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 134, name: "Indian pickle ( achar )", description: "", price: 1.99, img: "img/Indianpickle(Achar).jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 135, name: "Mango chutney", description: "", price: 2.99, img: "img/MangoChutney.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  // { id: 136, name: "Coconut chutney", description: "", price: 2.99, img: "img/coconut-chutner.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  { id: 137, name: "House Green salad", description: "", price: 5.99, img: "img/HouseGreensalad.jpg", hasSpicyOption: false, category: "salad", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "food" },
  
  

  // bar menus
  { id: 138, name: "Cabernet-Sauvignon", description: "Full-bodied red wine with rich dark fruit flavors, tannins, and oak notes, perfect with red meats.", price: 8.00,price2: 30.00, img: "img/Cabernet-Sauvignon.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ],type: "bar" },
  { id: 139, name: "Malbec", description: "Bold red wine with dark fruit flavors, smooth tannins, and a velvety finish, pairs well with grilled meats.", price: 8.00,price2: 30.00, img: "img/malbec.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar" },
  { id: 140, name: "Pinot Noir", description: "Elegant red wine with cherry and berry flavors, light-bodied with smooth tannins, versatile and refined.", price: 8.00,price2: 30.00, img: "img/Pinot-Noir.webp", hasSpicyOption: false, category: "wines", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar" },
  { id: 141, name: "Chardonnay", description: "Full-bodied white wine with buttery, oaky flavors and citrus notes, smooth and rich, pairs with creamy dishes.", price: 8.00,price2: 30.00, img: "img/Chardonnay.png", hasSpicyOption: false, category: "wines", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar" },
  { id: 142, name: "Moscato", description: "Sweet, light white wine with floral and fruity flavors, low alcohol, refreshing and perfect for desserts.", price: 8.00,price2: 30.00, img: "img/Moscato.jpg", hasSpicyOption: false, category: "wines", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar" },
  
  
  { id: 143, name: "Heineken", description: "Premium Dutch lager with a crisp, refreshing taste and balanced bitterness, smooth and golden.", price: 6.00, img: "img/heineken.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 144, name: "Corona Extra", description: "Light Mexican lager with a crisp, refreshing taste, best served with a lime wedge, smooth and easy-drinking.", price: 6.00, img: "img/corona-extra-beer.jpeg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 145, name: "Stella", description: "Belgian pilsner with a crisp, refreshing taste and balanced bitterness, smooth and golden, easy-drinking.", price: 6.00, img: "img/stella.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 146, name: "Modelo", description: "Mexican lager with a smooth, crisp taste and light body, refreshing and perfect for any occasion.", price: 6.00, img: "img/modelo.webp", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 147, name: "Riggs", description: "Craft beer with unique flavors, smooth and refreshing, perfect for beer enthusiasts seeking quality.", price: 6.00, img: "img/riggs.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 148, name: "Anti Hero", description: "Craft IPA with hoppy bitterness and citrus notes, bold and flavorful, perfect for IPA lovers.", price: 6.00, img: "img/anti-hero.jpeg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 149, name: "Golden Monkey", description: "Belgian-style tripel ale with complex flavors, fruity notes, and higher alcohol content, bold and rich.", price: 6.00, img: "img/golden-monkey.jpg", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 150, name: "Samuel Adam", description: "American craft lager with rich, full flavor and balanced taste, smooth and refreshing, classic choice.", price: 6.00, img: "img/samuel-adams.webp", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 151, name: "Blue Moon", description: "Belgian-style wheat ale with orange peel and coriander, smooth, citrusy, and refreshing, served with orange slice.", price: 6.00, img: "img/bluemoon.webp", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] , type: "bar" },
  { id: 152, name: "N.A. Beer", description: "Non-alcoholic beer with the taste of traditional beer, refreshing and perfect for those avoiding alcohol.", price: 6.00, img: "img/bluemoon.webp", hasSpicyOption: false, category: "beers", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  
  
  
  { id: 153, name: "Haywords 5000", description: "Strong Indian beer with bold flavors and higher alcohol content, smooth and refreshing, perfect for celebrations.", price: 8.00, img: "img/HAYWARDS.jpg", hasSpicyOption: false, category: "indian-beer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 154, name: "Taj Mahal", description: "Premium Indian lager with a smooth, crisp taste and balanced flavor, refreshing and easy-drinking.", price: 8.00, img: "img/tajmahal.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 155, name: "Flying Horse", description: "Indian strong beer with bold flavors and higher alcohol content, smooth and refreshing, perfect for beer lovers.", price: 8.00, img: "img/flying-horse.jpg", hasSpicyOption: false, category: "indian-beer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 156, name: "Kingfisher", description: "Popular Indian lager with a light, crisp taste and smooth finish, refreshing and perfect with spicy food.", price: 6.00, img: "img/kingfisher.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 157, name: "Maharaja", description: "Premium Indian beer with rich, full flavor and smooth taste, refreshing and perfect for royal dining.", price: 6.00, img: "img/maharaja-beer.jpg", hasSpicyOption: false, category: "indian-beer", ingredients:["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 158, name: "Beera", description: "Craft Indian beer with unique flavors and smooth taste, refreshing and perfect for modern beer enthusiasts.", price: 6.00, img: "img/bira.webp", hasSpicyOption: false, category: "indian-beer", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  
  
  { id: 159, name: "Blue Label", description: "Premium blended Scotch whisky with exceptional smoothness and complexity, aged to perfection, luxurious and refined.", price: 24.00, img: "img/blue-label.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 160, name: "The Macallan 15", description: "Premium single malt Scotch whisky aged 15 years, rich with sherry oak influence, smooth and complex.", price: 20.00, img: "img/macallan.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 161, name: "Glenlivet 18", description: "Aged single malt Scotch whisky with rich, complex flavors, smooth finish, and elegant character, premium quality.", price: 17.00, img: "img/glenlivet-18.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 162, name: "The Macallan 12", description: "Single malt Scotch whisky aged 12 years, smooth with sherry oak notes, rich and balanced, classic choice.", price: 17.00, img: "img/macallan12.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 163, name: "Glenlivet 12", description: "Classic single malt Scotch whisky with smooth, fruity flavors and a light, balanced finish, approachable and refined.", price: 13.00, img: "img/Glenlivet.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 164, name: "Glenfiddich 12", description: "Single malt Scotch whisky with pear and oak flavors, smooth and balanced, perfect for whisky enthusiasts.", price: 13.00, img: "img/Glenfiddich-12.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 165, name: "Black Label", description: "Premium blended Scotch whisky with rich, complex flavors, smooth finish, and exceptional quality, aged 12 years.", price: 13.00, img: "img/blacklabel.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 166, name: "Indri", description: "Premium Indian single malt whisky with rich, complex flavors, smooth finish, and distinctive character.", price: 13.00, img: "img/indri.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 167, name: "Woodford Reserve", description: "Premium Kentucky bourbon with rich, complex flavors, smooth finish, and notes of vanilla and oak.", price: 10.00, img: "img/woodford.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 168, name: "Hennessy", description: "Premium cognac with rich, smooth flavors, aged to perfection, elegant and refined, perfect for sipping.", price: 10.00, img: "img/hennessy.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 169, name: "Red Label", description: "Classic blended Scotch whisky with smooth, balanced flavors, versatile and perfect for cocktails or neat.", price: 10.00, img: "img/redlabel.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 170, name: "Jack Deniel", description: "Tennessee whiskey with smooth, mellow flavors and distinctive charcoal filtering, classic and iconic.", price: 7.00, img: "img/jackdaniels.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 171, name: "Dewar's", description: "Blended Scotch whisky with smooth, balanced flavors, aged and refined, perfect for cocktails or sipping.", price: 7.00, img: "img/dewars.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] , type: "bar" },
  { id: 172, name: "Crown Royal", description: "Canadian whisky with smooth, mellow flavors and a rich finish, elegant and refined, perfect for any occasion.", price: 7.00, img: "img/crown-royal.png", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 173, name: "Jameson", description: "Irish whiskey with smooth, triple-distilled flavors, light and approachable, perfect for cocktails or neat.", price: 7.00, img: "img/jameson.jpg", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 174, name: "Patiala Peg", description: "Indian whisky with bold flavors and smooth finish, named after the royal city, strong and flavorful.", price: 7.00, img: "img/patialapeg.webp", hasSpicyOption: false, category: "whiskey", ingredients:["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ] , type: "bar" },
  { id: 175, name: "Our Choice", description: "House-selected premium whisky with exceptional quality and smooth flavors, carefully chosen for discerning palates.", price: 11.00, img: "img/ourchoise.webp", hasSpicyOption: false, category: "whiskey", ingredients:["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 176, name: "Guest Choice", description: "Ultra-premium whisky selection for special occasions, exceptional quality and smoothness, the finest available.", price: 24.00, img: "img/guestchoise.webp", hasSpicyOption: false, category: "whiskey", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  
  
  { id: 177, name: "Grey Goose", description: "Premium French vodka with exceptional smoothness and clean taste, distilled from fine French wheat, luxurious.", price: 13.00, img: "img/Grey-Goose.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 178, name: "Absolute", description: "Swedish vodka with smooth, clean taste and crisp finish, perfect for cocktails or shots, classic choice.", price: 7.00, img: "img/absolutevodka.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 179, name: "Tito's", description: "American craft vodka with smooth, clean taste, distilled from corn, perfect for cocktails, popular choice.", price: 7.00, img: "img/titosvodka.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 180, name: "Smirnoff", description: "Russian vodka with smooth, clean taste and crisp finish, versatile and perfect for cocktails or shots.", price: 7.00, img: "img/smirnoff.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 181, name: "Don Julio Anejo", description: "Premium aged tequila with rich, complex flavors, smooth finish, and notes of oak and vanilla, luxurious.", price: 10.00, img: "img/donjulio.webp", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 182, name: "Don Julio Repesado", description: "Premium rested tequila with smooth, balanced flavors, aged in oak barrels, perfect for sipping or cocktails.", price: 10.00, img: "img/Don-Julio-Reposado.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 183, name: "Patron Anejo", description: "Premium aged tequila with rich, smooth flavors, aged in oak barrels, elegant and refined, perfect for sipping.", price: 10.00, img: "img/patron.webp", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 184, name: "Patron Blanco", description: "Premium silver tequila with clean, crisp agave flavors, smooth and perfect for cocktails or shots.", price: 7.00, img: "img/patronblanco.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 185, name: "1800", description: "Premium tequila with smooth, clean agave flavors, perfect for cocktails or shots, quality and affordable.", price: 7.00, img: "img/1800.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 186, name: "Jose Cuervo", description: "Classic tequila with smooth, authentic agave flavors, perfect for margaritas and cocktails, iconic and reliable.", price: 5.00, img: "img/jose.jpg", hasSpicyOption: false, category: "vodka", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  
  
  { id: 187, name: "Dirty Martini", description: "Classic martini with olive brine, vodka or gin, and dry vermouth, savory, briny, and sophisticated, garnished with olives.", price: 10.00, img: "img/martini.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 188, name: "Sex on the Beach", description: "Tropical cocktail with vodka, peach schnapps, cranberry, and orange juice, sweet, fruity, and refreshing.", price: 10.00, img: "img/sotb.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 189, name: "Mojito's", description: "Refreshing cocktail with white rum, fresh mint, lime, sugar, and soda water, cool, minty, and invigorating.", price: 10.00, img: "img/mojito.webp", hasSpicyOption: false, category: "cocktails", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 190, name: "Bloody Marry", description: "Classic brunch cocktail with vodka, tomato juice, spices, and Worcestershire sauce, savory, spicy, and bold.", price: 10.00, img: "img/bloodmarry.jpg", hasSpicyOption: false, category: "cocktails", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 191, name: "Blue Hawaii", description: "Tropical cocktail with rum, blue curacao, pineapple juice, and coconut, sweet, fruity, and vibrant blue color.", price: 10.00, img: "img/BlueHawaii.jpg", hasSpicyOption: false, category: "cocktails", ingredients:["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  { id: 192, name: "Long Island Ice Tea", description: "Strong cocktail with vodka, rum, gin, tequila, triple sec, lemon, and cola, potent, sweet, and deceptively smooth.", price: 10.00, img: "img/longisland.webp", hasSpicyOption: false, category: "cocktails", ingredients: ["Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient","Ingredient", ], type: "bar"  },
  
].map(item => ({
  ...item,
  hasSpicyOption: item.hasSpicyOption !== undefined ? item.hasSpicyOption : false,
  ingredients: item.ingredients || [],    // Ensure ingredients array exists
  type: item.type || (['wines', 'beers', 'indian-beer', 'whiskey', 'vodka', 'cocktails'].includes(item.category) ? 'bar' : 'food'), // Default to 'food' for existing items 
  price2: item.price2 || null // Ensure price2 exists
}));



// Menu Type Filter Component - Place this outside LandingPage
const _MenuTypeFilter = ({ menuTypes, activeType, onTypeChange }) => {
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


const PriceDisplay = ({ item, onPriceSelect, selectedPrice }) => {
  if (item.price2) {
    return (
      <div className="dual-price-selector">
        <div className="price-options">
          <button
            type="button"
            className={`price-option ${selectedPrice === 'price' ? 'selected' : ''}`}
            onClick={() => onPriceSelect('price')}
          >
            <span className="price-label">Glass</span>
            <span className="price-value">${item.price.toFixed(2)}</span>
          </button>
          <button
            type="button"
            className={`price-option ${selectedPrice === 'price2' ? 'selected' : ''}`}
            onClick={() => onPriceSelect('price2')}
          >
            <span className="price-label">Bottle</span>
            <span className="price-value">${item.price2.toFixed(2)}</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <span className="single-price">${item.price.toFixed(2)}</span>
    );
  }
};


// MenuCard Component - Show total count irrespective of spicy level
const MenuCard = ({ item, cart, addToCart, setCart, onAddWithSpicyLevel ,setShowSpicyModal, setSelectedItem }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('price');
  
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
      <div className="chefs-special-card">
        <div className={`chefs-special-image-wrapper${!item.img ? ' no-image' : ''}`}>
          {item.img ? <img className="chefs-special-image" src={item.img} alt={item.name} /> : null}
          {/* Veg/Non-Veg Badge */}
          {(item.isVeg !== undefined) && (
            <span className={item.isVeg ? 'chefs-special-veg-badge' : 'chefs-special-meat-badge'}>
              <i className={`fas ${item.isVeg ? 'fa-leaf' : 'fa-drumstick-bite'}`}></i>
            </span>
          )}
          {/* Ingredients Toggle Button */}
          {/* {item.ingredients && item.ingredients.length > 0 && (
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
          )} */}
        </div>
        <div className="chefs-special-card-content">
          <h3 className="chefs-special-dish-title">{item.name}</h3>
          {/* Description */}
          {item.description && (
            <p className="chefs-special-description">{item.description}</p>
          )}
          {/* Spice Level */}
          {item.hasSpicyOption && (
            <div className="chefs-special-spice">
              <i className="fas fa-fire me-2"></i>
              <span>Spice: {spicyLevels.map(level => level.name).join(', ')}</span>
            </div>
          )}
          <div className="chefs-special-separator"></div>
          <div className="chefs-special-price-row menu-details">
            <span className="chefs-special-price">
              <PriceDisplay   
                item={item} 
                onPriceSelect={setSelectedPrice}
                selectedPrice={selectedPrice}
              />
            </span>
            {totalQuantity === 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  if (item.hasSpicyOption) {
                    setSelectedItem({...item, selectedPrice});
                    setShowSpicyModal(true);
                  } else {
                    addToCart(item, null, selectedPrice);
                  }
                }}
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
                      (!item.hasSpicyOption || cartItem.spicyLevel?.id === item.spicyLevel?.id)
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
                  onClick={() => {
                    if (item.hasSpicyOption) {
                      setSelectedItem({...item, selectedPrice});
                      setShowSpicyModal(true);
                    } else {
                      addToCart(item, null, selectedPrice);
                    }
                  }}
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
            {/* Header – close icon top right */}
            <div className="modal-headerr p-0 ingredients-modal-header">
              <button
                type="button"
                className="ingredients-modal-close-icon"
                onClick={() => setShowIngredients(false)}
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Content – image and body scroll together */}
            <div className="modal-contentt">
              <div className={`ingredients-modal-dish-image-wrap${!item.img ? ' no-image' : ''}`}>
                {item.img ? <img src={item.img} alt={item.name} className="dish-thumbnail" /> : null}
              </div>
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
          </div>
        </div>
      )}
    </>
  );
};



// MenuCategory Component
const _MenuCategory = ({ category, isActive, onClick, onHover, image }) => {
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
const _AdminPanel = ({ 
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
  const [_isUploading, setIsUploading] = useState(false);
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


    const _mobileNavigation = {
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
                          value={currentItem.price2 || ''}
                          onChange={(e) => setCurrentItem({...currentItem, price2: e.target.value || null})}
                          
                        />
                         <label>Second Price ($) - Optional</label>
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
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState(spicyLevels[0]); // Default to Mild
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setSelectedSpicyLevel(spicyLevels[0]);
      setSelectedExtras([]);
      setRemovedIngredients([]);
      setSpecialInstructions("");
    }
  }, [show]);

  const availableExtras = ['Extra Cheese', 'Extra Spices', 'Extra Onions', 'Extra Tomatoes'];
  const availableIngredients = item?.ingredients || ['Chicken', 'Yogurt', 'Garlic', 'Ginger', 'Spices'];

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => 
      prev.includes(extra) 
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  const toggleIngredient = (ingredient) => {
    setRemovedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

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
    onConfirm({
      spicyLevel: selectedSpicyLevel,
      extras: selectedExtras,
      removedIngredients: removedIngredients,
      instructions: specialInstructions.trim()
    });
    onClose();
  };
    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSpicyLevelColor = (level) => {
    const colors = [
      '#4CAF50', // Mild - Dark Green
      '#66BB6A', // Mild Plus - Light Green
      '#FFC107', // Medium - Yellow/Orange
      '#FF9800', // Medium Plus - Orange
      '#F44336', // Hot - Red
      '#B71C1C'  // Extra Hot - Dark Red (faded when disabled)
    ];
    return colors[level - 1] || '#FFC107';
  };

   const getSpicyIcon = (level) => {
    const levelData = spicyLevels.find(l => l.id === level);
    const chiliCount = levelData?.chiliCount || 1;
    const color = getSpicyLevelColor(level);
    return (
      <span className="chili-icons" style={{ color }}>
        {[...Array(chiliCount)].map((_, i) => (
          <i key={i} className="fas fa-pepper-hot"></i>
        ))}
      </span>
    );
  };


  if (!item) return null;

  const isVegetarian = item.type === 'vegetarian' || (item.type === 'food' && !item.name.toLowerCase().includes('chicken') && !item.name.toLowerCase().includes('meat') && !item.name.toLowerCase().includes('fish'));

  return (
    <div className="customize-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="customize-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="customize-modal-header">
          <h2 className="dish-name">{item.name}</h2>
          <button
            type="button"
            className="btn-close-customize"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="customize-modal-scrollable">
          {/* Dish Image */}
          <div
            className={`dish-image-container${!item.img ? " no-image" : ""}`}
          >
            {item.img ? (
              <img src={item.img} alt={item.name} className="dish-image" />
            ) : null}
          </div>

          {/* Dietary + Price */}
          <div className="dietary-row">
            <div className="dietary-tag">
              <i
                className={`fas ${isVegetarian ? "fa-leaf" : "fa-drumstick-bite"}`}
              ></i>
              <span>{isVegetarian ? "Vegetarian" : "Non-Vegetarian"}</span>
            </div>
            <div className="dish-price">${item.price}</div>
          </div>

          {/* Dish Description */}
          {item.description && (
            <div className="dish-description">{item.description}</div>
          )}

          {/* Customize Spice Level Section */}
          <div className="customize-section customize-section-spice-level">
            <div className="section-header">
              <h3>Customize Spice Level</h3>
              <span className="required-badge">Required</span>
            </div>
            <p className="section-instruction">
              Choose your preferred spice intensity. You can customize this for
              any dish.
            </p>

            <div className="spice-options-horizontal">
              {spicyLevels.map((level) => (
                <button
                  key={level.id}
                  className={`spice-option-btn level-${level.id} ${selectedSpicyLevel.id === level.id ? "selected" : ""} ${level.id === 6 ? "disabled" : ""}`}
                  onClick={() => level.id !== 6 && setSelectedSpicyLevel(level)}
                  disabled={level.id === 6}
                  style={{
                    backgroundColor:
                      selectedSpicyLevel.id === level.id
                        ? getSpicyLevelColor(level.id)
                        : "rgba(255,255,255,0.05)",
                    borderColor:
                      selectedSpicyLevel.id === level.id
                        ? getSpicyLevelColor(level.id)
                        : "#444",
                    color:
                      selectedSpicyLevel.id === level.id
                        ? "#fff"
                        : level.id === 6
                          ? "#666"
                          : getSpicyLevelColor(level.id),
                    opacity: level.id === 6 ? 0.35 : 1,
                  }}
                >
                  <span className="spice-icon">{getSpicyIcon(level.id)}</span>
                  <span className="spice-name">{level.name}</span>
                </button>
              ))}
            </div>

            <div className="spice-notes">
              <p>Note: Some spice levels may not be available for this dish.</p>
              <p>
                Select your preferred spice level. This customization is
                available for all dishes.
              </p>
            </div>
          </div>

          {/* Customize Your Dish Section */}
          <div className="customize-section">
            <h3
              style={{
                color: "rgb(245 245 245/var(--tw-text-opacity,1))",
                fontFamily:
                  '"Playfair Display","Playfair Display Fallback", serif',
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
            >
              Customize Your Dish
            </h3>

            {/* Add Extras */}
            <div className="customize-subsection">
              <h4>Add Extras</h4>
              <div className="customize-options">
                {availableExtras.map((extra) => (
                  <button
                    key={extra}
                    className={`customize-option-btn ${selectedExtras.includes(extra) ? "selected" : ""}`}
                    onClick={() => toggleExtra(extra)}
                  >
                    {extra}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="customize-subsection">
              <h4>Special Instructions</h4>
              <textarea
                className="customize-instructions-textarea"
                placeholder="e.g. No onions, extra sauce on the side, allergies..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
              />
            </div>

            {/* Remove Ingredients */}
            {/* <div className="customize-subsection">
              <h4>Remove Ingredients</h4>
              <div className="customize-options">
                {availableIngredients.map(ingredient => (
                  <button
                    key={ingredient}
                    className={`customize-option-btn ${removedIngredients.includes(ingredient) ? 'selected' : ''}`}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <div className="customize-modal-footer">
          <button className="btn-add-to-cart" onClick={handleConfirm}>
            Add to Cart - ${item.price}
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



const LandingPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [_scrollPosition, _setScrollPosition] = useState(0);

// In your LandingPage component, add these state variables
const [activeCategory, setActiveCategory] = useState('appetizers');
const [_hoveredCategory, _setHoveredCategory] = useState(null);
const [_categoryImage, setCategoryImage] = useState('img/appetizers.jpg');
const [_mobileMenuOpen, _setMobileMenuOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');

  // Add menu type filter state
  const [menuType, setMenuType] = useState('food');

  // Define menu types
  const _menuTypes = [
    { id: 'food', name: 'Food Menu', icon: 'fas fa-utensils' },
    { id: 'bar', name: 'Bar Menu', icon: 'fas fa-glass-cheers' }
  ];

  // New state for spicy level modal
  const [showSpicyModal, setShowSpicyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load menuItems from localStorage or use default
  const [menuItems, setMenuItems] = useState(() => {
    const stored = localStorage.getItem('menuItems');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.length > 0 ? parsed : defaultMenuItems;
      } catch (e) {
        return defaultMenuItems;
      }
    }
    return defaultMenuItems;
  });

  // Sync menuItems to localStorage
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  // Page SEO (title and meta description)
  useEffect(() => {
    setPageSEO({
      title: 'SangEat | Authentic Indian Restaurant in Champaign',
      description: 'SangEat – Authentic Indian restaurant in Champaign. Savor freshly prepared dishes. Dine in, takeout, or delivery. Order online or book a table.'
    });
    return () => setPageSEO({});
  }, []);
  
  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');


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
  // {
  //   id: 'indo-chinese',
  //   name: 'Indo Chinese Entrees',
  //   description: 'Fusion flavors',
  //   image: 'img/side-dishes.jpg',
  //   icon: 'fas fa-hotdog',
  //   type: 'food',
  //   items: menuItems.filter(item => item.category === 'indo-chinese')
  // },
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
  const _allCategories = [...menuCategories, ...barCategories];

    // Get current categories based on menu type
  const _currentCategories = menuType === 'food' ? menuCategories : barCategories;

    // Filter items based on current menu type and active category
// Filter items based on current menu type, active category, and search query
// Filter items based on current menu type, active category, and search query
const filteredItems = useMemo(() => {
  return menuItems.filter(item => {
    const matchesType = item.type === menuType;
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
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


// In addToCart function, you might want to specify which price is being added
// customizationOptions: { extras, removedIngredients, instructions } from SpicyLevelModal
const addToCart = (item, spicyLevel = null, selectedPrice = 'price', customizationOptions = null) => {
  const selectedPriceValue = selectedPrice === 'price2' ? item.price2 : item.price;
  
  setCart((prevCart) => {
    const existingItem = prevCart.find((i) => 
      i.id === item.id && 
      (!item.hasSpicyOption || i.spicyLevel?.id === (spicyLevel?.id || 3)) &&
      i.selectedPrice === selectedPrice // Also match the selected price type
    );
    
    if (existingItem) {
      return prevCart.map((i) =>
        i.id === item.id && 
        (!item.hasSpicyOption || i.spicyLevel?.id === (spicyLevel?.id || 3)) &&
        i.selectedPrice === selectedPrice
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    } else {
      const cartItem = {
        ...item,
        qty: 1,
        spicyLevel: item.hasSpicyOption ? (spicyLevel || spicyLevels[2]) : null,
        selectedPrice: selectedPrice,
        finalPrice: selectedPriceValue,
        ...(customizationOptions && {
          extras: customizationOptions.extras,
          removedIngredients: customizationOptions.removedIngredients,
          instructions: customizationOptions.instructions
        })
      };
      return [...prevCart, cartItem];
    }
  });

  
};

// New function to handle spicy level selection
const handleAddWithSpicyLevel = (item, selectedPrice = 'price') => {
  if (item.hasSpicyOption) {
    setSelectedItem({...item, selectedPrice});
    setShowSpicyModal(true);
  } else {
    addToCart(item, null, selectedPrice);
  }
};


  const total = cart.reduce((sum, item) => sum + item.finalPrice * item.qty, 0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  // testimonials starts
  // Testimonial carousel functionality
// useEffect(() => {
//   const testimonialSlides = document.querySelectorAll('.testimonial-slide');
//   const dots = document.querySelectorAll('.dot');
//   const prevBtn = document.querySelector('.prev-btn');
//   const nextBtn = document.querySelector('.next-btn');
//   let currentSlide = 0;

//   function showSlide(index) {
//     // Hide all slides
//     testimonialSlides.forEach(slide => {
//       slide.classList.remove('active');
//     });
//     dots.forEach(dot => {
//       dot.classList.remove('active');
//     });
    
//     // Show the selected slide
//     testimonialSlides[index].classList.add('active');
//     dots[index].classList.add('active');
//     currentSlide = index;
//   }

//   // Next slide function
//   function nextSlide() {
//     let nextIndex = (currentSlide + 1) % testimonialSlides.length;
//     showSlide(nextIndex);
//   }

//   // Previous slide function
//   function prevSlide() {
//     let prevIndex = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
//     showSlide(prevIndex);
//   }

//   // Add event listeners
//   if (nextBtn) nextBtn.addEventListener('click', nextSlide);
//   if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
//   // Add click events to dots
//   dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//       showSlide(index);
//     });
//   });

//   // Auto slide every 5 seconds
//   const autoSlide = setInterval(nextSlide, 5000);

//   // Clean up interval on component unmount
//   return () => clearInterval(autoSlide);
// }, []);

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


const [_showSidebar, setShowSidebar] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);

const _handleCheckout = () => {
  setShowSidebar(false);   // close sidebar
  setShowCheckout(true);   // open checkout modal
};

// Checkout UI Ends


// const [checkoutStep, setCheckoutStep] = useState(1);
const [_deliveryAddress, _setDeliveryAddress] = useState({
  name: '',
  mobile: '',
  address: 'Himayath Nagar, Hyderabad',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500081'
});
// const [paymentMethod, setPaymentMethod] = useState('');
const [_upiId, _setUpiId] = useState('');


const [checkoutStep, setCheckoutStep] = useState(1);
const deliveryOptionsHeaderRef = useRef(null);
const paymentHeaderRef = useRef(null);
const [_userLoggedIn, setUserLoggedIn] = useState(false);
const [noContactDelivery, setNoContactDelivery] = useState(true);
const [paymentMethod, setPaymentMethod] = useState('upi');
const [showSignupForm, setShowSignupForm] = useState(false);


// Function to reset checkout state
const resetCheckoutState = () => {
  setCheckoutStep(1);
  setUserLoggedIn(false);
  setNoContactDelivery(true);
  setPaymentMethod('upi');
  setShowSignupForm(false);
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
// eslint-disable-next-line react-hooks/exhaustive-deps -- showAddressForm declared later in component
}, [showCheckout]);

// On mobile: scroll checkout modal to step header when moving to step 2 or 3
useEffect(() => {
  if (checkoutStep !== 2 && checkoutStep !== 3) return;
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;
  const header = checkoutStep === 2 ? deliveryOptionsHeaderRef.current : paymentHeaderRef.current;
  if (header) {
    requestAnimationFrame(() => {
      header.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}, [checkoutStep]);

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

const _selectedAddress = savedAddresses.find(address => address.id === selectedAddressId);
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
  const _addMenuItem = (newItem) => {
    setMenuItems(prev => [...prev, newItem]);
  };

  const _editMenuItem = (updatedItem) => {
    setMenuItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const _deleteMenuItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };




  const [_showReservationForm, setShowReservationForm] = useState(false);
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
const _handleReservationSubmit = (e) => {
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

// Text reveal animations
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Text reveal animations
  gsap.utils.toArray('.panel').forEach((section, index) => {
    const elements = section.querySelectorAll(
      'h1, h2, p, .menu-card, .team-item'
    );

    gsap.fromTo(elements,
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
          markers: false
        }
      }
    );
  });

  // Counter animations
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

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);



  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Parallax Hero Section */}
        <div className="position-relative p-0 landing-container panel" style={{ width: '100%', maxWidth: '100%' }}>
          {/* Header Component */}
          <Header 
            cart={cart} 
            showAdminButton={true}
            onBookTable={() => setShowBookingModal(true)}
            scrollToSection={scrollToSection}
          />

          {/* Hero Section - Image Style */}
          <div className="hero-section-image-exact" id="home" aria-label="Hero">
            <div className="hero-background-layers">
              <img 
                alt="Authentic Indian Food" 
                className="hero-bg-image" 
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
              />
              <div className="hero-gradient-overlay-1"></div>
              <div className="hero-gradient-overlay-2"></div>
              <div className="hero-gradient-overlay-3"></div>
            </div>
            <div className="container-fluid p-0">
              <div className="row g-0 align-items-center min-vh-100">
                <div className="col-lg-6 col-md-12">
                  <div className="hero-content-exact">
                    <h1 className="hero-title-exact">
                      Authentic Indian Food in Champaign
                    </h1>
                    <p className="hero-description-exact">
                      Savor the rich flavors of India with our freshly prepared dishes. Dine in, takeout, or delivery.
                    </p>
                    <div className="hero-buttons-exact">
                      <button
                        className="btn btn-order-online-exact"
                        onClick={() => scrollToSection("order")}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Order Online
                      </button>
                      <button
                        className="btn btn-get-directions-exact"
                        onClick={() => navigate('/booking')}
                      >
                        <i className="fas fa-utensils me-2"></i>
                        Book a Table
                      </button>
                    </div>
                    <div className="hero-stats-exact">
                      <div className="hero-stats-top-line"></div>
                      <div className="hero-stats-content-wrapper">
                        <div className="stat-item-exact">
                          <div className="stat-icon-wrapper">
                            <i className="fas fa-star stat-star-icon"></i>
                            <div className="stat-value-exact">4.7</div>
                      </div>
                          <div className="stat-label-exact">Top Rated</div>
                      </div>
                        <div className="stat-divider-vertical"></div>
                        <div className="stat-item-exact">
                          <div className="stat-value-exact">15-25 min</div>
                          <div className="stat-label-exact">Pickup Time</div>
                      </div>
                        <div className="stat-divider-vertical"></div>
                        <div className="stat-item-exact">
                          <div className="stat-value-exact">100%</div>
                          <div className="stat-label-exact">Fresh Ingredients</div>
                    </div>
                  </div>
                      <div className="hero-stats-bottom-line"></div>
                </div>
                    {/* <div 
                      className="scroll-indicator-exact"
                      onClick={() => {
                        const aboutSection = document.getElementById('about');
                        if (aboutSection) {
                          aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
       

        </div>

        {/* Chef's Special Section */}
        <div className="chefs-special-section" aria-label="Chef's Special">
          <div className="container-fluid py-5">
            <div className="text-center mb-5">
              <h2 className="chefs-special-title"> Chef's Special </h2>
              <p className="chefs-special-subtitle">
                Our most beloved dishes, handpicked by our master chef
              </p>
            </div>
            <div className="row g-4">
              {defaultMenuItems.slice(0, 3).map((item) => {
                const isVeg = ['vegetarian', 'paneer'].includes(item.category);
                const handleCardClick = () => {
                  if (item.hasSpicyOption) {
                    setSelectedItem({ ...item, selectedPrice: 'price' });
                    setShowSpicyModal(true);
                  } else {
                    addToCart(item, null, 'price');
                  }
                };
                return (
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <div
                      className="chefs-special-card"
                      role="button"
                      tabIndex={0}
                      onClick={handleCardClick}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
                    >
                      <div className="chefs-special-image-wrapper">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="chefs-special-image"
                        />
                        <span className={isVeg ? 'chefs-special-veg-badge' : 'chefs-special-meat-badge'}>
                          <i className={isVeg ? 'fas fa-leaf' : 'fas fa-drumstick-bite'}></i>
                        </span>
                      </div>
                      <div className="chefs-special-card-content">
                        <h3 className="chefs-special-dish-title">{item.name}</h3>
                        <p className="chefs-special-description">
                          {item.description || 'No description available'}
                        </p>
                        <div className="chefs-special-spice">
                          <i className="fas fa-fire me-2"></i>
                          <span>{item.hasSpicyOption ? 'Spice: Mild, Medium, Hot' : 'No spice option'}</span>
                        </div>
                        <div className="chefs-special-separator"></div>
                        <div className="chefs-special-price">${Number(item.price).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="special-offers-section" aria-label="Special Offers">
          <div className="container-fluid py-5">
            <div className="text-center mb-5">
              <h2 className="special-offers-title">Special Offers</h2>
              <p className="special-offers-subtitle">
                Exclusive deals and promotions just for you
              </p>
            </div>
            <div className="row g-4">
              {/* <div className="col-lg-4 col-md-6">
                <div className="special-offer-card bg-gradient-to-br from-maroon to-maroon-dark ">
                  <div className="special-offer-badge">20% OFF</div>
                  <div className="special-offer-icon">
                    <i className="fas fa-tag"></i>
                  </div>
                  <h3 className="special-offer-card-title">Weekend Special</h3>
                  <p className="special-offer-card-description">
                    20% off on all main course items
                  </p>
                  <div className="special-offer-validity">
                    <i className="far fa-clock me-2"></i>
                    <span>Valid every Friday & Saturday</span>
                  </div>
                  <button className="special-offer-button special-offer-button-light">
                    View Menu
                  </button>
                </div>
              </div> */}
              {/* <div className="col-lg-4 col-md-6">
                <div className="special-offer-card special-offer-card-golden to-gold-dark from-gold bg-gradient-to-br">
                  <div className="special-offer-badge special-offer-badge-golden">15% OFF</div>
                  <div className="special-offer-icon special-offer-icon-dark">
                    <i className="fas fa-tag"></i>
                  </div>
                  <h3 className="special-offer-card-title special-offer-card-title-dark">Family Combo</h3>
                  <p className="special-offer-card-description special-offer-card-description-dark">
                    Special family meal for 4 people
                  </p>
                  <div className="special-offer-validity special-offer-validity-dark">
                    <i className="far fa-clock me-2"></i>
                    <span>Available all week</span>
                  </div>
                  <button className="special-offer-button special-offer-button-dark">
                    View Menu
                  </button>
                </div>
              </div> */}
              <div className="col-lg-4 col-md-6">
                <div className="special-offer-card  bg-gradient-to-br from-maroon to-maroon-dark">
                  <div className="special-offer-badge">10% OFF</div>
                  <div className="special-offer-icon">
                    <i className="fas fa-tag"></i>
                  </div>
                  <h3 className="special-offer-card-title">Lunch Special</h3>
                  <p className="special-offer-card-description">
                    Everyday lunch special buffet
                  </p>
                  <div className="special-offer-validity">
                    <i className="far fa-clock me-2"></i>
                    <span>Everyday, 11 AM - 3 PM</span>
                  </div>
                  {/* <button className="special-offer-button special-offer-button-light">
                    View Menu
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose SangEat Section */}
        <div className="why-choose-section" aria-label="Why Choose SangEat">
          <div className="container py-5">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="why-choose-title">Why Choose SangEat</h2>
                <p className="why-choose-subtitle">Experience the perfect blend of tradition and innovation</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="why-choose-card why-choose-card-authentic">
                  <div className="why-choose-card-overlay"></div>
                  <div className="why-choose-card-content">
                    <div className="why-choose-icon-wrapper">
                      <i className="fas fa-utensils why-choose-icon icon-red"></i>
                    </div>
                    <h3 className="why-choose-card-title">Authentic Flavors</h3>
                    <p className="why-choose-card-description">
                      Traditional recipes passed down through generations, prepared with the finest ingredients and authentic spices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="why-choose-card why-choose-card-premium">
                  <div className="why-choose-card-overlay"></div>
                  <div className="why-choose-card-content">
                    <div className="why-choose-icon-wrapper">
                      <div className="why-choose-icon-circle">
                        <i className="fas fa-award why-choose-icon icon-gold"></i>
                      </div>
                    </div>
                    <h3 className="why-choose-card-title">Premium Experience</h3>
                    <p className="why-choose-card-description">
                      Elegant ambiance with royal touches, ensuring every visit is a memorable dining experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="why-choose-card why-choose-card-fresh">
                  <div className="why-choose-card-overlay"></div>
                  <div className="why-choose-card-content">
                    <div className="why-choose-icon-wrapper">
                      <i className="fas fa-leaf why-choose-icon icon-red"></i>
                    </div>
                    <h3 className="why-choose-card-title">Fresh Daily</h3>
                    <p className="why-choose-card-description">
                      All dishes are prepared fresh daily using locally sourced ingredients and traditional cooking methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        {/* <div className="container-xxl py-5 service-section panel"  id="about">
          <div className="container position-relative">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <div className="row g-3">
                  <div className="col-6 text-start">
                    <img
                      className="img-fluid rounded w-100 wow zoomIn"
                      data-wow-delay="0.1s"
                      src="img/about-1.jpg"
                      alt="SangEat restaurant interior and dining ambiance"
                      />
                    </div>
                  <div className="col-6 text-start">
                    <img
                      className="img-fluid rounded w-75 wow zoomIn "
                      data-wow-delay="0.3s"
                      src="img/about-2.jpg"
                      alt="Indian cuisine dishes at SangEat"
                      style={{ marginTop: "25%" }}
                    />
                  </div>
                  <div className="col-6 text-end">
                      <img
                      className="img-fluid rounded w-75 wow zoomIn "
                        data-wow-delay="0.5s"
                        src="img/about-3.jpg"
                      alt="Fresh ingredients and authentic Indian cooking"
                      />
                    </div>
                  <div className="col-6 text-end">
                      <img
                      className="img-fluid rounded w-100 wow zoomIn "
                        data-wow-delay="0.7s"
                        src="img/about-4.jpg"
                      alt="SangEat dining experience and royal Indian flavors"
                      />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                  <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                    About Us
                  </h5>
                <h2 className="mb-4">
                    Welcome to{" "}
                    <i className="fa fa-utensils text-primary me-2"></i>
                  SangEat
                  </h2>
                <h2 className="mb-4">
                    An Experience of Royal Indian Dining
                </h2>
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
                        <span
                        className="flex-shrink-0 display-5 text-primary mb-0"
                          data-toggle="counter-up"
                          role="text"
                          aria-label="15 years"
                        >
                          15
                        </span>
                        <div className="ps-4">
                        <p className="mb-0"  style={{color: '#000'}}>Years of</p>
                        <h6 className="text-uppercase mb-0">Experience</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                        <span
                        className="flex-shrink-0 display-5 text-primary mb-0"
                          data-toggle="counter-up"
                          role="text"
                          aria-label="50 chefs"
                        >
                          50
                        </span>
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
        </div> */}

<div className="container-fluid py-5 menu-section-redesign" id="order" style={{ position: 'relative' }}>
  <div className="container">
    {/* Header Section */}
    <div className="text-center mb-5">
      <h2 className="menu-section-title">Our Menu</h2>
      <p className="menu-section-subtitle">
        Discover our authentic Indian dishes, each prepared with care and traditional spices
      </p>
    </div>

    {/* Modern Menu Type Filter */}
    <div className="menu-type-filter-container mb-5">
      <div className="menu-type-buttons">
        <button
          className={`menu-type-btn ${menuType === 'food' ? 'active' : ''}`}
          onClick={() => handleMenuTypeChange('food')}
        >
          <i className="fas fa-utensils me-2"></i>
          Food Menu
        </button>
        <button
          className={`menu-type-btn ${menuType === 'bar' ? 'active' : ''}`}
          onClick={() => handleMenuTypeChange('bar')}
        >
          <i className="fas fa-wine-glass me-2"></i>
          Bar Menu
        </button>
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

    {/* Category Filter Buttons */}
    <div className="menu-category-filters mb-4">
      <div className="category-filter-buttons">
          <button
            className={`category-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory('all');
              setCategoryImage(menuCategories1[0]?.image || 'img/appetizers.jpg');
            }}
          >
            All
          </button>
          {menuCategories1.map(category => (
          <button
              key={category.id}
            className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setCategoryImage(category.image);
              }}
            >
            {category.name}
              </button>
            ))}
          </div>
        </div>
        
    {/* Category Section Header */}
    <div className="menu-category-section-header mb-4">
      <h3 className="menu-category-title">
        {activeCategory === 'all' ? 'All' : menuCategories1.find(c => c.id === activeCategory)?.name}
      </h3>
          </div>

    {/* Menu Items Grid */}
          {filteredItems.length > 0 ? (
      <div className="menu-items-grid-redesign">
              {filteredItems.map(item => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  cart={cart} 
                  addToCart={addToCart} 
                  setCart={setCart} 
                  onAddWithSpicyLevel={handleAddWithSpicyLevel}
                  setShowSpicyModal={setShowSpicyModal}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
          ) : (
      <div className="no-items-found-redesign">
              <i className="fas fa-search fa-3x mb-3"></i>
              <h4>No items found</h4>
        <p>
                {searchQuery 
                  ? `No items match "${searchQuery}" in this category` 
                  : 'No items available in this category'
                }
              </p>
              {searchQuery && (
                <button 
            className="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
    </div>

    {/* Floating View Cart Button */}
    {cart.length > 0 && (
      <div className="floating-cart-btn-container">
        <button
          className="btn btn-primary floating-cart-btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartSidebar"
        >
        <span className="cart-icon"><i className="fas fa-shopping-cart"></i></span>
          <span className="cart-text">View Cart</span>
          <span className="cart-count-badge">{cart.length}</span>
        </button>
      </div>
    )}
</div>

{/* Gallery Section */}
<div className="gallery-section" aria-label="Gallery">
  <div className="container py-5">
    <div className="text-center mb-5">
      <h2 className="gallery-title">Our Gallery</h2>
      <p className="gallery-subtitle">
        A glimpse into our culinary artistry
      </p>
    </div>
    <div className="gallery-grid">
      {defaultMenuItems.slice(0, 6).map((item) => (
        <div key={item.id} className="gallery-item">
          <img src={item.img} alt={item.name} className="gallery-image" />
          <div className="gallery-overlay">
            <span className="gallery-item-name">{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Add the Spicy Level Modal */}
      <SpicyLevelModal
        show={showSpicyModal}
        onClose={() => setShowSpicyModal(false)}
        item={selectedItem}
        onConfirm={(customization) => {
          if (selectedItem) {
            const opts = customization && typeof customization === 'object' && !customization.id
              ? { extras: customization.extras, removedIngredients: customization.removedIngredients, instructions: customization.instructions }
              : null;
            addToCart(selectedItem, customization?.spicyLevel || customization, selectedItem.selectedPrice, opts);
          }
        }}
      />



        {/* Cart Sidebar */}
        <div className="offcanvas offcanvas-end cart-sidebar-offcanvas" tabIndex="-1" id="cartSidebar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Your Cart</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body cart-sidebar-body">
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
        {item.selectedPrice === 'price2' && (
          <small className="text-success d-block">
            <i className="fas fa-wine-bottle me-1"></i> Bottle
          </small>
        )}
        {item.instructions && (
          <small className="text-muted d-block">
            <i className="fas fa-comment-alt me-1"></i> {item.instructions}
          </small>
        )}
        <div className="d-flex align-items-center">
          <small className="text-muted">${item.finalPrice} x {item.qty}</small>
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
          {cart.length > 0 && (
            <div className="cart-sidebar-footer">
              <div className="d-flex justify-content-between">
                <h5 className="mb-0">Total:</h5>
                <h5 className="mb-0">${total.toFixed(2)}</h5>
              </div>
              <button className="btn btn-primary cart-checkout-btn w-100 mt-3" data-bs-dismiss="offcanvas" onClick={() => {
                resetCheckoutState();
                setShowCheckout(true);
              }}>
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* // Update your checkout modal JSX */}
        {showCheckout && (
          <div
            className="modal fade show d-block checkout-modal"
            tabIndex="-1"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered checkout-modal-dialog"
              role="document"
              style={{ maxWidth: "890px" }}
            >
              <div
                className="modal-content checkout-modal-content"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  maxHeight: "90vh",
                }}
              >
                {/* Header with Animated Timeline */}
                <div className="modal-header position-relative border-0 pb-3 pt-3 px-4">
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
                    <div className="col-md-7 checkout-left-col">
                      {/* Step 1: Login/Signup */}
                      {/* Step 1: Login/Signup */}
                      {checkoutStep === 1 && (
                        <div className="checkout-step animate-fade-in">
                         

                          <div className="row g-4 justify-content-center">
                            <div className="col-lg-12">
                              <div className="auth-card card h-100 border-0 hover-lift">
                                <div className="card-body p-2 text-center">
                                  {!showSignupForm ? (
                                    <>
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
                                          <label htmlFor="mobileNumber">
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
                                      <button
                                        type="button"
                                        className="btn btn-link auth-form-switch text-decoration-none p-0 mb-0"
                                        onClick={() => setShowSignupForm(true)}
                                      >
                                        New customer? Create account
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <div className="auth-icon mb-4">
                                        <i className="fas fa-user-plus"></i>
                                      </div>
                                      <h5 className="card-title mb-3">
                                        New Customer
                                      </h5>
                                      <p className="text-muted small mb-4">
                                        Create an account for faster checkout and order tracking
                                      </p>

                                      <div className="mb-4">
                                        <div className="form-floating mb-3">
                                          <input
                                            type="number"
                                            className="form-control"
                                            id="signUpMobileNummber"
                                            placeholder="9876543210"
                                          />
                                          <label htmlFor="signUpMobileNummber">
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
                                          <label htmlFor="signupName">Name</label>
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
                                          <a href="#terms" className="text-decoration-none">Terms of Service</a>{" "}
                                          and{" "}
                                          <a href="#privacy" className="text-decoration-none">Privacy Policy</a>
                                        </label>
                                      </div>

                                      <button
                                        className="btn btn-success w-100 py-3 mb-3 fw-bold"
                                        onClick={() => {
                                          setUserLoggedIn(true);
                                          setCheckoutStep(2);
                                        }}
                                      >
                                        CREATE ACCOUNT
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-link auth-form-switch text-decoration-none p-0 mb-0"
                                        onClick={() => setShowSignupForm(false)}
                                      >
                                        Already have an account? Sign in
                                      </button>
                                    </>
                                  )}
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
                          <h5 ref={deliveryOptionsHeaderRef} className="mb-4 fw-bold">Delivery Options</h5>

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
                          <h5 ref={paymentHeaderRef} className="mb-4 fw-bold">Payment</h5>

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

                          <div className="d-flex justify-content-start mt-4">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => setCheckoutStep(2)}
                            >
                              Back
                            </button>
                            {/* <button
                              className="btn btn-success px-4 py-2 fw-bold"
                              onClick={handlePlaceOrder}
                            >
                              Place Order
                            </button> */}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="col-md-5 checkout-right-col">
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
                                      <span className="text-primary fw-bold">${item.finalPrice}</span>
                                    </div>

                                    {item.selectedPrice === 'price2' && (
                                      <div className="mb-2">
                                        <span className="badge bg-success">
                                          <i className="fas fa-wine-bottle me-1"></i>
                                          Bottle
                                        </span>
                                      </div>
                                    )}
                                    
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

                                    {item.instructions && (
                                      <div className="mb-2 small text-muted">
                                        <i className="fas fa-comment-alt me-1"></i>
                                        {item.instructions}
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
                                          onClick={() => addToCart(item, item.spicyLevel, item.selectedPrice)} // Pass existing spicy level
                                        >
                                          +
                                        </button>
                                      </div>
                                      <span className="fw-bold">${(item.finalPrice * item.qty).toFixed(2)}</span>
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
                            <span>GST & Restaurant Charges</span>
                            <span>${Math.round(total * 0.05)}</span>
                          </div>
                          <hr />
                          <div className="bill-total d-flex justify-content-between fw-bold fs-5 mb-3">
                            <span>TO PAY</span>
                            <span>${(total + Math.round(total * 0.05)).toFixed(2)}</span>
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
            <span className="value">${total + Math.round(total * 0.05)}</span>
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
  {/* <div id="bookTable"   className=" px-0 wow fadeInUp" style={{background: '#fff'}}
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
    <div className="col-md-6 bg-dark d-flex align-items-center justify-content-center position-relative">
      <div className="p-3 wow fadeInUp" data-wow-delay="0.2s">
        <h5 className="section-title ff-secondary text-start text-primary fw-normal">
          Reservation
        </h5>
        <h2 className="text-white mb-4">Book A Table Online</h2>
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
</div> */}

{/* Modern Reservation Form Modal */}
{/* {showReservationForm && (
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
)} */}

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
        {/* Our Story Section */}
        <div className="our-story-section" id="about">
          <div className="container py-5 pl-3 pr-3">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="our-story-content">
                  <h2 className="our-story-title">Our Story</h2>
                  <p className="our-story-text">
                    SangEat was born from a passion for authentic Indian cuisine and a desire to bring the royal flavors of India to food lovers everywhere. Our journey began over 15 years ago when our founder, a master chef from Mumbai, decided to share the rich culinary heritage of India with the world.
                  </p>
                  <p className="our-story-text">
                    Every dish at SangEat tells a story - from the aromatic spices sourced directly from India to the traditional cooking methods passed down through generations. We believe that food is not just nourishment, but an experience that brings people together and creates lasting memories.
                  </p>
                  <p className="our-story-text">
                    Our commitment to authenticity, quality, and excellence has made us a beloved destination for those seeking the true taste of India in an elegant, royal setting.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="our-story-stats-grid">
                  <div className="story-stat-card">
                    <i className="fas fa-user-tie story-stat-icon"></i>
                    <div className="story-stat-number">15+</div>
                    <div className="story-stat-label">Years of Excellence</div>
                  </div>
                  <div className="story-stat-card">
                    <i className="fas fa-award story-stat-icon"></i>
                    <div className="story-stat-number">50+</div>
                    <div className="story-stat-label">Awards Won</div>
                  </div>
                  <div className="story-stat-card">
                    <i className="fas fa-users story-stat-icon"></i>
                    <div className="story-stat-number">100K+</div>
                    <div className="story-stat-label">Happy Customers</div>
                  </div>
                  <div className="story-stat-card">
                    <i className="fas fa-heart story-stat-icon"></i>
                    <div className="story-stat-number">100%</div>
                    <div className="story-stat-label">Authentic Recipes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl pt-5 pb-5 panel team-mobile master-chefs-section">
          <div className="container">
            <div className="text-center mb-3">
              {/* <div className="chef-hat-icon mb-3">
                <span style={{color: '#FFD700', fontSize: '3rem', display: 'inline-block'}}>👨‍🍳</span>
              </div> */}
              <h2 className="master-chefs-title">Meet Our Master Chefs</h2>
              <p className="master-chefs-subtitle">
                The culinary artists behind every dish, bringing authentic Indian flavors to your table
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="chef-card">
                  <div className="chef-image-wrapper">
                    <img className="chef-image" src="img/chef9.jpg" alt="Chef Rajesh Kumar" />
                    <div className="chef-role-badge">
                      <i className="fas fa-medal me-2"></i>Head Chef
                  </div>
                  </div>
                  <h3 className="chef-name">Chef Ranjit Singh</h3>
                  <div className="chef-details">
                    <span className="chef-experience">
                      <i className="fas fa-clock me-1"></i>13+ Years of Experience
                    </span>
                    {/* <span className="chef-separator">•</span>
                    <span className="chef-cuisine">North Indian Cuisine</span> */}
                </div>
                  <p className="chef-description">
                    Master chef from Delhi with expertise in traditional tandoor cooking and royal Mughlai dishes.
                  </p>
                  {/* <div className="chef-awards">
                    <span className="award-badge">Michelin Star Experience</span>
                    <span className="award-badge">Master Chef India Winner</span>
              </div> */}
                  </div>
                  </div>
              <div className="col-lg-4 col-md-6">
                <div className="chef-card">
                  <div className="chef-image-wrapper">
                    <img className="chef-image" src="img/chef8.jpg" alt="Chef Priya Sharma" />
                    <div className="chef-role-badge">
                      <i className="fas fa-medal me-2"></i>Chef
                </div>
              </div>
                  <h3 className="chef-name">Chef Lakhwinder Singh</h3>
                  <div className="chef-details">
                    <span className="chef-experience">
                      <i className="fas fa-clock me-1"></i>5+ Years of Experience
                    </span>
                    {/* <span className="chef-separator">•</span>
                    <span className="chef-cuisine">South Indian & Vegetarian</span> */}
                  </div>
                  <p className="chef-description">
                    Expert in authentic South Indian flavors and innovative vegetarian cuisine, bringing traditional recipes to life.
                  </p>
                  {/* <div className="chef-awards">
                    <span className="award-badge">Best Vegetarian Chef Award</span>
                    <span className="award-badge">Regional Cuisine Expert</span>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="chef-card">
                  <div className="chef-image-wrapper">
                    <img className="chef-image" src="img/chef7.jpg" alt="Chef Arjun Patel" />
                    <div className="chef-role-badge">
                      <i className="fas fa-medal me-2"></i>Chef
                  </div>
                  </div>
                  <h3 className="chef-name">Chef Narinder Singh</h3>
                  <div className="chef-details">
                    <span className="chef-experience">
                      <i className="fas fa-clock me-1"></i>5+ Years of  Experience
                    </span>
                    {/* <span className="chef-separator">•</span>
                    <span className="chef-cuisine">Indian Desserts</span> */}
                  </div>
                  <p className="chef-description">
                    Specialized in traditional Indian sweets and modern dessert fusion, creating unforgettable sweet experiences.
                  </p>
                  {/* <div className="chef-awards">
                    <span className="award-badge">Dessert Innovation Award</span>
                    <span className="award-badge">Sweet Master</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Team End --> */}

        {/* <!-- Testimonial Start --> */}

        <div className="testimonials-section" id="testimonials">
          <div className="container py-3">
            <div className="text-center mb-5">
              <h2 className="testimonials-title">What Our Guests Say</h2>
              <p className="testimonials-subtitle">
                Real experiences from our valued customers
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6 col-md-6">
                <div className="testimonial-card-new to-maroon-dark-testimonials from-maroon-testimonials bg-gradient-to-br-testimonials">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar-new">P</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <div className="testimonial-quote-wrapper">
                    {/* <span className="testimonial-quote-mark">"</span> */}
                    <p className="testimonial-quote">
                      Absolutely authentic flavors! The butter chicken was divine, and the ambiance is perfect for a royal dining experience.
                    </p>
                    </div>
                  <h5 className="testimonial-name">Priya Sharma</h5>
                  <p className="testimonial-location">New York</p>
                      </div>
                    </div>
              <div className="col-lg-6 col-md-6">
                <div className="testimonial-card-new to-maroon-dark-testimonials from-maroon-testimonials bg-gradient-to-br-testimonials">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar-new">R</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                  </div>
                </div>
                  <div className="testimonial-quote-wrapper">
                    {/* <span className="testimonial-quote-mark">"</span> */}
                    <p className="testimonial-quote">
                      Best Indian restaurant in town! The spices are perfectly balanced, and the service is exceptional. Highly recommended!
                    </p>
                    </div>
                  <h5 className="testimonial-name">Raj Patel</h5>
                  <p className="testimonial-location">Chicago</p>
                      </div>
                    </div>
              <div className="col-lg-6 col-md-6">
                <div className="testimonial-card-new to-maroon-dark-testimonials from-maroon-testimonials bg-gradient-to-br-testimonials">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar-new">S</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                  </div>
                </div>
                  <div className="testimonial-quote-wrapper">
                    {/* <span className="testimonial-quote-mark">"</span> */}
                    <p className="testimonial-quote">
                      As someone who loves Indian cuisine, SangEat exceeded all expectations. The naan bread is to die for!
                    </p>
                    </div>
                  <h5 className="testimonial-name">Sarah Johnson</h5>
                  <p className="testimonial-location">Los Angeles</p>
                      </div>
                    </div>
              <div className="col-lg-6 col-md-6">
                <div className="testimonial-card-new to-maroon-dark-testimonials from-maroon-testimonials bg-gradient-to-br-testimonials">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar-new">A</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                  </div>
                </div>
                  <div className="testimonial-quote-wrapper">
                    {/* <span className="testimonial-quote-mark">"</span> */}
                    <p className="testimonial-quote">
                      Feels like home! The dal makhani reminded me of my grandmother's cooking. Truly authentic and delicious.
                    </p>
                    </div>
                  <h5 className="testimonial-name">Amit Kumar</h5>
                  <p className="testimonial-location">San Francisco</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        {/* <!-- Testimonial End --> */}

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="container py-5">
            <div className="newsletter-content">
              <div className="newsletter-icon-wrapper">
                <i className="fas fa-envelope newsletter-icon"></i>
                </div>
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-description">
                Subscribe to our newsletter for exclusive offers, new menu items, and special events.
              </p>
              <div className="newsletter-form-wrapper">
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    Subscribe
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Experience Section */}
        <div className="ready-experience-section">
          <div className="container py-5">
            <div className="ready-experience-content">
              <h2 className="ready-experience-title">Ready to Experience Royal Dining?</h2>
              <p className="ready-experience-description">
                Reserve your table today and embark on a culinary journey through the flavors of India.
              </p>
              <button 
                className="ready-experience-button"
                onClick={() => navigate('/booking')}
              >
                Reserve Your Table <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        {/* <div className="container-xxl py-3 panel contact-mobile" id="contact"  style={{background: '#f1f1f1' }}>
          <div className="container">
            <div className="text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Contact Us
              </h5>
              <h2 className="mb-3">Get In Touch</h2>
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
                  title="Restaurant Location Map"
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
        </div> */}

        {/* Footer Component */}
        <Footer 
          onBookTable={() => setShowBookingModal(true)}
          scrollToSection={scrollToSection}
        />

         {/* Booking Modal */}
        {showBookingModal && (
          <div className="booking-modal-overlay" onClick={() => setShowBookingModal(false)}>
            <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="booking-modal-close" onClick={() => setShowBookingModal(false)}>
                <i className="fas fa-times"></i>
              </button>
              <h2 className="booking-modal-title">Book a Table</h2>
              <p className="booking-modal-subtitle">Reserve your table for an unforgettable dining experience</p>
              
              <form className="booking-form" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission here
                alert('Booking confirmed! We will contact you soon.');
                setShowBookingModal(false);
              }}>
                <div className="booking-form-group">
                  <label className="booking-label">
                    <i className="fas fa-calendar-alt me-2"></i>Select Date
                  </label>
                  <input
                    type="date"
                    className="booking-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>

                <div className="booking-form-group">
                  <label className="booking-label">
                    <i className="fas fa-clock me-2"></i>Select Time
                  </label>
                  <div className="time-slots-grid">
                    {['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
                  <button
                        key={time}
                    type="button"
                        className={`time-slot-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                  >
                        {time}
                  </button>
                    ))}
                </div>
              </div>

                <div className="booking-form-group">
                  <label className="booking-label">
                    <i className="fas fa-user me-2"></i>Number of Guests
                  </label>
                  <input
                    type="number"
                    className="booking-input"
                    min="1"
                    max="20"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                    required
                  />
            </div>

                <div className="booking-form-row">
                  <div className="booking-form-group">
                    <label className="booking-label">Full Name</label>
                    <input
                      type="text"
                      className="booking-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
          </div>
                  <div className="booking-form-group">
                    <label className="booking-label">Email</label>
                    <input
                      type="email"
                      className="booking-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>
                  </div>

                <div className="booking-form-group">
                  <label className="booking-label">Phone Number</label>
                  <input
                    type="tel"
                    className="booking-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="booking-form-group">
                  <label className="booking-label">Special Requests (Optional)</label>
                  <textarea
                    className="booking-textarea"
                    rows="4"
                    placeholder="Any dietary restrictions, allergies, or special occasions?"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
              </div>

                <button type="submit" className="booking-submit-btn">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default LandingPage;