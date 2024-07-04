import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './screens/SignUp.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MyOrder from './screens/MyOrder.jsx';
import { CartProvider } from './components/Reducer.jsx';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <div><Navbar /></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
          <div><Footer /></div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
