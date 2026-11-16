import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import Loading from "../loading/Loading";
import priceToNumber from "../../utils/priceFormat";

function Orders({ token }) {
  const [allOrders, settAllOrders] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  let [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getReady();
  }, []);

  if (empty) {
    return (
      <div className="empty-cart empty-orders">
        <div className="empty-cart-icon">
          <i className="fas fa-clipboard-list"></i>
        </div>

        <h2>هنوز سفارشی ثبت نشده</h2>

        <p>
          تا الان هیچ سفارشی از طرف کاربران ثبت نشده. سفارش‌های جدید همین‌جا
          نمایش داده می‌شن.
        </p>
      </div>
    );
  }

  const ORDERS_PER_PAGE = 3;
  const start = currentPage * ORDERS_PER_PAGE;
  const end = start + ORDERS_PER_PAGE;
  const orders = allOrders.slice(start, end);

  async function getReady() {
    try {
      const response = await axios.get(
        `${config.urlOfBackend}/api/cart/Registered`,
      );

      const data = response.data.data;

      settAllOrders(data);
      setEmpty(false);
    } catch (error) {
      if (error.response?.status === 404) {
        settAllOrders([]);
        setEmpty(true);
        return;
      }
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="orders-page">
          <div className="orders-header">
            <div>
              <h2>سفارش‌ها</h2>

              <p>لیست سفارش‌های ثبت‌شده توسط کاربران</p>
            </div>

            <span className="orders-count">{allOrders.length} سفارش</span>
          </div>
          <div className="orders-list">
            {orders.map((order, index) => {
              const productsHTML = order.products.map((product) => (
                <div key={product.productId._id} className="order-product">
                  <img
                    src={config.urlOfBackend + product.productId.img}
                    alt={product.productId.name}
                  />

                  <div className="product-info">
                    <h4>{product.productId.name}</h4>

                    <div className="product-details">
                      {product.productId.percent ? (
                        <>
                          <div className="percent-box">
                            <p className="last-price">
                              {priceToNumber(
                                product.productId.price,
                              ).toLocaleString("fa-IR")}
                            </p>
                          </div>
                          <p style={{ display: "inline" }}>
                            قیمت:{" "}
                            {Number(
                              product.productId.DiscountedPrice,
                            ).toLocaleString("fa-IR")}
                          </p>
                        </>
                      ) : (
                        <span>
                          قیمت:{" "}
                          {Number(product.productId.price).toLocaleString(
                            "fa-IR",
                          )}
                        </span>
                      )}
                      <span>تعداد: {product.quantity}</span>
                    </div>
                  </div>
                </div>
              ));

              return (
                <article key={order._id} className="order-card">
                  <div className="order-top">
                    <div>
                      <span className="order-number">
                        سفارش #{start + index + 1}
                      </span>

                      <span className="order-status">در انتظار ارسال</span>
                    </div>
                  </div>

                  <div className="customer-info">
                    <div className="customer-title">
                      <i className="fa-solid fa-user"></i>

                      <h3>اطلاعات سفارش‌دهنده</h3>
                    </div>

                    <div className="customer-grid">
                      <div className="info-item">
                        <span>نام</span>

                        <strong>{order.user.name}</strong>
                      </div>

                      <div className="info-item">
                        <span>ایمیل</span>

                        <strong>{order.user.email}</strong>
                      </div>

                      <div className="info-item">
                        <span>شماره تماس</span>

                        <strong>{order.user.phoneNamber}</strong>
                      </div>

                      <div className="info-item">
                        <span>آدرس</span>

                        <strong>{order.user.address}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="products-section">
                    <div className="products-title">
                      <i className="fa-solid fa-box"></i>

                      <h3>محصولات سفارش</h3>

                      <span>
                        {order.products.reduce(
                          (total, product) => total + product.quantity,
                          0,
                        )}{" "}
                        محصول
                      </span>
                    </div>

                    <div className="order-products">{productsHTML}</div>
                  </div>

                  <div className="order-bottom">
                    <div className="order-total">
                      <span>مبلغ کل سفارش</span>

                      <strong>
                        {Number(order.totalPrice).toLocaleString("fa-IR")} تومان
                      </strong>
                    </div>

                    <button
                      className="delivered-btn"
                      type="button"
                      onClick={() => isDivered(order._id)}
                    >
                      <i className="fa-solid fa-check"></i>
                      سفارش تحویل داده شد. حذف محصول از دیتابیس
                    </button>

                    <button
                      className="cancel-btn"
                      type="button"
                      onClick={() => cancelOrder(order._id)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                      لغو سفارش
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {end < allOrders.length ? (
            <button
              className="next-orders"
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              نمایش 3 سفارش بعدی
            </button>
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );

  async function cancelOrder(id) {
    const response = await axios.delete(
      `${config.urlOfBackend}/api/cart/cancel-order`,
      {
        data: {
          orderId: id,
        },

        headers: {
          "x-auth-token": token,
        },
      },
    );

    getReady();
  }
  async function isDivered(id) {
    const response = await axios.delete(
      `${config.urlOfBackend}/api/cart/isDelivered`,
      {
        data: {
          orderId: id,
        },

        headers: {
          "x-auth-token": token,
        },
      },
    );

    console.log(response);

    getReady();
  }
}

export default Orders;
