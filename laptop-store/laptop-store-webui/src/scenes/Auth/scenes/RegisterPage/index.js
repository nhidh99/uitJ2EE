import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaLock, FaUser, FaMailBulk, FaPhone, FaTransgender, FaBirthdayCake } from "react-icons/fa";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import authApi from "../../../../services/api/authApi";

const RegisterPage = () => {
    const [errors, setErrors] = useState([]);

    const buildRegisterBody = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm").value;
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const gender = document.getElementById("gender").value;
        const birthday = document.getElementById("birthday").value;

        return {
            username: username.trim().replace(/ +g/, " "),
            password: password,
            confirm: confirm,
            email: email.trim(),
            name: name.trim().replace(/ +g/, " "),
            gender: gender,
            phone: phone,
            birthday: new Date(birthday).getTime(),
        };
    };

    const validateRegister = (register) => {
        const errors = [];
        const validate = (message, condition) => (condition() ? null : errors.push(message));
        validate("Tài khoản từ 6 - 20 kí tự gồm chữ hoặc số", () =>
            register["username"].match(/^[a-zA-Z0-9]{6,20}$/)
        );
        validate("Mật khẩu từ 6 - 20 kí tự", () => register["password"].match(/^.{6,20}$/));
        validate(
            "Mật khẩu nhập lại phải trùng khớp",
            () => register["password"] === register["confirm"]
        );
        validate("Email phải là địa chỉ hợp lệ", () => register["email"].match(/\S+@\S+\.\S+/));
        validate("Số điện thoại từ 6 - 12 chữ số", () => register["phone"].match(/^\d{6,12}$/));
        validate("Họ tên không được để trống", () => register["name"].length > 0);
        validate("Ngày sinh không được để trống", () => !isNaN(register["birthday"]));
        return errors;
    };

    const register = async () => {
        const data = buildRegisterBody();
        const errors = validateRegister(data);

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        try {
            await authApi.register(data);
            window.location.href = "/auth/login";
        } catch (err) {
            setErrors(["Lỗi hệ thống"]);
        }
    };

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
                    id="name"
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
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={styles.borderInputRight}
                />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className={styles.borderInputLeft}>
                        <FaPhone />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    id="phone"
                    type="text"
                    placeholder="Điện thoại"
                    className={styles.borderInputRight}
                />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className={styles.borderInputLeft}>
                        <FaTransgender />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    id="gender"
                    type="select"
                    placeholder="Giới tính"
                    className={styles.borderInputRight}
                >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className={styles.borderInputLeft}>
                        <FaBirthdayCake />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="date"
                    id="birthday"
                    onKeyDown={(e) => {
                        if (e.keyCode !== 9) {
                            e.preventDefault();
                        }
                    }}
                    placeholder="Ngày sinh"
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
                    id="username"
                    placeholder="Tài khoản"
                    maxLength={20}
                    minLength={6}
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
                    maxLength={20}
                    minLength={6}
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
                    id="confirm"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    maxLength={20}
                    minLength={6}
                    className={styles.borderInputRight}
                />
            </InputGroup>
            <Button color="secondary" className={styles.button} onClick={register}>
                Đăng ký
            </Button>
            <p>
                Đã có tài khoản?&nbsp;
                <Link to="/auth/login">Đăng nhập</Link>
            </p>
            {errors.length > 0 ? (
                <p>
                    {errors.map((error) => (
                        <label className={styles.error}>{error}.</label>
                    ))}
                </p>
            ) : null}
        </div>
    );
};

export default RegisterPage;
