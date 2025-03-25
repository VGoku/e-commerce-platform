import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import WishlistView from './pages/WishlistView'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import useThemeStore from './stores/useThemeStore'
import useAuthStore from './stores/useAuthStore'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

// Create a ScrollToTop component
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

function App() {
    const { theme } = useThemeStore()
    const { initialize } = useAuthStore()

    useEffect(() => {
        // Initialize auth state immediately
        const cleanup = initialize()
        
        // Apply theme class to html element
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)

        return () => {
            if (typeof cleanup === 'function') {
                cleanup()
            }
        }
    }, [initialize, theme])

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <ScrollToTop /> {/* Add this line */}
                <Navigation />
                <Toaster position="top-right" />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wishlist" element={<WishlistView />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/returns" element={<Returns />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App