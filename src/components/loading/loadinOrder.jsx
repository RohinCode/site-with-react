import "./loadinOrder.css";

function OrderSkeleton() {
  return (
    <div className="orders-loading">
      <div className="orders-loading-header">
        <div>
          <div className="skeleton skeleton-subtitle"></div>
          <div className="skeleton skeleton-title"></div>
        </div>

        <div className="skeleton skeleton-count"></div>
      </div>

      {[1].map((item) => (
        <div className="skeleton-order-card" key={item}>
          {/* Header */}
          <div className="skeleton-order-header">
            <div className="skeleton-order-number">
              <div className="skeleton skeleton-icon"></div>

              <div className="skeleton-text-group">
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line medium"></div>
              </div>
            </div>

            <div className="skeleton skeleton-status"></div>
          </div>

          {/* Products */}
          {[1].map((product) => (
            <div className="skeleton-product" key={product}>
              <div className="skeleton skeleton-product-image"></div>

              <div className="skeleton-product-info">
                <div className="skeleton skeleton-line product-name"></div>
                <div className="skeleton skeleton-line product-category"></div>
                <div className="skeleton skeleton-line product-rating"></div>
              </div>

              <div className="skeleton-product-details">
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line medium"></div>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="skeleton-order-footer">
            <div>
              <div className="skeleton skeleton-line medium"></div>
              <div className="skeleton skeleton-line price"></div>
            </div>

            <div className="skeleton skeleton-line order-id"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderSkeleton;
