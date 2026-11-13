import "../../styles/home/flexboxgrid.css";
import "../../styles/home/product.css";
import "../../styles/home/headerAndFooter.css";
import Header from "./header/header.jsx";
import Footer from "./footer/footer.jsx";
import Search from "./search.jsx";
import OfferProduct from "./products/offerProduct.jsx";
import Category from "./category.jsx";
import ProductByCategory from "./products/productByCategory.jsx";
import { useState } from "react";

function Home() {
  const [isSearchIsSeccessful, setSearchIsSeccessful] = useState(false);
    document.title = "روهین کد | فروشگاه لوازم دیجیتال";
  return (
    <>
      <Header />
      <main>
        <Search setSearchIsSeccessful={setSearchIsSeccessful} />
        {isSearchIsSeccessful ? (
          ""
        ) : (
          <>
            <OfferProduct />
            <Category />
            <ProductByCategory />
          </>
        )}
      </main>
      <Footer active="home" />
    </>
  );
}

export default Home;
