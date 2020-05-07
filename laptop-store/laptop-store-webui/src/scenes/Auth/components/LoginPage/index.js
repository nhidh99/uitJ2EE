import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

class LoginPage extends Component {
    state = {
        error: null,
    };

    login = async () => {
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
            alert(token);
        }
    };

    render() {
        const { error } = this.state;

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

                <Button color="secondary" className={styles.button} onClick={this.login}>
                    Đăng nhập
                </Button>

                <p>
                    Chưa có tài khoản?&nbsp;
                    <Link to="/auth/register">Đăng kí ngay</Link>
                    &nbsp;|&nbsp;
                    <Link to="/auth/forgot">Quên mật khẩu</Link>
                </p>

                {error ? (
                    <p className={styles.error}>
                        <b>{error}</b>
                    </p>
                ) : null}
            </div>
        );
    }
}

export default LoginPage;
