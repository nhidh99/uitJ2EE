import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

class LoginPage extends Component {
    state = {
        error: null,
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
                        type="password"
                        placeholder="Mật khẩu"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <Button color="secondary" className={styles.button}>
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
