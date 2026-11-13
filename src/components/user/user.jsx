import { useEffect, useState } from "react";
import FixedFooter from "../home/footer/fixedFooter";
import axios from "axios";
import { config } from "../../../config";
import "../../styles/user/user.css";
import "../../styles/user/message.css";

import Information from "./information";
import Menu from "./menu";
import Order from "./order";
import MenuSkeleton from "../loading/menu";
import Message from "./message";
import InformationSkeleton from "../loading/loadingInfo";

function User() {

  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("profile");

  const token = localStorage.getItem("rohinToken");
 document.title = "پروفایل";
  useEffect(() => {
    async function getReady() {
      try {
        axios.defaults.headers.common["x-auth-token"] = token;
        const response = await axios.get(`${config.urlOfBackend}/api/user/me`);

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    getReady();
  }, [token]);

  return (
    <>
      <main className="profile">
        {isLoading ? (
          <>
            <MenuSkeleton />
          </>
        ) : (
          <Menu
            user={user}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}

        <section className="profile-content">
          {isLoading ? (
            <InformationSkeleton />
          ) : (
            <div className="account-card">
              {!isLoading && activePage === "profile" && (
                <Information user={user} token={token} setUser={setUser} />
              )}

              {!isLoading && activePage === "cart" && (
                <Order user={user} token={token} />
              )}

              {!isLoading && activePage === "message" && (
                <Message token={token} />
              )}
            </div>
          )}
        </section>
      </main>

      <FixedFooter active="user" />
    </>
  );
}

export default User;
