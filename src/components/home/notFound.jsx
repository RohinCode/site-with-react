import { Link } from "react-router-dom";
import "../../styles/404.css";
function NotFound() {
  return (
    <>
      <main className="not-found">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>

        <div className="error-card">
          <div className="error-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>

          <div className="error-number">404</div>

          <h1>صفحه پیدا نشد</h1>

          <p>
            صفحه‌ای که دنبالش می‌گردی وجود نداره، یا ممکنه آدرسش تغییر کرده
            باشه.
          </p>

          <Link to="/" className="home-btn">
            <i className="fa-solid fa-house"></i>
            <span>برگشت به خانه</span>
          </Link>
        </div>
      </main>
    </>
  );
}

export default NotFound;
