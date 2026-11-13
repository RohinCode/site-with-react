import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./loadingProducts.css";

function LoadingProducts({ count}) {
  return (
    <div className="row">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
          <div className="shopping-card shopping-card-skeleton">
            <div className="img-sec skeleton-img-sec">
              <Skeleton width="90%" height={155} borderRadius={5} />

              <div className="skeleton-hot-offer">
                <Skeleton width={85} height={22} />
              </div>

              <div className="skeleton-stars">
                <Skeleton width={65} height={18} />
              </div>
            </div>

            <div className="skeleton-title">
              <Skeleton width="65%" height={20} />
            </div>

            <div className="skeleton-quantity">
              <Skeleton width="55%" height={18} />
            </div>

            <div className="skeleton-buttons">
              <div className="skeleton-price">
                <Skeleton width={90} height={20} />
              </div>

              <div className="skeleton-actions">
                <Skeleton width={65} height={38} borderRadius={20} />
                <Skeleton width={75} height={38} borderRadius={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingProducts;
