import axios from "axios";
import { cloneElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../../../config";

function ProtectByNotFound({ children }) {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("rohinToken");

  useEffect(() => {
    async function check() {
      try {
        axios.defaults.headers.common["x-auth-token"] = token;
        const response = await axios.get(`${config.urlOfBackend}/api/admin`);
        console.log(response);
        if (response.status === 200) {
          setAdmin(true);
        }
      } catch (e) {
        setAdmin(false);
      }
      setLoading(false);
    }
    check();
  }, []);

  return (
    <>
      {loading ? (
        null
      ) : (
        <>
          {admin ? (
            cloneElement(children, { token })
          ) : (
            <Navigate replace to="/notFound" />
          )}
        </>
      )}
    </>
  );
}

export default ProtectByNotFound;
