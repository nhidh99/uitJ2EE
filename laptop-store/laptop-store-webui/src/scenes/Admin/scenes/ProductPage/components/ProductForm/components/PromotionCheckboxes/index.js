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

    loadProductPromotions = async () => {
        const { product } = this.props;
        if (!product) {
            return;
        }
        const response = await fetch(`/api/laptops/${product["id"]}/promotions`);
        if (response.ok) {
            const promotions = await response.json();
            this.setState({ checked: promotions });
        }
    };

    render() {
        const { loading, promotions, checked } = this.state;
        return loading ? null : (
            <div className={styles.checkboxes}>
                {promotions.map((promotion) => (
                    <Fragment>
                        <input
                            id={`promotion-${promotion["id"]}`}
                            type="checkbox"
                            name="promotions"
                            value={promotion["id"]}
                            defaultChecked={checked.map((c) => c["id"]).includes(promotion["id"])}
                        />
                        <label onClick={() => selectPromotion(promotion["id"])}>
                            &nbsp;{promotion["id"]} - {promotion["name"]}
                        </label>
                        <br />
                    </Fragment>
                ))}
            </div>
        );
    }
}

const selectPromotion = (id) => {
    const input = document.getElementById("promotion-" + id);
    input.checked = !input.checked;
};

export default PromotionCheckboxes;
