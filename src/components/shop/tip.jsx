function Tip({ complated, setTip }) {
  return (
    <div className="notice-overlay">
      <div className="order-notice">
        <div className="notice-icon">
          <i className="fa-solid fa-circle-info"></i>
        </div>

        <h2>نکات مهم ثبت سفارش</h2>

        <ul>
          <li>پرداخت فقط و فقط درب منزل و هنگام تحویل محصول انجام می‌شود.</li>
          <li>
            محصول به آدرسی که قبلاً در حساب کاربری خود ثبت کرده‌اید ارسال
            می‌شود.
          </li>
          <li>ارسال محصول معمولاً حدود ۲ تا ۳ روز کاری طول می‌کشد.</li>
          <li>
            لطفاً قبل از ثبت سفارش، از صحیح بودن آدرس و اطلاعات خود مطمئن شوید.
          </li>
        </ul>

        <div className="notice-warning">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>
            لطفاً قبل از ثبت نهایی سفارش، اطلاعات خود را با دقت بررسی کنید.
          </span>
        </div>

        <button id="continueBtn" onClick={complated}>
          ثبت نهایی
        </button>
        <button id="close" onClick={() => setTip(false)}>
          بستن
        </button>
      </div>
    </div>
  );
}

export default Tip;
