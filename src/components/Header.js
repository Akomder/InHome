import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Moon, Sun, Search, Menu, X, User, Bell, LogOut } from 'lucide-react';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('vi'); // 'vi' for Vietnamese, 'en' for English
  const navigate = useNavigate();

  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  // Xử lý sự kiện scroll để thay đổi style của header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-profile')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Xử lý khi toggle menu
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Xử lý khi toggle menu người dùng
  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log('Searching for:', searchQuery);
    // Đóng menu sau khi tìm kiếm (trên mobile)
    setIsMenuOpen(false);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <div className="logo">
            <Link to="/">
                <img src="/images/logo/logo.png" alt="StayVN Logo" className="logo-image" />
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={handleToggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation and Search */}
        <div className={`nav-search-container ${isMenuOpen ? 'is-open' : ''}`}>
          {/* Navigation */}
          <nav className="main-nav">
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/" className="nav-link">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link to="/explore" className="nav-link">Khám phá</Link>
              </li>
              <li className="nav-item">
                <Link to="/destinations" className="nav-link">Điểm đến</Link>
              </li>
              <li className="nav-item">
                <Link to="/promotions" className="nav-link">Khuyến mãi</Link>
              </li>
            </ul>
          </nav>

          {/* Search form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm điểm đến, khách sạn..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-button">Tìm</button>
          </form>
        </div>

        {/* User Actions */}
        <div className="user-actions">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          {isAuthenticated && (
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </div>
          )}

          {/* Language Changer */}
          <button className="language-toggle" onClick={toggleLanguage}>
            <img
              src={language === 'vi' ? '/images/flags/Vietnam.png' : '/images/flags/usa.png'}
              alt={language === 'vi' ? 'Vietnamese Flag' : 'USA Flag'}
              className="flag-icon"
            />
          </button>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <div className="user-profile">
              <button className="user-profile-button" onClick={handleToggleUserMenu}>
                <div className="avatar">
                  <User size={20} />
                </div>
                <span className="username">{user.name}</span>
              </button>

              {/* User Menu */}
              {isUserMenuOpen && (
                <div className="user-menu pop-up">
                  <ul>
                    <li>
                      <Link to="/profile" className="user-menu-item">
                        Hồ sơ của tôi
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookings" className="user-menu-item">
                        Đặt phòng của tôi
                      </Link>
                    </li>
                    <li>
                      <Link to="/favorites" className="user-menu-item">
                        Danh sách yêu thích
                      </Link>
                    </li>
                    <li className="divider"></li>
                    <li>
                      <button onClick={handleLogout} className="user-menu-item logout">
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          background-color: ${darkMode ? 'var(--background-color)' : 'white'};
          transition: all var(--transition-normal);
        }

        .is-scrolled {
          box-shadow: var(--shadow-md);
          background-color: ${darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(10px);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          flex-shrink: 0;
        }

        .logo-text {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--primary-color);
          margin: 0;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
        }

        .nav-search-container {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: space-between;
          margin: 0 var(--spacing-xl);
        }

        .main-nav {
          margin-right: var(--spacing-lg);
        }

        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: var(--spacing-lg);
        }

        .nav-link {
          color: var(--text-color);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-fast);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width var(--transition-normal);
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .search-form {
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 400px;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }

        .search-input {
          width: 100%;
          padding: 8px 16px 8px 36px;
          border-radius: var(--border-radius-md);
          border: 1px solid var(--border-color);
          background-color: ${darkMode ? 'var(--input-background)' : '#f5f5f5'};
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px ${darkMode ? 'rgba(230, 57, 70, 0.2)' : 'rgba(60, 110, 113, 0.2)'};
        }

        .search-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: var(--border-radius-md);
          padding: 8px 16px;
          margin-left: 8px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          font-weight: var(--font-weight-medium);
        }

        .search-button:hover {
          background-color: ${darkMode ? 'color-mix(in srgb, var(--primary-color) 80%, white)' : 'color-mix(in srgb, var(--primary-color) 80%, black)'};
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .theme-toggle {
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .theme-toggle:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .notification-bell {
          position: relative;
          color: var(--text-color);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .notification-bell:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--accent-color);
          color: white;
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-profile {
          position: relative;
        }

        .user-profile-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-color);
          padding: 6px 12px;
          border-radius: var(--border-radius-md);
          transition: background-color var(--transition-fast);
        }

        .user-profile-button:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: ${darkMode ? 'var(--primary-color)' : 'var(--accent-color)'};
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .username {
          font-weight: var(--font-weight-medium);
        }

        .user-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          background-color: var(--card-background);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          overflow: hidden;
        }

        .user-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          color: var(--text-color);
          text-decoration: none;
          transition: background-color var(--transition-fast);
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: var(--font-size-md);
        }

        .user-menu-item:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 8px 0;
        }

        .logout {
          color: var(--error-color);
        }

        .login-button {
          padding: 8px 16px;
        }
        
        .language-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .language-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .flag-icon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .nav-search-container {
            margin: 0 var(--spacing-md);
          }
          
          .nav-links {
            gap: var(--spacing-md);
          }
        }
        
        @media (max-width: 768px) {
          .header-container {
            padding: var(--spacing-sm) var(--spacing-md);
          }
          
          .menu-toggle {
            display: block;
            order: 1;
          }
          
          .logo {
            order: 2;
          }
          
          .user-actions {
            order: 3;
          }
          
          .nav-search-container {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--card-background);
            flex-direction: column;
            align-items: flex-start;
            padding: var(--spacing-md);
            box-shadow: var(--shadow-md);
            margin: 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
          }
          
          .nav-search-container.is-open {
            max-height: 500px;
            opacity: 1;
            padding: var(--spacing-md);
          }
          
          .main-nav {
            width: 100%;
            margin-right: 0;
            margin-bottom: var(--spacing-md);
          }
          
          .nav-links {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          
          .nav-link {
            display: block;
            padding: var(--spacing-xs) 0;
          }
          
          .search-form {
            width: 100%;
            max-width: none;
          }
          
          .username {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;