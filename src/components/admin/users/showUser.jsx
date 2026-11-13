import randomColor from "../../../utils/randomColor";
import axios from "axios";
import { config } from "../.../../../../../config";
function ShowUsers({ user, getReady, token }) {
  return (
    <>
      <div className="user">
        <div className="top">
          <div>
            <div className="user-name">
              <i
                style={{ background: randomColor(user._id) }}
                className="fa-solid fa-user"
              ></i>
              <h5>{user.name}</h5>
            </div>
            <div className="status">
              <h6>وضعیت:</h6>
              <h6>{user.isadmin ? "ادمین" : "کاربر معمولی"}</h6>
            </div>
          </div>
          <h5 className="email">{user.email}</h5>
        </div>
        <div className="bottom">
          {user.isadmin ? (
            ""
          ) : (
            <>
              <button
                className="upgrate-to-admin"
                onClick={() => editPossition("upgrade-to-admin", user._id)}
              >
                ارتقا به ادمین
              </button>

              <button
                className="delete-user"
                onClick={() => editPossition("delete-user", user._id)}
              >
                حذف کاربر
              </button>
            </>
          )}
          {user.isadmin ? (
            <button
              className="delete-user-from-admin"
              onClick={() => editPossition("delete-from-admin ", user._id)}
            >
              حذف کابر از ادمینی
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );

  async function editPossition(url, id) {
    axios.defaults.headers.common["x-auth-token"] = token;
    try {
      const response = await axios.put(
        `${config.urlOfBackend}/api/admin/${url}`,
        { name: id },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getReady();
  }
}

export default ShowUsers;
