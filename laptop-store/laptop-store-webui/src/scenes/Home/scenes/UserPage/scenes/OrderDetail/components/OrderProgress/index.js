import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import styles from "./styles.module.scss";
import { FaSync, FaCheck, FaBox, FaTruck, FaUserCheck } from "react-icons/fa";

const OrderProgress = (props) => {
    if (props.status === "CANCELED") return null;

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

    const getPercentFromStatus = (s) =>
        ["PENDING", "RECEIVED", "PACKAGED", "DELIVERING", "DELIVERED", "CANCELED"].indexOf(s) * 25;

    return (
        <div className={styles.progress}>
            <ProgressBar percent={getPercentFromStatus(props.status)} height={5} hasStepZero>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaSync size="18" color="white" />}
                            title="Chờ xử lí"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaCheck size="18" color="white" />}
                            title="Tiếp nhận"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaBox size="18" color="white" />}
                            title="Đóng gói"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaTruck size="18" color="white" />}
                            title="Vận chuyển"
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({ accomplished }) => (
                        <OrderStep
                            accomplished={accomplished}
                            component={<FaUserCheck size="18" color="white" />}
                            title="Đã giao "
                        />
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
};

export default OrderProgress;
