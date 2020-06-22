import React, { Component, Fragment } from 'react';
import { Table, Label, Button, UncontrolledCollapse } from "reactstrap";
import { FaPaperPlane } from 'react-icons/fa';
import styles from './styles.module.scss';
import { getCookie } from '../../../../../../../../services/helper/cookie';
class ReplyBlock extends Component {
    buildReplyBody = () => {
        const reply = document.getElementById(`reply${this.props.rating['id']}`).value;
        return {
            reply: reply
        }
    }

    postReply = async () => {
        const url = "/api/replies?rating-id=" + this.props.rating['id']
        const body = this.buildReplyBody();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(body)
        });

        const status = parseInt(response.status);

        switch (status) {
            case 201:
                window.location.reload();
                break;
            case 403:
                this.setState({
                    error: "Not permission",
                    loading: false,
                });
                break;
            case 401:
                alert("You have to login to access this page.");
                window.location.href = "/auth/login";
                break;
            default:
                this.setState({
                    error: "Server error",
                    loading: false,
                });
        }
    };

    render() {
        const replies = this.props.replies.filter((reply) => {
            return reply['rating']['id'] === this.props.rating['id']
        });
        console.log(replies);
        return (
            <Fragment>
                <UncontrolledCollapse toggler={"#toggler" + this.props.rating['id']}>
                    <textarea
                        class={styles.replyInput}
                        id={"reply" + this.props.rating['id']}
                        rows="5"
                        maxlength="500"
                        placeholder="Gửi trả lời của bạn (tối đa 500 từ)"
                    ></textarea>
                    <br />
                    <Button
                        className={styles.submitButton}
                        color="primary"
                        onClick={this.postReply}
                    >
                        <FaPaperPlane />
                    &nbsp; Gửi trả lời
                </Button>
                    <br />
                    <br />
                </UncontrolledCollapse>

                <Table
                    hover
                    borderless
                    striped
                    className={styles.replyTable}
                >
                    <tbody>
                        {
                            replies?.map((reply) => {
                                const replyDate = reply ? new Date(
                                    reply["reply_date"]["year"],
                                    reply["reply_date"]["monthValue"] - 1,
                                    reply["reply_date"]["dayOfMonth"]
                                ) : null;
                                return (
                                    <tr>
                                        <td>
                                            <Label className={styles.replyAuthor}>
                                                {reply['user']['name']}
                                            </Label>
                                            <Label className={styles.replyDate}>
                                                {replyDate.toLocaleDateString()}
                                            </Label>
                                            <p className={styles.reply}>
                                                {reply['reply']}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default ReplyBlock;