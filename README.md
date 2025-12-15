# 🎬 MovieMate – Full Stack Movie & TV Tracking Application

## 📌 Overview

**MovieMate** is a full-stack web application designed to help users track movies and TV shows, rate them, write reviews, monitor episode progress, and receive smart, personalized recommendations based on their viewing habits.

This project emphasizes:
- Clean, modern frontend with excellent user experience
- Robust REST API backend
- Practical, transparent recommendation logic (AI-inspired but rule-based)
- Real-world CRUD operations, filtering, and state management

Perfect for showcasing full-stack development skills!

---

## 🚀 Features

### ✅ Core Features
- **Add, edit, and delete** movies & TV shows
- Separate logic for **Movies** and **TV Shows**
- Track key details:
  - Title, Director, Genre
  - Streaming Platform (Netflix, Prime, Hotstar, etc.)
  - **Status**: Wishlist • Watching • Completed
  - **Rating** (1–5 with decimal support, e.g., 4.7)
  - **Personal Review**

### 📺 TV Show Progress Tracking
- Track **total episodes** and **episodes watched**
- Visual **progress bar** with smooth animation
- Automatically shown **only** for TV shows in **Watching** status

### 🔍 Filtering
- Filter your collection by status:
  - All
  - Watching
  - Completed
  - Wishlist
- Real-time updates with no page reload

### 🤖 AI-Inspired Recommendations
- Smart suggestions based on:
  - Your **completed** items
  - **Highest-rated genres**
- Recommends **unwatched** titles from your favorite genre
- **Note**: This is **rule-based logic** (not machine learning) — fast, transparent, and reliable

### 🎨 UI / UX Highlights
- Modern dark-themed cinematic design
- Card-based layout with hover effects and shine animation
- Modal editing with blur backdrop
- Floating Action Button (FAB) for quick add
- Fully responsive (mobile-friendly)
- Status & type badges with color coding

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Vite for fast development)
- **React Router** for navigation
- **Axios** for API communication
- Pure **CSS** (custom styling – no heavy frameworks)

### Backend
- **Django**
- **Django REST Framework**
- **SQLite** (default for development)

### Recommendation Engine
- Custom rule-based logic (genre + rating analysis)
- Fully backend-driven for performance

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Backend URL: http://127.0.0.1:8000
2️⃣ Frontend Setup
Bashcd frontend
npm install
npm run dev    # (or npm start if using Create React App)
Frontend URL: http://localhost:5173 (Vite) or http://localhost:3000

🔗 API Endpoints
Items

GET    /api/items/              → List all items
POST   /api/items/              → Add new item
GET    /api/items/<id>/         → Get single item
PUT    /api/items/<id>/         → Update item
DELETE /api/items/<id>/         → Delete item

Recommendations

GET    /api/recommendations/    → Get personalized suggestions


🧠 Recommendation Logic (How It Works)

Fetch all completed items with ratings
Calculate average rating per genre
Identify the highest-rated genre
Recommend up to 5 unwatched items from that genre

Why rule-based?

Lightning fast
Fully transparent & debuggable
No dependency on external ML services
Easy to extend in the future


🔮 Future Enhancements

User authentication & multi-profile support
Integration with TMDB/IMDb for auto-fill (posters, summaries)
Advanced recommendations (collaborative filtering)
Watch history timeline
Export/import collection (JSON/CSV)
PWA support for offline use


👤 Author
Abhishek FC
Full Stack Developer
Built with passion for clean code, great UX, and cinematic experiences 🍿
