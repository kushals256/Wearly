import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import ButtonComp from './components/common/Button'
import Login from './pages/Login'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import ProductPage from './components/products/ProductPage'
import ProfilePage from './components/profile/UserProfile'
import Explore from './pages/Explore'
import MyCart from './pages/MyCart'
import Upload from './pages/Upload'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="pt-16"> {/* Add padding top to account for fixed header */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<MyCart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
