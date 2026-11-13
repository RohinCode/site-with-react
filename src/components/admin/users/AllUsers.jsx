import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../.../../../../../config";
import ShowUsers from "./showUser";

function GetAllUsers({ token }) {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  async function getReady() {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const response = await axios.get(
        `${config.urlOfBackend}/api/admin/getAllUsers`,
      );
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getReady();
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <h4 style={{ textAlign: "center" }}>مدیریت کاربران</h4>

          <div className="users-page">
            {users.map((user) => (
              <ShowUsers key={user._id} user={user} getReady={getReady} token={token}/>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default GetAllUsers;
