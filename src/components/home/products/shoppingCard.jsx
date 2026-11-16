import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import addToShoppingCart from "../../../utils/addToShoppingCart";
import { config } from "../../../../config";
import Star from "../../../utils/star";
import priceToNumber from "../../../utils/priceFormat";

function ShoppingCard({ product: p }) {
  const LOW_STOCK_THRESHOLD = 4;
  const [product, setProduct] = useState(p);
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="shopping-card">
      <div className="img-sec">
        <img
          src={`${config.urlOfBackend}${product.img}`}
          alt={product.name}
          loading="lazy"
        />

        {product.hotOffer && <span className="hot-offer">پیشنهاد ویژه</span>}

        <div className="stars">
          <Star star={product.star} />
        </div>
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
          {product.percent ? (
            <>
              <div className="percent-box">
                <p className="last-price">
                  {" "}
                  {priceToNumber(product.price).toLocaleString("fa-IR")}
                </p>
                <div className="percent active">
                  {Number(product.percent).toLocaleString("fa-IR")}%
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="percent-box">
                <p className="last-price">‌</p>
                <div className="percent">‌</div>
              </div>
            </>
          )}
          <span className="price">
            {product.percent ? (
              <>
                {Number(product.DiscountedPrice).toLocaleString("fa-IR")}
                {" ‌ "} <span> تومان</span>
              </>
            ) : (
              <>
                {priceToNumber(product.price).toLocaleString("fa-IR")}
                {" ‌ "}
                <span>تومان</span>
              </>
            )}
          </span>
        </div>

        <div className="left">
          <div
            onClick={() =>
              addToShoppingCart(
                product,
                config.urlOfBackend,
                setProduct,
                setIsAdded,
              )
            }
            className="extend-btn buy"
          >
            <span className="b-text">{isAdded ? "ثبت شد" : "خرید"}</span>
            <span className="b-icon">
              <i
                className={`${isAdded ? "fa-solid fa-check" : "fas fa-shopping-cart "}`}
              ></i>
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
}

export default ShoppingCard;
