import React, { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "reactstrap";
import store from "../../../../../../services/redux/store";
import { buildModal } from "../../../../../../services/redux/actions";
import promotionApi from "../../../../../../services/api/promotionApi";

const PromotionDelete = ({ promotion }) => {
    const submit = async () => {
        await promotionApi.deleteById(promotion["id"]);
        window.location.reload();
    };

    const confirm = () => {
        const modal = {
            title: `Xoá khuyến mãi #${promotion["id"]}`,
            message: (
                <Fragment>
                    Xác nhận xóa khuyến mãi <b>{`${promotion["id"]} - ${promotion["name"]}?`}</b>
                </Fragment>
            ),
            confirm: () => submit,
        };
        store.dispatch(buildModal(modal));
    };

    return (
        <Button color="danger" onClick={confirm}>
            <FaTrash />
        </Button>
    );
};

export default PromotionDelete;
