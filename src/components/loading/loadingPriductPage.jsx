import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./loadingPriductPage.css";

function LoadingProductPage() {
  return (
    <main className="loading-product-page">
      {/* تصویر محصول */}
      <div className="loading-product-image">
        <Skeleton width="100%" height="100%" borderRadius={15} />
      </div>

      {/* اطلاعات محصول */}
      <div className="loading-product-info">
        {/* عنوان */}
        <div className="loading-product-title">
          <Skeleton width="65%" height={35} />
        </div>

        {/* امتیاز محصول */}
        <div className="loading-product-rating">
          <Skeleton width={110} height={20} />
        </div>

        {/* توضیحات */}
        <div className="loading-product-details">
          <Skeleton count={4} height={16} />
          <div className="loading-product-details-short">
            <Skeleton width="65%" height={16} />
          </div>
        </div>

        {/* قیمت */}
        <div className="loading-product-price">
          <Skeleton width={125} height={32} />
        </div>

        {/* موجودی */}
        <div className="loading-product-quantity">
          <Skeleton width={145} height={32} borderRadius={8} />
        </div>

        {/* دکمه خرید */}
        <div className="loading-product-actions">
          <Skeleton width={190} height={52} borderRadius={13} />
        </div>

        {/* نظرات کاربران */}
        <div className="loading-product-comments">
          <Skeleton width={160} height={27} />

          {Array.from({ length: 2 }, (_, index) => (
            <div className="loading-product-comment" key={index}>
              <div className="loading-product-comment-top">
                <div className="loading-product-user">
                  <Skeleton circle width={40} height={40} />
                  <Skeleton width={100} height={18} />
                </div>

                <Skeleton width={80} height={15} />
              </div>

              <div className="loading-product-comment-text">
                <Skeleton count={2} height={15} />
              </div>
            </div>
          ))}
        </div>

        {/* فرم ارسال نظر */}
        <div className="loading-product-write-comment">
          <Skeleton width="100%" height={120} borderRadius={8} />

          <div className="loading-product-comment-actions">
            <Skeleton width={110} height={16} />
            <Skeleton width={100} height={40} borderRadius={8} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoadingProductPage;
