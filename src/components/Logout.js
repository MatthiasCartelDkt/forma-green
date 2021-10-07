import { Menu, MenuItem } from "react-pro-sidebar";
import React, {useState} from "react";
import { FaRegSun } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Logout() {
const [_error, setError] = useState("")
  const { logout } = useAuth();
  const { history } = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
        setError(`Failed to login : ${_error}`)
    }
  }

  return (
    <Menu iconShape="square">
      <MenuItem icon={<FaRegSun />} onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );
}
