import { useEffect, useState } from "react";
import FixedFooter from "../home/footer/fixedFooter";
import axios from "axios";
import { config } from "../../../config";
import priceToNumber from "../../utils/priceFormat";
import "../../styles/shopping-cart.css";
import Notice from "./notice";
import IsEmpty from "./isEmpty";
import Complated from "./complated";
import Tip from "./tip";
import ShoppingSkeleton from "../loading/shoppingSkeleton";

function ShoppingBox({ token }) {
  const [shop, setShop] = useState({ products: [] });
  const [isLoading, setLoading] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [tip, setTip] = useState(false);
  const [isComplated, setComplated] = useState(false);
  document.title = "سبد خرید";

  async function getCart() {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;

      const response = await axios.get(
        `${config.urlOfBackend}/api/cart/getProdoct`,
      );

      setShop(response.data.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCart();
  }, [token]);

  const totalProductsPrice = shop.products.reduce(
    (total, product) =>
      product.productId.percent
        ? total +
          priceToNumber(product.productId.DiscountedPrice) * product.quantity
        : total + priceToNumber(product.productId.price) * product.quantity,
    0,
  );
  const SHIPPING_COST = 50000;

  const totalPrice = totalProductsPrice + SHIPPING_COST;

  return (
    <>
      {isLoading ? (
        <ShoppingSkeleton />
      ) : (
        <>
          <main className="shoppnigMain">
            {shop.products.length !== 0 ? (
              <>
                <div>
                  {shop.products.map((product) => (
                    <div key={product._id} className="Product-item">
                      <img
                        src={`${config.urlOfBackend}${product.productId.img}`}
                        alt={`${product.productId.img}`}
                      />

                      <div>
                        <div>
                          <h3 style={{ marginBottom: "0", fontSize: "15px" }}>
                            {product.productId.name}
                          </h3>

                          <p
                            style={{
                              fontSize: "11px",
                              padding: "0 5px 0 0",
                              marginTop: "5px",
                              color: " #5c626e",
                              fontWeight: "600",
                            }}
                          >
                            {product.productId.details.replace(/<[^>]*>/g, "")}
                          </p>
                        </div>
                        <div className="left">
                          <div className="price">
                            {product.productId.percent ? (
                              <>
                                <div className="percent-box">
                                  <p className="last-price">
                                    {" "}
                                    {Number(
                                      product.productId.price,
                                    ).toLocaleString("fa-IR")}
                                  </p>
                                  <div className="percent active">
                                    {Number(
                                      product.productId.percent,
                                    ).toLocaleString("fa-IR")}
                                    %
                                  </div>
                                </div>
                                <p style={{ display: "inline" }}>
                                  {Number(
                                    product.productId.DiscountedPrice,
                                  ).toLocaleString("fa-IR")}
                                </p>
                              </>
                            ) : (
                              <p style={{ display: "inline" }}>
                                {Number(product.productId.price).toLocaleString(
                                  "fa-IR",
                                )}
                              </p>
                            )}
                            <span>تومان</span>
                          </div>

                          <div className="quantity-of-product">
                            <button
                              onClick={() =>
                                editQuantity(
                                  "removeOneNumberToOrder",
                                  product.productId._id,
                                )
                              }
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              onClick={() =>
                                editQuantity(
                                  "addOneNumberToOrder",
                                  product.productId._id,
                                )
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pay">
                  <h4>جزئیات خرید</h4>

                  <div className="price">
                    <div>
                      <p>مجموع قیمت کالاها</p>
                      <span>{totalProductsPrice.toLocaleString("fa-IR")}</span>
                    </div>

                    <div>
                      <p>هزینه‌ی ارسال</p>
                      <span>{SHIPPING_COST.toLocaleString("fa-IR")}</span>
                    </div>

                    <div>
                      <p>مجموع (به تومان)</p>
                      <span>{totalPrice.toLocaleString("fa-IR")}</span>
                    </div>
                  </div>

                  <button onClick={continueFunction}>ادامه</button>
                </div>
              </>
            ) : (
              <IsEmpty />
            )}
          </main>

          {showNotice && <Notice />}

          {tip && <Tip complated={complated} setTip={setTip} />}

          {isComplated && <Complated />}

          <FixedFooter active="shoopingBox" />
        </>
      )}
    </>
  );

  async function continueFunction() {
    axios.defaults.headers.common["x-auth-token"] = token;
    const response = await axios.get(`${config.urlOfBackend}/api/user/me`);
    const data = response.data.data;

    if (!data.address || !data.phoneNamber) {
      setShowNotice(true);

      return;
    }

    setTip(true);
  }

  async function complated() {
    axios.defaults.headers.common["x-auth-token"] = token;
    const response = await axios.get(
      `${config.urlOfBackend}/api/cart/isComplate`,
    );

    setComplated(true);
  }

  async function editQuantity(url, id) {
    try {
      await axios.put(`${config.urlOfBackend}/api/cart/${url}`, {
        productId: id,
        cartId: shop._id,
      });

      await getCart();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
}

export default ShoppingBox;
