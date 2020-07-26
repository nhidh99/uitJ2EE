import React, { Fragment } from "react";
import { Button } from "reactstrap";
import styles from "./styles.module.scss";
import store from "../../../../../../../../services/redux/store";
import { buildErrorModal, buildModal } from "../../../../../../../../services/redux/actions";
import orderApi from "../../../../../../../../services/api/orderApi";

const OrderCancel = ({ orderId }) => {
    const confirmCancel = () => {
        const modal = {
            title: `Hủy đơn hàng #${orderId}`,
            message: (
                <Fragment>
                    Xác nhận hủy đơn hàng <b>#{orderId}</b> ?
                </Fragment>
            ),
            confirm: () => cancelOrder,
        };
        store.dispatch(buildModal(modal));
    };

    const cancelOrder = async () => {
        const button = document.getElementById("order-btn");
        try {
            button.disabled = true;
            await orderApi.cancelOrder(orderId);
            window.location.reload();
        } catch (err) {
            button.disabled = false;
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <Button
                id="order-btn"
                type="submit"
                className={styles.btn}
                color="danger"
                onClick={confirmCancel}
            >
                Hủy đơn hàng
            </Button>
        </Fragment>
    );
};

export default OrderCancel;
