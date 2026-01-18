# Portfolio Shaman - MERN Portfolio Project

A complete, production-ready portfolio website for Shaman Dhungel built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a modern cyberpunk design, admin dashboard, AI chatbot, and contact form with email functionality.

## 🌟 Features

### Frontend
- **Modern UI/UX**: Cyberpunk theme with dark/light mode toggle
- **Responsive Design**: Mobile-first, fully responsive layout
- **Interactive Components**: 
  - AI Chatbot with typing indicators
  - Smooth animations with Framer Motion
  - ReadyMag-style editorial layout
  - Project showcase with filtering
- **Admin Interface**: Protected dashboard for content management
- **Contact Form**: Integrated with Nodemailer

### Backend
- **RESTful API**: Fully documented endpoints
- **Authentication**: JWT-based admin login system
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer integration for contact form
- **Security**: Helmet.js, CORS, rate limiting ready
- **Error Handling**: Comprehensive error middleware

### Admin Features
- **Project Management**: CRUD operations for projects
- **Testimonial Management**: Add/edit/delete client testimonials
- **Message Management**: View contact form submissions
- **Analytics Dashboard**: Overview of portfolio statistics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio_shaman



Backend Setup

bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
Frontend Setup

bash
cd ../frontend
npm install
npm run dev
Access the application

Frontend: http://localhost:5173

Backend API: http://localhost:5000

Admin Login: http://localhost:5173/admin/login

📁 Project Structure
text
portfolio_shaman/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── server.js       # Express server
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   ├── utils/      # Utility functions
│   │   └── styles/     # CSS files
│   └── package.json
└── README.md
🔧 Environment Variables
Backend (.env)
env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_shaman
JWT_SECRET=your_super_secret_jwt_key_change_this
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin123

# Nodemailer Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=Portfolio Website

FRONTEND_URL=http://localhost:5173
Frontend (optional .env)
env
VITE_API_URL=http://localhost:5000/api
👤 Admin Credentials
Default Admin Account:

Email: admin@portfolio.com

Password: Admin123

To change credentials:

Update the .env file in backend

Restart the backend server

The default admin will be recreated with new credentials

🌐 API Endpoints
Public Endpoints
GET /api/projects - Get all projects

GET /api/testimonials - Get all testimonials

POST /api/contact - Send contact message

POST /api/chatbot - Chat with AI assistant

POST /api/admin/login - Admin login

Protected Endpoints (Require JWT)
GET /api/admin/profile - Get admin profile

POST /api/projects - Create project

PUT /api/projects/:id - Update project

DELETE /api/projects/:id - Delete project

POST /api/testimonials - Create testimonial

PUT /api/testimonials/:id - Update testimonial

DELETE /api/testimonials/:id - Delete testimonial

GET /api/contact - Get all messages (admin)

🚢 Deployment
Backend Deployment (Render)
Push code to GitHub repository

Create a new Web Service on Render

Connect your GitHub repository

Configure environment variables

Set build command: npm install

Set start command: node server.js

Deploy!

Frontend Deployment (Vercel)
Push code to GitHub repository

Import project in Vercel

Configure project:

Build Command: npm run build

Output Directory: dist

Install Command: npm install

Add environment variable:

VITE_API_URL: Your Render backend URL

Deploy!

MongoDB Deployment (Atlas)
Create a free cluster on MongoDB Atlas

Get connection string

Whitist your IP addresses

Update MONGODB_URI in backend environment variables

🛠️ Built With
Frontend
React 18 - Frontend library

Vite - Build tool and dev server

Tailwind CSS - Utility-first CSS framework

Framer Motion - Animation library

React Router - Routing

shadcn/ui - UI components

Axios - HTTP client

Backend
Node.js - JavaScript runtime

Express - Web framework

MongoDB - NoSQL database

Mongoose - ODM for MongoDB

JWT - Authentication

Nodemailer - Email service

bcryptjs - Password hashing

🎨 Design Features
Cyberpunk Theme: Neon colors, glows, and futuristic aesthetics

Dark/Light Mode: Toggle with persistent preference

ReadyMag Layout: Editorial-style typography and spacing

Motion Design: Smooth transitions and animations

Accessibility: Semantic HTML and ARIA labels

Responsive Grid: Adapts to all screen sizes

🤖 AI Chatbot
The AI chatbot is a mock implementation that:

Provides intelligent responses based on keywords

Simulates typing indicators

Has quick question buttons

Maintains chat history within session

Connects to backend API endpoint

📧 Contact Form
Sends emails using Nodemailer

Stores messages in MongoDB

Success/error feedback

Admin can view all messages in dashboard

🔒 Security Features
JWT authentication with HTTP-only cookies

Password hashing with bcrypt

Helmet.js security headers

CORS configuration

Input validation and sanitization

Rate limiting ready

🧪 Testing the Application
Start MongoDB locally:

bash
mongod
Start backend:

bash
cd backend
npm run dev
Start frontend:

bash
cd frontend
npm run dev
Test admin features:

Navigate to /admin/login

Use default credentials

Add projects and testimonials

View contact messages

🐛 Troubleshooting
Common Issues
MongoDB Connection Error

Ensure MongoDB is running locally

Check connection string in .env

For Atlas, whitelist your IP

Nodemailer Not Sending Emails

Use Gmail with App Password

Enable 2-factor authentication

Generate app-specific password

CORS Errors

Check FRONTEND_URL in backend .env

Ensure frontend URL matches exactly

Build Errors

Clear node_modules: rm -rf node_modules

Reinstall: npm install

Update packages: npm update

Development Tips
Use Postman to test API endpoints

Check browser console for frontend errors

Monitor backend logs in terminal

Use React DevTools for component inspection

📄 License
This project is open source and available for personal and commercial use.

👨‍💻 Author
Shaman Dhungel

Full-Stack Developer

MERN Stack Specialist

Portfolio: shamandhungel.com

🙏 Acknowledgments
Icons by Lucide

Fonts by Google Fonts

UI Components by shadcn/ui

Animation by Framer Motion

Note: This is a complete, production-ready portfolio application. Follow the setup instructions carefully for a successful deployment.

text

## Installation Summary

1. **Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
Frontend Setup:

bash
cd frontend
npm install
npm run dev
Access:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

Admin: http://localhost:5173/admin/login