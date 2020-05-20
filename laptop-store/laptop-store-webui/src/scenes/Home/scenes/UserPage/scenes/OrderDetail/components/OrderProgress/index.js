import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "./styles.module.scss";
import { FaSync, FaCheck, FaBox, FaTruck, FaUserCheck } from "react-icons/fa";

const OrderProgress = (props) => {
    const percent = getPercentFromStatus(props.status);
    return (
        <div className={styles.progress}>
            <ProgressBar percent={percent} height={5} hasStepZero>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaSync size="18" color="white" />}
                            title="Đang xử lí"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaCheck size="18" color="white" />}
                            title="Đã tiếp nhận"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaBox size="18" color="white" />}
                            title="Đang đóng gói"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaTruck size="18" color="white" />}
                            title="Đang vận chuyển"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaUserCheck size="18" color="white" />}
                            title="Đã giao hàng "
                        />
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
};

const OrderStep = (props) => {
    const { accomplished, component, title } = props;
    return (
        <div className={styles.step}>
            <div className={`${styles.icon} ${accomplished ? styles.done : styles.pending}`}>
                {component}
            </div>
            <p className={styles.title}>{title}</p>
        </div>
    );
};

const getPercentFromStatus = (status) => {
    switch (status) {
        case "PENDING":
            return 0;
        default:
            return -1;
    }
};

export default OrderProgress;
