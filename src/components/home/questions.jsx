import "../../styles/home/question.css";
function Question() {
  document.title = "سوالات متداول";
  return (
    <div className="container">
      <h2>لیست سوالات متداول</h2>
      <div>
        <details>
          <summary>محصول کی به دستمون می‌رسه؟</summary>
          <p>دو تا سه روز کاری طول می‌کشد.</p>
        </details>
        <details>
          <summary>چرا پرداخت آنلاین نداریم؟</summary>
          <p>
            برای جلوگیری از کلاه برداری، پرداخت فقط و فقط بعداز تحویل‌گیری محصول
            امکان پذیر است.
          </p>
        </details>
        <details>
          <summary>می‌توانیم به صورت مستقیم با فروشنده حرف بزنیم؟</summary>
          <p>
            خیر. متاسفانه در نسـخه‌ی یک این امکان وجود ندارد. باید از طریق یکی
            از پیام‌رسان‌ها اقدام کنید
          </p>
        </details>

        <details>
          <summary>آیا امکان لغو سفارش وجود داره؟</summary>
          <p>خیر. متاسفانه در نسـخه‌ی یک این امکان وجود ندارد.</p>
        </details>
        <details>
          <summary>هزینه‌ی ارسال چقدره؟</summary>
          <p>
            هزینه‌ی ارسال در هنگام ثبت سفارش به مبلغ نهایی خرید اضافه می‌شود.
          </p>
        </details>
        <details>
          <summary>اگر رمز عبورم را فراموش کنم چه کار کنم؟</summary>
          <p>در نسـخه‌ی یک مجبور می‌شوید اکانت جدید بسازید</p>
        </details>
      </div>
    </div>
  );
}

export default Question;
