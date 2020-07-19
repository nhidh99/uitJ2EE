import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "reactstrap";
import store from "../../../../../../../../services/redux/store";
import { buildModal } from "../../../../../../../../services/redux/actions";
import addressApi from "../../../../../../../../services/api/addressApi";

const AddressDelete = ({ address }) => {
    const submit = async () => {
        await addressApi.deleteAddress(address["id"]);
        window.location.reload();
    };

    const confirmDelete = () => {
        const modal = {
            title: "Xóa địa chỉ",
            message: `Xác nhận xóa địa chỉ ${[
                address["address_num"],
                address["street"],
                address["ward"],
                address["district"],
                address["city"],
            ].join(", ")} ?`,
            confirm: () => submit,
        };
        store.dispatch(buildModal(modal));
    };

    return (
        <Button color="danger" onClick={confirmDelete}>
            <FaTrash />
        </Button>
    );
};

export default AddressDelete;
