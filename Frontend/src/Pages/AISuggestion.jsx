import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./AISuggesion.css";

function AISuggestions() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get("recommendations/");
      setRecommendations(response.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to load recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="star star-filled"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="star star-half" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="star star-empty"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="ai-suggestions-container">
        <div className="ai-loading">
          <div className="ai-loading-spinner"></div>
          <p>Finding perfect recommendations for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-suggestions-container">
        <div className="ai-hero-gradient"></div>
        <header className="ai-header">
          <button className="ai-back-btn" onClick={() => navigate("/")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
        </header>
        <div className="ai-error-state">
          <div className="ai-error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="ai-retry-btn" onClick={fetchRecommendations}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-suggestions-container">
      <div className="ai-hero-gradient"></div>

      <header className="ai-header">
        <button className="ai-back-btn" onClick={() => navigate("/")}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="ai-header-content">
          <h1 className="ai-title">
            <span className="ai-icon">🎯</span>
            AI Suggestions
          </h1>
          <p className="ai-subtitle">
            Based on your watch history and ratings
          </p>
        </div>
      </header>

      {recommendations.length === 0 ? (
        <div className="ai-empty-state">
          <div className="ai-empty-icon">🎬</div>
          <h3>No Recommendations Yet</h3>
          <p>
            Start watching and rating movies or TV shows to get personalized
            recommendations!
          </p>
          <button className="ai-primary-btn" onClick={() => navigate("/")}>
            Browse Collection
          </button>
        </div>
      ) : (
        <div className="ai-recommendations-grid">
          {recommendations.map((item, index) => (
            <div
              key={item.id || index}
              className="ai-recommendation-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="ai-card-shine"></div>

              <div className="ai-card-content">
                <div className="ai-card-header">
                  <h3 className="ai-item-title">{item.title}</h3>
                  <span className={`ai-type-badge ${item.type}`}>
                    {item.type === "movie" ? "🎬" : "📺"}{" "}
                    {item.type === "movie" ? "Movie" : "TV Show"}
                  </span>
                </div>

                <div className="ai-card-body">
                  <div className="ai-meta-grid">
                    {item.genre && (
                      <div className="ai-meta-item">
                        <svg
                          className="ai-meta-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                          <line x1="4" y1="22" x2="4" y2="15" />
                        </svg>
                        <span>{item.genre}</span>
                      </div>
                    )}
                    {item.platform && (
                      <div className="ai-meta-item">
                        <svg
                          className="ai-meta-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="15"
                            rx="2"
                            ry="2"
                          />
                          <polyline points="17 2 12 7 7 2" />
                        </svg>
                        <span>
                          {item.platform.charAt(0).toUpperCase() +
                            item.platform.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {item.rating && (
                    <div className="ai-rating-section">
                      <div className="ai-stars">
                        {renderStars(item.rating)}
                      </div>
                      <span className="ai-rating-value">
                        {Number(item.rating).toFixed(1)}
                      </span>
                    </div>
                  )}

                  {item.director && (
                    <div className="ai-director">
                      <svg
                        className="ai-director-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>{item.director}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AISuggestions;