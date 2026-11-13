import { useEffect, useState } from "react";
import { config } from "../../../config";
import axios from "axios";
import OrderSkeleton from "../loading/loadinOrder";
import { Link } from "react-router-dom";
import formatMessageDate from "../../utils/dateFormat";
function Message({ token }) {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return async () => {
      try {
        axios.defaults.headers.common["x-auth-token"] = token;
        const response = await axios.get(
          `${config.urlOfBackend}/api/messages/getMyMessages`,
        );
        setMessage(response.data.data);
      } catch (error) {
        setMessage(null);
      }
      setLoading(false);
    };
  }, []);
  return (
    <>
      {loading ? (
        <OrderSkeleton />
      ) : (
        <>
          {message ? (
            <>
              <h2
                style={{
                  color: "#172554",
                  fontSize: "20px",
                  fontWeight: "800",
                  position: "relative",
                  paddingRight: "14",
                  textAlign: "center",
                }}
              >
                لیست پیام‌های دریافتی
              </h2>
              {message
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((m) => (
                  <div className="messageBox">
                    <div className="top">
                      <div className="messageTitle">
                        <button>
                          <i className="fa-solid fa-headset"></i>
                        </button>
                        <h3>{m.title}</h3>
                      </div>

                      <p className="time">{formatMessageDate(m.date)}</p>
                    </div>

                    <div className="bottom">
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="empty-orders">
              <div className="empty-orders-icon">
              <i className="fa-solid fa-message"></i>
              </div>
              <h2>پیامی ندارید</h2>
              <p>اگه اتفاق مهمی بیوفته اینجا پیامش بهت ارسال می‌شه</p>
              <Link to="/" className="empty-orders-btn">
                <i className="fa-solid fa-bag-shopping"></i>
                رفتن به فروشگاه
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Message;
