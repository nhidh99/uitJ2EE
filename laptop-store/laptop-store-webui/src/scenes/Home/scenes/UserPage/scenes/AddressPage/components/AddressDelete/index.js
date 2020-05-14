import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../../../services/helper/cookie";

const AddressDelete = ({ address }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const submit = async () => {
        const response = await fetch(`/api/addresses/${address["id"]}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
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
                    &nbsp;&nbsp;Xóa địa chỉ
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa địa chỉ{" "}
                    <b>
                        {[
                            address["address_num"],
                            address["street"],
                            address["ward"],
                            address["district"],
                            address["city"],
                        ].join(", ")}
                        ?
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

export default AddressDelete;
