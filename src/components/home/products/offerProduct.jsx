import axios from "axios";
import ShoppingCard from "./shoppingCard";
import { useState, useEffect } from "react";
import LoadingProducts from "../../loading/loadingProducts";
import { config } from "../../../../config";
function OfferProduct() {
  const [suggestProduct, setSuggestProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        `${config.urlOfBackend}/api/product/OfferProducts`,
      );

      setSuggestProduct(response.data.data);
      setLoading(false);
    }

    getProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingProducts count={4} />
      ) : (
        <>
          <div id="subTitle">اجناس پیشنهادی</div>
          <section className="offer-product-section">
            <div className="row">
              {suggestProduct.map((product) => {
                return (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                    key={product._id}
                  >
                    <ShoppingCard
                      api="/api/product/OfferProducts"
                      product={product}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default OfferProduct;
