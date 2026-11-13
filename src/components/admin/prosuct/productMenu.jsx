function ProductMenu({ activePage, setActivePage }) {
  return (
    <div className="user-menu">
      <button
        className={`btns ${activePage === "add" ? "active" : ""}`}
        onClick={() => setActivePage("add")}
      >
        افزودن محصول
      </button>
      <button
        className={`btns ${activePage === "edit" ? "active" : ""}`}
        onClick={() => setActivePage("edit")}
      >
        ویرایش محصولات
      </button>
    </div>
  );
}

export default ProductMenu;
