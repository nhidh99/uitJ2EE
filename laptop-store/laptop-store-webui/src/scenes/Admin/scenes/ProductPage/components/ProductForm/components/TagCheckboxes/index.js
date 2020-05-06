import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";

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

    loadProductTags = async () => {
        const { product } = this.props;
        if (!product) {
            return;
        }
        const response = await fetch(`/api/laptops/${product["id"]}/tags`);
        if (response.ok) {
            const tags = await response.json();
            this.setState({ checked: tags });
        }
    };

    render() {
        const { loading, tags, checked } = this.state;
        return loading ? null : (
            <div className={styles.checkboxes}>
                {tags.map((tag) => (
                    <Fragment>
                        <input
                            id={`tag-${tag["id"]}`}
                            type="checkbox"
                            name="tags"
                            value={tag["id"]}
                            defaultChecked={checked.map((c) => c["id"]).includes(tag["id"])}
                        />
                        <label onClick={() => checkTag(tag["id"])}>&nbsp;{tag["name"]}</label>
                        <br />
                    </Fragment>
                ))}
            </div>
        );
    }
}

const checkTag = (id) => {
    const input = document.getElementById("tag-" + id);
    input.checked = !input.checked;
};

export default TagCheckboxes;
