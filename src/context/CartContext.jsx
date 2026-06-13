import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const initialProducts = [
  {
    id: 'khaja',
    name: 'Ghee Khaja',
    price: 180,
    rating: 4.8,
    reviewsCount: 124,
    weightOptions: ['250g', '500g', '1kg'],
    baseWeight: '250g',
    category: 'sweets',
    image: '/assets/khaja.png',
    shortDescription: 'Crispy layered traditional Khaja made with pure ghee and authentic Odia recipe.',
    description: 'Directly sourced from the holy town of Puri, our Ghee Khaja is a legendary sweet offering. Made with multiple delicate layers of refined wheat flour, deep-fried to crispy perfection in pure desi ghee, and lightly glazed in sugar syrup. Every bite is an explosion of flaky texture and traditional sweetness, prepared by traditional sweet-makers (Karigars) adhering to generations-old temple recipes.',
    ingredients: 'Refined Wheat Flour (Maida), Pure Desi Ghee, Sugar, Cardamom, Water.',
    shelfLife: '20 Days (Store in an airtight container)',
    featured: true,
  },
  {
    id: 'arisa-pitha',
    name: 'Arisa Pitha',
    price: 190,
    rating: 4.7,
    reviewsCount: 98,
    weightOptions: ['250g', '500g', '1kg'],
    baseWeight: '250g',
    category: 'pitha',
    image: '/assets/arisa_pitha.png',
    shortDescription: 'Soft and traditional Arisa Pitha made from rice, jaggery, and sesame.',
    description: 'An integral part of Odia festivals and weddings, Arisa Pitha is a traditional deep-fried pancake. Prepared with premium rice flour, high-quality organic jaggery (Guda), and coated with toasted sesame seeds. It has a beautiful crispy outer crust with a soft, chewy, and nostalgic cardamom-flavored interior that reminds you of home and grandma\'s kitchen.',
    ingredients: 'Rice Flour, Organic Jaggery, Sesame Seeds, Cardamom, Refined Sunflower Oil/Ghee for frying.',
    shelfLife: '15 Days',
    featured: true,
  },
  {
    id: 'pahala-rasagola',
    name: 'Pahala Rasagola',
    price: 220,
    rating: 4.9,
    reviewsCount: 245,
    weightOptions: ['500g', '1kg'],
    baseWeight: '500g',
    category: 'sweets',
    image: '/assets/rasagola.png',
    shortDescription: 'Super soft, melt-in-mouth traditional Odisha Rasagola made from fresh chhena.',
    description: 'Unlike any other, the Pahala Rasagola from Odisha is famous for its light brown color and ultra-soft, melting texture. Freshly prepared from premium cottage cheese (Chhena) and hand-rolled, then simmered in a warm, light sugar syrup. It is served fresh and warm, retaining its authentic non-chewy texture. Celebrating Odisha\'s rich culinary history as the birthplace of Rasagola.',
    ingredients: 'Fresh Cottage Cheese (Chhena), Semolina (Suji), Sugar, Water, Cardamom.',
    shelfLife: '5 Days (Keep refrigerated)',
    featured: true,
  },
  {
    id: 'chhena-poda',
    name: 'Baked Chhena Poda',
    price: 250,
    rating: 4.9,
    reviewsCount: 312,
    weightOptions: ['250g', '500g', '1kg'],
    baseWeight: '250g',
    category: 'sweets',
    image: '/assets/chhena_poda.png',
    shortDescription: "Odisha's signature caramelized cottage cheese cake, baked with cardamom.",
    description: 'Often referred to as the Indian cheesecake, Chhena Poda is Odisha\'s crown jewel dessert. Prepared by kneading fresh chhena with sugar, cardamom, raisins, and cashew nuts, then baked in traditional sal leaves over hot coals for hours until a rich, dark brown caramelized crust forms. The inside remains incredibly moist, soft, and bursting with cardamom and caramelized dairy flavors.',
    ingredients: 'Fresh Chhena, Sugar, Semolina, Cardamom, Cashew Nuts, Raisins, Ghee.',
    shelfLife: '7 Days (Keep refrigerated)',
    featured: true,
  }
];

export const CartProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('apna_khao_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('apna_khao_wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('apna_khao_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    localStorage.setItem('apna_khao_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('apna_khao_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('apna_khao_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1, selectedWeight = null) => {
    const weight = selectedWeight || product.baseWeight || product.weightOptions[0];
    
    // Simple weight modifier factor for price
    let priceMultiplier = 1;
    if (weight === '500g') priceMultiplier = 1.8; // bulk discount
    if (weight === '1kg') priceMultiplier = 3.2; // more bulk discount

    const finalPrice = Math.round(product.price * priceMultiplier);

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedWeight === weight
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            price: finalPrice,
            quantity,
            selectedWeight: weight,
            uniqueKey: `${product.id}-${weight}`,
          },
        ];
      }
    });
  };

  const removeFromCart = (uniqueKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.uniqueKey !== uniqueKey));
  };

  const updateQuantity = (uniqueKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(uniqueKey);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.uniqueKey === uniqueKey ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const applyCoupon = (code) => {
    const upperCode = code.toUpperCase();
    if (upperCode === 'ODISHA10') {
      setCouponCode(upperCode);
      setDiscount(0.10); // 10% off
      setCouponError('');
      return true;
    } else if (upperCode === 'WELCOME50') {
      setCouponCode(upperCode);
      setDiscount(50); // Rs 50 flat discount (handled in calculation)
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try ODISHA10 or WELCOME50');
      setDiscount(0);
      setCouponCode('');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponError('');
  };

  // Checkout pricing calculations
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (couponCode === 'ODISHA10') {
      return Math.round(subtotal * 0.10);
    } else if (couponCode === 'WELCOME50') {
      return subtotal > 150 ? 50 : 0;
    }
    return 0;
  };

  const getShippingFee = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0 || subtotal > 500) return 0; // free shipping above Rs 500
    return 60; // flat Rs 60
  };

  const getTax = () => {
    // 5% GST on food products
    const taxableAmount = getSubtotal() - getDiscountAmount();
    return Math.round(taxableAmount * 0.05);
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getShippingFee() + getTax();
  };

  const placeOrder = (shippingAddress, paymentMethod) => {
    const orderId = 'AK-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK' + Math.floor(100000000 + Math.random() * 900000000);
    
    const newOrder = {
      orderId,
      trackingNumber,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cart],
      pricing: {
        subtotal: getSubtotal(),
        discount: getDiscountAmount(),
        shipping: getShippingFee(),
        tax: getTax(),
        total: getTotal(),
      },
      shippingAddress,
      paymentMethod,
      // Track statuses: 'Received', 'Sourced (Bhubaneswar)', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered'
      status: 'Received',
      history: [
        { status: 'Order Placed & Received', date: new Date().toLocaleTimeString(), active: true },
        { status: 'Sourcing authentic ingredients from Odisha', date: 'Pending', active: false },
        { status: 'Packed & Dispatched from Bhubaneswar Hub', date: 'Pending', active: false },
        { status: 'In Transit to Destination City', date: 'Pending', active: false },
        { status: 'Out for Delivery', date: 'Pending', active: false },
        { status: 'Delivered', date: 'Pending', active: false }
      ]
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]); // Clear cart
    removeCoupon();
    return newOrder;
  };

  // Check pin code eligibility (Odisha to Tier 1 cities)
  const checkPinCode = (pin) => {
    // Tier 1 Bangalore (560xxx), Mumbai (400xxx), Delhi (110xxx), Hyderabad (500xxx), Pune (411xxx), Chennai (600xxx), Kolkata (700xxx)
    const prefixes = ['560', '400', '110', '500', '411', '600', '700', '751', '752', '753']; // Include Odisha hubs (Bhubaneswar/Puri/Cuttack)
    if (!pin || pin.length !== 6 || isNaN(pin)) {
      return { valid: false, message: 'Please enter a valid 6-digit PIN code.' };
    }
    const pinPrefix = pin.substring(0, 3);
    if (prefixes.includes(pinPrefix)) {
      return { 
        valid: true, 
        message: '✓ Yes! Saffron-express delivery is available in your area. Expected transit: 2-3 days directly from Bhubaneswar.' 
      };
    } else {
      return { 
        valid: false, 
        message: '✗ We currently deliver exclusively to Tier 1 Metro cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai, Kolkata) and Odisha. We are expanding soon!' 
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        currentPage,
        pageParams,
        navigateTo,
        products,
        cart,
        wishlist,
        orders,
        couponCode,
        discount,
        couponError,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscountAmount,
        getShippingFee,
        getTax,
        getTotal,
        placeOrder,
        checkPinCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
