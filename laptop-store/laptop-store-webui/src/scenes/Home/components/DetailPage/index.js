import React, { Component, Fragment } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import CommentBlock from "./components/CommentBlock";
import { Row, Label } from "reactstrap";
import styles from './styles.module.scss'

class DetailPage extends Component {
    render() {
        return (
            <Fragment>
                <ContentBlock
                    title="Thông tin sản phẩm"
                    component={<OverviewBlock />}
                />

                <ContentBlock
                    title="Thông tin chi tiết"
                    component={<DetailBlock />}
                />

                <ContentBlock
                    title="Sản phẩm tương tự"
                    component={<SuggestBlock />}
                />

                <ContentBlock
                    title="Đánh giá sản phẩm"
                    component={<RatingBlock />}
                />

                <ContentBlock
                    title="Khách hàng nhận xét"
                    component={<CommentBlock />}
                />
            </Fragment>
        );
    }
}

const ContentBlock = ({ title, component }) => (
    <section className={styles.section}>
        <Label className={styles.title}>{title}</Label>
        <Row className={styles.info}>{component}</Row>
    </section>
);

export default DetailPage;
