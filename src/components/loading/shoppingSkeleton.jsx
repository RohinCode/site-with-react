import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShoppingSkeleton() {
  return (
    <main className="shoppnigMain">
      <div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="Product-item">
            <Skeleton width={110} height={110} />

            <div className="skeleton-content">
              <Skeleton width="65%" height={16} />
              <Skeleton width="90%" height={12} />
              <Skeleton width="35%" height={14} />
              <Skeleton width="20%" height={14} />
            </div>
          </div>
        ))}
      </div>

      <div className="pay">
        <Skeleton width="45%" height={20} />

        {[1, 2, 3].map((item) => (
          <Skeleton key={item} height={15} />
        ))}

        <Skeleton height={42} />
      </div>
    </main>
  );
}

export default ShoppingSkeleton;
