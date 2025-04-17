import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Star, Users, Bed, Bath, Home, Heart } from 'lucide-react';

const RoomCard = ({ room }) => {
  const { darkMode } = useContext(ThemeContext);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Format giá tiền theo VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Xử lý toggle yêu thích
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={`room-card card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="room-card__image-container">
        {room.isNew && <span className="room-badge room-badge-new">Mới</span>}
        {room.isPopular && <span className="room-badge room-badge-popular">Phổ biến</span>}
        <div className="room-card__image">
          <img src={room.imageUrl} alt={room.name} />
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} 
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        >
          <Heart size={20} fill={isFavorite ? "#e63946" : "none"} />
        </button>
        <div className="room-card__location">
          <span>{room.location}</span>
        </div>
      </div>
      
      <Link to={`/room/${room.id}`} className="room-card__link">
        <div className="room-card__content">
          <div className="room-card__rating">
            <Star size={16} fill="#FFD700" stroke="#FFD700" />
            <span>{room.rating}</span>
            <span className="review-count">({room.reviewCount} đánh giá)</span>
          </div>
          
          <h3 className="room-card__title">{room.name}</h3>
          
          <p className="room-card__description">{room.description}</p>
          
          <div className="room-card__features">
            <div className="feature">
              <Users size={16} />
              <span>{room.maxGuests} khách</span>
            </div>
            <div className="feature">
              <Bed size={16} />
              <span>{room.bedrooms} phòng ngủ</span>
            </div>
            <div className="feature">
              <Bath size={16} />
              <span>{room.bathrooms} phòng tắm</span>
            </div>
            <div className="feature">
              <Home size={16} />
              <span>{room.area} m²</span>
            </div>
          </div>
          
          <div className="room-card__price">
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
        </div>
      </Link>
      
      <div className="room-card__footer">
        <div className="amenities">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {room.amenities.length > 3 && (
            <span className="amenity-tag">+{room.amenities.length - 3}</span>
          )}
        </div>
        
        <Link to={`/booking/${room.id}`} className="btn btn-primary btn-sm book-now-btn">
          Đặt ngay
        </Link>
      </div>
      
      <style jsx>{`
        .room-card {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .room-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .room-card__image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .room-card__image {
          height: 100%;
        }
        
        .room-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .room-card:hover .room-card__image img {
          transform: scale(1.05);
        }
        
        .room-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 4px 8px;
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          z-index: 1;
        }
        
        .room-badge-new {
          background-color: var(--accent-color);
          color: white;
        }
        
        .room-badge-popular {
          background-color: var(--primary-color);
          color: white;
        }
        
        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1;
        }
        
        .dark-mode .favorite-button {
          background-color: rgba(30, 30, 30, 0.9);
          color: white;
        }
        
        .favorite-button:hover {
          transform: scale(1.1);
        }
        
        .favorite-button.is-favorite {
          background-color: rgba(230, 57, 70, 0.1);
        }
        
        .room-card__location {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 10px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          color: white;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }
        
        .room-card__link {
          text-decoration: none;
          color: inherit;
          flex: 1;
          display: block;
        }
        
        .room-card__content {
          padding: var(--spacing-md);
        }
        
        .room-card__rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: var(--spacing-sm);
        }
        
        .review-count {
          color: var(--text-light);
          font-size: var(--font-size-xs);
          margin-left: 2px;
        }
        
        .room-card__title {
          margin: 0 0 var(--spacing-sm);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        
        .room-card__description {
          font-size: var(--font-size-sm);
          color: var(--text-light);
          margin-bottom: var(--spacing-md);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .room-card__features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: var(--font-size-sm);
          color: var(--text-light);
        }
        
        .room-card__price {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          margin-bottom: var(--spacing-xs);
        }
        
        .price, .price-discount {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--primary-color);
        }
        
        .price-original {
          font-size: var(--font-size-sm);
          color: var(--text-light);
          text-decoration: line-through;
          margin-left: var(--spacing-xs);
        }
        
        .price-unit {
          font-size: var(--font-size-sm);
          color: var(--text-light);
          margin-left: var(--spacing-xs);
        }
        
        .room-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }
        
        .amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .amenity-tag {
          font-size: var(--font-size-xs);
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.1)' : 'rgba(60, 110, 113, 0.1)'};
          color: ${darkMode ? 'var(--accent-color)' : 'var(--primary-color)'};
          padding: 2px 6px;
          border-radius: var(--border-radius-sm);
        }
        
        .btn-sm {
          padding: 4px 10px;
          font-size: var(--font-size-xs);
        }
        
        .book-now-btn {
          white-space: nowrap;
        }
        
        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .room-card {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RoomCard;