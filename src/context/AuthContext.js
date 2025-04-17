import React, { createContext, useState, useEffect } from 'react';

// Tạo context cho authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State cho thông tin user và trạng thái đăng nhập
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kiểm tra nếu người dùng đã đăng nhập (localStorage)
  useEffect(() => {
    const checkLoggedIn = () => {
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Hàm đăng nhập
  const login = (userData) => {
    // Trong ứng dụng thực tế, đây là nơi bạn sẽ gọi API đăng nhập
    
    // Mô phỏng việc đăng nhập thành công
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;