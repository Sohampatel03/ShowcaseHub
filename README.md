📘 ShowcaseHub – MERN Portfolio & Client Testimonials Platform

A full-stack MERN application featuring a modern landing page, admin panel, image cropping, and Cloudinary image storage.

🚀 Overview

ShowcaseHub is a fully responsive MERN-stack platform designed for agencies, freelancers, and businesses to showcase their projects, client testimonials, and capture leads.
The project includes:

Beautiful public landing page

Dynamic project portfolio

Client testimonials section

Contact form + Newsletter subscriptions

Secure Admin Login

Modern Admin Dashboard for managing:

Projects (Add, Edit, Delete)

Clients (Add, Edit, Delete)

Contacts

Subscribers

Cloudinary-based image upload + cropping tool

Fully redesigned UI using Tailwind CSS + Framer Motion

This project was built as an interview assignment using industry-standard MERN architecture.

🛠️ Tech Stack
Frontend

React + Vite

Tailwind CSS

Framer Motion (animations)

React Router

Axios

react-image-crop

react-icons

Backend

Node.js

Express.js

MongoDB Atlas

Cloudinary (Image Uploads)

Multer

Sharp (optional cropping)

JWT Authentication

Bcrypt

📁 Folder Structure
showcase-projects/
│
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── uploads/  (temporary if needed)
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── .env
│
└── README.md

🔧 Installation & Setup
1. Clone repository
git clone https://github.com/your-username/showcasehub.git
cd showcasehub

📌 Backend Setup
2. Install dependencies
cd backend
npm install

3. Create .env file inside backend/
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$2a$10$yourbcryptpasswordhash

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

4. Run backend
npm run dev


Backend runs at:

http://localhost:5000

🎨 Frontend Setup
1. Install dependencies
cd frontend
npm install

2. Create .env inside frontend/
VITE_API_URL=http://localhost:5000/api

3. Run frontend
npm run dev


Frontend runs at:

http://localhost:5173