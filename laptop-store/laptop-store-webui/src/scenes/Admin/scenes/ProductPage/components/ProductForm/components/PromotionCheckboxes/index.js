import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";

class PromotionCheckboxes extends Component {
    state = {
        loading: true,
        promotions: [],
        checked: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await Promise.all([this.loadPromotions(), this.loadProductPromotions()]);
        this.setState({ loading: false });
    };

    loadPromotions = async () => {
        const response = await fetch("/api/promotions", {
            method: "GET",
        });
        if (response.ok) {
            const promotions = await response.json();
            this.setState({ promotions: promotions });
        }
    };

    loadProductPromotions = async () => {};

    render() {
        const { loading, promotions, checked } = this.state;
        return loading ? null : (
            <div className={styles.checkboxes}>
                {promotions.map((promotion) => (
                    <Fragment>
                        <input
                            type="checkbox"
                            name="promotions"
                            value={promotion["id"]}
                        />
                        <label>
                            &nbsp;{promotion["id"]} - {promotion["name"]}
                        </label>
                        <br />
                    </Fragment>
                ))}
            </div>
        );
    }
}

export default PromotionCheckboxes;
