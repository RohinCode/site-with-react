import axios from "axios";
import { useEffect, useState } from "react";
import ShoppingCard from "./shoppingCard";
import "../../../styles/home/product.css";
import "../../../styles/home/owl.carousel.min.css";
import "../../../styles/home/owl.theme.default.min.css";
import LoadingProducts from "../../loading/loadingProducts";
import { config } from "../../../../config";

function ProductByCategory() {
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts(category, title) {
      const response = await axios.get(
        `${config.urlOfBackend}/api/product/${category}`,
      );

      setProducts((previousProducts) => ({
        ...previousProducts,
        [category]: {
          title,
          info: response.data.data,
        },
      }));
      setLoading(false);
    }
    getProducts("handsfree", "دستـه بـندی هنذفری");
    getProducts("laptop", "دستـه بـندی لپ‌تاپ");
    getProducts("headset", "دستـه بـندی هدست");
    getProducts("airpod", "دستـه بـندی ایرپاد");
    getProducts("mobile", "دستـه بـندی موبایل");
  }, []);

  useEffect(() => {
    if (Object.keys(products).length === 0) return;

    let cancelled = false;

    async function initOwl() {
      try {
        const { default: $ } = await import("jquery");

        window.$ = window.jQuery = $;

        await import("owl.carousel");

        if (cancelled) return;

        $(".owl-carousel").each(function () {
          const owl = $(this);

          if (!owl.hasClass("owl-loaded")) {
            owl.owlCarousel({
              items: 1,
              responsive: {
                480: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                1024: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              },
            });
          }
        });
      } catch (error) {
        console.error("Owl Carousel Error:", error);
      }
    }

    initOwl();

    return () => {
      cancelled = true;
    };
  }, [products]);

  return (
    <>{isLoading ? <LoadingProducts count={4} /> : <>{renderProducts()}</>}</>
  );

  function renderProducts() {
    return Object.keys(products).map((category) => {
      const element = products[category];

      return (
        <section className="dragble-list" key={category}>
          <h3 className="title" id={category}>
            {element.title}
          </h3>

          <div className="owl-carousel owl-product owl-theme">
            {element.info.map((product) => (
              <div className="item" key={product._id}>
                <ShoppingCard
                  product={product}
                  api={`/api/product/${category}`}
                />
              </div>
            ))}
          </div>
        </section>
      );
    });
  }
}

export default ProductByCategory;
