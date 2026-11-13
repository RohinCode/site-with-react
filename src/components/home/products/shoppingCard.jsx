import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import addToShoppingCart from "../../../utils/addToShoppingCart";
import { config } from "../../../../config";

function ShoppingCard({ product: p }) {
  const LOW_STOCK_THRESHOLD = 4;
  const [product, setProduct] = useState(p);
  return (
    <div className="shopping-card">
      <div className="img-sec">
        <img
          src={`${config.urlOfBackend}${product.img}`}
          alt={product.name}
          loading="lazy"
        />

        {product.hotOffer && <span className="hot-offer">پیشنهاد ویژه</span>}

        <div className="stars">{star(product)}</div>
      </div>

      <div className="title">
        <h3>{product.name}</h3>
      </div>

      {product.quantity < LOW_STOCK_THRESHOLD ? (
        <h4 className="quantity low-stock">
          فقط {product.quantity} عدد باقی مانده
        </h4>
      ) : (
        <h4 className="quantity">{product.quantity} عدد در انبار موجود است</h4>
      )}

      <div className="buttons">
        <div className="right">
          <span className="price">
            {product.price} <span>تومان</span>
          </span>
        </div>

        <div className="left">
          <div
            onClick={() => addToShoppingCart(product, config.urlOfBackend, setProduct)}
            className="extend-btn buy"
          >
            <span className="b-text">خرید</span>
            <span className="b-icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
          </div>

          <Link to={`/product/${product._id}`}>
            <div className="extend-btn details">
              <span className="b-text">جزئیات</span>
              <span className="b-icon">
                <i className="fa-solid fa-circle-info"></i>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  function star(product) {
    const stars = [];

    for (let i = 0; i < product.star; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    return stars;
  }
}

export default ShoppingCard;
