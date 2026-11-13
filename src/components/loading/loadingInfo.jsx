import "./informationSkeleton.css";

function InformationSkeleton() {
  return (
    <div className="info-skeleton">
      <div className="info-skeleton-header">
        <div className="skeleton skeleton-title" />

        <div className="info-skeleton-actions">
          <div className="skeleton skeleton-button" />
        </div>
      </div>

      <div className="info-skeleton-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="info-skeleton-item" key={item}>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-value" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationSkeleton;
