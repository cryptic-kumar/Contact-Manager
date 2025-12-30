# 📇 Contact Manager (MERN)

A professional **MERN-stack** application designed for secure contact storage, featuring real-time analytics, cloud-based image management, and advanced data filtering.

---

## 🚀 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js (Vite), Redux Toolkit, Material UI (MUI), Chart.js |
| **Backend** | Node.js, Express.js, Express Validator |
| **Database** | MongoDB Atlas (NoSQL) |
| **Storage** | Cloudinary API (Image Hosting) |
| **Security** | JWT, Bcrypt.js, CORS |

---

## ✨ Key Features

* **🔒 Secure Authentication:** Fully implemented **JWT-based** login and registration system with hashed passwords using **Bcrypt**.
* **📂 Private Data:** Middleware-protected routes ensuring users only access their **personal contact lists**.
* **☁️ Cloud Integration:** Profile picture uploads handled via **Multer** and stored securely on **Cloudinary**.
* **📊 Analytics Dashboard:** Interactive charts showing contact distribution by categories like **Work, Family, and Friends**.
* **⚡ Advanced Search & Filter:** Backend-powered search, category filtering, and **pagination** for high performance.
* **📱 Fully Responsive:** Clean and professional UI built with **Material UI** that works on all devices.
* **✅ Robust Validation:** Multi-level data validation on both **Frontend** (React Hook Form) and **Backend** (Express Validator).

---

## 📁 Project Structure

```text
contact-management-system
├── backend
│   ├── controllers/    # Route handlers & logic
│   ├── models/         # MongoDB Schemas (User, Contact)
│   ├── routes/         # API Endpoint definitions
│   ├── middleware/     # Auth & validation checks
│   └── server.js       # Entry point
└── frontend
    └── src
        ├── components/ # Reusable UI components
        ├── pages/      # Dashboard, Login, ContactList
        ├── redux/      # Slices for global state (Auth, Contacts)
        └── App.jsx     # Main Router & Theme provider
```
## 🛠️ Installation & Setup
1. Clone the Project
```Bash

git clone [https://github.com/cryptic-kumar/contact-manager-mern.git](https://github.com/cryptic-kumar/contact-manager-mern.git)
cd contact-manager-mern
```
2. Backend Configuration
Navigate to the backend folder, install dependencies, and create a .env file.

```Bash

cd backend
npm install
```
## Required Environment Variables:

MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

3. Frontend Configuration
Navigate to the frontend folder and install dependencies.

```Bash

cd ../frontend
npm install
npm run dev
```
## 🧠 Core Learnings
Architecting a clean MVC (Model-View-Controller) pattern in Node.js.
Managing complex global state and async API calls using Redux Toolkit.
Integrating third-party APIs like Cloudinary for media handling.
Optimizing database queries for efficient search and pagination.

## 📄 License
This project is for educational purposes.

Developed with ❤️ by Aditya Kumar Sah
