import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from 'react';
import styles from "./SettingsPage.module.css"
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const SettingPage = () => {
  const { auth } = useAuth()
  const [isOldView, setIsOldView] = useState(false)
  const [isNewView, setIsNewView] = useState(false)
  const [changedDetails, setChangedDetails] = useState({
    name: "",
    oldPassWord: "",
    newPassword: ""
  })

  const changepasswordHandler = async () => {
    const obj = {
      fullName: changedDetails.name,
      oldPassword: changedDetails.oldPassWord,
      newPassword: changedDetails.newPassword,
      user: auth.data
    }
    try {
      const response = await axios.post('/api/v1/users/change-password', obj);
      // console.log(response);
      toast.success("Details update successfully")
      setChangedDetails((prev) => ({ ...prev, name: "" }))
      setChangedDetails((prev) => ({ ...prev, oldPassWord: "" }))
      setChangedDetails((prev) => ({ ...prev, newPassword: "" }))

    } catch (error) {
      const err = error.response.data.message
      toast.error(`${err}`)
      // console.error(error.response,"dfdsg");
    }
  }

  return (
    <div >
      <div className={styles.title}>SETTINGS</div>
      <div className={`${styles.outerContainer}`}>
        <div className='input-conainer w-[100%]'>
          <div><FaRegUser className='icon' /></div>
          <input value={changedDetails.name} onChange={(e) => setChangedDetails((prev) => ({ ...prev, name: e.target.value }))}
            type="text"
            placeholder='Name'
            className="input" />
        </div>
        <div className='input-conainer'>
          <div><MdLockOpen className='icon' /></div>
          <input type={isOldView ? "text" : "password"} className="input" placeholder=' Old Password' value={changedDetails.oldPassWord} onChange={(e) => setChangedDetails((prev) => ({ ...prev, oldPassWord: e.target.value }))} />
          <div onClick={() => setIsOldView((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
        </div>
        <div className='input-conainer'>
          <div><MdLockOpen className='icon' /></div>
          <input type={isNewView ? "text" : "password"} className="input" placeholder='New Password' value={changedDetails.newPassword} onChange={(e) => setChangedDetails((prev) => ({ ...prev, newPassword: e.target.value }))} />
          <div onClick={() => setIsNewView((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
        </div>
        <button onClick={async () => await changepasswordHandler()} className="subit-btn">
          Update
        </button>
      </div>

    </div>
  )
}

export default SettingPage