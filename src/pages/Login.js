import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [particles, setParticles] = useState([]);
  const [language, setLanguage] = useState('vi'); // State for language ('vi' for Vietnamese, 'en' for English)

  const { login, isAuthenticated } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'vi' ? 'en' : 'vi'));
  };

  const translations = {
    vi: {
      welcome: 'InHome xin chào',
      subtext: 'Đăng nhập để trải nghiệm kỳ nghỉ tuyệt vời của bạn.',
      loginTitle: 'Đăng nhập',
      emailLabel: 'Email',
      passwordLabel: 'Mật khẩu',
      rememberMe: 'Nhớ mật khẩu',
      forgotPassword: 'Quên mật khẩu?',
      loginButton: 'Đăng nhập',
      processing: 'Đang xử lý...',
      orLoginWith: 'Hoặc đăng nhập với',
      google: 'Google',
      facebook: 'Facebook',
      noAccount: 'Chưa có tài khoản?',
      registerNow: 'Đăng ký',
    },
    en: {
      welcome: 'Welcome to InHome',
      subtext: 'Log in to enjoy your wonderful vacation.',
      loginTitle: 'Login',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Login',
      processing: 'Processing...',
      orLoginWith: 'Or login with',
      google: 'Google',
      facebook: 'Facebook',
      noAccount: "Don't have an account?",
      registerNow: 'Register now',
    },
  };

  const t = translations[language];

  // Tạo hiệu ứng hạt
  useEffect(() => {
    // Tạo mảng hạt ngẫu nhiên
    const generateParticles = () => {
      const newParticles = [];
      // Số lượng hạt phụ thuộc vào kích thước màn hình
      const count = window.innerWidth < 768 ? 30 : 60;
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // Vị trí theo phần trăm chiều rộng
          y: Math.random() * 100, // Vị trí theo phần trăm chiều cao
          size: Math.random() * 4 + 1, // Kích thước từ 1-5px
          duration: Math.random() * 20 + 10, // Thời gian animation từ 10-30s
          delay: Math.random() * 5 // Độ trễ bắt đầu animation
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Tạo lại hiệu ứng khi resize cửa sổ
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Hiệu ứng khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Nếu đã đăng nhập thì chuyển hướng đến trang chủ
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Kiểm tra dữ liệu đầu vào
    if (!formData.email || !formData.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      setIsLoading(false);
      return;
    }

    try {
      // Demo: thông tin đăng nhập đơn giản
      // Trong ứng dụng thực tế, cần kiểm tra thông tin đăng nhập với server
      const success = login({
        id: 1,
        email: formData.email,
        name: 'Người dùng',
      });

      if (success) {
        // Hiệu ứng loading trước khi chuyển hướng
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError('Đăng nhập không thành công');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập');
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Language Toggle Button with Flags */}
      <button className="language-toggle" onClick={toggleLanguage}>
        <img
          src={language === 'vi' ? '/images/flags/Vietnam.png' : '/images/flags/usa.png'}
          alt={language === 'vi' ? 'Vietnamese Flag' : 'USA Flag'}
          className="flag-icon"
        />
      </button>

      {/* Hiệu ứng particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className={`login-logo ${animationComplete ? 'fade-in-complete' : ''}`}>
        <img src="/images/logo/logo.png" alt="InHome Logo" className="login-logo-image" onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/api/placeholder/200/80";
        }} />
      </div>
      
      <div className="login-container">
        <div className={`login-left slide-in-left ${animationComplete ? 'reveal' : ''}`}>
          <h2 className="welcome-text">{t.welcome}</h2>
          <p className="welcome-subtext">{t.subtext}</p>
          <div className="login-image float">
            <img src="/images//logo/login-illustration.jpg" alt="Login" onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/600/400";
            }} />
            <div className="image-overlay"></div>
          </div>
        </div>
        
        <div className={`login-right pop-up ${animationComplete ? 'reveal' : ''}`}>
          <div className="login-form-container">
            <h1 className="login-title">{t.loginTitle}</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">{t.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder={t.emailLabel}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">{t.passwordLabel}</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder={t.passwordLabel}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </button>
                </div>
              </div>
              
              <div className="form-group remember-me">
                <div className="remember-checkbox">
                  <input type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">{t.rememberMe}</label>
                </div>
                
                <a href="#forgot-password" className="forgot-password">{t.forgotPassword}</a>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-primary btn-login btn-hover-effect ${isLoading ? 'btn-loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    <span className="loading-text">{t.processing}</span>
                  </span>
                ) : t.loginButton}
              </button>
              
              <div className="login-divider">
                <span>{t.orLoginWith}</span>
              </div>
              
              <div className="social-login">
                <button type="button" className="btn btn-social btn-google">
                  <span className="social-icon">G</span> {t.google}
                </button>
                <button type="button" className="btn btn-social btn-facebook">
                  <span className="social-icon">f</span> {t.facebook}
                </button>
              </div>
              
              <div className="register-link">
                <p>{t.noAccount} <a href="#register" className="register-now-link">{t.registerNow}</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md);
          background: ${darkMode 
            ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #121212 100%)' 
            : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)'
          };
          position: relative;
          overflow: hidden;
        }
        
        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${darkMode
            ? 'radial-gradient(circle at 20% 30%, rgba(230, 57, 70, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(230, 57, 70, 0.05) 0%, transparent 40%)'
            : 'radial-gradient(circle at 20% 30%, rgba(60, 110, 113, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(60, 110, 113, 0.05) 0%, transparent 40%)'
          };
          z-index: 0;
        }
        
        /* Particles Container */
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.1)' : 'rgba(60, 110, 113, 0.1)'};
          pointer-events: none;
          opacity: 0;
          animation: floatParticle 20s infinite ease-in-out alternate,
                    fadeInOut 20s infinite ease-in-out;
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-100px) translateX(20px); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        
        .login-logo {
          position: absolute;
          top: 2rem;
          left: 2rem;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          z-index: 10;
        }
        
        .login-logo.fade-in-complete {
          opacity: 1;
          transform: translateY(0);
        }
        
        .login-logo-image {
          height: 50px;
          width: auto;
        }
        
        .login-container {
          display: flex;
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: ${darkMode 
            ? '0 20px 40px rgba(0, 0, 0, 0.5)' 
            : '0 20px 40px rgba(0, 0, 0, 0.1)'
          };
          z-index: 1;
          position: relative;
        }
        
        .login-left {
          flex: 1;
          background-color: var(--primary-color);
          color: white;
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .login-left.reveal {
          opacity: 1;
          transform: translateX(0);
        }
        
        .welcome-text {
          font-size: var(--font-size-xxl);
          margin-bottom: var(--spacing-lg);
          position: relative;
          z-index: 2;
        }
        
        .welcome-subtext {
          font-size: var(--font-size-md);
          margin-bottom: var(--spacing-xl);
          opacity: 0.9;
          position: relative;
          z-index: 2;
        }
        
        .login-image {
          margin-top: auto;
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          height: 250px;
        }
        
        .login-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 10s ease;
        }
        
        .login-image:hover img {
          transform: scale(1.1);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }
        
        .login-right {
          flex: 1;
          background-color: var(--card-background);
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .login-right.reveal {
          opacity: 1;
          transform: translateX(0);
        }
        
        .login-form-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .login-title {
          font-size: var(--font-size-xxl);
          margin-bottom: var(--spacing-lg);
          color: var(--text-color);
          position: relative;
          display: inline-block;
        }
        
        .login-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 3px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .login-title:hover::after {
          width: 100%;
        }
        
        .error-message {
          background-color: rgba(244, 67, 54, 0.1);
          color: var(--error-color);
          padding: var(--spacing-sm);
          border-radius: var(--border-radius-sm);
          margin-bottom: var(--spacing-md);
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .form-group {
          margin-bottom: var(--spacing-md);
        }
        
        .form-group label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: var(--font-weight-medium);
          transition: color 0.3s ease;
        }
        
        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          background-color: var(--input-background);
          color: var(--text-color);
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px ${darkMode 
            ? 'rgba(230, 57, 70, 0.1)' 
            : 'rgba(60, 110, 113, 0.1)'
          };
          outline: none;
        }
        
        .password-input-container {
          position: relative;
        }
        
        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 5px 10px;
        }
        
        .toggle-password:hover {
          color: var(--primary-color);
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
        }
        
        .remember-checkbox {
          display: flex;
          align-items: center;
        }
        
        .remember-checkbox input {
          margin-right: var(--spacing-xs);
        }
        
        .forgot-password {
          color: var(--primary-color);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        
        .forgot-password:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        
        .btn-login {
          width: 100%;
          padding: var(--spacing-md);
          font-size: var(--font-size-md);
          margin-bottom: var(--spacing-lg);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
        }
        
        .btn-login:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }
        
        .btn-login:hover:after {
          animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(20, 20);
            opacity: 0;
          }
        }
        
        .btn-loading {
          pointer-events: none;
        }
        
        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-text {
          font-size: var(--font-size-sm);
        }
        
        .login-divider {
          display: flex;
          align-items: center;
          margin: var(--spacing-lg) 0;
        }
        
        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }
        
        .login-divider span {
          padding: 0 var(--spacing-md);
          color: var(--text-light);
          font-size: var(--font-size-sm);
        }
        
        .social-login {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }
        
        .btn-social {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--border-color);
          background-color: transparent;
          color: var(--text-color);
          transition: all 0.3s ease;
        }
        
        .btn-social:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
          transform: translateY(-2px);
        }
        
        .social-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--border-color);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xs);
        }
        
        .btn-google .social-icon {
          color: #DB4437;
          background-color: rgba(219, 68, 55, 0.1);
        }
        
        .btn-facebook .social-icon {
          color: #4267B2;
          background-color: rgba(66, 103, 178, 0.1);
        }
        
        .register-link {
          text-align: center;
          font-size: var(--font-size-sm);
        }
        
        .register-link a {
          color: var(--primary-color);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .register-link a:hover {
          text-decoration: underline;
        }
        
        .register-now-link {
          position: relative;
          display: inline-block;
        }
        
        .register-now-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .register-now-link:hover::after {
          width: 100%;
        }
        
        /* Animacoes adicionais */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .float {
          animation: float 5s ease-in-out infinite;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-left {
            display: none;
          }
          
          .login-right {
            padding: var(--spacing-lg);
          }
          
          .login-form-container {
            max-width: 100%;
          }
        }

        .language-toggle {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
          width: 40px;
          height: 40px;
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
      `}</style>
    </div>
  );
};

export default Login;