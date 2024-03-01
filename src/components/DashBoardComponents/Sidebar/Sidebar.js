import React, { useState } from 'react'
import styles from "./Sidebar.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaDiceD6 } from "react-icons/fa";

const Sidebar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate()
  console.log(auth?.data?._id);

  const logoutHandler = async () => {
    // console.log("insile logout handler");
    try {
      const response = await axios.post("api/v1/users/logout")
      // console.log("from logout hadnler", response);
      localStorage.removeItem("@auth");
      navigate("/")
      toast.success("Logged out successfully.")
    } catch (error) {
      const err = error.response.data.message
      toast.error(`${err}`)
    }
  }
  return (
    <div className={styles.outerSidebar}>
      <div className={styles.innderSidebar}>
        <NavLink to={"/#"}>
          <h3
            className={styles.proClass}>
            <div><FaDiceD6 className={styles.text} /></div>
            Pro Manage</h3>
        </NavLink>
        <NavLink to={"/dashboard"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/dashboard" && "#EEF2F5",
              color: window.location.pathname === "/dashboard" && "black", fontWeight: window.location.pathname === "/dashboard" && "500"
            }}
          >
            <div><MdOutlineSpaceDashboard className={styles.text} /></div>
            Board</h3>
        </NavLink>
        <NavLink to={"/analytics"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/analytics" && "#EEF2F5",
              color: window.location.pathname === "/analytics" && "black", fontWeight: window.location.pathname === "/analytics" && "500"
            }}
          >
            <div><MdOutlineAnalytics className={styles.text} /></div>
            Analytics</h3>
        </NavLink>
        <NavLink to={"/settings"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/settings" && "#EEF2F5",
              color: window.location.pathname === "/settings" && "black", fontWeight: window.location.pathname === "/settings" && "500"
            }}
          >
            <div>
              <IoSettingsOutline className={styles.text} />
            </div>
            Settings</h3>
        </NavLink>
      </div>
      <div>
        <button
          onClick={async () => await logoutHandler()}
          className={styles.logout}>
          <div><RiLogoutBoxRLine className={styles.text} /></div>
          Logout</button>
      </div>
    </div>
  )
}

export default Sidebar