import React, { Fragment } from "react";
import styles from "./styles.module.scss";

const TagCheckboxes = ({ tags, productTags }) => {
    const checkTag = (id) => {
        const input = document.getElementById("tag-" + id);
        input.checked = !input.checked;
    };

    return (
        <div className={styles.checkboxes}>
            {tags.map((tag) => (
                <Fragment>
                    <input
                        id={`tag-${tag["id"]}`}
                        type="checkbox"
                        name="tagIds"
                        value={tag["id"]}
                        defaultChecked={productTags
                            .map((checked) => checked["id"])
                            .includes(tag["id"])}
                    />
                    <label onClick={() => checkTag(tag["id"])}>&nbsp;{tag["name"]}</label>
                    <br />
                </Fragment>
            ))}
        </div>
    );
};

export default TagCheckboxes;
