# 🛍️ ModernMart - Full-Stack E-commerce Platform

A modern, full-featured e-commerce platform built with React.js, Node.js, Express.js, and MongoDB. Features a responsive design, secure authentication, payment integration, and comprehensive product management.

## 🚀 Features

### Frontend Features
- **Modern UI/UX** - Clean, responsive design with smooth animations
- **Product Catalog** - Grid/list view with advanced filtering and sorting
- **Product Details** - Comprehensive product pages with image galleries
- **Shopping Cart** - Real-time cart management with quantity updates
- **User Authentication** - Secure login/register with JWT tokens
- **User Dashboard** - Profile management and order history
- **Search & Filter** - Advanced product search with multiple filters
- **Reviews & Ratings** - User reviews and rating system
- **Responsive Design** - Mobile-first approach for all devices

### Backend Features
- **REST API** - Complete RESTful API with proper HTTP methods
- **Microservice Architecture** - Modular, scalable backend structure
- **MongoDB Integration** - Efficient data storage and retrieval
- **User Management** - Registration, authentication, and authorization
- **Product Management** - CRUD operations for products and categories
- **Order Management** - Complete order lifecycle management
- **Payment Integration** - Ready for payment gateway integration
- **Security** - Password hashing, JWT tokens, rate limiting
- **File Upload** - Image upload support with multer

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware

## 📁 Project Structure

```
ecommerce-platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Redux store configuration
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Utility functions
│   │   └── assets/            # Static assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   └── config/           # Configuration files
│   └── package.json
├── uploads/                  # File upload directory
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or cloud service)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/modernmart
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Email (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart & Orders
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:id` - Update cart item (protected)
- `DELETE /api/cart/:id` - Remove from cart (protected)
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)

### Reviews
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Add review (protected)

## 🎨 Design Features

- **Modern Gradient Backgrounds** - Beautiful gradient overlays
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Grid Layouts** - Flexible product grids
- **Interactive Elements** - Hover effects and micro-interactions
- **Clean Typography** - Readable fonts with proper hierarchy
- **Color-coded Status** - Intuitive color system for different states

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting for API endpoints
- Helmet for security headers
- Input validation and sanitization
- CORS configuration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- Flexible layouts that adapt to all screen sizes
- Touch-friendly interface elements

## 🚀 Deployment

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### Build for Production
```bash
npm run build
```

## 📈 Future Enhancements

- Payment gateway integration (Stripe, PayPal, Razorpay)
- Real-time notifications with WebSockets
- Advanced analytics dashboard
- Multi-vendor support
- Inventory management system
- Email marketing integration
- Advanced search with Elasticsearch
- Mobile app with React Native

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@modernmart.com or join our Slack channel.

## 🙏 Acknowledgments

- React.js team for the amazing library
- MongoDB team for the powerful database
- Tailwind CSS for the utility-first approach
- All open-source contributors

---

**Made with ❤️ by ModernMart Team**