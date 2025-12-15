import React, { useState } from "react";
import "./EditItem.css";

function EditItem({ item, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: item.title || "",
    type: item.type || "movie",
    director: item.director || "",
    genre: item.genre || "",
    platform: item.platform || "netflix",
    status: item.status || "wishlist",
    rating: item.rating || "",
    review: item.review || "",
    episodes_watched: item.episodes_watched || "",
    total_episodes: item.total_episodes || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.title) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        total_episodes:
          formData.total_episodes === ""
            ? null
            : Number(formData.total_episodes),
        episodes_watched:
          formData.episodes_watched === ""
            ? null
            : Number(formData.episodes_watched),
        rating: formData.rating === "" ? null : Number(formData.rating),
      };
      await fetch(`http://localhost:8000/api/items/${item.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-glow"></div>
        <div className="modal-header">
          <h2>Edit Item</h2>
          <button className="close-btn" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
              </select>
            </div>
            <div className="form-group">
              <label>Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
              >
                <option value="netflix">Netflix</option>
                <option value="prime">Amazon Prime</option>
                <option value="hotstar">Disney+ Hotstar</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="wishlist">Wishlist</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating (out of 5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
              />
            </div>
            {formData.type === "tv" && formData.status === "watching" && (
              <>
                <div className="form-group">
                  <label>Episodes Watched</label>
                  <input
                    type="number"
                    name="episodes_watched"
                    value={formData.episodes_watched}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Total Episodes</label>
                  <input
                    type="number"
                    name="total_episodes"
                    value={formData.total_episodes}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </>
            )}
          </div>
          <div className="form-group full-width">
            <label>Review</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem;