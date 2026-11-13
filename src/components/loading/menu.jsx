import "./menu.css"
function MenuSkeleton() {
  return (
    <aside
      className="profile-menu menu-skeleton"
      aria-label="در حال بارگذاری پروفایل"
    >
      {/* اطلاعات کاربر */}
      <div className="profile-user">
        <div className="skeleton skeleton-avatar"></div>

        <div className="skeleton skeleton-username"></div>

        <div className="skeleton skeleton-role"></div>
      </div>

      {/* آیتم‌های منو */}
      <nav>
        {[1, 2, 3].map((item) => (
          <div className="menu-skeleton-item" key={item}>
            <div className="skeleton skeleton-menu-icon"></div>
            <div className="skeleton skeleton-menu-text"></div>
          </div>
        ))}

        {/* خروج از حساب */}
        <div className="menu-skeleton-item logout-skeleton">
          <div className="skeleton skeleton-menu-icon"></div>
          <div className="skeleton skeleton-menu-text"></div>
        </div>
      </nav>
    </aside>
  );
}

export default MenuSkeleton;
