import React, { Component } from "react";
import styles from "./styles.module.scss";
import { FaLock, FaUser, FaMailBulk, FaPhone } from "react-icons/fa";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
    render() {
        return (
            <div className={styles.form}>
                <header>ĐĂNG KÝ</header>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaUser />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        autoFocus
                        type="text"
                        placeholder="Họ tên"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaMailBulk />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" placeholder="Email" className={styles.borderInputRight} />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaPhone />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        placeholder="Điện thoại"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaUser />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
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

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaLock />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <Button color="secondary" className={styles.button}>
                    Đăng ký
                </Button>

                <p>
                    Đã có tài khoản?&nbsp;
                    <Link to="/auth/login">Đăng nhập</Link>
                </p>
            </div>
        );
    }
}

export default RegisterPage;
