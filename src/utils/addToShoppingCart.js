import axios from "axios";

export default async function addToShoppingCart(
  p,
  domain,
  setProduct,
  setIsAdded,
) {
  const token = localStorage.getItem("rohinToken");

  if (!token) {
    location.href = "/login";
    return false;
  }

  try {
    const response = await axios.post(
      `${domain}/api/cart/add`,
      {
        productId: p._id,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      },
    );

    console.log(response.data);

    if (setProduct) {
      setProduct((prevProduct) => {
        if (prevProduct.quantity <= 0) {
          return prevProduct;
        }

        return {
          ...prevProduct,
          quantity: prevProduct.quantity - 1,
        };
      });
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
