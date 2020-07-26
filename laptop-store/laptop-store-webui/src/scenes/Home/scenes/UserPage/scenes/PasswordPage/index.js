import React, { Fragment, useState } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaLock } from "react-icons/fa";
import userApi from "../../../../../../services/api/userApi";
import store from "../../../../../../services/redux/store";
import { buildModal } from "../../../../../../services/redux/actions";

const PasswordPage = () => {
    const [errors, setErrors] = useState([]);

    const buildRequestBody = () => {
        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        return {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        };
    };

    const validateInputs = (inputs) => {
        const errors = [];
        const validate = (message, condition) => (condition() ? null : errors.push(message));
        validate("Mật khẩu cũ không được để trống", () => inputs["oldPassword"].length > 0);
        validate("Mật khẩu mới phải từ 6 - 35 kí tự", () =>
            inputs["newPassword"].match(/^.{6,35}$/)
        );
        validate("Mật khẩu xác nhận phải từ 6 - 35 kí tự", () =>
            inputs["confirmPassword"].match(/^.{6,35}$/)
        );
        return errors;
    };

    const updatePassword = async () => {
        setErrors([]);
        const body = buildRequestBody();
        const errors = validateInputs(body);

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        if (body["confirmPassword"] !== body["newPassword"]) {
            alert("Vui lòng xác nhận lại mật khẩu");
            return;
        }

        try {
            await userApi.putCurrentUserPassword(body);
            document
                .querySelectorAll("input[type='password']")
                .forEach((input) => (input.value = ""));
            const modal = {
                title: "Cập nhật thành công",
                message: "Đã cập nhật mật khẩu mới thành công",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        } catch (err) {
            const modal = {
                title: "Xảy ra lỗi",
                message: "Đã xảy ra lỗi, bạn vui lòng thử lại sau",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaLock />
                    &nbsp;&nbsp;ĐỔI MẬT KHẨU
                </label>
                <Button
                    type="submit"
                    className={styles.submit}
                    color="primary"
                    onClick={updatePassword}
                >
                    Đổi mật khẩu
                </Button>
            </div>
            {errors.length > 0 ? (
                <p>
                    {errors.map((error) => (
                        <label className={styles.error}>{error}.</label>
                    ))}
                </p>
            ) : null}
            <table className={styles.table}>
                <tr>
                    <td className={styles.labelCol}>
                        <Label className={styles.label} for="oldPassword">
                            Nhập mật khẩu:
                        </Label>
                    </td>
                    <td className={styles.inputCol}>
                        <Input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Mật khẩu hiện tại"
                            className={styles.input}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <Label className={styles.label} for="newPassword">
                            Mật khẩu mới:
                        </Label>
                    </td>
                    <td>
                        <Input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Mật khẩu mới"
                            className={styles.input}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <Label className={styles.label} for="confirmPassword">
                            Xác nhận MK:
                        </Label>
                    </td>
                    <td>
                        <Input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu mới"
                            className={styles.input}
                        />
                    </td>
                </tr>
            </table>
        </Fragment>
    );
};

export default PasswordPage;
