import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import OrderSkeleton from "../loading/loadinOrder";
import { Link } from "react-router-dom";
function Order({ token }) {
  const [orders, setOrder] = useState([]);
  const [noOrder, setNoOrder] = useState(false);
  const [loading, setLoaging] = useState(true);
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
    async function getReady() {
      try {
        const response = await axios.get(
          `${config.urlOfBackend}/api/cart/myCart`,
        );
        setOrder(response.data.data);
      } catch (error) {
        setNoOrder(true);
        console.log(error);
      }
      setLoaging(false);
    }
    getReady();
  }, []);
  return (
    <>
      {loading ? (
        <OrderSkeleton />
      ) : (
        <>
          {noOrder ? (
            <div className="empty-orders">
              <div className="empty-orders-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>

              <h2>هنوز سفارشی نداری!</h2>

              <p>
                هنوز هیچ سفارشی ثبت نکردی. محصولات مورد علاقه‌ات منتظر تو هستند.
              </p>

              <Link to="/" className="empty-orders-btn">
                <i className="fa-solid fa-bag-shopping"></i>
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <>
              <div className="orders-header">
                <div>
                  <span className="orders-small-title">سفارش‌های من</span>

                  <h2>سفارش‌های شما</h2>
                </div>

                <div className="orders-count">
                  <i className="fa-solid fa-box"></i>
                  <span>{orders.length} سفارش</span>
                </div>
              </div>

              <div className="orders-list">
                {orders.map((order, orderIndex) => {
                  const products = order.products || [];

                  return (
                    <div className="order-card">
                      <div className="order-card-header">
                        <div className="order-number">
                          <div className="order-number-icon">
                            <i className="fa-solid fa-receipt"></i>
                          </div>

                          <div>
                            <span>سفارش</span>
                            <strong>#{orderIndex + 1}</strong>
                          </div>
                        </div>

                        <div
                          className={`delivery-status ${order.isDelivered ? "delivered" : "waiting"}`}
                        >
                          <i
                            className={`fa-solid ${
                              order.isDelivered ? "fa-circle-check" : "fa-clock"
                            }`}
                          ></i>

                          {order.isDelivered
                            ? "تحویل داده شده"
                            : "در انتظار ارسال"}
                        </div>
                      </div>

                      <div className="order-products">
                        {products.map((item) => {
                          const product = item.productId;

                          if (!product) {
                            return (
                              <div className="deleted-product">
                                <i className="fa-solid fa-box"></i>
                                اطلاعات این محصول دیگر موجود نیست.
                              </div>
                            );
                          }

                          return (
                            <div className="order-product">
                              <div className="product-image">
                                <img
                                  src={`${config.urlOfBackend}${product.img}`}
                                  alt={product.name}
                                />
                              </div>

                              <div className="product-info">
                                <h3>{product.name}</h3>

                                <div className="product-category">
                                  <i className="fa-solid fa-tag"></i>
                                  {product.category || "بدون دسته‌بندی"}
                                </div>
                                <div className="product-rating">
                                  <span>{product.star || 0}</span>

                                  <i className="fa-solid fa-star"></i>
                                </div>
                              </div>

                              <div className="product-details">
                                <div>
                                  <span>تعداد</span>
                                  <strong>{item.quantity}</strong>
                                </div>

                                <div>
                                  <span>قیمت</span>
                                  <strong>{product.price}</strong>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="order-footer">
                        <div className="order-total">
                          <span>مبلغ کل سفارش</span>

                          <strong>
                            {Number(order.totalPrice).toLocaleString("fa-IR")}
                            <small>تومان</small>
                          </strong>
                        </div>

                        <div className="order-id">
                          <span>شناسه سفارش</span>
                          <strong>{order._id}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Order;
