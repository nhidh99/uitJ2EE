import React, { Component } from "react";
import BrandFilter from "./components/BrandFilter";
import styles from "./styles.module.scss";
import SlideShow from "./components/SlideShow";
import { Row, Label } from "reactstrap";
import NewProductBlock from "./components/ProductBlock/NewProductBlock";
import TopSellingBlock from "./components/ProductBlock/TopSellingBlock";
import CommonProductBlock from "./components/ProductBlock/CommonProductBlock";
import CheapProductBlock from "./components/ProductBlock/CheapProductBlock";
import DemandFilterBlock from "./components/FilterBlock/DemandFilterBlock";
import BrandFilterBlock from "./components/FilterBlock/BrandFilterBlock";
import PriceFilterBlock from "./components/FilterBlock/PriceFilterBlock";
import CPUFilterBlock from "./components/FilterBlock/CPUFilterBlock";
import RamFilterBlock from "./components/FilterBlock/RamFilterBlock";
import HardDriveFilterBlock from "./components/FilterBlock/HardDriveFilterBlock";
import ScreenFilterBlock from "./components/FilterBlock/ScreenFilterBlock";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
        };
    }

    async componentDidMount() {
        await fetch("/api/brands")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    brands: data,
                })
            );
    }

    render() {
        let brands = this.state.brands;
        const Block = ({ title, component }) => (
            <div className={styles.block}>
                <Label className={styles.title}>{title}</Label>
                <Row className={styles.component}>
                    <td>{component}</td>
                </Row>
            </div>
        );

        return (
            <div className={styles.slideshow}>
                <div className={styles.top}>
                    <SlideShow></SlideShow>
                </div>
                <div className={styles.container}>
                    <div className={styles.leftside}>
                        <DemandFilterBlock />
                        <BrandFilterBlock />
                        <PriceFilterBlock />
                        <CPUFilterBlock />
                        <RamFilterBlock />
                        <HardDriveFilterBlock />
                        <ScreenFilterBlock />
                    </div>
                    <div className={styles.rightside}>
                        <BrandFilter items={brands}></BrandFilter>
                        <Block title="SẢN PHẨM MỚI" component={<NewProductBlock />} />
                        <Block title="SẢN PHẨM BÁN CHẠY" component={<TopSellingBlock />} />
                        <Block title="Sản PHẨM PHỔ BIẾN" component={<CommonProductBlock />} />
                        <Block title="SẢN PHẨM GIÁ RẺ" component={<CheapProductBlock />} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
