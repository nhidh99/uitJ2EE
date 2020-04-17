import React, { Component, Fragment } from "react";
import styles from './styles.module.scss'
import OverviewBlock from "./components/OverviewBlock";
import { Label, Row } from "reactstrap";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import CommentBlock from "./components/CommentBlock";

class DetailPage extends Component {

    buildBlock = ({ title, component }) => (
        <section className={styles.productSection}>
            <Label className={styles.blockTitle}>{title}</Label>
            <Row className={styles.blockInfo}>
                {component}
            </Row>
        </section>
    )

    render() {
        return (
            <Fragment>
                {this.buildBlock({
                    title: "Thông tin sản phẩm",
                    component: <OverviewBlock />
                })}

                {this.buildBlock({
                    title: "Thông tin chi tiết",
                    component: <DetailBlock />
                })}

                {this.buildBlock({
                    title: "Sản phẩm tương tự",
                    component: <SuggestBlock />
                })}

                {this.buildBlock({
                    title: "Đánh giá sản phẩm",
                    component: <RatingBlock />
                })}

                {this.buildBlock({
                    title: "Khách hàng nhận xét",
                    component: <CommentBlock/>
                })}
            </Fragment>
        )
    }
}

export default DetailPage;