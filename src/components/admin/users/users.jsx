import { useEffect, useState } from "react";
import "../../../styles/admin/user.css";
import axios from "axios";
import GetAllUsers from "./AllUsers";
import SearchUsers from "./searchUser";
import UserMenu from "./userMenu";
function Users({ token }) {
  const [activePage, setActivePage] = useState("allUsers");

  return (
    <>
      <UserMenu activePage={activePage} setActivePage={setActivePage} />
      {activePage === "search" && <SearchUsers token={token} />}
      {activePage === "allUsers" && <GetAllUsers token={token} />}
    </>
  );
}

export default Users;
