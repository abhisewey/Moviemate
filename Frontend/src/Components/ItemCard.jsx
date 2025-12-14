import ProgressBar from "./ProgressBar";

function ItemCard({ item }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "6px"
      }}
    >
      <h3>{item.title}</h3>

      <p><strong>Type:</strong> {item.type}</p>
      <p><strong>Director:</strong> {item.director}</p>
      <p><strong>Genre:</strong> {item.genre}</p>
      <p><strong>Platform:</strong> {item.platform}</p>
      <p><strong>Status:</strong> {item.status}</p>

      {/* TV Show Progress */}
      {item.type === "tv" && (
        <ProgressBar
          watched={item.episodes_watched}
          total={item.total_episodes}
        />
      )}

      {/* Rating */}
      {item.rating && (
        <p><strong>Rating:</strong> {item.rating} / 5</p>
      )}

      <div style={{ marginTop: "10px" }}>
        <button>Edit</button>
        <button style={{ marginLeft: "10px" }}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;
