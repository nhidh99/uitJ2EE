import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import store from "../../services/redux/store";
import { toggleModal, buildErrorModal } from "../../services/redux/actions";
import styles from "./styles.module.scss";

const ConfirmModal = () => {
    const toggle = () => store.dispatch(toggleModal());

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            const modal = state["modal"];
            setTitle(modal["title"]);
            setMessage(modal["message"]);
            setConfirm(modal["confirm"]);
            setIsOpen(modal["open"]);
        });
    }, []);

    const confirmAction = async () => {
        try {
            await confirm();
            toggle();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={styles.modal}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody className={styles.body}>{message}</ModalBody>
            <ModalFooter>
                {confirm === null ? null : (
                    <Button color="primary" onClick={confirmAction}>
                        Xác nhận
                    </Button>
                )}
                <Button color="secondary" onClick={toggle}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
