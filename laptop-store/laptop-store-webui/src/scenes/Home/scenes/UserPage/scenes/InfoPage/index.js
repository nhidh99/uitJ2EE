/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";

const InfoPage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const date = document.getElementById("birthday");
            const birthday = user["birthday"];
            date.valueAsDate = new Date(
                birthday["year"],
                birthday["monthValue"] - 1,
                birthday["dayOfMonth"],
                -new Date().getTimezoneOffset() / 60
            );
        }
    }, [loading]);

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUser();
            const user = response.data;
            setUser(user);
            setLoading(false);
        } catch (err) {
            console.log("fail");
            return null;
        }
    };

    const validateInputs = () => {
        const errors = getInputErrors();
        setErrors(errors);
        return errors.length === 0;
    };

    const getInputErrors = () => {
        const errors = [];
        const inputs = {
            fullName: document.getElementById("fullName"),
            telephone: document.getElementById("telephone"),
            email: document.getElementById("email"),
        };

        const validate = (message, condition) => {
            try {
                if (!condition()) {
                    errors.push(message);
                }
            } catch (err) {
                errors.push(message);
            }
        };

        validate(
            "Họ tên phải từ 6 - 45 kí tự",
            () => inputs["fullName"].value.length >= 6 && inputs["fullName"].value.length <= 45
        );

        validate(
            "Số điện thoại phải để trống hoặc là một dãy số",
            () => inputs["telephone"].value.length === 0 || !isNaN(inputs["telephone"].value)
        );

        validate("Email không hợp lệ (Email phải được để trống hoặc phải có dạng abc@xyz)", () => {
            return (
                inputs["email"].value.length === 0 ||
                inputs["email"].value.trim().match(/\S+@\S+\.\S+/)
            );
        });

        return errors;
    };

    const submit = () => {
        if (validateInputs()) {
            updateUser();
        }
    };

    const updateUser = async () => {
        try {
            const data = {
                name: document.getElementById("fullName").value,
                phone: document.getElementById("telephone").value,
                email: document.getElementById("email").value,
                gender: document.getElementById("gender").value,
                birthday: new Date(document.getElementById("birthday").value).getTime(),
            };
            await userApi.putCurrentUser(data);
            alert("Đã lưu thông tin mới thành công");
        } catch (err) {
            console.log("fail");
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaInfoCircle />
                    &nbsp;&nbsp;THÔNG TIN
                </label>

                <div className={styles.buttons}>
                    <Button
                        type="submit"
                        className={styles.submit}
                        color="success"
                        onClick={submit}
                        disabled={loading}
                    >
                        Lưu
                    </Button>
                </div>
            </div>

            <div>
                {errors.length !== 0
                    ? errors.map((err) => <label className={styles.err}>- {err}</label>)
                    : null}
            </div>

            {loading ? (
                <EmptyBlock
                    loading={loading}
                    backToHome={!loading}
                    icon={<FaUserCircle />}
                    loadingText="Đang tải thông tin"
                />
            ) : (
                <table className={styles.table}>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label className={styles.label} for="fullName">
                                Họ và tên:
                            </Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Nhập họ và tên"
                                defaultValue={user?.["name"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="telephone">
                                Điện thoại:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder="Nhập số điện thoại"
                                defaultValue={user?.["phone"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="email">
                                Email:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Nhập email"
                                defaultValue={user?.["email"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label}>Giới tính:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                id="gender"
                                defaultValue={user?.["gender"]}
                                className={styles.input}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="birthday">
                                Ngày sinh:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="date"
                                name="birthday"
                                id="birthday"
                                placeholder="Nhập ngày sinh"
                                className={styles.input}
                            />
                        </td>
                    </tr>
                </table>
            )}
        </Fragment>
    );
};

export default InfoPage;
