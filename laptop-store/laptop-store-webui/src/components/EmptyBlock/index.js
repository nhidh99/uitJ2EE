import React from "react";
import styles from "./styles.module.scss";
import { Button, Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-advanced";

const EmptyBlock = (props) => {
    const { icon, loading, loadingText, emptyText, backToHome, borderless } = props;

    const backToHomePage = () => {
        window.scroll(0, 0);
        props.history.push("/");
    };

    return (
        <Loader show={loading} message={<Spinner />} className={styles.loader}>
            <div className={`${styles.block} ${borderless ? styles.borderless : ""}`}>
                <span className={styles.icon}>{icon}</span>
                <br />

                <label className={styles.title}>{loading ? loadingText : emptyText}</label>

                {backToHome ? (
                    <Button
                        className={styles.btn}
                        size="lg"
                        color="warning"
                        onClick={backToHomePage}
                    >
                        Quay lại trang mua sắm
                    </Button>
                ) : null}
            </div>
        </Loader>
    );
};

export default withRouter(EmptyBlock);
