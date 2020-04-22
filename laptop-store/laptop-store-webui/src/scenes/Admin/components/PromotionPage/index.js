import React, { Fragment } from "react";
import PromotionList from "./components/PromotionList";
import PromotionFilter from "./components/PromotionFilter";

const PromotionPage = () => (
    <Fragment>
        <PromotionFilter />
        <PromotionList />
    </Fragment>
);

export default PromotionPage;
