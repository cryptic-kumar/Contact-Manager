Contact Management System
A professional MERN-based application designed for secure contact storage, featuring real-time analytics, cloud-based image management, and advanced data filtering.

🚀 Tech Stack
Frontend

Library: React.js (Vite)

UI Framework: Material UI (MUI)

State Management: Redux Toolkit

Data Visualization: Chart.js / React-Chartjs-2

Forms: React Hook Form

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB (via Mongoose)

Auth: JWT (JSON Web Tokens) & Bcrypt

Infrastructure/Storage

Cloud Storage: Cloudinary (Profile Images)

File Handling: Multer

Deployment: Render (Backend), Vercel (Frontend), MongoDB Atlas

✨ Features
Secure Auth: JWT-protected routes with persistent user sessions.

User-Specific Data: Private contact lists (Users can only access their own data).

Cloud Image Uploads: Seamless profile picture integration using Cloudinary API.

Analytics Dashboard: Visual breakdown of contacts by category/group.

Advanced Operations: Server-side search, category filtering, and pagination for performance.

Data Integrity: Strict backend validation using express-validator.

Responsive Design: Fully optimized for mobile, tablet, and desktop views.

📁 Project Structure
Plaintext

contact-management-system
├── backend
│   ├── controllers    # Request logic
│   ├── models         # Mongoose schemas
│   ├── routes         # API endpoints
│   ├── middleware     # Auth & validation
│   └── server.js      # Entry point
└── frontend
    └── src
        ├── components # UI elements (Navbar, Cards)
        ├── pages      # Dashboard, Login, Contact List
        ├── redux      # Slices (Auth, Contacts)
        └── App.jsx    # Routes & Providers
🛠️ Installation & Setup
1. Prerequisites
Node.js (v18+)

MongoDB Atlas Account

Cloudinary Account

2. Backend Setup
Bash

cd backend
npm install
# Create a .env file with:
# MONGO_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
npm run dev
3. Frontend Setup
Bash

cd frontend
npm install
npm run dev
🔐 Security & Optimization
Password Hashing: Implemented using Bcrypt.

Protected Middleware: Backend checks for valid JWT before allowing CRUD operations.

Debounced Search: Reduces API calls for a better user experience.

Error Handling: Global error boundaries and custom API response formatting.

🧠 Key Learnings
Architecting scalable REST APIs with Node and Express.

Implementing cloud-based media management with third-party APIs (Cloudinary).

Managing complex global state and asynchronous data fetching with Redux Toolkit.

Optimizing database queries for search and pagination.

🔮 Future Enhancements
CSV Import/Export: Bulk contact management.

Email Integration: Sending emails directly from the contact dashboard.

Dark Mode: UI theme customization.

📄 License
This project is for educational use under the MIT License.
