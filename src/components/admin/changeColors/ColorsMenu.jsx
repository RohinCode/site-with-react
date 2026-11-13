import axios from "axios";
import "../../../styles/admin/setColors.css";
import { config } from "../../../../config";

function ColorsMenu({ token, setColors, colors }) {
  const colorList = ["blue", "green", "purple", "pink", "yellow", "orange", "gray"];
  async function getReady(color) {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;

      const response = await axios.put(
        `${config.urlOfBackend}/api/color/edit-color`,
        {
          name: color,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h3 className="chooseTheme">انتخاب تم سایت</h3>
      <div className="theme">
        {colorList.map((color) => (
          <div
            key={color}
            className={`color ${colors === color ? "active" : ""}`}
          >
            <span className={color}></span>

            <button
              type="button"
              onClick={() => {
                setColors(color);
                getReady(color);
              }}
              className="select-color"
            >
              {colors === color ? "انتخاب شده" : "انتخاب"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ColorsMenu;
