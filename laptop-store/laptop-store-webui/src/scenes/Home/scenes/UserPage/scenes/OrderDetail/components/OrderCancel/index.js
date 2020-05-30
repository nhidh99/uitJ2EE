import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import { FaTrash } from "react-icons/fa";
import { getCookie } from "../../../../../../../../services/helper/cookie";

const OrderCancel = ({ orderId }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const cancelOrder = async (e) => {
        e.target.disabled = true;
        const response = await fetch(`/api/orders/${orderId}/cancel`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <Fragment>
            <Button type="submit" className={styles.btn} color="danger" onClick={toggle}>
                Hủy đơn hàng
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader>
                    <FaTrash />
                    &nbsp;&nbsp;Hủy đơn hàng
                </ModalHeader>
                <ModalBody>
                    Xác nhận hủy đơn hàng <b>#{orderId}?</b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={cancelOrder}>
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

export default OrderCancel;
