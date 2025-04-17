import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { 
  Star, Users, Bed, Bath, Home, Wifi, Tv, Coffee, 
  Car, Wind, Heart, Share, MapPin, Calendar,
  ArrowLeft, ArrowRight, Check
} from 'lucide-react';
import rooms from '../data/rooms';

// Hàm tính số đêm giữa hai ngày
const calculateNumberOfNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return days > 0 ? days : 1;
};

const RoomDetail = () => {
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  // Lấy thông tin phòng từ ID
  useEffect(() => {
    const fetchRoom = () => {
      setLoading(true);
      
      // Mô phỏng việc gọi API lấy dữ liệu
      setTimeout(() => {
        const foundRoom = rooms.find(r => r.id === parseInt(id));
        if (foundRoom) {
          setRoom(foundRoom);
        } else {
          // Không tìm thấy phòng
          navigate('/not-found');
        }
        setLoading(false);
      }, 1000);
    };
    
    fetchRoom();
  }, [id, navigate]);

  // Đặt lại vị trí ảnh khi đổi phòng
  useEffect(() => {
    setActiveImage(0);
    setImageLoading(true);
  }, [id]);

  // Lấy các ảnh của phòng
  const roomImages = room?.images || (room?.imageUrl ? [room.imageUrl] : []);

  // Hàm xử lý khi ảnh không tải được
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/api/placeholder/800/500'; // Fallback to placeholder
  };

  // Hàm chuyển đổi ảnh
  const changeImage = (direction) => {
    if (roomImages.length <= 1) return;
    
    if (direction === 'next') {
      setActiveImage((prev) => (prev + 1) % roomImages.length);
    } else {
      setActiveImage((prev) => (prev - 1 + roomImages.length) % roomImages.length);
    }
    
    // Đặt lại trạng thái loading cho ảnh
    setImageLoading(true);
  };

  // Hàm toggle yêu thích
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Xử lý khi thay đổi form đặt phòng
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value
    });
  };

  // Xử lý khi tăng/giảm số lượng khách
  const handleGuestsChange = (change) => {
    const newValue = booking.guests + change;
    if (room && newValue >= 1 && newValue <= room.maxGuests) {
      setBooking({
        ...booking,
        guests: newValue
      });
    }
  };

  // Format giá tiền theo VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tính tổng số tiền
  const calculateTotal = () => {
    if (!room) return 0;
    
    const price = room.priceDiscount || room.price;
    let days = 1;
    
    if (booking.checkIn && booking.checkOut) {
      days = calculateNumberOfNights(booking.checkIn, booking.checkOut);
    }
    
    return price * days * booking.guests;
  };

  // Các biểu tượng và danh sách tiện nghi
  const amenityIcons = {
    'Wifi': <Wifi size={20} />,
    'Điều hòa': <Wind size={20} />,
    'TV': <Tv size={20} />,
    'Hồ bơi': <Home size={20} />, // Thay thế Pool bằng Home vì không có biểu tượng Pool
    'Bãi đỗ xe': <Car size={20} />,
    'Bữa sáng': <Coffee size={20} />
  };

  if (loading) {
    return (
      <div className={`room-detail-page ${darkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="room-detail-skeleton">
            <div className="skeleton-breadcrumb shimmer"></div>
            <div className="skeleton-image shimmer"></div>
            <div className="skeleton-content">
              <div className="skeleton-title shimmer"></div>
              <div className="skeleton-meta shimmer"></div>
              <div className="skeleton-description shimmer"></div>
              <div className="skeleton-features">
                <div className="skeleton-feature shimmer"></div>
                <div className="skeleton-feature shimmer"></div>
                <div className="skeleton-feature shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return null;
  }
  // Đây là tiếp tục của component RoomDetail
  
  return (
    <div className={`room-detail-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb slide-in-left">
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/" className="breadcrumb-link">{room.location}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{room.name}</span>
        </div>
        
        {/* Room Title Section */}
        <div className="room-title-section fade-in">
          <h1 className="room-title">{room.name}</h1>
          
          <div className="room-meta">
            <div className="room-rating">
              <Star size={18} fill="#FFD700" stroke="#FFD700" />
              <span>{room.rating}</span>
              <span className="review-count">({room.reviewCount} đánh giá)</span>
            </div>
            
            <div className="room-location">
              <MapPin size={18} />
              <span>{room.location}</span>
            </div>
            
            <div className="room-actions">
              <button className="action-button share-button">
                <Share size={18} />
                <span>Chia sẻ</span>
              </button>
              
              <button 
                className={`action-button favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                onClick={toggleFavorite}
              >
                <Heart size={18} fill={isFavorite ? "#e63946" : "none"} />
                <span>{isFavorite ? 'Đã lưu' : 'Lưu'}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="image-gallery-container">
          <div className="main-image-container pop-up">
            {imageLoading && <div className="image-loading shimmer"></div>}
            <img 
              src={roomImages[activeImage] || '/api/placeholder/800/500'} 
              alt={`${room.name} - Ảnh ${activeImage + 1}`} 
              className="main-image"
              onError={handleImageError}
              onLoad={() => setImageLoading(false)}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
            
            {roomImages.length > 1 && (
              <>
                <button 
                  className="gallery-nav prev" 
                  onClick={() => changeImage('prev')}
                  aria-label="Ảnh trước"
                >
                  <ArrowLeft size={24} />
                </button>
                
                <button 
                  className="gallery-nav next" 
                  onClick={() => changeImage('next')}
                  aria-label="Ảnh sau"
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}
          </div>
          
          {roomImages.length > 1 && (
            <div className="image-thumbnails">
              {roomImages.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail-container ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${room.name} - Ảnh nhỏ ${index + 1}`} 
                    className="thumbnail-image"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Room Details */}
        <div className="room-detail-content">
          {/* Left Content */}
          <div className="room-info slide-in-left">
            <div className="room-description">
              <h2 className="section-title">Thông tin phòng</h2>
              <p>{room.description}</p>
              
              <div className="room-features">
                <div className="feature">
                  <Users size={20} />
                  <span>{room.maxGuests} khách</span>
                </div>
                <div className="feature">
                  <Bed size={20} />
                  <span>{room.bedrooms} phòng ngủ</span>
                </div>
                <div className="feature">
                  <Bath size={20} />
                  <span>{room.bathrooms} phòng tắm</span>
                </div>
                <div className="feature">
                  <Home size={20} />
                  <span>{room.area} m²</span>
                </div>
              </div>
            </div>
            
            <div className="room-amenities">
              <h2 className="section-title">Tiện nghi</h2>
              <div className="amenities-grid">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    {amenityIcons[amenity] || <Check size={20} />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="room-policies">
              <h2 className="section-title">Chính sách và quy định</h2>
              <div className="policy-list">
                <div className="policy-item">
                  <h3>Nhận phòng và trả phòng</h3>
                  <p>Nhận phòng: Sau 14:00</p>
                  <p>Trả phòng: Trước 12:00</p>
                </div>
                
                <div className="policy-item">
                  <h3>Hủy phòng</h3>
                  <p>Miễn phí hủy phòng trước 7 ngày. Hủy phòng sau thời gian này sẽ mất 50% tiền đặt cọc.</p>
                </div>
                
                <div className="policy-item">
                  <h3>Quy định khác</h3>
                  <p>Không hút thuốc</p>
                  <p>Không mang vật nuôi</p>
                  <p>Không tổ chức tiệc</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="booking-sidebar slide-in-right">
            <div className="booking-form">
              <div className="price-section">
                {room.priceDiscount ? (
                  <>
                    <span className="price-discount">{formatPrice(room.priceDiscount)}</span>
                    <span className="price-original">{formatPrice(room.price)}</span>
                  </>
                ) : (
                  <span className="price">{formatPrice(room.price)}</span>
                )}
                <span className="price-unit">/ đêm</span>
              </div>
              
              <div className="rating-summary">
                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                <span>{room.rating}</span>
                <span className="review-count">({room.reviewCount} đánh giá)</span>
              </div>
              
              <div className="booking-dates">
                <div className="booking-field">
                  <label>Nhận phòng</label>
                  <div className="input-icon-wrapper">
                    <Calendar size={18} className="field-icon" />
                    <input
                      type="date"
                      name="checkIn"
                      value={booking.checkIn}
                      onChange={handleBookingChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="booking-input"
                    />
                  </div>
                </div>
                
                <div className="booking-field">
                  <label>Trả phòng</label>
                  <div className="input-icon-wrapper">
                    <Calendar size={18} className="field-icon" />
                    <input
                      type="date"
                      name="checkOut"
                      value={booking.checkOut}
                      onChange={handleBookingChange}
                      min={booking.checkIn || new Date().toISOString().split('T')[0]}
                      className="booking-input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="booking-guests">
                <label>Số lượng khách</label>
                <div className="guest-selector">
                  <button 
                    className="guest-btn" 
                    onClick={() => handleGuestsChange(-1)}
                    disabled={booking.guests <= 1}
                  >-</button>
                  <span className="guest-count">{booking.guests} khách</span>
                  <button 
                    className="guest-btn" 
                    onClick={() => handleGuestsChange(1)}
                    disabled={booking.guests >= room.maxGuests}
                  >+</button>
                </div>
              </div>
              
              <div className="booking-summary">
                <div className="summary-item">
                  <span>Giá phòng x {booking.guests} người</span>
                  <span>{formatPrice((room.priceDiscount || room.price) * booking.guests)}</span>
                </div>
                
                {booking.checkIn && booking.checkOut && (
                  <div className="summary-item">
                    <span>Số đêm</span>
                    <span>{calculateNumberOfNights(booking.checkIn, booking.checkOut)} đêm</span>
                  </div>
                )}
                
                <div className="summary-item">
                  <span>Phí dịch vụ</span>
                  <span>{formatPrice(calculateTotal() * 0.05)}</span>
                </div>
                
                <div className="summary-total">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(calculateTotal() * 1.05)}</span>
                </div>
              </div>
              
              <Link 
                to={`/booking/${room.id}`} 
                className="booking-button btn-hover-effect"
              >
                Đặt phòng ngay
              </Link>
              
              <p className="booking-note">Bạn chưa bị trừ tiền</p>
            </div>
            
            <div className="booking-safety-info">
              <div className="safety-icon">🔒</div>
              <p>Thanh toán an toàn & bảo mật. Thông tin của bạn được mã hóa.</p>
            </div>
          </div>
        </div>
        
        {/* Similar Rooms Section */}
        <div className="similar-rooms-section">
          <h2 className="section-title">Có thể bạn cũng thích</h2>
          <div className="similar-rooms-grid">
            {rooms
              .filter(r => r.id !== room.id && r.location === room.location)
              .slice(0, 3)
              .map(similarRoom => (
                <div key={similarRoom.id} className="similar-room-card">
                  <Link to={`/room/${similarRoom.id}`} className="similar-room-link">
                    <div className="similar-room-image">
                      <img 
                        src={similarRoom.imageUrl} 
                        alt={similarRoom.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/api/placeholder/400/250';
                        }}
                      />
                    </div>
                    <div className="similar-room-content">
                      <h3 className="similar-room-title">{similarRoom.name}</h3>
                      <div className="similar-room-rating">
                        <Star size={14} fill="#FFD700" stroke="#FFD700" />
                        <span>{similarRoom.rating}</span>
                      </div>
                      <div className="similar-room-price">
                        {similarRoom.priceDiscount ? (
                          <>
                            <span className="price-discount">{formatPrice(similarRoom.priceDiscount)}</span>
                            <span className="price-original">{formatPrice(similarRoom.price)}</span>
                          </>
                        ) : (
                          <span className="price">{formatPrice(similarRoom.price)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .room-detail-page {
          padding-bottom: var(--spacing-xxl);
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          margin: var(--spacing-md) 0;
          font-size: var(--font-size-sm);
        }
        
        .breadcrumb-link {
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .breadcrumb-link:hover {
          color: var(--primary-color);
        }
        
        .breadcrumb-separator {
          margin: 0 var(--spacing-xs);
          color: var(--text-light);
        }
        
        .breadcrumb-current {
          font-weight: var(--font-weight-medium);
          color: var(--text-color);
        }
        
        /* Room Title Section */
        .room-title-section {
          margin-bottom: var(--spacing-lg);
        }
        
        .room-title {
          font-size: var(--font-size-xxl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-sm);
        }
        
        .room-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .room-rating, .room-location {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .review-count {
          color: var(--text-light);
          font-size: var(--font-size-sm);
        }
        
        .room-actions {
          display: flex;
          gap: var(--spacing-sm);
          margin-left: auto;
        }
        
        .action-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          color: var(--text-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .action-button:hover {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }
        
        .favorite-button.is-favorite {
          color: var(--accent-color);
          border-color: var(--accent-color);
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.1)' : 'rgba(230, 57, 70, 0.1)'};
        }
        
        /* Image Gallery */
        .image-gallery-container {
          margin-bottom: var(--spacing-lg);
        }
        
        .main-image-container {
          position: relative;
          height: 450px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: var(--spacing-sm);
          background-color: var(--card-background);
        }
        
        .image-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          color: var(--text-color);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        
        .gallery-nav:hover {
          opacity: 1;
        }
        
        .gallery-nav.prev {
          left: var(--spacing-md);
        }
        
        .gallery-nav.next {
          right: var(--spacing-md);
        }
        
        .image-thumbnails {
          display: flex;
          gap: var(--spacing-sm);
          overflow-x: auto;
          padding-bottom: var(--spacing-xs);
          scrollbar-width: thin;
          scrollbar-color: var(--primary-color) var(--card-background);
        }
        
        .image-thumbnails::-webkit-scrollbar {
          height: 6px;
        }
        
        .image-thumbnails::-webkit-scrollbar-track {
          background: var(--card-background);
          border-radius: 3px;
        }
        
        .image-thumbnails::-webkit-scrollbar-thumb {
          background-color: var(--primary-color);
          border-radius: 3px;
        }
        
        .thumbnail-container {
          width: 100px;
          height: 70px;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.3s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        
        .thumbnail-container:hover {
          transform: translateY(-2px);
        }
        
        .thumbnail-container.active {
          border-color: var(--primary-color);
        }
        
        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Room Detail Content */
        .room-detail-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-xl);
        }
        
        /* Room Info */
        .room-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }
        
        .section-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-md);
          position: relative;
          padding-bottom: var(--spacing-xs);
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--primary-color);
        }
        
        .room-features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        /* Amenities */
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }
        
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: var(--spacing-sm);
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
          border-radius: var(--border-radius-md);
        }
        
        /* Policies */
        .policy-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }
        
        .policy-item h3 {
          font-size: var(--font-size-md);
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-semibold);
        }
        
        .policy-item p {
          margin-bottom: var(--spacing-xs);
          color: var(--text-light);
        }
        
        /* Booking Sidebar */
        .booking-sidebar {
          position: sticky;
          top: 80px;
        }
        
        .booking-form {
          background-color: var(--card-background);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
          text-align: left;
        }
        
        .price-section {
          margin-bottom: var(--spacing-sm);
          text-align:center;
        }
        
        .price, .price-discount {
          font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--primary-color);
        }
        
        .price-original {
          font-size: var(--font-size-md);
        color: var(--text-light);
        text-decoration: line-through;
        margin-left: var(--spacing-xs);
        }
        
        .price-unit {
          font-size: var(--font-size-md);
        color: var(--text-light);
        margin-left: var(--spacing-xs);
        }
        
        .rating-summary {
           display: flex;
        align-items: center;
        justify-content: center; /* Căn giữa */
        gap: 5px;
        margin-bottom: var(--spacing-md);
        }
        
        .booking-dates {
          display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
        }
        
        .booking-field {
          margin-bottom: var(--spacing-sm);
        }
        
        .booking-field label {
           display: block;
        margin-bottom: 5px;
        font-size: var(--font-size-sm);
        color: var(--text-light);
        text-align: left;
        }
        
        .input-icon-wrapper {
          position: relative;
        }
        
        .field-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-light);
        pointer-events: none;
        }
        
        .booking-input {
            width: 100%;
            padding: 10px 10px 10px 36px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-md);
            background-color: var(--input-background);
            color: var(--text-color);
            text-align: center;
        }
        
        .booking-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        
        .booking-guests {
          margin-bottom: var(--spacing-md);
        }
        
        .guest-selector {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-md);
            padding: 8px 16px;
            background-color: var(--input-background);
            text-align: center;
        }
        .guest-count {
            flex: 1; /* Chiếm hết không gian giữa 2 nút */
            text-align: center; /* Căn giữa text */
            font-size: var(--font-size-md);
        }
        .guest-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
        }
        
        .guest-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .booking-summary {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-color);
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--spacing-sm);
            font-size: var(--font-size-sm);
            align-items: center;
        }
        
        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border-color);
          font-weight: var(--font-weight-bold);
        }
        
        .booking-button {
            display: block;
            width: 100%;
            padding: var(--spacing-md);
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: var(--border-radius-md);
            font-weight: var(--font-weight-medium);
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            margin: var(--spacing-lg) auto 0; /* Căn giữa nút với margin-top */
            transition: background-color 0.3s ease;
        }
        
        .booking-button:hover {
          background-color: ${darkMode ? '#ff4d4d' : '#2d5a5c'};
        }
        
        .booking-note {
        text-align: center;
        font-size: var(--font-size-xs);
        color: var(--text-light);
        margin-top: var(--spacing-sm);
        width: 100%;
        }
        
        .booking-safety-info {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
          padding: var(--spacing-md);
          border-radius: var(--border-radius-md);
          font-size: var(--font-size-sm);
        }
        
        .safety-icon {
          font-size: 20px;
        }
        
        /* Similar Rooms */
        .similar-rooms-section {
          margin-top: var(--spacing-xxl);
        }
        
        .similar-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }
        
        .similar-room-card {
          background-color: var(--card-background);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .similar-room-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .similar-room-link {
          text-decoration: none;
          color: inherit;
        }
        
        .similar-room-image {
          height: 180px;
          position: relative;
          overflow: hidden;
        }
        
        .similar-room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .similar-room-card:hover .similar-room-image img {
          transform: scale(1.05);
        }
        
        .similar-room-content {
          padding: var(--spacing-md);
        }
        
        .similar-room-title {
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          margin-top: 0;
          margin-bottom: var(--spacing-sm);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .room-detail-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
          
          .booking-sidebar {
            position: static;
            order: -1;
          }
        }
        
        @media (max-width: 768px) {
          .main-image-container {
            height: 300px;
          }
          
          .thumbnail-container {
            width: 80px;
            height: 60px;
          }
          
          .room-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
          
          .room-actions {
            margin-left: 0;
            width: 100%;
            justify-content: space-between;
          }
          
          .policy-list {
            grid-template-columns: 1fr;
          }
          
          .similar-rooms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RoomDetail;