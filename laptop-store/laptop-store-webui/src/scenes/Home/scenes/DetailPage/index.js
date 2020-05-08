import React, { Component, Fragment } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import CommentBlock from "./components/CommentBlock";
import { Row, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FaCaretRight } from "react-icons/fa";
import { convertBrandType } from "../../../../services/helper/converter";

class DetailPage extends Component {
    state = {
        loading: true,
        product: null,
    };

    componentDidMount() {
        const path = window.location.pathname;
        const productId = path.split("/").slice(-1).pop();
        if (isNaN(parseInt(productId))) {
            window.location.href = "/";
        } else {
            this.loadProduct(productId);
        }
    }

    loadProduct = async (productId) => {
        const response = await fetch(`/api/laptops/${productId}`);
        if (response.ok) {
            const product = await response.json();
            this.setState({
                loading: false,
                product: product,
            });
        } else {
            window.location.href = "/";
        }
    };

    render() {
        const { loading, product } = this.state;
        return loading ? null : (
            <Fragment>
                <ContentBlock
                    title={<ProductTitle product={product} />}
                    component={<OverviewBlock product={product} />}
                />

                <ContentBlock
                    title="Thông tin chi tiết"
                    component={<DetailBlock product={product} />}
                />

                <ContentBlock title="Sản phẩm tương tự" component={<SuggestBlock />} />

                <ContentBlock title="Đánh giá sản phẩm" component={<RatingBlock />} />

                <ContentBlock title="Khách hàng nhận xét" component={<CommentBlock />} />
            </Fragment>
        );
    }
}

const ContentBlock = (props) => {
    const { title, component } = props;
    return (
        <section className={styles.section}>
            <Label className={styles.title}>{title}</Label>
            <Row className={styles.info}>{component}</Row>
        </section>
    );
};

const ProductTitle = (props) => {
    const { product } = props;
    return (
        <Label className={styles.title}>
            <a href="/" className={styles.productRedirect}>
                Trang chủ
            </a>
            &nbsp;
            <FaCaretRight color="#007bff" />
            &nbsp;
            <a href="/" className={styles.productRedirect}>
                {convertBrandType(product["brand"])}
            </a>
            &nbsp;
            <FaCaretRight color="#007bff" />
            &nbsp;Laptop {product["name"]}
        </Label>
    );
};

export default DetailPage;
