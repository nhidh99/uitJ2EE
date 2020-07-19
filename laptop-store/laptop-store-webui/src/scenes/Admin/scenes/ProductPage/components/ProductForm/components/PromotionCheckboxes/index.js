import React, { Fragment } from "react";
import styles from "./styles.module.scss";

const PromotionCheckboxes = ({ promotions, productPromotions }) => {
    const selectPromotion = (id) => {
        const input = document.getElementById("promotion-" + id);
        input.checked = !input.checked;
    };

    return (
        <div className={styles.checkboxes}>
            {promotions.map((promotion) => (
                <Fragment>
                    <input
                        id={`promotion-${promotion["id"]}`}
                        type="checkbox"
                        name="promotionIds"
                        value={promotion["id"]}
                        defaultChecked={productPromotions
                            .map((checked) => checked["id"])
                            .includes(promotion["id"])}
                    />
                    <label onClick={() => selectPromotion(promotion["id"])}>
                        &nbsp;{promotion["id"]} - {promotion["name"]}
                    </label>
                    <br />
                </Fragment>
            ))}
        </div>
    );
};

export default PromotionCheckboxes;
