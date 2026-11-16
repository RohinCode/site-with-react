import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/auth/auth.module.css";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { config } from "../../../config.js";

function Login() {
  const { state } = useLocation();
  const [err, setErr] = useState([]);
  const address = state?.address || "/user";
  const [sending, setSending] = useState(false);
  const [account, setAccount] = useState({ name: "", password: "" });
  const schema = yup.object().shape({
    name: yup.string().required(" فیلد نام کاربری الزامی می باشد "),
    password: yup.string().min(4, " پسورد باید حداقل چهار کاراکتر باشد "),
  });

  document.title = "ورود";
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
      setErr([]);
      return result;
    } catch (error) {
      setErr(error.errors);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <h2>ورود</h2>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            name="name"
            type="text"
            placeholder="نام کاربری رو وارد کنید"
            onChange={handleChange}
          />

          <input
            onChange={handleChange}
            name="password"
            type="text"
            placeholder="رمز خود را وارد کنید"
          />
          <div className={styles.errors}>
            {err.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>

          <input disabled={sending} type="submit" value="ارسال" />
        </form>

        <h4>
          اکانت ندارید؟ <Link to="/singup">بسازید!</Link>
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
          `${config.urlOfBackend}/api/auth/login`,
          result,
        );
        localStorage.setItem("rohinToken", response.data.data.token);
        window.location = address;
        setSending(false);
      } catch (error) {
        setErr(["ایمیل یا پسورد صحیح نمی باشد"]);
      }
    }
    setSending(false);
  }
}

export default Login;
