import axios from "axios";
import { config } from "../../../config";
import { useState } from "react";
import ShoppingCard from "./products/shoppingCard";

function Search({ setSearchIsSeccessful }) {
  const [searchInp, setSearchInp] = useState("");
  const [products, setProducts] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  async function send() {
    if (searchInp.trim() === "") return;

    const value = searchInp.trim();
    setSearchInp("");
    try {
      const response = await axios.get(
        `${config.urlOfBackend}/api/product/getSearchProduct?search=${encodeURIComponent(value)}`,
      );

      console.log(response);
      setProducts(response.data.data);
      setSearchIsSeccessful(true);
      setEmpty(false);
      setVisibleCount(8);
    } catch (error) {
      if (error.response?.status === 404) {
        setProducts(false);
        setEmpty(true);
        setSearchIsSeccessful(false);
      }
      console.log(error);
    }
  }

  const productsToShow = products ? products.slice(0, visibleCount) : [];
  return (
    <>
      <div className="searchPart" id="searchPart">
        <h2 id="searchTitle">جست‌وجو</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="جست‌وجو کنید..."
            value={searchInp}
            onChange={(e) => setSearchInp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />

          <i
            className="fa-solid fa-magnifying-glass search-icon"
            onClick={send}
          ></i>
        </div>
      </div>

      {products ? (
        <section id="searchResults">
          <h2 id="subTitle">نتیجه‌ی جست‌وجو</h2>

          <div className="row">
            {productsToShow.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              >
                <ShoppingCard product={product} />
              </div>
            ))}
          </div>

          {showMore()}
          <button
          className="cancel-search"
            onClick={() => {
              setSearchIsSeccessful(false);
              setProducts(false);
            }}
          >
            برگشت
          </button>
        </section>
      ) : (
        ""
      )}

      {isEmpty ? (
        <>
          <h3 id="weDontHaveThisProduct">محصولی با این عبارت پیدا نشد</h3>
        </>
      ) : (
        ""
      )}
    </>
  );

  function showMore() {
    if (!products) return;
    if (visibleCount < products.length) {
      return (
        <button
          className="show-more"
          onClick={() => setVisibleCount(visibleCount + 8)}
        >
          نمایش بیشتر
        </button>
      );
    }
  }
}

export default Search;
