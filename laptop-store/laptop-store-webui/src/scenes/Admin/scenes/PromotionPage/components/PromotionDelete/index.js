import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";

const PromotionDelete = ({ promotion }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const submit = async () => {
        const response = await fetch(`/api/promotions/${promotion["id"]}`, {
            method: "DELETE",
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <Fragment>
            <Button color="danger" onClick={toggle}>
                <FaTrash />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaTrash />
                    &nbsp;&nbsp;Xóa khuyến mãi
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa khuyến mãi{" "}
                    <b>
                        {promotion["id"]} - {promotion["name"]}?
                    </b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={submit}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default PromotionDelete;
