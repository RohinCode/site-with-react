import { Link } from "react-router-dom";
function BottomFooter() {
  return (
    <>
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="col">
            <h3>درباره ما</h3>
            <ul>
              <li>
                <Link to="/">داستان برند</Link>
              </li>
              <li>
                <a href="https://t.me/RohinCodeBot">تماس با ما</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h3>دسته‌بندی</h3>
            <ul>
              <li>
                <Link to="/#laptop">لپ‌تاپ</Link>
              </li>
              <li>
                <Link to="/#handsfree">هنذفری</Link>
              </li>
              <li>
                <Link to="/#headset">هدست</Link>
              </li>
              <li>
                <Link to="/#airpod">ایرپاد</Link>
              </li>
            </ul>
          </div>

          <div className="col">
            <h3>پشتیبانی</h3>
            <ul>
              <li>
                <Link to="/user">مشاهده‌ی سفارش‌های من</Link>
              </li>
              <li>
                <Link to="/question">سوالات متداول</Link>
              </li>
            </ul>
          </div>

          <div className="col">
            <h3 className="follow-me">ما را دنبال کنید</h3>
            <div className="socials">
              <a href="https://inistagram.com/RohinCode">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://t.me/RohinCodeBot">
                <i className="fa-solid fa-comment"></i>
              </a>
              <a href="https://t.me/RohinCode">
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © تمامی حقوق برای فروشگاه محفوظ است. <br />
          نسخـه‌ی 1.0.2
        </div>
      </div>
    </>
  );
}

export default BottomFooter;
