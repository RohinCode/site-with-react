import axios from "axios";
import { cloneElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../../../config";

function Protect({ children, address }) {
  const token = localStorage.getItem("rohinToken");

  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const response = await axios.get(`${config.urlOfBackend}/api/user`, {
          headers: {
            "x-auth-token": token,
          },
        });

        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      check();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return "";

  if (!token || !isValid) {
    return <Navigate replace to="/login" state={{ address }} />;
  }

  return cloneElement(children, { token });
}

export default Protect;
