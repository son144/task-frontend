
import React from 'react'
import styles from "./Login.module.css"
import { useState } from 'react'
import axios from 'axios'
import teddyImg from "../../images/Art.svg"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdLockOpen } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate();
    const [isView, setIsView] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const loginHandler = async () => {
        const obj = {
            email: loginData.email,
            password: loginData.password
        }
        try {
            // console.log("inside try");
            const response = await axios.post('/api/v1/users/login', obj);
            const userId=response?.data?.data?.user?._id
            console.log(response?.data?.data?.user?._id, "res");
            navigate("/dashboard")
            localStorage.setItem("@auth", userId);
            toast.success("Logged in successfully.")
            // }
        } catch (error) {
            // console.error(error.response.data.message, "error");
            const err = error.response.data.message
            toast.error(`${err}`)
        }
        // console.log("obj", obj);

    }
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftContainer}>
                <img src={teddyImg} alt='' />
            </div>
            <div className={styles.innerContainer}>
                <div className={styles.mainContainer}>
                    <div>
                        <div className='outer-form-conatiner '>
                            <h1 className={styles.textRegister}>Login</h1>
                            <div className={styles.formConatiner}>

                                <div className={styles.inputConainer}>
                                    <div><MdOutlineMailOutline className={styles.icon} /></div>
                                    <input type="text" placeholder='Email' className={styles.input} value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className={styles.inputConainer}>
                                    <div><MdLockOpen className={styles.icon} /></div>
                                    <input type={isView ? "text" : "password"} className={styles.input} placeholder=' Password' value={loginData.password} onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                                    <div onClick={() => setIsView((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
                                </div>
                            </div>
                            <div className={styles.signbtnContainer}>
                                <button onClick={() => loginHandler()}
                                    className={styles.subitBtn}>
                                    Log In
                                </button>
                                <p className={styles.haveAnAccount}>
                                    Have an account ?
                                </p>
                                <button onClick={() => navigate("/register")} className={styles.goToLogin}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login