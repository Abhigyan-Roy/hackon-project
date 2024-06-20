import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashboard';
import ProductsPage from './ProductsPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dash" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
