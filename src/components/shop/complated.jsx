import { Link } from "react-router-dom";

function Complated() {
  return (
    <div className="notice-overlay">
      <div className="order-notice">
        <div className="notice-icon">
          <i className="fa-solid fa-check"></i>
        </div>

        <h2>ثبت شد</h2>

        <ul>
          <li>پرداخت فقط و فقط درب منزل و هنگام تحویل محصول انجام می‌شود.</li>
          <li>
            محصول به آدرسی که قبلاً در حساب کاربری خود ثبت کرده‌اید ارسال
            می‌شود.
          </li>
          <li>ارسال محصول معمولاً حدود ۲ تا ۳ روز کاری طول می‌کشد.</li>
        </ul>
        <button className="btn">
          <Link to="/">برگشت به صفحه‌ی اصلی</Link>
        </button>
      </div>
    </div>
  );
}

export default Complated;
