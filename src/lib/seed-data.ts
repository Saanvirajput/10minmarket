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
  // Dairy
  { id: 'p5', name: 'Amul Gold Milk', category: 'dairy', price: 33, originalPrice: 35, unit: '500 ml', image: '/images/products/milk.webp' },
  { id: 'p6', name: 'Harvest Gold Bread', category: 'dairy', price: 45, originalPrice: 50, unit: '400 g', image: '/images/products/bread.webp' },
  { id: 'p31', name: 'Amul Butter', category: 'dairy', price: 54, originalPrice: 55, unit: '100 g', image: '/images/products/butter.webp' },

  // Fresh
  { id: 'p7', name: 'Shimla Apple', category: 'fresh', price: 159, originalPrice: 199, unit: '1 kg', image: '/images/products/apple.webp' },
  { id: 'p8', name: 'Organic Bananas', category: 'fresh', price: 55, originalPrice: 65, unit: '6 pcs', image: '/images/products/banana.webp' },
  { id: 'p19', name: 'Red Onion', category: 'fresh', price: 40, originalPrice: 45, unit: '1 kg', image: '/images/products/onion.webp' },
  { id: 'p20', name: 'Potato (Alu)', category: 'fresh', price: 30, originalPrice: 35, unit: '1 kg', image: '/images/products/potato.webp' },
  { id: 'p21', name: 'Fresh Tomato', category: 'fresh', price: 45, originalPrice: 50, unit: '500 g', image: '/images/products/tomato.webp' },

  // Atta & Oil
  { id: 'p9', name: 'Aashirvaad Shudh Chakki Atta', category: 'atta', price: 245, originalPrice: 280, unit: '5 kg', image: '/images/products/atta.webp' },
  { id: 'p10', name: 'Fortune Sunflower Oil', category: 'atta', price: 145, originalPrice: 175, unit: '1 L', image: '/images/products/oil.webp' },
  { id: 'p22', name: 'Daawat Rozana Basmati Rice', category: 'atta', price: 450, originalPrice: 520, unit: '5 kg', image: '/images/products/rice.webp' },
  { id: 'p23', name: 'Tata Salt', category: 'atta', price: 28, originalPrice: 30, unit: '1 kg', image: '/images/products/salt.webp' },

  // Meat & Eggs
  { id: 'p11', name: 'Farm Fresh Eggs', category: 'meat', price: 85, originalPrice: 95, unit: '12 pcs', image: '/images/products/eggs.webp' },
  { id: 'p12', name: 'Chicken Breast Boneless', category: 'meat', price: 299, originalPrice: 350, unit: '500 g', image: '/images/products/chicken.webp' },
  { id: 'p24', name: 'Mutton Curry Cut', category: 'meat', price: 650, originalPrice: 750, unit: '500 g', image: '/images/products/mutton.webp' },

  // Snacks
  { id: 'p13', name: 'Lay\'s Classic Salted', category: 'snacks', price: 20, originalPrice: 20, unit: '50 g', image: '/images/products/lays.webp' },
  { id: 'p14', name: 'Oreo Choco Creme', category: 'snacks', price: 40, originalPrice: 45, unit: '120 g', image: '/images/products/oreo.webp' },
  { id: 'p25', name: 'Coca-Cola Zero Sugar', category: 'snacks', price: 45, originalPrice: 50, unit: '300 ml', image: '/images/products/coke.webp' },
  { id: 'p26', name: 'Haldiram\'s Bhujia Sev', category: 'snacks', price: 105, originalPrice: 120, unit: '200 g', image: '/images/products/bhujia.webp' },

  // Cafe
  { id: 'p15', name: 'Cappuccino Regular', category: 'cafe', price: 129, originalPrice: 150, unit: '250 ml', image: '/images/products/coffee.webp' },
  { id: 'p16', name: 'Paneer Tikka Sandwich', category: 'cafe', price: 189, originalPrice: 220, unit: '1 pc', image: '/images/products/sandwich.webp' },
  { id: 'p27', name: 'Blueberry Muffin', category: 'cafe', price: 149, originalPrice: 180, unit: '1 pc', image: '/images/products/muffin.webp' },

  // Ice Cream
  { id: 'p17', name: 'Amul Vanilla Magic', category: 'icecream', price: 150, originalPrice: 150, unit: '750 ml', image: '/images/products/icecream.webp' },
  { id: 'p18', name: 'Kwality Walls Choco Brownie', category: 'icecream', price: 250, originalPrice: 299, unit: '700 ml', image: '/images/products/brownie.webp' },
  { id: 'p28', name: 'Magnum Almond', category: 'icecream', price: 99, originalPrice: 99, unit: '80 ml', image: '/images/products/magnum.webp' },

  // Laundry
  { id: 'p1', name: 'Surf Excel Matic Liquid', category: 'laundry', price: 283, originalPrice: 338, unit: '1 L', image: '/images/products/surf-excel.webp' },
  { id: 'p2', name: 'Rin Matic Liquid', category: 'laundry', price: 184, originalPrice: 249, unit: '1 L', image: '/images/products/rin.webp' },
  { id: 'p29', name: 'Comfort Fabric Conditioner', category: 'laundry', price: 220, originalPrice: 250, unit: '860 ml', image: '/images/products/comfort.webp' },
  { id: 'p30', name: 'Ariel Matic Front Load', category: 'laundry', price: 750, originalPrice: 850, unit: '4 kg', image: '/images/products/ariel.webp' },
];
