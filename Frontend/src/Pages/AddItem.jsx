import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AddItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    director: "",
    genre: "",
    platform: "netflix",
    status: "watching",
    total_episodes: "",
    episodes_watched: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      total_episodes:
        formData.total_episodes === "" ? null : Number(formData.total_episodes),
      episodes_watched:
        formData.episodes_watched === ""
          ? null
          : Number(formData.episodes_watched),
      rating: formData.rating === "" ? null : Number(formData.rating),
    };

    API.post("items/", payload)
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("ERROR DATA:", err.response?.data);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Movie / TV Show</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        <input name="director" placeholder="Director" onChange={handleChange} />
        <input name="genre" placeholder="Genre" onChange={handleChange} />

        {/* Platform dropdown */}
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
        >
          <option value="netflix">Netflix</option>
          <option value="prime">Amazon Prime</option>
          <option value="hotstar">Disney+ Hotstar</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>

        {/* ✅ Show progress ONLY if TV + Watching */}
        {formData.type === "tv" && formData.status === "watching" && (
          <>
            <input
              type="number"
              name="total_episodes"
              placeholder="Total Episodes"
              onChange={handleChange}
            />
            <input
              type="number"
              name="episodes_watched"
              placeholder="Episodes Watched"
              onChange={handleChange}
            />
          </>
        )}

        {/* ✅ Rating (out of 5) */}
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          placeholder="Rating (1–5)"
          onChange={handleChange}
        />

        {/* ✅ Review */}
        <textarea
          name="review"
          placeholder="Write your review"
          onChange={handleChange}
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
