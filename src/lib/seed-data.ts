export const categories = [
  { id: 'fresh', name: 'Fruits & Vegetables', icon: '🍎' },
  { id: 'dairy', name: 'Dairy, Bread & Eggs', icon: '🥛' },
  { id: 'atta', name: 'Atta, Rice, Oil & Dals', icon: '🌾' },
  { id: 'meat', name: 'Meat, Fish & Eggs', icon: '🥩' },
  { id: 'snacks', name: 'Packaged Food', icon: '🍪' },
  { id: 'cafe', name: 'Zepto Cafe', icon: '☕' },
  { id: 'icecream', name: 'Ice Creams & More', icon: '🍦' },
  { id: 'laundry', name: 'Laundry Care', icon: '🧼' },
];

export const products = [
  // Laundry
  { id: 'p1', name: 'Surf Excel Matic Liquid', category: 'laundry', price: 283, originalPrice: 338, unit: '1 L', image: '/images/products/surf-excel.webp' },
  { id: 'p2', name: 'Rin Matic Liquid', category: 'laundry', price: 184, originalPrice: 249, unit: '1 L', image: '/images/products/rin.webp' },
  
  // Dairy
  { id: 'p5', name: 'Amul Gold Milk', category: 'dairy', price: 33, originalPrice: 35, unit: '500 ml', image: '/images/products/milk.webp' },
  { id: 'p6', name: 'Harvest Gold Bread', category: 'dairy', price: 45, originalPrice: 50, unit: '400 g', image: '/images/products/bread.webp' },

  // Fresh
  { id: 'p7', name: 'Shimla Apple', category: 'fresh', price: 159, originalPrice: 199, unit: '1 kg', image: '/images/products/apple.webp' },
  { id: 'p8', name: 'Organic Bananas', category: 'fresh', price: 55, originalPrice: 65, unit: '6 pcs', image: '/images/products/banana.webp' },

  // Atta & Oil
  { id: 'p9', name: 'Aashirvaad Shudh Chakki Atta', category: 'atta', price: 245, originalPrice: 280, unit: '5 kg', image: '/images/products/atta.webp' },
  { id: 'p10', name: 'Fortune Sunflower Oil', category: 'atta', price: 145, originalPrice: 175, unit: '1 L', image: '/images/products/oil.webp' },

  // Meat & Eggs
  { id: 'p11', name: 'Farm Fresh Eggs', category: 'meat', price: 85, originalPrice: 95, unit: '12 pcs', image: '/images/products/eggs.webp' },
  { id: 'p12', name: 'Chicken Breast Boneless', category: 'meat', price: 299, originalPrice: 350, unit: '500 g', image: '/images/products/chicken.webp' },

  // Snacks
  { id: 'p13', name: 'Lay\'s Classic Salted', category: 'snacks', price: 20, originalPrice: 20, unit: '50 g', image: '/images/products/lays.webp' },
  { id: 'p14', name: 'Oreo Choco Creme', category: 'snacks', price: 40, originalPrice: 45, unit: '120 g', image: '/images/products/oreo.webp' },

  // Cafe
  { id: 'p15', name: 'Cappuccino Regular', category: 'cafe', price: 129, originalPrice: 150, unit: '250 ml', image: '/images/products/coffee.webp' },
  { id: 'p16', name: 'Paneer Tikka Sandwich', category: 'cafe', price: 189, originalPrice: 220, unit: '1 pc', image: '/images/products/sandwich.webp' },

  // Ice Cream
  { id: 'p17', name: 'Amul Vanilla Magic', category: 'icecream', price: 150, originalPrice: 150, unit: '750 ml', image: '/images/products/icecream.webp' },
  { id: 'p18', name: 'Kwality Walls Choco Brownie', category: 'icecream', price: 250, originalPrice: 299, unit: '700 ml', image: '/images/products/brownie.webp' },
];
