import React, { Component, Fragment } from "react";

class TagCheckboxes extends Component {
    state = {
        loading: true,
        tags: [],
        checked: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await Promise.all([this.loadTags(), this.loadProductTags()]);
        this.setState({ loading: false });
    };

    loadTags = async () => {
        const response = await fetch("/api/promotions", {
            method: "GET",
        });
        if (response.ok) {
            const promotions = await response.json();
            this.setState({ promotions: promotions });
        }
    };

    loadProductTags = async () => {};

    render() {
        const { loading, promotions, checkedValues } = this.state;
        return loading ? null : (
            <Fragment>
                {promotions.map((promotion) => (
                    <Fragment>
                        <input type="checkbox" name="tags" value={promotion["id"]} />
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

export default TagCheckboxes;
