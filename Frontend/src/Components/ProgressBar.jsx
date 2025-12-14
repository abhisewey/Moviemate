import React from "react";
import "./ProgressBar.css";

function ProgressBar({ watched, total }) {
  const safeWatched = Number(watched) || 0;
  const safeTotal = Number(total) || 0;

  const percentage =
    safeTotal > 0 ? Math.round((safeWatched / safeTotal) * 100) : 0;

  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <span className="progress-text">Episodes Progress</span>
        <span className="progress-numbers">
          {safeWatched} / {safeTotal}
        </span>
      </div>
      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-glow"></div>
        </div>
      </div>
      <span className="progress-percentage">{percentage}%</span>
    </div>
  );
}

export default ProgressBar;
