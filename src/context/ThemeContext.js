import React, { createContext, useState, useEffect } from 'react';

// Tạo context cho theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Khởi tạo state cho dark mode, mặc định là false (light mode)
  const [darkMode, setDarkMode] = useState(() => {
    // Kiểm tra localStorage để lấy giá trị đã lưu (nếu có)
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Hàm để toggle giữa dark mode và light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Lưu theme vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Thêm hoặc xóa class 'dark-mode' ở body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Cung cấp state và function cho các component con
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;