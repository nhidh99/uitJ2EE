import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createCookie } from "../../../../services/helper/cookie";
import authApi from "../../../../services/api/authApi";

const LoginPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setError(null);
        setLoading(true);

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await authApi.login(username, password);
            const token = response.data;
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } catch (err) {
            let error = null;
            switch (err.response.status) {
                case 401:
                    error = "Tài khoản hoặc mật khẩu không chính xác";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            setError(error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.loginForm}>
                <header>ĐĂNG NHẬP</header>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaUser />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Tài khoản"
                        className={styles.borderInputRight}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaLock />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <Button
                    color="secondary"
                    className={styles.button}
                    onClick={login}
                    disabled={loading}
                >
                    Đăng nhập
                </Button>

                <p>
                    Chưa có tài khoản?&nbsp;
                    <Link to="/auth/register">Đăng kí ngay</Link>
                    &nbsp;|&nbsp;
                    <Link to="/auth/forgot">Quên mật khẩu</Link>
                </p>

                {error ? <p className={styles.error}>{error}</p> : null}
            </div>
        </div>
    );
};

export default LoginPage;
