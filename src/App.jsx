import React, { useContext } from 'react';
import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Components
import OfferBanner from './components/OfferBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCart from './components/StickyCart';
import WhatsAppButton from './components/WhatsAppButton';
import StickyOrderButton from './components/StickyOrderButton';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Orders from './pages/Orders';
import LoginRegister from './pages/LoginRegister';

const AppContent = () => {
  const { currentPage } = useContext(CartContext);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'orders':
        return <Orders />;
      case 'login':
        return <LoginRegister />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <OfferBanner />
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <StickyCart />
      <WhatsAppButton />
      <StickyOrderButton />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
