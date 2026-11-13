import { useState, useEffect, lazy, Suspense } from "react";
import Home from "./home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./auth/logout";
import Protect from "./protect/protect";
import ProtectByNotFound from "./protect/proucectByNotfuond";
import SetTheme from "./admin/changeColors/setTheme";
import axios from "axios";
import { config } from "../../config";

const Admin = lazy(() => import("./admin/admin"));
const NotFound = lazy(() => import("./home/notFound"));
const ShoppingBox = lazy(() => import("./shop/shoppingCard"));
const Question = lazy(() => import("./home/questions"));
const Login = lazy(() => import("./auth/login"));
const Singup = lazy(() => import("./auth/sigup"));
const Product = lazy(() => import("./home/products/product"));
const User = lazy(() => import("./user/user"));

function App() {
  const [colors, setColors] = useState(
    () => localStorage.getItem("theme") || "blue",
  );
  useEffect(() => {
    async function getReady() {
      try {
        const response = await axios.get(
          `${config.urlOfBackend}/api/color/get-color`,
        );

        const theme = response.data.data.name;

        setColors(theme);
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.log(error);
      }
    }

    getReady();
  }, []);

  return (
    <BrowserRouter>
      <SetTheme color={colors} />

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/question" element={<Question />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/logout" element={<Logout />} />

          <Route
            path="/user"
            element={
              <Protect>
                <User />
              </Protect>
            }
          />

          <Route
            path="/shoopingBox"
            element={
              <Protect address="/shoopingBox">
                <ShoppingBox />
              </Protect>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectByNotFound>
                <Admin setColors={setColors} colors={colors} />
              </ProtectByNotFound>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
