import { Link } from "react-router-dom";

function IsEmpty() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="empty-cart">
        <div className="empty-cart-icon">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <h2>سبد خرید شما خالیه</h2>
        <p>هنوز محصولی به سبدت اضافه نکردی. یه سر به فروشگاه بزن.</p>
        <Link to="/" className="empty-cart-btn">
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
}

export default IsEmpty;
