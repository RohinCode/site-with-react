import axios from "axios";
import { config } from "../../../../config";
import { useState } from "react";
import ShowUsers from "./showUser";
function SearchUsers({ token }) {
  const [user, setUser] = useState(null);
  const [isEmpty, setEmpty] = useState(false);
  const [search, setSearch] = useState({});
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="searchBox">
        <h4>جست‌وجوی کاربران</h4>
        <input type="text" onChange={handleChange} placeholder="جست‌وجو..." />
        <button onClick={getReady}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {user ? (
        <>
          <h3 className="result">نتیجه</h3>
          <div className="users-page">
            <ShowUsers user={user} getReady={getReady} token={token} />
          </div>
        </>
      ) : isEmpty ? (
        <>
          <h3 style={{ textAlign: "center", margin: "70px" }}>
            همچین کاربری نداریم
          </h3>
        </>
      ) : (
        ""
      )}
    </>
  );

  async function getReady() {
    if (search.trim() === "") {
      return;
    }
    try {
      const response = await axios.get(
        `${config.urlOfBackend}/api/admin/get-user-by-name`,
        {
          headers: {
            "x-auth-token": token,
            username: search,
          },
        },
      );

      setUser(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
      setUser(null);
      setEmpty(true);
    }

    setLoading(false);
  }

  function handleChange(e) {
    setSearch(e.currentTarget.value);
  }
}

export default SearchUsers;
