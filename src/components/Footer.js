import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="footer-content">
          {/* Logo và thông tin */}
          <div className="footer-section about">
            <div className="logo">
              <h2 className="logo-text">InHome</h2>
            </div>
            <p className="about-text">
            InHome là nền tảng đặt phòng hàng đầu Việt Nam, nơi bạn có thể khám phá những trải nghiệm lưu trú tuyệt vời với hàng loạt lựa chọn — từ khách sạn cao cấp đến những homestay độc đáo, đậm chất bản địa.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Linkedin">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Liên kết */}
          <div className="footer-section links">
            <h3 className="footer-heading">Khám phá</h3>
            <ul className="footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/destinations">Điểm đến</Link></li>
              <li><Link to="/explore">Khám phá</Link></li>
              <li><Link to="/promotions">Khuyến mãi</Link></li>
              <li><Link to="/about">Về chúng tôi</Link></li>
              <li><Link to="/blog">Blog du lịch</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="footer-section support">
            <h3 className="footer-heading">Hỗ trợ</h3>
            <ul className="footer-links">
              <li><Link to="/help">Trung tâm trợ giúp</Link></li>
              <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
              <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
              <li><Link to="/privacy">Chính sách bảo mật</Link></li>
              <li><Link to="/cancellation">Chính sách hủy phòng</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="footer-section contact">
            <h3 className="footer-heading">Liên hệ</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>+84 797915432</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>InHome@student.tdtu.edu.vn</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Quận 7 tp.HCM</span>
              </div>
            </div>
            
            <div className="newsletter">
              <h4>Đăng ký nhận thông tin</h4>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} InHome. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className="payment-methods">
            <span className="payment-label">Chấp nhận thanh toán:</span>
            <div className="payment-icons">
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">MasterCard</span>
              <span className="payment-icon">Momo</span>
              <span className="payment-icon">VNPay</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: ${darkMode ? '#121212' : '#f8f9fa'};
          color: ${darkMode ? '#f0f0f0' : '#333'};
          padding-top: var(--spacing-xl);
          border-top: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
        }
        
        .logo-text {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--primary-color);
          margin-top: 0;
          margin-bottom: var(--spacing-md);
        }
        
        .about-text {
          margin-bottom: var(--spacing-md);
          line-height: 1.6;
          color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
        }
        
        .social-icons {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${darkMode ? 'white' : 'var(--text-color)'};
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background-color: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }
        
        .footer-heading {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-top: 0;
          margin-bottom: var(--spacing-md);
          position: relative;
          padding-bottom: var(--spacing-xs);
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--primary-color);
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: var(--spacing-sm);
        }
        
        .footer-links a {
          color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-block;
          position: relative;
        }
        
        .footer-links a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .footer-links a:hover {
          color: var(--primary-color);
        }
        
        .footer-links a:hover::after {
          width: 100%;
        }
        
        .contact-info {
          margin-bottom: var(--spacing-md);
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--spacing-sm);
          color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
        }
        
        .newsletter h4 {
          margin-top: 0;
          margin-bottom: var(--spacing-sm);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-medium);
        }
        
        .newsletter-form {
          display: flex;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 10px;
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white'};
          color: ${darkMode ? 'white' : 'var(--text-color)'};
          border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        
        .newsletter-button {
          padding: 10px 16px;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .newsletter-button:hover {
          background-color: ${darkMode ? '#ff4d4d' : '#2d5a5c'};
        }
        
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) 0;
          border-top: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          font-size: var(--font-size-sm);
        }
        
        .copyright {
          margin-bottom: var(--spacing-sm);
        }
        
        .payment-methods {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }
        
        .payment-label {
          color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
        }
        
        .payment-icons {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .payment-icon {
          padding: 4px 8px;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-xs);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .payment-methods {
            margin-top: var(--spacing-sm);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;