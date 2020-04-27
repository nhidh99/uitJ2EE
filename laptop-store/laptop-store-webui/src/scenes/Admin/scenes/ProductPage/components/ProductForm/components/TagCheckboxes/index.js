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
        const response = await fetch("/api/tags", {
            method: "GET",
        });
        if (response.ok) {
            const tags = await response.json();
            this.setState({ tags: tags });
        }
    };

    loadProductTags = async () => {};

    render() {
        const { loading, tags, checked } = this.state;
        return loading ? null : (
            <Fragment>
                {tags.map((tag) => (
                    <Fragment>
                        <input type="checkbox" name="tags" value={tag["id"]} />
                        <span>&nbsp;{tag["name"]}</span>
                        <br />
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

export default TagCheckboxes;
