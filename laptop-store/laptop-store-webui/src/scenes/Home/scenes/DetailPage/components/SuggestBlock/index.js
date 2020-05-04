import React, { Component, Fragment } from "react";
import { Col, Label } from "reactstrap";
import styles from './styles.module.scss';
import { Link } from "react-router-dom";

class SuggestBlock extends Component {
    render() {
        return (
            <Fragment>
                <Col xs="3" className={styles.suggestItem}>
                    <img src={require("../../../../../../images/laptops/8cf82b1d215d342c01b9cb5c77567265.jpg")}
                        width={200} height={200} alt="suggest" className={styles.img} />
                    <Label>Laptop Asus Vivobook A512DA-EJ422T AMD R5-3500U/Win10...</Label><br />
                    <Label><b>24,590,000đ</b></Label>&nbsp;&nbsp;
                <Label>26,990,000đ</Label><br />
                    <Link>So sánh chi tiết</Link>
                </Col>

                <Col xs="3" className={styles.suggestItem}>
                    <img src={require("../../../../../../images/laptops/8cf82b1d215d342c01b9cb5c77567265.jpg")}
                        width={200} height={200} alt="suggest" className={styles.img} />
                    <Label>Laptop Asus Vivobook A512DA-EJ422T AMD R5-3500U/Win10...</Label><br />
                    <Label><b>24,590,000đ</b></Label>&nbsp;&nbsp;
                <Label>26,990,000đ</Label><br />
                    <Link>So sánh chi tiết</Link>
                </Col>

                <Col xs="3" className={styles.suggestItem}>
                    <img src={require("../../../../../../images/laptops/8cf82b1d215d342c01b9cb5c77567265.jpg")}
                        width={200} height={200} alt="suggest" className={styles.img} />
                    <Label>Laptop Asus Vivobook A512DA-EJ422T AMD R5-3500U/Win10...</Label><br />
                    <Label><b>24,590,000đ</b></Label>&nbsp;&nbsp;
                <Label>26,990,000đ</Label><br />
                    <Link>So sánh chi tiết</Link>
                </Col>

                <Col xs="3" className={styles.suggestItem}>
                    <img src={require("../../../../../../images/laptops/8cf82b1d215d342c01b9cb5c77567265.jpg")}
                        width={200} height={200} alt="suggest" className={styles.img} />
                    <Label>Laptop Asus Vivobook A512DA-EJ422T AMD R5-3500U/Win10...</Label><br />
                    <Label><b>24,590,000đ</b></Label>&nbsp;&nbsp;
                <Label>26,990,000đ</Label><br />
                    <Link>So sánh chi tiết</Link>
                </Col>
            </Fragment>
        )
    }
}

export default SuggestBlock;