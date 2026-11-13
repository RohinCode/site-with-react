import { Link } from "react-router-dom";

function Menu({ user, activePage, setActivePage }) {
  return (
    <aside className="profile-menu">
      <div className="profile-user">
        <div className="profile-avatar">
          <i className="fa-solid fa-user"></i>
        </div>

        <h3>{user.name}</h3>
        <span>{user.isadmin ? "ادمین" : "کاربر عادی"}</span>
      </div>

      <nav>
        <button
          className={`profile-menu-item ${activePage === "profile" ? "active" : ""}`}
          onClick={() => setActivePage("profile")}
        >
          <i className="fa-solid fa-user"></i>
          پروفایل
        </button>

        <button
          className={`profile-menu-item ${activePage === "cart" ? "active" : ""}`}
          onClick={() => setActivePage("cart")}
        >
          <i className="fa-solid fa-box"></i>
          سفارش‌های من
        </button>

        <button
          className={`profile-menu-item ${activePage === "message" ? "active" : ""}`}
          onClick={() => setActivePage("message")}
        >
          <i className="fa-solid fa-bell"></i>
          پیام‌ها
        </button>

        <Link to="/logout" style={{ textDecoration: "none" }}>
          <button className="profile-menu-item logout">
            <i className="fa-solid fa-right-from-bracket"></i>
            خروج از حساب
          </button>
        </Link>
      </nav>
    </aside>
  );
}

export default Menu;
