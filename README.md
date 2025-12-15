🎬 MovieMate
Personal Movie & TV Show Tracker with Smart Recommendations
1. Project Overview

MovieMate is a full-stack web application that allows users to track movies and TV shows, manage watch progress, store ratings and reviews, and receive personalized content recommendations based on their viewing history.

The project focuses on:

Clean frontend–backend separation

Practical data modeling

Simple, explainable recommendation logic

Scalable architecture for future enhancements

2. Problem Statement

Most users watch content across multiple platforms (Netflix, Prime, Hotstar, etc.) but lack a centralized place to:

Track what they watched

Remember ratings and reviews

Monitor TV show progress

Get personalized suggestions based on taste

MovieMate solves this by providing a single personal dashboard with smart recommendations.

3. Key Features
3.1 Content Management

Add movies and TV shows

Edit and delete entries

Store director, genre, platform, and review

Rate content (supports decimal ratings)

3.2 TV Show Progress Tracking

Track total episodes

Track watched episodes

Automatic progress calculation

Progress bar visualization

3.3 Status Management

Wishlist

Watching

Completed

3.4 Filtering & Organization

Filter items by status

Visual badges for content type and status

3.5 Smart Recommendations (AI Logic)

Suggests movies/TV shows based on:

User’s completed items

Ratings

Most preferred genre

Note: This is logic-based AI, not a machine-learning model — making it fast, explainable, and reliable.

4. System Architecture
4.1 High-Level Architecture
React Frontend (Vite)
        ↓
Axios REST API Calls
        ↓
Django REST Framework
        ↓
SQLite Database

5. Technology Stack
Frontend

React (Vite)

React Router

Axios

Custom CSS (no UI libraries)

Backend

Django

Django REST Framework (DRF)

SQLite (development database)

6. Backend Design
6.1 Data Model

Item Model

Field	Description
title	Name of movie / TV show
type	movie / tv
director	Director name
genre	Genre
platform	Streaming platform
status	wishlist / watching / completed
rating	Float rating (1–5, decimal supported)
review	User review
total_episodes	Total episodes (TV only)
episodes_watched	Watched episodes
created_at	Auto timestamp
6.2 API Endpoints
Method	Endpoint	Purpose
GET	/api/items/	Fetch all items
POST	/api/items/	Add new item
GET	/api/items/{id}/	Get item details
PUT	/api/items/{id}/	Update item
DELETE	/api/items/{id}/	Delete item
GET	/api/recommendations/	Fetch recommendations
7. Recommendation Logic (AI Suggestions)
7.1 How It Works

Fetch all items that are:

status = completed

rating IS NOT NULL

Aggregate total rating score per genre

Identify the most liked genre

Recommend up to 5 items:

Same genre

Not yet completed

7.2 Why This Approach

Transparent logic (easy to explain)

No black-box behavior

Performs well with small datasets

Easy to extend into ML later

8. Frontend Design
8.1 Pages
Page	Description
Home	List all items, filter, edit, delete
Add Item	Add new movie/TV show
AI Suggestions	Display recommended content
8.2 Component Structure
src/
 ├── api/
 │   └── api.js
 ├── Components/
 │   ├── ProgressBar.jsx
 │   └── ProgressBar.css
 ├── Pages/
 │   ├── Home.jsx
 │   ├── AddItem.jsx
 │   ├── AISuggestions.jsx
 │   └── *.css

9. Data Validation & Handling

Episode fields allow null

Episode inputs shown only for TV shows

Ratings accept decimal values

Backend enforces clean data via serializers

Frontend prevents invalid combinations

10. Testing Strategy
Manual Testing Performed

CRUD operations

Progress tracking logic

Decimal rating handling

Recommendation generation

Empty state handling

Backend API validation

11. Limitations

Single-user system

No authentication

SQLite used for development

Rule-based recommendations (not ML)

12. Future Enhancements

User authentication

Multi-user recommendations

External movie APIs (TMDB)

Machine learning recommendation engine

Cloud database (PostgreSQL)

13. Conclusion

MovieMate demonstrates:

Strong full-stack fundamentals

Clean API design

Practical recommendation logic

Well-structured frontend architecture

The project is production-ready in concept and designed for future scalability.

14. Author

Abhishek
Full-Stack Developer
React | Django | REST APIs
