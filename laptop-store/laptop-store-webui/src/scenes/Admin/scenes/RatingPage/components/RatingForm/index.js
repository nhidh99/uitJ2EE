import React, { Fragment, useState } from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import ratingApi from "../../../../../../services/api/ratingApi";
import store from "../../../../../../services/redux/store";
import { buildErrorModal } from "../../../../../../services/redux/actions";
const RatingForm = ({ rating, toggle }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit = () => {
        setIsSubmitted(true);
        rating["approve_status"] ? postDeny() : postApprove();
    };

    const postApprove = async () => {
        try {
            await ratingApi.postApprove(rating["id"]);
            window.location.reload();
        } catch (err) {
            setIsSubmitted(false);
            store.dispatch(buildErrorModal());
        }
    };

    const postDeny = async () => {
        try {
            await ratingApi.postDeny(rating["id"]);
            window.location.reload();
        } catch (err) {
            setIsSubmitted(false);
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <table borderless className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Tên sản phẩm:</td>
                        <td>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Tên sản phẩm"
                                maxLength={80}
                                defaultValue={rating?.laptop.name ?? null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Đánh giá:</td>
                        <td>
                            <Input
                                type="text"
                                className={"form-control"}
                                id="rating"
                                disabled
                                defaultValue={rating?.rating ?? null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Tiêu đề:</td>
                        <td>
                            <Input
                                type="text"
                                className={"form-control"}
                                id="title"
                                disabled
                                defaultValue={rating?.comment_title ?? null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.imageLabel}>Nội dung:</td>
                        <td>
                            <Input
                                type="textarea"
                                rows="5"
                                className={"form-control"}
                                id="title"
                                disabled
                                defaultValue={rating?.comment_detail ?? null}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={styles.buttons}>
                <Button
                    color={rating?.approve_status ? "danger" : "success"}
                    onClick={submit}
                    className={styles.button}
                    disabled={isSubmitted}
                >
                    {rating?.approve_status ? "Bỏ duyệt" : "Duyệt"}
                </Button>

                <Button color="secondary" onClick={toggle} className={styles.button}>
                    Đóng
                </Button>
            </div>
        </Fragment>
    );
};

export default RatingForm;
