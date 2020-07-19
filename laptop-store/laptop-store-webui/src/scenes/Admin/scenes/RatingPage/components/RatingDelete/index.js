import React, { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "reactstrap";
import ratingApi from "../../../../../../services/api/ratingApi";
import store from "../../../../../../services/redux/store";
import { buildErrorModal, buildModal } from "../../../../../../services/redux/actions";

const RatingDelete = ({ rating }) => {
    const confirmDelete = () => {
        const modal = {
            title: `Xoá đánh giá #${rating["id"]}`,
            message: (
                <Fragment>
                    Xác nhận xóa đánh giá{" "}
                    <b>
                        #{rating["id"]} - "{rating["comment_title"]}"?
                    </b>
                </Fragment>
            ),
            confirm: () => deleteRating,
        };
        store.dispatch(buildModal(modal));
    };

    const deleteRating = async () => {
        try {
            await ratingApi.deleteRating(rating["id"]);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Button color="danger" onClick={confirmDelete}>
            <FaTrash />
        </Button>
    );
};

export default RatingDelete;
