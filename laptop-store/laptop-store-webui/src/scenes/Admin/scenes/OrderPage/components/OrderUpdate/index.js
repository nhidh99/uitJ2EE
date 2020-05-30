import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import OrderForm from "../OrderForm";

const OrderUpdate = (props) => {
    const [modal, setModal] = useState(false);
    const { row, orderId } = props;

    const externalCloseBtn = (
        <button
            className="close"
            style={{
                position: "absolute",
                right: "15px",
                fontSize: "65px",
                color: "white",
            }}
            onClick={() => setModal(false)}
        >
            &times;
        </button>
    );

    return (
        <tr onClick={() => setModal(true)} className={styles.row}>
            {row}
            <Modal isOpen={modal} className={styles.modal} external={externalCloseBtn}>
                <ModalHeader>
                    <FaPen />
                    &nbsp;&nbsp;Cập nhật đơn hàng (Mã đơn hàng: {orderId})
                </ModalHeader>

                <ModalBody>
                    <OrderForm orderId={orderId} />
                </ModalBody>
            </Modal>
        </tr>
    );
};

export default OrderUpdate;
