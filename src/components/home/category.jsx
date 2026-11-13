import { Link } from "react-router-dom";
function Category() {
  return (
    <section className="category">
      <h3 id="catgoryTitle" className="catgoryTitle">
        دستـه‌بنـدی
      </h3>
      <nav className="row">
        <div>
          <a href="/#airpod">
            <img src="./images/air2.webp" alt="" />
          </a>
          <h4>ایرپاد</h4>
        </div>
        <div>
          <a href="#handsfree">
            <img src="./images/h1.jpg" alt="" />
          </a>
          <h4>هنذفری‌</h4>
        </div>
        <div>
          <a href="/#laptop">
            <img src="./images/laptop3.webp" alt="" />
          </a>
          <h4>لپ‌تاپ</h4>
        </div>
        <div>
          <a href="/#headset">
            <img src="./images/p2.webp" alt="" />
          </a>
          <h4>هدست</h4>
        </div>
        <div>
          <a href="/#mobile">
            <img src="./images/phone2.webp" alt="" />
          </a>
          <h4>موبایل</h4>
        </div>
      </nav>
    </section>
  );
}

export default Category;
