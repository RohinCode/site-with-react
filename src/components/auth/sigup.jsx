import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/auth/auth.module.css";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { config } from "../../../config.js";

function Singup() {
  const { state } = useLocation();
  const address = state?.address || "/user";
  const [sending, setSending] = useState(false);
  const [account, setAccount] = useState({ name: "", password: "" });
  const schema = yup.object().shape({
    name: yup.string().required(" فیلد ایمیل الزامی می باشد "),
    password: yup.string().min(4, " پسورد باید حداقل چهار کاراکتر باشد "),
  });

   document.title = "ثبت‌نام";

   function handleChange({ currentTarget: input }) {
    setAccount((prevAccount) => ({
      ...prevAccount,
      [input.name]: input.value,
    }));
  }

  async function validate() {
    try {
      const result = await schema.validate(account, {
        abortEarly: false,
      });
      return result;
    } catch (error) {
      alert(error.errors);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <h2>ثبت‌نام</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            name="email"
            type="text"
            placeholder="ایمیل خود را وارد کنید"
            onChange={handleChange}
          />
          <input
            name="name"
            type="text"
            placeholder="نام کاربری رو وارد کنید"
            onChange={handleChange}
          />
          <input
            name="password"
            type="text"
            placeholder="رمز خود را وارد کنید"
            onChange={handleChange}
          />
          <input type="submit" value="ارسال" />
        </form>
        <h4>
          اکانت دارید؟ <Link to="/login">وارد شوید</Link>
        </h4>
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const result = await validate();
    if (result) {
      try {
        const response = await axios.post(
          `${config.urlOfBackend}/api/auth/register`,
          result,
        );
        localStorage.setItem("rohinToken", response.data.data.token);
        window.location = address;
        setSending(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setSending(false);
  }
}

export default Singup;
