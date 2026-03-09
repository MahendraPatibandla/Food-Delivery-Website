# Food-Delivery-Website

## QuickBite 🍕 — MERN Stack Food Delivery App
A full-stack, production-ready food delivery web application built with the MERN Stack (MongoDB, Express, React, Node.js).

## Screenshots
<img width="824" height="831" alt="image" src="https://github.com/user-attachments/assets/4569c856-63b8-41da-af31-e6536d061bf9" />
<img width="877" height="322" alt="image" src="https://github.com/user-attachments/assets/a2ca5eb3-7255-4c15-baa7-6a204b2dfa47" />
<img width="876" height="836" alt="image" src="https://github.com/user-attachments/assets/f00c82ef-d894-4c32-bc46-88a8f095674f" />
<img width="1047" height="545" alt="image" src="https://github.com/user-attachments/assets/101544b3-1fbe-4d25-973b-500b778a7d0d" />
<img width="512" height="762" alt="image" src="https://github.com/user-attachments/assets/a1136929-0f59-4ffa-abdc-065279812d07" />
<img width="478" height="796" alt="image" src="https://github.com/user-attachments/assets/db292c82-0502-44f7-b1a0-cf1fe14a7a04" />




## 🚀 Features
### Frontend (React)

Beautiful Dark UI with orange brand theme and smooth animations
Home Page with hero section, stats, category grid, featured dishes
Menu Page with real-time search, category filter, sort options
Cart System with quantity controls, real-time total calculation
Checkout Flow with delivery address & payment method selection
Order Tracking with status badges (Pending → Preparing → Delivered)
Auth Pages (Sign In / Sign Up) with form validation
Fully responsive design
Toast notifications for user feedback

### Backend (Node.js + Express)

REST API with full CRUD operations
JWT Authentication (register, login, protected routes)
Menu Management with categories, filtering, sorting
Order Management with status tracking
Admin middleware for protected admin operations
Database seeding endpoint for quick setup

### Database (MongoDB)

User model with bcrypt password hashing
MenuItem model with rich metadata
Order model with embedded items and delivery info

## 🛠️ Setup & Installation
### Prerequisites

Node.js v18+
MongoDB (local or Atlas)
npm or yarn

## 1. Clone / navigate to the project
cd food-delivery

## 2. Setup the Backend
cd server
npm install

--Create .env file
echo "MONGO_URI=mongodb://localhost:27017/fooddelivery
JWT_SECRET=your_super_secret_key_here
PORT=5000" > .env

--Start server
npm run dev

## 3. Seed the Menu (one-time)
curl -X POST http://localhost:5000/api/menu/seed

## 4. Setup the Frontend
cd ../client
npm install
npm start

The app will open at http://localhost:3000

## 🔌 API Endpoints

<img width="813" height="834" alt="image" src="https://github.com/user-attachments/assets/2ff20ffc-9b44-4da6-9f37-129eccab2fb0" />


<img width="848" height="375" alt="image" src="https://github.com/user-attachments/assets/af5e7e89-89a0-4953-8f6e-96da9ecc16c5" />


## 🎨 Tech Stack

Frontend: React 18, React Router v6, CSS-in-JS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose ODM
Auth: JWT, bcryptjs
Fonts: Syne (headings), DM Sans (body)
Design: Custom dark theme, CSS animations


Built with ❤️ using the MERN Stack

