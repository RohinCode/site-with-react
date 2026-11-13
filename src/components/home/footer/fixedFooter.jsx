import { Link } from "react-router-dom";
function FixedFooter({ active }) {
  return (
    <nav className="bottom-nav">
      <Link to="/" className={active === "home" ? "active" : ""}>
        <i className="fa-solid fa-house-chimney"></i>
        خانه
      </Link>
      <a
        href="/#catgoryTitle"
        className={active === "category" ? "active" : ""}
      >
        <i className="fa-solid fa-table-cells-large"></i>
        دسته‌بندی
      </a>
      <Link
        to="/shoopingBox"
        className={active === "shoopingBox" ? "active" : ""}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        سبد خرید
      </Link>
      <Link to="/user" className={active === "user" ? "active" : ""}>
        <i className="fa-solid fa-user"></i>
        پروفایل
      </Link>
    </nav>
  );
}

export default FixedFooter;
