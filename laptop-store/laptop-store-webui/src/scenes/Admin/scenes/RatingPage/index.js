import React, { Fragment } from "react";
import RatingFilter from "./components/RatingFilter";
import RatingList from "./components/RatingList";

const RatingPage = () => (
    <Fragment>
        <RatingFilter />
        <RatingList />
    </Fragment>
);

export default RatingPage;
