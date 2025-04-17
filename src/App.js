import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './styles/animations.css';
import './styles/variables.css';

// Import các trang
import Login from './pages/Login';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import Booking from './pages/Booking';
import Header from './components/Header';
import Footer from './components/Footer';

// Component xử lý route yêu cầu đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="loading-container">Đang tải...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app">
          {!isLoginPage && <Header />}
          <main className={`main-content ${isLoginPage ? 'login-main' : ''}`}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/room/:id" element={
                <ProtectedRoute>
                  <RoomDetail />
                </ProtectedRoute>
              } />
              <Route path="/booking/:id" element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          {!isLoginPage && <Footer />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;