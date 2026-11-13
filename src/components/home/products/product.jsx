import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../../styles/product/product.css";
import "../../../styles/product/comments.css";
import DOMPurify from "dompurify";
import addToShoppingCart from "../../../utils/addToShoppingCart";
import LoadingProductPage from "../../loading/loadingPriductPage";
import { config } from "../../../../config";
import formatMessageDate from "../../../utils/dateFormat";
import randomColor from "../../../utils/randomColor";
function Product() {
  const { id } = useParams();
  const [sending, setSending] = useState(false);
  const [Product, setProduct] = useState({});
  const [comments, setComments] = useState(null);
  const [text, setText] = useState("");
  const [display, setDisplay] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `${config.urlOfBackend}/api/product/getProduct/${id}`,
      );
      setProduct(response.data.data);
      setLoading(false);
      const commentResponse = await axios.get(
        `${config.urlOfBackend}/api/comment/getComment/${id}`,
      );
      if (commentResponse.status !== 404) {
        setComments(commentResponse.data.data);
      }
    }

    getProduct();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingProductPage />
      ) : (
        <>
          <main className="product-page">
            <div className="product-image">
              <img src={`${config.urlOfBackend}${Product.img}`} alt={Product.name} />
            </div>

            <div className="product-info">
              <h1 className="product-title">{Product.name}</h1>
              <div className="product-rating"></div>

              <div
                className="product-details"
                dangerouslySetInnerHTML={{
                  __html: Product.details
                    ? DOMPurify.sanitize(Product.details)
                    : "این محصول جزئیات ندارد",
                }}
              />
              <div className="product-price">
                <span>
                  {priceToNumber(Product.price).toLocaleString("fa-IR")}
                </span>
                <span> تومان</span>
              </div>
              <div className="quantity">
                <p>{Product.quantity} عدد موجود است</p>
              </div>
              <div className="product-actions">
                <button
                  className="add-to-cart"
                  onClick={async () => {
                    const success = await addToShoppingCart(
                      Product,
                      domain,
                      setProduct,
                    );

                    if (success) {
                      setDisplay("block");
                      setInterval(() => {
                        setDisplay("none");
                      }, 3000);
                    }
                  }}
                >
                  افزودن به سبد خرید
                </button>
              </div>

              <div className="ok" style={{ display: display }}>
                <h4>به سبد خرید اضافه شد</h4>
              </div>

              {comments ? (
                <div className="comments">
                  <h3>نظرات کاربران:</h3>
                  {comments.map((comment, i) => (
                    <div className="comment" key={i}>
                      <div className="top">
                        <div className="userInfo">
                          <button
                            style={{ background: randomColor(comment._id) }}
                          >
                            <i className="fa-solid fa-user"></i>
                          </button>
                          <h3>{comment.user.name}</h3>
                        </div>
                        <p className="time">
                          {formatMessageDate(comment.date)}
                        </p>
                      </div>
                      <div className="bottom">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="comments"></div>
              )}
              <div className="writeComment">
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={text}
                    onChange={handleChange}
                    name="text"
                    placeholder="نظر خود را بنویسید..."
                    maxLength="500"
                  ></textarea>

                  <div className="commentActions">
                    <span>حداکثر ۵۰۰ کاراکتر</span>
                    <button disabled={sending} name="text" type="submit">
                      ارسال نظر
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );

  function handleChange({ currentTarget: input }) {
    setText(input.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const token = localStorage.getItem("rohinToken");
    if (!token) {
      window.location.href = "login";
      return;
    }
    try {
      const response = await axios.post(
        `${config.urlOfBackend}/api/comment/write`,
        {
          productId: Product._id,
          text: text,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );
      setSending(false);
      console.log(response);
      setText("");
      const commentResponse = await axios.get(
        `${config.urlOfBackend}/api/comment/getComment/${id}`,
      );
      if (commentResponse.status !== 404) {
        setComments(commentResponse.data.data);
      }
    } catch (error) {
      console.log(error);

      setSending(false);
      alert("نشد");
    }
  }

  function priceToNumber(price) {
    if (typeof price !== "string") return 0;

    const normalizedPrice = price
      .replace(/[۰-۹]/g, (digit) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(digit)])
      .replace(/,/g, "")
      .trim();

    const number = parseFloat(normalizedPrice);

    if (normalizedPrice.includes("میلیون")) {
      return number * 1000000;
    }

    if (normalizedPrice.includes("هزار")) {
      return number * 1000;
    }

    return number;
  }


}

export default Product;
