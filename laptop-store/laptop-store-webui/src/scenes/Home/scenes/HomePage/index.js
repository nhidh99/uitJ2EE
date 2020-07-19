import React, { Fragment } from "react";
import RecentCategory from "./components/RecentCategory";
import DiscountCategory from "./components/DiscountCategory";
import CheapCategory from "./components/CheapCategory";
import BestSellingCategory from "./components/BestSellingCategory";
import Slider from "./components/Slider";

const HomePage = () => {
    return (
        <Fragment>
            <Slider />
            <DiscountCategory />
            <BestSellingCategory />
            <RecentCategory />
            <CheapCategory />
        </Fragment>
    );
};

export default HomePage;
