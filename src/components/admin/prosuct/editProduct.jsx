import axios from "axios";
import { config } from "../../../../config";
import { useState } from "react";
import SearchProduct from "./searchProduct";
import ShowProduct from "./showProduct";

function EditProduct({ token }) {
  const [product, setProduct] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  async function getReady() {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const response = await axios.get(
        `${config.urlOfBackend}/api/product/search-product-by-admin/${searchValue}`,
      );
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
      setEmpty(true);
    }
  }

  return (
    <div className="editProduct">
      <div className="explain">
        <h3>مواردی که باید قبل از ایجاد محصول بدانید</h3>
        <ul>
          <li>
            در قسمت جست‌وجو دقیقا اسم محصولی که می‌خواهید ویراسش کنید را تایپ
            کنید (چیزی که تایپ می‌کنید دقیقا باید مطابق محصول باشد)
          </li>
          <li>می‌توانید هرچندبار که بخواهید محصولات را ویرایش کنید</li>
          <li>قیمت را به درستی بنویسید</li>
          <li>
            برای قیمت بهتر است از ترکیب حروف و عدد استفاده کنید. مثلا: 1 میلیون
            تومان
          </li>
        </ul>
      </div>

      <SearchProduct getReady={getReady} setSearchValue={setSearchValue} />

      <ShowProduct
        getReady={getReady}
        isEmpty={isEmpty}
        token={token}
        product={product}
      />
    </div>
  );
}

export default EditProduct;
