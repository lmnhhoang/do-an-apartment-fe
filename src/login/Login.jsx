import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLoginMutation } from '../app/services/auth.service';
import styles from "./Login.module.css";
import { notification } from 'antd';

function Login() {
    const {isAuthenticated} = useSelector((state) => state.auth)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useLoginMutation();
    const [api, contextHolder] = notification.useNotification();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({username, password})
            .unwrap()
            .then(() => {
                api.info({
                    message: "Thông báo",
                    description: "Đăng nhập thành công",
                    placement: "top",
                });
            })
            .catch(err => {
                console.log(err)
                api.info({
                    message: "Thông báo",
                    description: "Đăng nhập thất bại, sai tài khoản hoặc mật khẩu",
                    placement: "top",
                });
            })
    }

    if (isAuthenticated) {
        return <Navigate to={"/"}/>
    }
  return (
    <>
    {contextHolder}
    <div className={styles.loginPage}>
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login