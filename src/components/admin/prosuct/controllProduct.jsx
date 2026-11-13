import EditProduct from "./editProduct";
import ProductMenu from "./productMenu";
import { useState } from "react";
import CreateProduct from "./createProduct";
function ControllerProduct({ token }) {
  const [activePage, setActivePage] = useState("add");

  return (
    <>
      <ProductMenu activePage={activePage} setActivePage={setActivePage} />
      {activePage === "edit" && <EditProduct token={token} />}
      {activePage === "add" && <CreateProduct token={token} />}
    </>
  );
}

export default ControllerProduct;
