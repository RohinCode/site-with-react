import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    return () => {
      localStorage.removeItem("rohinToken");
      window.location = "/";
    };
  });

  return null;
}

export default Logout;
