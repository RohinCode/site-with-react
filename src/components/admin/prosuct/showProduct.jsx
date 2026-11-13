import axios from "axios";
import { config } from "../../../../config";
import { useState } from "react";

function ShowProduct({ getReady, token, product, isEmpty }) {
  const [contentEditable, setContentEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");

  function editInfo(e, field) {
    const value = e.currentTarget.textContent;

    let newName = name;
    let newPrice = price;
    let newDetails = details;

    if (field === "name") {
      newName = value;
      setName(value);
    } else if (field === "price") {
      newPrice = value;
      setPrice(value);
    } else if (field === "details") {
      newDetails = value;
      setDetails(value);
    }

    if (
      newName === product.name &&
      newDetails === product.details &&
      newPrice === product.price
    ) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  }

  return (
    <>
      {product ? (
        <div className="result-of-search-product">
          <img
            src={`${config.urlOfBackend}${product.img}`}
            alt={product.name}
          />

          <div className="bottom">
            <h3
              onInput={(e) => editInfo(e, "name")}
              contentEditable={contentEditable}
              className={`${contentEditable ? "editable" : ""}`}
            >
              {product.name}
            </h3>
            <h4
              onInput={(e) => editInfo(e, "price")}
              className={`${contentEditable ? "editable" : ""}`}
              contentEditable={contentEditable}
            >
              {product.price}
            </h4>
            <p
              onInput={(e) => editInfo(e, "details")}
              className={`${contentEditable ? "editable" : ""}`}
              contentEditable={contentEditable}
            >
              {product.details}
            </p>
            <p></p>
            <div className="quantity-of-product">
              <button
                onClick={() =>
                  editQuantity("removeOneNumberToProduct", product._id)
                }
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() =>
                  editQuantity("addOneNumberToProduct", product._id)
                }
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="product-actions">
              <button className="save-btn" style={{ display: display }}>
                <i className="fa-solid fa-floppy-disk" onClick={save}></i>
                ذخیره
              </button>

              <button
                className="edit-btn"
                onClick={() => setContentEditable(true)}
              >
                <i className="fa-solid fa-pen"></i>
                ویرایش
              </button>

              {/* <button className="delete-btn">
                <i className="fa-solid fa-trash"></i>
                حذف
              </button> */}
            </div>
          </div>
        </div>
      ) : isEmpty ? (
        <>
          <h3 style={{ textAlign: "center", margin: "70px" }}>
            همچین محصولی نداریم
          </h3>
        </>
      ) : (
        ""
      )}
    </>
  );

  async function editQuantity(url, id) {
    try {
      await axios.put(`${config.urlOfBackend}/api/product/${url}`, {
        productId: id,
      });

      getReady();
    } catch (error) {
      console.log(error);
    }
  }

  async function save() {
    try {
      await axios.put(
        `${config.urlOfBackend}/api/product/editProduct`,
        {
          productId: product._id,
          details,
          name,
          price,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      setContentEditable(false);
      setDisplay("none");
      getReady();
    } catch (error) {
      console.log(error.response.data.message);

      console.log(error);
    }
  }
}

export default ShowProduct;
