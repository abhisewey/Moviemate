import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./AddItem.css";

function AddItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    director: "",
    genre: "",
    platform: "netflix",
    status: "wishlist", // Better default for new items
    total_episodes: "",
    episodes_watched: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    let newValue = value;

    // Convert numeric fields properly
    if (["rating", "total_episodes", "episodes_watched"].includes(name)) {
      newValue = value === "" ? "" : Number(value);
    }

    let newData = {
      ...prev,
      [name]: newValue,
    };

    // Clear episode fields when they become irrelevant
    if (name === "type" || name === "status") {
      if (newData.type !== "tv" || newData.status !== "watching") {
        newData.total_episodes = "";
        newData.episodes_watched = "";
      }
    }

    return newData;
  });
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    // Base payload — common fields
    const payload = {
      title: formData.title.trim(),
      type: formData.type,
      director: formData.director || null,
      genre: formData.genre || null,
      platform: formData.platform,
      status: formData.status,
      rating: formData.rating === "" ? null : Number(formData.rating),
      review: formData.review || null,
    };

    // ONLY include episode fields if it's a TV show AND status is "watching"
    if (formData.type === "tv" && formData.status === "watching") {
      payload.total_episodes =
        formData.total_episodes === "" ? null : Number(formData.total_episodes);
      payload.episodes_watched =
        formData.episodes_watched === ""
          ? null
          : Number(formData.episodes_watched);
    }
    // For movies or non-watching TV shows → these fields are completely omitted

    API.post("items/", payload)
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("ERROR DATA:", err.response?.data);
        alert("Failed to add item. Please check your input.");
      });
  };

  return (
    <div className="add-item-container">
      <div className="hero-gradient"></div>

      <div className="add-item-content">
        <div className="add-item-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="page-title">Add New Item</h1>
            <p className="page-subtitle">Add a movie or TV show to your collection</p>
          </div>
        </div>

        <div className="add-item-form-card">
          <div className="form-glow"></div>

          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                name="title"
                placeholder="Enter title"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
              </select>
            </div>

            <div className="form-group">
              <label>Director</label>
              <input
                name="director"
                placeholder="Enter director name"
                value={formData.director}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <input
                name="genre"
                placeholder="Enter genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Platform *</label>
              <select name="platform" value={formData.platform} onChange={handleChange}>
                <option value="netflix">Netflix</option>
                <option value="prime">Amazon Prime</option>
                <option value="hotstar">Disney+ Hotstar</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="wishlist">Wishlist</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Episode fields — only visible and sent for TV Show + Watching */}
            {formData.type === "tv" && formData.status === "watching" && (
              <>
                <div className="form-group">
                  <label>Total Episodes</label>
                  <input
                    type="number"
                    name="total_episodes"
                    placeholder="Enter total episodes"
                    value={formData.total_episodes}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Episodes Watched</label>
                  <input
                    type="number"
                    name="episodes_watched"
                    placeholder="Enter episodes watched"
                    value={formData.episodes_watched}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rate out of 5"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Review</label>
            <textarea
              name="review"
              placeholder="Write your review..."
              value={formData.review}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel-form" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" onClick={handleSubmit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;