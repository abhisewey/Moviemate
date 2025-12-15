🎬 MovieMate – Full Stack Movie & TV Tracking Application
📌 Overview

MovieMate is a full-stack web application that helps users track movies and TV shows they watch, rate them, write reviews, monitor episode progress, and receive smart recommendations based on viewing behavior.

The project focuses on:

Clean frontend UI with smooth UX

REST-based backend architecture

Practical recommendation logic (AI-inspired, not ML-heavy)

Real-world CRUD operations and filtering

This project demonstrates full-stack ownership — from database design to frontend interaction.

🚀 Features
✅ Core Features

Add, edit, and delete movies & TV shows

Separate handling for Movies and TV Shows

Status tracking:

Wishlist

Watching

Completed

Rating system (out of 5, supports decimals)

Review system for watched content

Platform tracking (Netflix, Prime, Hotstar, etc.)

Genre and director metadata

📺 TV Show Progress Tracking

Episode-based progress tracking for TV shows

Episodes watched vs total episodes

Visual progress bar for currently watching TV shows

Automatically hidden for movies or completed items

🔍 Filtering & Sorting

Filter items by:

Status (Watching / Completed / Wishlist)

Clean separation of frontend filtering logic

Real-time UI updates without page refresh

🤖 AI-Inspired Recommendations

Smart recommendations based on:

User ratings

Most liked genre

Backend logic analyzes completed & rated items

Suggests unwatched items from preferred genres

⚠️ Note:
This is logic-based recommendation, not ML.
The goal is transparency, performance, and correctness.

🎨 UI / UX

Modern card-based UI

Modal-based editing (blurred background)

Floating action button for adding items

Responsive layout

Visual badges for status and content type

🛠️ Tech Stack
Frontend

React.js

React Router

Axios (API handling)

CSS (custom styling)

Backend

Django

Django REST Framework

SQLite (development database)

Recommendation Logic

Rule-based genre + rating analysis

Backend-driven suggestions

⚙️ Setup Instructions
1️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend runs at:
👉 http://127.0.0.1:8000

2️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:
👉 http://localhost:3000

🔗 API Endpoints (Summary)
Items

GET /api/items/ – Fetch all items

POST /api/items/ – Add new movie or TV show

PUT /api/items/{id}/ – Update item

DELETE /api/items/{id}/ – Delete item

Recommendations

GET /api/recommendations/ – Get suggested movies/shows

🧠 Recommendation Logic (How It Works)

Backend fetches all completed items with ratings

Calculates total rating score per genre

Identifies the most liked genre

Recommends:

Items of that genre

Excludes already completed content

This keeps recommendations:

Simple

Explainable

Fast

👤 Author

Abhishek FC
Full Stack Developer
