import React, { Component, Fragment } from "react";

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
        const { loading, promotions, checkedValues } = this.state;
        return loading ? null : (
            <Fragment>
                {promotions.map((promotion) => (
                    <Fragment>
                        <input type="checkbox" name="promotions" value={promotion["id"]} />
                        <span>
                            &nbsp;{promotion["id"]} - {promotion["name"]}
                        </span>
                        <br />
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

export default PromotionCheckboxes;
