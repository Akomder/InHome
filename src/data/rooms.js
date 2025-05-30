// Dữ liệu mẫu cho danh sách phòng với ảnh thực tế
const rooms = [
    {
      id: 1,
      name: 'Phòng Deluxe Với Tầm Nhìn Ra Biển',
      description: 'Phòng sang trọng với không gian rộng rãi, tầm nhìn tuyệt đẹp ra biển và đầy đủ tiện nghi cao cấp.',
      price: 1200000,
      priceDiscount: 1000000,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      area: 30,
      imageUrl: '/images/rooms/deluxe-ocean-view.jpg',
      images: [
        '/images/rooms/deluxe-ocean-view-1.jpg',
        '/images/rooms/deluxe-ocean-view-2.jpg',
        '/images/rooms/deluxe-ocean-view-3.jpg',
        '/images/rooms/deluxe-ocean-view-4.jpg'
      ],
      location: 'Nha Trang',
      rating: 4.8,
      reviewCount: 124,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Máy giặt', 'Hồ bơi', 'Bãi đỗ xe'],
      isPopular: true,
      isNew: false
    },
    {
      id: 2,
      name: 'Biệt thự ven biển với hồ bơi riêng',
      description: 'Biệt thự sang trọng với hồ bơi riêng, 3 phòng ngủ rộng rãi, phù hợp cho gia đình hoặc nhóm bạn.',
      price: 5000000,
      priceDiscount: null,
      maxGuests: 8,
      bedrooms: 3,
      beds: 4,
      bathrooms: 3,
      area: 200,
      imageUrl: '/images/rooms/beach-villa.jpg',
      images: [
        '/images/rooms/beach-villa-1.jpg',
        '/images/rooms/beach-villa-2.jpg',
        '/images/rooms/beach-villa-3.jpg',
        '/images/rooms/beach-villa-4.jpg'
      ],
      location: 'Đà Nẵng',
      rating: 4.9,
      reviewCount: 87,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Máy giặt', 'Hồ bơi riêng', 'BBQ', 'Bãi đỗ xe'],
      isPopular: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Căn hộ hiện đại trung tâm thành phố',
      description: 'Căn hộ 2 phòng ngủ hiện đại, nằm ở trung tâm thành phố, gần các điểm tham quan và mua sắm.',
      price: 1800000,
      priceDiscount: 1500000,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      area: 80,
      imageUrl: '/images/rooms/city-apartment.jpg',
      images: [
        '/images/rooms/city-apartment-1.jpg',
        '/images/rooms/city-apartment-2.jpg',
        '/images/rooms/city-apartment-3.jpg',
        '/images/rooms/city-apartment-4.jpg'
      ],
      location: 'Hồ Chí Minh',
      rating: 4.7,
      reviewCount: 215,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Máy giặt', 'Bếp', 'Bãi đỗ xe'],
      isPopular: true,
      isNew: false
    },
    {
      id: 4,
      name: 'Homestay view núi Đà Lạt',
      description: 'Homestay xinh xắn với view núi tuyệt đẹp, không gian yên tĩnh phù hợp cho các cặp đôi.',
      price: 800000,
      priceDiscount: null,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      area: 35,
      imageUrl: '/images/rooms/dalat-homestay.jpg',
      images: [
        '/images/rooms/dalat-homestay-1.jpg',
        '/images/rooms/dalat-homestay-2.jpg',
        '/images/rooms/dalat-homestay-3.jpg',
        '/images/rooms/dalat-homestay-4.jpg'
      ],
      location: 'Đà Lạt',
      rating: 4.6,
      reviewCount: 142,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Bếp nhỏ', 'Ban công'],
      isPopular: false,
      isNew: true
    },
    {
      id: 5,
      name: 'Phòng Studio gần phố cổ',
      description: 'Phòng studio tiện nghi gần phố cổ, dễ dàng di chuyển đến các điểm tham quan nổi tiếng.',
      price: 900000,
      priceDiscount: 750000,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      area: 28,
      imageUrl: '/images/rooms/hanoi-studio.jpg',
      images: [
        '/images/rooms/hanoi-studio-1.jpg',
        '/images/rooms/hanoi-studio-2.jpg',
        '/images/rooms/hanoi-studio-3.jpg',
        '/images/rooms/hanoi-studio-4.jpg'
      ],
      location: 'Hà Nội',
      rating: 4.5,
      reviewCount: 98,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Máy giặt'],
      isPopular: false,
      isNew: true
    },
    {
      id: 6,
      name: 'Bungalow bên bờ biển',
      description: 'Bungalow xinh xắn nằm ngay bên bờ biển, tận hưởng không khí trong lành và tiếng sóng biển.',
      price: 1500000,
      priceDiscount: null,
      maxGuests: 3,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      area: 40,
      imageUrl: '/images/rooms/beach-bungalow.jpg',
      images: [
        '/images/rooms/beach-bungalow-1.jpg',
        '/images/rooms/beach-bungalow-2.jpg',
        '/images/rooms/beach-bungalow-3.jpg',
        '/images/rooms/beach-bungalow-4.jpg'
      ],
      location: 'Phú Quốc',
      rating: 4.8,
      reviewCount: 76,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Ban công', 'Tầm nhìn ra biển'],
      isPopular: true,
      isNew: false
    },
    {
      id: 7,
      name: 'Penthouse cao cấp Landmark 81',
      description: 'Penthouse sang trọng tại tòa nhà cao nhất Việt Nam, tầm nhìn panorama toàn thành phố.',
      price: 8000000,
      priceDiscount: 7000000,
      maxGuests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3,
      area: 150,
      imageUrl: '/images/rooms/penthouse-landmark.jpg',
      images: [
        '/images/rooms/penthouse-landmark-1.jpg',
        '/images/rooms/penthouse-landmark-2.jpg',
        '/images/rooms/penthouse-landmark-3.jpg',
        '/images/rooms/penthouse-landmark-4.jpg'
      ],
      location: 'Hồ Chí Minh',
      rating: 4.9,
      reviewCount: 32,
      amenities: ['Wifi', 'Điều hòa', 'TV', 'Tủ lạnh', 'Máy giặt', 'Bếp', 'Hồ bơi', 'Gym', 'Sauna'],
      isPopular: true,
      isNew: false
    },
    {
      id: 8,
      name: 'Nhà gỗ truyền thống Mai Châu',
      description: 'Nhà gỗ truyền thống của người Thái, không gian yên bình giữa thung lũng Mai Châu.',
      price: 600000,
      priceDiscount: null,
      maxGuests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      area: 45,
      imageUrl: '/images/rooms/maichau-wooden-house.jpg',
      images: [
        '/images/rooms/maichau-wooden-house-1.jpg',
        '/images/rooms/maichau-wooden-house-2.jpg',
        '/images/rooms/maichau-wooden-house-3.jpg',
        '/images/rooms/maichau-wooden-house-4.jpg'
      ],
      location: 'Mai Châu',
      rating: 4.7,
      reviewCount: 108,
      amenities: ['Wifi', 'Quạt trần', 'Bữa sáng', 'Sân vườn'],
      isPopular: false,
      isNew: true
    }
  ];
  
  export default rooms;