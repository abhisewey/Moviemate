function ProgressBar({ watched, total }) {
  const percentage = Math.round((watched / total) * 100);

  return (
    <div>
      <p>
        Episodes: {watched} / {total} ({percentage}%)
      </p>
      <div
        style={{
          height: "10px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "5px"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: "#4caf50",
            borderRadius: "5px"
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
