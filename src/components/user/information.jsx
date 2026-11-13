import axios from "axios";
import { useState } from "react";
import { config } from "../../../config";
function Information({ user, token, setUser }) {
  const [contentEditable, setContentEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address || "Iran");
  const [phoneNamber, setPhoneNamber] = useState(
    user.phoneNamber || "09000000000",
  );

  return (
    <>
      <div className="card-title">
        <h2>اطلاعات حساب</h2>

        <div>
          <button onClick={edit}>
            <i className="fa-solid fa-pen"></i>
            ویرایش
          </button>

          <button style={{ display: display }} onClick={save}>
            <i className="fa-solid fa-floppy-disk"></i>
            ذخیره
          </button>
        </div>
      </div>

      <div className="account-info">
        <div>
          <span>نام</span>

          <strong
            contentEditable={contentEditable}
            onInput={(e) => editNameAndAddressFunction(e, "name")}
            suppressContentEditableWarning
            className={`editable-field ${contentEditable ? "editing" : ""}`}
          >
            {user.name}
          </strong>
        </div>

        <div>
          <span>شماره تلفن</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            readOnly={!contentEditable}
            value={phoneNamber}
            onChange={numberFunction}
            style={{ outline: "none" }}
            className={`editable-field ${contentEditable ? "editing" : ""}`}
          />
        </div>

        <div>
          <span>ایمیل</span>
          <strong>{user.email}</strong>
        </div>
        <div>
          <span>آدرس</span>
          <strong
            onInput={(e) => editNameAndAddressFunction(e, "address")}
            contentEditable={contentEditable}
            suppressContentEditableWarning
            className={`editable-field ${contentEditable ? "editing" : ""}`}
          >
            {user.address || "Iran"}
          </strong>
        </div>
      </div>
    </>
  );

  function edit() {
    setContentEditable(true);
  }

  async function save() {
    try {
      await axios.put(
        `${config.urlOfBackend}/api/user/editInfo`,
        {
          phoneNamber,
          name,
          address,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      axios.defaults.headers.common["x-auth-token"] = token;
      const response = await axios.get(`${config.urlOfBackend}/api/user/me`);

      setUser(response.data.data);
      setContentEditable(false);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(error.response.data.message);
      }
      console.log(error);
    }
  }

  function editNameAndAddressFunction(e, field) {
    const value = e.currentTarget.textContent;

    let newName = name;
    let newAddress = address;

    if (field === "name") {
      newName = value;
      setName(value);
    } else if (field === "address") {
      newAddress = value;
      setAddress(value);
    }

    if (newName === user.name && newAddress === (user.address || "Iran")) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  }

  function numberFunction(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);

    setPhoneNamber(value);
    setDisplay("block");
  }
}

export default Information;
