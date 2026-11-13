function AdminMenu({ activePage, setActivePage }) {
  return (
    <div className="right">
      <div className="menu-btns">
        <div
          className={`item ${activePage === "profile" ? "item-active" : ""}`}
          onClick={() => setActivePage("profile")}
          data-page="profile"
        >
          <i className="fa-solid fa-user"></i>
          <span>پروفایل ادمین</span>
        </div>

        <div
          className={`item ${activePage === "add-product" ? "item-active" : ""}`}
          onClick={() => setActivePage("add-product")}
        >
          <i className="fa-solid fa-layer-group"></i>
          <span>مدیریت محصولات</span>
        </div>

        <div
          className={`item ${activePage === "orders" ? "item-active" : ""}`}
          onClick={() => setActivePage("orders")}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>سفارش ها</span>
        </div>

        <div
          className={`item ${activePage === "users" ? "item-active" : ""}`}
          onClick={() => setActivePage("users")}
        >
          <i className="fa-solid fa-user"></i>
          <span>کاربران</span>
        </div>

        <div
          className={`item ${activePage === "reports" ? "item-active" : ""}`}
          onClick={() => setActivePage("reports")}
        >
          <i className="fa-solid fa-message"></i>
          <span>گزارش ها</span>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
