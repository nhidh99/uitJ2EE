import React, { Fragment, useState } from "react";
import { FaStar, FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import RatingForm from "../RatingForm";

const RatingDetail = ({ rating }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = (
        <button
            className="close"
            style={{
                position: "absolute",
                right: "15px",
                fontSize: "65px",
                color: "white",
            }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    return (
        <Fragment>
            <Button className={styles.button} color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} external={externalCloseBtn} className={styles.modal}>
                <ModalHeader>
                    <FaStar />
                    &nbsp;&nbsp;Chi tiết đánh giá (Mã đánh giá: {rating["id"]})
                </ModalHeader>

                <ModalBody>
                    <RatingForm rating={rating} toggle={toggle} />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default RatingDetail;
