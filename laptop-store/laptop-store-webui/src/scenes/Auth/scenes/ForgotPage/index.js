import React, { Component } from "react";
import styles from "./styles.module.scss";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaMailBulk } from "react-icons/fa";
import { Link } from "react-router-dom";

class ForgotPage extends Component {
    render() {
        return (
            <div className={styles.form}>
                <header>QUÊN MẬT KHẨU</header>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaMailBulk />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        autoFocus
                        type="email"
                        placeholder="Email"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <Button color="secondary" className={styles.button}>
                    Xác nhận
                </Button>

                <p>
                    Đã có tài khoản?&nbsp;
                    <Link to="/auth/login">Đăng nhập</Link>
                </p>
            </div>
        );
    }
}

export default ForgotPage;
