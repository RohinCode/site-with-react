import { Link } from "react-router-dom";

function Notice() {
  return (
    <div className="notice-overlay">
      <div className="order-notice">
        <div className="notice-icon">
          <i className="fa-solid fa-circle-info"></i>
        </div>

        <h2>لطفاً قبل از سفارش اطلاعات خود را کامل کنید</h2>

        <ul>
          <li>وارد بخش پروفایل شوید</li>
          <li>آدرس و شماره تلفن خود را وارد کنید</li>
          <li>به همین صفحه برگردید و سفارش را ادامه دهید</li>
        </ul>

        <Link to="/user/">رفتن به پروفایل</Link>
      </div>
    </div>
  );
}

export default Notice;
