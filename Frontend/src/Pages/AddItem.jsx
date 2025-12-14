import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem({ addItem }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    director: "",
    genre: "",
    platform: "",
    status: "wishlist",
    total_episodes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formData);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Movie / TV Show</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title *</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type *</label>
          <br />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
        </div>

        <div>
          <label>Director</label>
          <br />
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Genre</label>
          <br />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Platform</label>
          <br />
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Status</label>
          <br />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        {/* TV-only field */}
        {formData.type === "tv" && (
          <div>
            <label>Total Episodes</label>
            <br />
            <input
              type="number"
              name="total_episodes"
              value={formData.total_episodes}
              onChange={handleChange}
              min="1"
            />
          </div>
        )}

        <br />
        <button type="submit" disabled={!formData.title}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
