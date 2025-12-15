🎬 MovieMate

MovieMate is a personal movie & TV show tracker that helps users organize what they watch and get smart recommendations based on their viewing history and ratings.

It uses a React frontend with a Django REST backend and a lightweight recommendation logic (AI-assisted, logic-driven).

🚀 Features
🎥 Media Management

Add movies and TV shows

Edit or delete existing items

Track:

Title

Type (Movie / TV Show)

Genre

Platform (Netflix, Prime, etc.)

Status (Wishlist, Watching, Completed)

Rating (1–5, supports decimals)

Personal review

📺 TV Show Progress Tracking

Track:

Total episodes

Episodes watched

Visual episode progress bar

Automatically shown only for TV shows in Watching status

⭐ Rating System

Decimal ratings supported (e.g. 4.7)

Star-based UI rendering

Ratings stored and used for recommendations

🔍 Filtering

Filter collection by:

All

Watching

Completed

Wishlist

🤖 AI Suggestions (Logic-Based)

Recommends movies/shows based on:

Completed items

User ratings

Most liked genre

Suggests unwatched items from the same genre

Fast, transparent, and backend-driven logic

🎨 Modern UI

Dark themed UI

Smooth animations

Responsive layout

Clean card-based design

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Axios

CSS (custom styling)

Backend

Django

Django REST Framework

SQLite (default DB)

⚙️ Setup Instructions
🔹 Backend Setup
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/

🔹 Frontend Setup
cd Frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173/

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/items/	List all items
POST	/api/items/	Add new item
GET	/api/items/<id>/	Get item details
PUT	/api/items/<id>/	Update item
DELETE	/api/items/<id>/	Delete item
GET	/api/recommendations/	Get AI recommendations
🧠 Recommendation Logic (How “AI” Works)

Backend selects all completed & rated items

Calculates the most liked genre using rating scores

Recommends up to 5 items:

Same genre

Not yet completed

This keeps the system:

Fast

Explainable

Easy to extend later with real ML or external APIs

📌 Project Structure (Simplified)
Backend/
 └── tracker/
     ├── models.py
     ├── serializers.py
     ├── views.py
     ├── urls.py

Frontend/
 └── src/
     ├── Pages/
     ├── Components/
     ├── api/

🔮 Future Improvements

User authentication

Multi-user recommendations

External movie API integration

Collaborative filtering

Recommendation explanations

👨‍💻 Author

Built by Abhishek as a full-stack project using React and Django.
