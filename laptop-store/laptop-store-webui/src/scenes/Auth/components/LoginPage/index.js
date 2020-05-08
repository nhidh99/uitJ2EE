import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createCookie } from "../../../../services/helper/cookie";

class LoginPage extends Component {
    state = {
        error: null,
        submitted: false,
    };

    login = async () => {
        this.setState({ error: null, submitted: true });
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const token = await response.text();
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } else {
            let error = null;
            switch (response.status) {
                case 401:
                    error = "Tài khoản hoặc mật khẩu không chính xác";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            this.setState({ error: error, submitted: false });
        }
    };

    render() {
        const { error, submitted } = this.state;

        return (
            <div className={styles.form}>
                <header>ĐĂNG NHẬP</header>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaUser />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        autoFocus
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
                    onClick={this.login}
                    disabled={submitted}
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
        );
    }
}

export default LoginPage;
