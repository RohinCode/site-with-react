import { useState } from "react";
import "../../styles/admin/admin.css";
import "../../styles/admin/report.css";
import "../../styles/admin/order.css";
import "../../styles/admin/product.css";
import "../../styles/home/flexboxgrid.css";
import AdminMenu from "./menu";
import Profile from "./profile";
import axios from "axios";
import { useEffect } from "react";
import { config } from "../../../config";
import Support from "./support";
import ControllerProduct from "./prosuct/controllProduct";
import Orders from "./orders";
import Report from "./report";
import Users from "./users/users";

function Admin({ token, setColors, colors }) {
  const [activePage, setActivePage] = useState("profile");
  document.title = "پنل ادمین";
  useEffect(() => {
    async function getReady() {
      axios.defaults.headers.common["x-auth-token"] = token;
      const response = await axios.get(`${config.urlOfBackend}/api/admin`);
      localStorage.setItem("AdminName", response.data.message);
    }
    getReady();
  }, []);

  return (
    <>
      <main className="AdminMain">
        <AdminMenu activePage={activePage} setActivePage={setActivePage} />

        <div className="left">
          {activePage === "profile" && (
            <Profile setColors={setColors} token={token} colors={colors} />
          )}
          
          {activePage === "add-product" && <ControllerProduct token={token} />}
          {activePage === "orders" && <Orders token={token} />}
          {activePage === "reports" && <Report token={token} />}
          {activePage === "users" && <Users token={token} />}
        </div>
      </main>
    </>
  );
}

export default Admin;
