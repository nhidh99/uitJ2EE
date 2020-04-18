import React, { Component, Fragment } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import CommentBlock from "./components/CommentBlock";
import AbstractBlock from "./components/AbstractBlock";

class DetailPage extends Component {
    render() {
        return (
            <Fragment>
                <AbstractBlock
                    title="Thông tin sản phẩm"
                    component={<OverviewBlock />}
                />

                <AbstractBlock
                    title="Thông tin chi tiết"
                    component={<DetailBlock />}
                />

                <AbstractBlock
                    title="Sản phẩm tương tự"
                    component={<SuggestBlock />}
                />

                <AbstractBlock
                    title="Đánh giá sản phẩm"
                    component={<RatingBlock />}
                />

                <AbstractBlock
                    title="Khách hàng nhận xét"
                    component={<CommentBlock />}
                />
            </Fragment>
        );
    }
}

export default DetailPage;
