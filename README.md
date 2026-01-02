# ProShop eCommerce Platform (v2)

> Modern full-featured eCommerce platform built with the MERN stack, Redux Toolkit, and Vite.

![ProShop](https://img.shields.io/badge/Stack-MERN-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-2.0-orange)

A production-ready eCommerce application featuring secure payment processing, admin management, product reviews, and a complete shopping cart experience.

## ✨ Features

- 🛒 **Full-featured shopping cart** with persistent state
- ⭐ **Product reviews and ratings** system
- 🔍 **Product search and filtering**
- 📄 **Product pagination**
- 🎠 **Top products carousel**
- 👤 **User authentication & authorization** (JWT-based)
- 📦 **Order management** system
- 💳 **Secure PayPal payment integration** with server-side verification
- 🔒 **Admin dashboard** for products, users, and orders
- 📊 **Admin order management** with delivery tracking
- 🖼️ **Image upload** with file type validation
- 💰 **Server-side price calculation** to prevent manipulation
- 🛡️ **Security enhancements** including ObjectId validation and transaction ID verification

## 🖼️ Project UI Preview

<div align="center">
  <img src="./screenshots/proshop-ui.png" alt="ProShop UI Preview" />
  <p><em>ProShop eCommerce Platform - Modern and intuitive user interface</em></p>
</div>

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router v6** - Routing
- **React Bootstrap** - UI components
- **Vite** - Build tool and dev server
- **PayPal SDK** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register))
- PayPal Developer account ([Sign up here](https://developer.paypal.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/heyvishusri/proshop-v2.git
   cd proshop-v2
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Configuration

1. **Create environment file**
   
   Copy `example.env` to `.env` in the root directory:
   ```bash
   cp example.env .env
   ```

2. **Configure environment variables**
   
   Update `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   PAYPAL_ENV=sandbox
   ```

   **Note:** 
   - For production, set `PAYPAL_ENV=production`
   - Generate a strong `JWT_SECRET` for security
   - Get your PayPal credentials from [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)

### Running the Application

**Development Mode** (runs both frontend and backend):
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:8000`
- Frontend dev server on `http://localhost:5173` (Vite default port)

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

### Seeding the Database

Populate the database with sample data:

```bash
# Import sample products and users
npm run data:import

# Destroy all data
npm run data:destroy
```

**Sample Login Credentials:**
- **Admin:** `admin@email.com` / `123456`
- **Customer:** `john@email.com` / `123456`
- **Customer:** `jane@email.com` / `123456`

## 🏗️ Project Structure

```
proshop-v2/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── data/           # Seed data
│   ├── middleware/     # Custom middleware (auth, error handling, validation)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions (PayPal, price calculation)
│   └── server.js       # Express server setup
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable React components
│       ├── screens/    # Page components
│       ├── slices/     # Redux Toolkit slices
│       ├── utils/      # Utility functions
│       └── main.jsx    # Application entry point
└── uploads/            # Uploaded product images
```

## 🔐 Security Features

- **Server-side price calculation** - Prevents client-side price manipulation
- **PayPal payment verification** - Validates payments via PayPal API
- **Transaction ID validation** - Prevents reuse of payment transaction IDs
- **ObjectId validation middleware** - Validates MongoDB ObjectIds before queries
- **JWT authentication** - Secure token-based authentication
- **File upload validation** - Only allows image file types (JPEG, PNG, WebP)
- **Protected routes** - Admin and user route protection
- **Password hashing** - Bcrypt password encryption

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination and search)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Create product review

### Users
- `POST /api/users/auth` - Authenticate user
- `POST /api/users` - Register user
- `POST /api/users/logout` - Logout user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/mine` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Mark order as delivered (Admin only)

### Uploads
- `POST /api/upload` - Upload product image (Admin only)

## 🚢 Deployment

### Build for Production

```bash
# Build frontend
cd frontend
npm run build
cd ..
```

The build output will be in `frontend/dist` directory.

### Environment Variables for Production

Make sure to set:
- `NODE_ENV=production`
- `PAYPAL_ENV=production`
- Use production MongoDB URI
- Use strong, unique secrets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Vishusri**

- GitHub: [@heyvishusri](https://github.com/heyvishusri)
- Repository: [proshop-v2](https://github.com/heyvishusri/proshop-v2)

## 🙏 Acknowledgments

- Inspired by Brad Traversy's MERN Stack course
- Built with modern best practices and security enhancements

---

⭐ If you found this project helpful, please give it a star!

