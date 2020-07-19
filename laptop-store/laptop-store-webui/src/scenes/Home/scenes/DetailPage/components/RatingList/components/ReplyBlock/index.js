import React, { Fragment } from "react";
import { Table, Label, Button, UncontrolledCollapse } from "reactstrap";
import { FaPaperPlane } from "react-icons/fa";
import styles from "./styles.module.scss";
import ratingApi from "../../../../../../../../services/api/ratingApi";
import store from "../../../../../../../../services/redux/store";
import { buildErrorModal } from "../../../../../../../../services/redux/actions";

const ReplyBlock = ({ ratingId, replies }) => {
    const postReply = async () => {
        try {
            const reply = document.getElementById(`reply-${ratingId}`).value.trim();
            await ratingApi.postReply(ratingId, reply);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <UncontrolledCollapse toggler={"#toggler-" + ratingId}>
                <textarea
                    className={styles.replyInput}
                    id={"reply-" + ratingId}
                    rows="5"
                    maxLength="500"
                    placeholder="Gửi trả lời của bạn (tối đa 500 từ)"
                ></textarea>
                <br />
                <Button className={styles.submitButton} color="primary" onClick={postReply}>
                    <FaPaperPlane />
                    &nbsp; Gửi trả lời
                </Button>
                <br />
                <br />
            </UncontrolledCollapse>

            <Table hover borderless striped className={styles.replyTable}>
                <tbody>
                    {replies.map((reply) => {
                        const replyDate = reply
                            ? new Date(
                                  reply["reply_date"]["year"],
                                  reply["reply_date"]["monthValue"] - 1,
                                  reply["reply_date"]["dayOfMonth"]
                              )
                            : null;
                        return (
                            <tr>
                                <td>
                                    <Label className={styles.replyAuthor}>
                                        {reply["user"]["name"]}
                                    </Label>
                                    <Label className={styles.replyDate}>
                                        {replyDate.toLocaleDateString()}
                                    </Label>
                                    <p className={styles.reply}>{reply["reply"]}</p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default ReplyBlock;
