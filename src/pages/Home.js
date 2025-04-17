import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Filter, MapPin, Calendar, Users, Sliders, ArrowRight, X } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import rooms from '../data/rooms';

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [filters, setFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 10000000],
    amenities: []
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Danh sách các địa điểm
  const locations = ['Tất cả', 'Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Nha Trang', 'Đà Lạt', 'Phú Quốc', 'Hội An'];

  // Mô phỏng loading state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Xử lý khi thay đổi filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Xử lý khi thay đổi số lượng khách
  const handleGuestsChange = (change) => {
    const newValue = filters.guests + change;
    if (newValue >= 1 && newValue <= 10) {
      setFilters({
        ...filters,
        guests: newValue
      });
    }
  };

  // Lọc phòng theo tab
  const filterRoomsByTab = (tab) => {
    setActiveTab(tab);
    
    let filtered = [...rooms];
    
    switch (tab) {
      case 'popular':
        filtered = rooms.filter(room => room.isPopular);
        break;
      case 'new':
        filtered = rooms.filter(room => room.isNew);
        break;
      case 'discounted':
        filtered = rooms.filter(room => room.priceDiscount);
        break;
      default:
        filtered = rooms;
    }
    
    setFilteredRooms(filtered);
  };

  // Áp dụng filter
  const applyFilters = () => {
    setIsFilterModalOpen(false);
    
    // Mô phỏng loading khi filter
    setLoading(true);
    
    setTimeout(() => {
      // Lọc danh sách phòng theo các tiêu chí
      const filtered = rooms.filter(room => {
        // Lọc theo địa điểm
        if (filters.location && filters.location !== 'Tất cả' && room.location !== filters.location) {
          return false;
        }
        
        // Lọc theo số lượng khách
        if (room.maxGuests < filters.guests) {
          return false;
        }
        
        // Lọc theo khoảng giá
        const roomPrice = room.priceDiscount || room.price;
        if (roomPrice < filters.priceRange[0] || roomPrice > filters.priceRange[1]) {
          return false;
        }
        
        return true;
      });
      
      setFilteredRooms(filtered);
      setLoading(false);
    }, 800);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content slide-in-left">
            <h1 className="hero-title">Khám phá những địa điểm tuyệt vời</h1>
            <p className="hero-subtitle">Tìm và đặt chỗ ở hoàn hảo cho kỳ nghỉ của bạn</p>
            
            {/* Search Box */}
            <div className="search-box pop-up">
              <div className="search-field">
                <div className="search-icon">
                  <MapPin size={18} />
                </div>
                <select 
                  name="location" 
                  className="search-select"
                  value={filters.location}
                  onChange={handleFilterChange}
                >
                  <option value="">Bạn muốn đi đâu?</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="search-field">
                <div className="search-icon">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  name="checkIn"
                  className="search-input"
                  placeholder="Ngày nhận phòng"
                  value={filters.checkIn}
                  onChange={handleFilterChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="search-field">
                <div className="search-icon">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  name="checkOut"
                  className="search-input"
                  placeholder="Ngày trả phòng"
                  value={filters.checkOut}
                  onChange={handleFilterChange}
                  min={filters.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="search-field">
                <div className="search-icon">
                  <Users size={18} />
                </div>
                <div className="guest-selector">
                  <button 
                    className="guest-btn" 
                    onClick={() => handleGuestsChange(-1)}
                    disabled={filters.guests <= 1}
                  >-</button>
                  <span className="guest-count">{filters.guests} khách</span>
                  <button 
                    className="guest-btn" 
                    onClick={() => handleGuestsChange(1)}
                    disabled={filters.guests >= 10}
                  >+</button>
                </div>
              </div>
              
              <button className="search-btn btn-hover-effect" onClick={applyFilters}>
                Tìm kiếm
              </button>
              
              <button className="filter-btn" onClick={() => setIsFilterModalOpen(true)}>
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="room-section">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-tabs fade-in">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => filterRoomsByTab('all')}
            >
              Tất cả
            </button>
            <button 
              className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
              onClick={() => filterRoomsByTab('popular')}
            >
              Phổ biến
            </button>
            <button 
              className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => filterRoomsByTab('new')}
            >
              Mới nhất
            </button>
            <button 
              className={`tab-btn ${activeTab === 'discounted' ? 'active' : ''}`}
              onClick={() => filterRoomsByTab('discounted')}
            >
              Giảm giá
            </button>
          </div>
          
          {/* Filters Applied */}
          {(filters.location || filters.guests > 1) && (
            <div className="applied-filters fade-in">
              <div className="filter-label">Bộ lọc đã áp dụng:</div>
              {filters.location && (
                <div className="filter-tag">
                  <MapPin size={14} />
                  <span>{filters.location}</span>
                </div>
              )}
              {filters.guests > 1 && (
                <div className="filter-tag">
                  <Users size={14} />
                  <span>{filters.guests} khách</span>
                </div>
              )}
              <button 
                className="clear-filters"
                onClick={() => {
                  setFilters({
                    ...filters,
                    location: '',
                    guests: 1
                  });
                  setFilteredRooms(rooms);
                }}
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
          
          {/* Room Grid */}
          <div className="room-grid">
            {loading ? (
              // Skeleton Loading
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="room-card-skeleton">
                  <div className="skeleton-image shimmer"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title shimmer"></div>
                    <div className="skeleton-description shimmer"></div>
                    <div className="skeleton-features">
                      <div className="skeleton-feature shimmer"></div>
                      <div className="skeleton-feature shimmer"></div>
                    </div>
                    <div className="skeleton-price shimmer"></div>
                  </div>
                </div>
              ))
            ) : filteredRooms.length > 0 ? (
              filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="no-results">
                <p>Không tìm thấy phòng phù hợp với tiêu chí tìm kiếm.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters({
                      location: '',
                      checkIn: '',
                      checkOut: '',
                      guests: 1,
                      priceRange: [0, 10000000],
                      amenities: []
                    });
                    setFilteredRooms(rooms);
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
          
          {/* Show More Button */}
          {filteredRooms.length > 0 && !loading && (
            <div className="show-more-container">
              <button className="show-more-btn">
                Xem thêm <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="filter-modal-overlay">
          <div className="filter-modal pop-up">
            <div className="filter-modal-header">
              <h3>Bộ lọc nâng cao</h3>
              <button 
                className="close-modal"
                onClick={() => setIsFilterModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="filter-modal-content">
              <div className="filter-section">
                <h4>Khoảng giá (VND)</h4>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        priceRange: [0, parseInt(e.target.value)]
                      });
                    }}
                    className="price-slider"
                  />
                  <div className="price-values">
                    <span>0đ</span>
                    <span>{new Intl.NumberFormat('vi-VN').format(filters.priceRange[1])}đ</span>
                  </div>
                </div>
              </div>
              
              <div className="filter-section">
                <h4>Tiện nghi</h4>
                <div className="amenities-list">
                  {['Wifi', 'Điều hòa', 'Hồ bơi', 'Bếp', 'Máy giặt', 'Bãi đỗ xe'].map((amenity, index) => (
                    <label key={index} className="amenity-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              amenities: [...filters.amenities, amenity]
                            });
                          } else {
                            setFilters({
                              ...filters,
                              amenities: filters.amenities.filter(a => a !== amenity)
                            });
                          }
                        }}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="filter-modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setFilters({
                    location: '',
                    checkIn: '',
                    checkOut: '',
                    guests: 1,
                    priceRange: [0, 10000000],
                    amenities: []
                  });
                }}
              >
                Đặt lại
              </button>
              <button 
                className="btn btn-primary"
                onClick={applyFilters}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }
        
        /* Hero Section */
        .hero-section {
          background: ${darkMode 
            ? 'linear-gradient(135deg, #1a1a1a, #2d142c)' 
            : 'linear-gradient(135deg, #3c6e71, #253c5b)'
          };
          color: white;
          padding: var(--spacing-xl) 0;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/api/placeholder/1600/800');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          z-index: 0;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: var(--spacing-xxl) var(--spacing-md);
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-md);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          margin-bottom: var(--spacing-xl);
          opacity: 0.9;
        }
        
        /* Search Box */
        .search-box {
          display: flex;
          flex-wrap: wrap;
          background-color: ${darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
          box-shadow: var(--shadow-lg);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
          backdrop-filter: blur(10px);
        }
        
        .search-field {
          flex: 1;
          min-width: 200px;
          position: relative;
          border-right: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .search-field:last-of-type {
          border-right: none;
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: ${darkMode ? 'var(--primary-color)' : 'var(--primary-color)'};
        }
        
        .search-select,
        .search-input {
            width: 100%;
            height: 60px;
            border: none;
            background: transparent;
            padding: 0 16px 0 44px;
            color: ${darkMode ? 'white' : 'var(--text-color)'};
            font-size: var(--font-size-md);
        }
        .search-select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: ${darkMode 
                ? 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")'
                : 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")'
            };
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
        }

        /* Style cho option trong select */
        .search-select option {
            background-color: ${darkMode ? 'var(--card-background)' : 'white'};
            color: ${darkMode ? 'white' : 'var(--text-color)'};
            padding: 10px;
        }

        /* Focus styles */
        .search-select:focus {
            outline: none;
            background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }
        .search-select:focus,
        .search-input:focus {
          outline: none;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }
        
        .guest-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 12px 0 44px;
        }
        
        .guest-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid ${darkMode ? 'var(--primary-color)' : 'var(--primary-color)'};
          background: transparent;
          color: ${darkMode ? 'var(--primary-color)' : 'var(--primary-color)'};
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
        
        .guest-count {
          font-size: var(--font-size-md);
          color: ${darkMode ? 'white' : 'var(--text-color)'};
        }
        
        .search-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          height: 60px;
          padding: 0 32px;
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: background-color 0.3s ease;
          min-width: 120px;
        }
        
        .search-btn:hover {
          background-color: ${darkMode ? 'color-mix(in srgb, var(--primary-color) 80%, white)' : 'color-mix(in srgb, var(--primary-color) 80%, black)'};
        }
        
        .filter-btn {
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.2)' : 'rgba(60, 110, 113, 0.1)'};
          border: none;
          height: 60px;
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: ${darkMode ? 'var(--primary-color)' : 'var(--primary-color)'};
          transition: background-color 0.3s ease;
        }
        
        .filter-btn:hover {
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.3)' : 'rgba(60, 110, 113, 0.2)'};
        }
        
        /* Room Section */
        .room-section {
          padding: var(--spacing-xl) 0;
        }
        
        /* Category Tabs */
        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }
        
        .tab-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          color: var(--text-color);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .tab-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        
        .tab-btn.active {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        /* Applied Filters */
        .applied-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.1)' : 'rgba(60, 110, 113, 0.1)'};
          border-radius: var(--border-radius-md);
        }
        
        .filter-label {
          font-weight: var(--font-weight-medium);
          margin-right: var(--spacing-sm);
        }
        
        .filter-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background-color: ${darkMode ? 'rgba(230, 57, 70, 0.2)' : 'rgba(60, 110, 113, 0.2)'};
          border-radius: var(--border-radius-sm);
          color: ${darkMode ? 'var(--accent-color)' : 'var(--primary-color)'};
          font-size: var(--font-size-sm);
        }
        
        .clear-filters {
          margin-left: auto;
          background: none;
          border: none;
          color: ${darkMode ? 'var(--accent-color)' : 'var(--primary-color)'};
          cursor: pointer;
          font-size: var(--font-size-sm);
          text-decoration: underline;
        }
        
        /* Room Grid */
        .room-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }
        
        /* Skeleton Loading */
        .room-card-skeleton {
          border-radius: var(--border-radius-md);
          background-color: var(--card-background);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          height: 400px;
        }
        
        .skeleton-image {
          height: 200px;
        }
        
        .skeleton-content {
          padding: var(--spacing-md);
        }
        
        .skeleton-title {
          height: 24px;
          margin-bottom: var(--spacing-md);
          border-radius: var(--border-radius-sm);
        }
        
        .skeleton-description {
          height: 16px;
          margin-bottom: var(--spacing-md);
          border-radius: var(--border-radius-sm);
        }
        
        .skeleton-features {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }
        
        .skeleton-feature {
          height: 16px;
          width: 70px;
          border-radius: var(--border-radius-sm);
        }
        
        .skeleton-price {
          height: 24px;
          width: 100px;
          border-radius: var(--border-radius-sm);
        }
        
        /* No Results */
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--spacing-xl);
          background-color: var(--card-background);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .no-results p {
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-lg);
          color: var(--text-light);
        }
        
        /* Show More */
        .show-more-container {
          text-align: center;
          margin-top: var(--spacing-xl);
        }
        
        .show-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: var(--spacing-sm) var(--spacing-lg);
          background: none;
          border: 1px solid var(--primary-color);
          border-radius: var(--border-radius-md);
          color: var(--primary-color);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .show-more-btn:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        /* Filter Modal */
        .filter-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          backdrop-filter: blur(3px);
        }
        
        .filter-modal {
          background-color: var(--card-background);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .filter-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border-color);
        }
        
        .filter-modal-header h3 {
          margin: 0;
          font-size: var(--font-size-lg);
        }
        
        .close-modal {
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
        }
        
        .filter-modal-content {
          padding: var(--spacing-lg);
        }
        
        .filter-section {
          margin-bottom: var(--spacing-lg);
        }
        
        .filter-section h4 {
          margin-top: 0;
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-md);
        }
        
        .price-range {
          padding: 0 var(--spacing-sm);
        }
        
        .price-slider {
          width: 100%;
          margin-bottom: var(--spacing-sm);
        }
        
        .price-values {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-size-sm);
          color: var(--text-light);
        }
        
        .amenities-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
        }
        
        .amenity-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .filter-modal-footer {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border-color);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: var(--spacing-lg) 0;
          }
          
          .hero-content {
            padding: var(--spacing-lg) var(--spacing-md);
          }
          
          .search-box {
            flex-direction: column;
          }
          
          .search-field {
            border-right: none;
            border-bottom: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          }
          
          .search-btn, .filter-btn {
            width: 100%;
          }
          
          .room-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .amenities-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;