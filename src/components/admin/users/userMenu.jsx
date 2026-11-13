function UserMenu({ activePage, setActivePage }) {
  return (
    <div className="user-menu">
      <button
        className={`btns ${activePage === "allUsers" ? "active" : ""}`}
        onClick={() => setActivePage("allUsers")}
      >
        کل کاربران
      </button>
      <button
        className={`btns ${activePage === "search" ? "active" : ""}`}
        onClick={() => setActivePage("search")}
      >
        جست‌وجو کاربر
      </button>
    </div>
  );
}

export default UserMenu;
