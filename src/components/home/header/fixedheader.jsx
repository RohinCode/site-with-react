import { useState } from "react";
import { Link } from "react-router-dom";

function FixedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  function handleDropdownClick(name) {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }

  return (
    <nav id="fixed-header">
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <h2 className="title">روهین کد</h2>

      <menu>
        <div className="dropdown">
          <span className="menu-item mother-menu">
            ارتباط با ما
            <i className="fa-solid fa-chevron-down arrow"></i>
          </span>

          <div className="dropdown-menu">
            <a href="https://t.me/RohinCode" className="hidden-item">
              کانال تلگرام
            </a>
            <a href="https://instagram.com/RohinCode" className="hidden-item">
              صفحه‌ی اینستاگرام
            </a>
          </div>
        </div>

        <div className="dropdown">
          <span className="menu-item mother-menu">
            دسته‌بندی محصولات
            <i className="fa-solid fa-chevron-down arrow"></i>
          </span>

          <div className="dropdown-menu">
            <a href="#laptop" className="hidden-item">لپ‌تاپ</a>
            <a href="#airpod" className="hidden-item">هنذفری و ایرپاد</a>
            <a href="#headset" className="hidden-item">هدست</a>
          </div>
        </div>

        <Link to="/question" className="menu-item">
          سوالات متداول
        </Link>

        <a href="#searchPart" className="menu-item">
          جست‌وجو
        </a>
      </menu>

      <Link to="/login" className="login">
        ورود / ثبت‌نام
      </Link>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <section>
          <div
            className={`dropdown ${activeDropdown === "contact" ? "active" : ""}`}
          >
            <span
              className="menu-item mother-menu"
              onClick={() => handleDropdownClick("contact")}
            >
              ارتباط با ما
              <i className="fa-solid fa-chevron-down arrow"></i>
            </span>

            <div className="dropdown-menu">
              <a href="https://t.me/RohinCode" className="hidden-item">
                کانال تلگرام
              </a>
              <a href="https://instagram.com/RohinCode" className="hidden-item">
                صفحه‌ی اینستاگرام
              </a>
            </div>
          </div>

          <div
            className={`dropdown ${activeDropdown === "categories" ? "active" : ""}`}
          >
            <span
              className="menu-item mother-menu"
              onClick={() => handleDropdownClick("categories")}
            >
              دسته‌بندی محصولات
              <i className="fa-solid fa-chevron-down arrow"></i>
            </span>

            <div className="dropdown-menu">
              <a href="#laptop" className="hidden-item">لپ‌تاپ</a>
              <a href="#airpod" className="hidden-item">هنذفری و ایرپاد</a>
              <a href="#headset" className="hidden-item">هدست</a>
            </div>
          </div>

          <Link to="/question" className="menu-item">
            سوالات متداول
          </Link>

          <a href="#searchPart" className="menu-item">
            جست‌وجو
          </a>
        </section>
      </div>
    </nav>
  );
}

export default FixedHeader;