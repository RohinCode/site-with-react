import ColorTheme from "./changeColors/colorTheme";
import Support from "./support";

function Profile({ token, setColors, colors }) {
  return (
    <>
      <section className="adminProfile">
        <h1>{localStorage.getItem("AdminName")}</h1>

        <p>
          این صفحه برای کنترل و مدیریت سایت هست و فقط ادمین‌ها می‌تونن واردش
          بشن.
          <br />
          از اینجا می‌تونی بخش‌های مختلف سایت رو مدیریت کنی:
        </p>

        <ul>
          <li>
            <i className="fa-solid fa-box"></i>
            <span>اضافه، ویرایش و حذف محصول</span>
          </li>

          <li>
            <i className="fa-solid fa-layer-group"></i>
            <span>انتخاب دسته‌بندی‌ها برای نمایش</span>
          </li>

          <li>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>دیدن سفارش‌های ثبت‌شده</span>
          </li>

          <li>
            <i className="fa-solid fa-message"></i>
            <span>گزارش‌های فروش محصول</span>
          </li>

          <li>
            <i className="fa-solid fa-headset"></i>
            <span>پشتیبانی</span>
          </li>
        </ul>
      </section>

      <div className="colorsSetting">
        {<ColorTheme token={token} setColors={setColors} colors={colors} />}
        {<Support />}
      </div>
    </>
  );
}

export default Profile;
