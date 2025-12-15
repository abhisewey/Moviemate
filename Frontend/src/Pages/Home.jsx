import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Home.css";
import ProgressBar from "../components/ProgressBar";
import EditItem from "./EditItem"; 

function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await API.get("items/");
      setItems(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.status === activeFilter));
    }
  }, [activeFilter, items]);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
  };

  const handleUpdate = () => {
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await API.delete(`items/${id}/`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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
      <div className="loading">
        <div className="loading-spinner-large"></div>
        <p>Loading your collection...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-gradient"></div>

      <header className="header">
        {/* Left side: Logo + Tagline */}
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">🎬</span>
            MovieMate
          </h1>
          <div className="header-tagline">Your Personal Cinema Companion</div>
        </div>

        {/* Right side: AI Suggestions Button */}
        <button
          className="ai-suggestions-btn"
          onClick={() => navigate("/suggestions")}
        >
          <svg
            className="ai-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>AI Suggestions</span>
          <span className="ai-sparkle">✨</span>
        </button>
      </header>

      <div className="filter-section">
        <div className="filter-bar">
          {[
            { value: "all", label: "All" },
            { value: "watching", label: "Watching" },
            { value: "completed", label: "Completed" },
            { value: "wishlist", label: "Wishlist" },
          ].map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${
                activeFilter === filter.value ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              <span className="filter-btn-bg"></span>
              <span className="filter-btn-text">{filter.label}</span>
              {activeFilter === filter.value && (
                <span className="filter-btn-indicator"></span>
              )}
            </button>
          ))}
        </div>
        <div className="results-count">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <h3>No items found</h3>
            <p>Start building your collection by adding movies or TV shows!</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="item-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-shine"></div>

              <div className="card-content">
                <div className="card-header">
                  <div className="card-title-section">
                    <h3 className="item-title">{item.title}</h3>
                    <span className={`type-badge ${item.type.toLowerCase()}`}>
                      {item.type === "movie" ? "🎬" : "📺"}{" "}
                      {item.type === "movie" ? "Movie" : "TV Show"}
                    </span>
                  </div>
                  <span
                    className={`status-badge status-${item.status.toLowerCase()}`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>

                <div className="card-body">
                  <div className="meta-grid">
                    {item.director && (
                      <div className="meta-item">
                        <svg
                          className="meta-icon"
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
                    {item.genre && (
                      <div className="meta-item">
                        <svg
                          className="meta-icon"
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
                      <div className="meta-item">
                        <svg
                          className="meta-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
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
                    <div className="rating-section">
                      <div className="stars">{renderStars(item.rating)}</div>
                      <span className="rating-value">
                        {Number(item.rating).toFixed(1)}
                      </span>
                    </div>
                  )}

                  {item.review && (
                    <div className="review-section">
                      <p className="review-text">{item.review}</p>
                    </div>
                  )}

                  {item.type === "tv" &&
                    item.status === "watching" &&
                    item.episodes_watched != null &&
                    item.total_episodes != null &&
                    item.total_episodes > 0 && (
                      <div className="progress-section">
                        <ProgressBar
                          watched={item.episodes_watched || 0}
                          total={item.total_episodes}
                        />
                      </div>
                    )}
                </div>

                <div className="card-footer">
                  <div className="card-footer-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="fab" onClick={() => navigate("/add")}>
        <span className="fab-icon">+</span>
        <span className="fab-ripple"></span>
      </button>

      {editingItem && (
        <EditItem
          item={editingItem}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default Home;