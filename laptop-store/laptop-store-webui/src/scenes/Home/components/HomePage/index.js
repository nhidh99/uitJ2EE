import React, { Component, Fragment } from "react";
import BrandFilter from "./components/BrandFilter/BrandFilter";
import styles from './styles.module.scss';
import SlideShow from "./components/SlideShow/SlideShow";
import { Row, Label } from "reactstrap";
import NewProductBlock from "./components/ProductBlock/NewProductBlock/NewProductBlock";
import TopSellingBlock from "./components/ProductBlock/TopSellingBlock/TopSellingBlock";
import CommonProductBlock from "./components/ProductBlock/CommonProductBlock/CommonProductBlock";
import CheapProductBlock from "./components/ProductBlock/CheapProductBlock/CheapProductBlock";
import DemandFilterBlock from "./components/FilterBlock/DemandFilterBlock/DemandFIlterBlock";
import BrandFilterBlock from "./components/FilterBlock/BrandFilterBlock/BrandFilterBlock";
import PriceFilterBlock from "./components/FilterBlock/PriceFilterBlock/PriceFilterBlock";
import CPUFilterBlock from "./components/FilterBlock/CPUFilterBlock/CPUFilterBlock";
import RamFilterBlock from "./components/FilterBlock/RamFilterBlock/RamFilterBlock";
import HardDriveFilterBlock from "./components/FilterBlock/HardDriveFilterBlock/HardDriveFilterBlock";
import ScreenFilterBlock from "./components/FilterBlock/ScreenFilterBlock/ScreenFilterBlock";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.brands =  ["Dell", "Asus", "Acer", "HP", "MacBook", "Lenovo", "MSI" ];
    }
    render() {

        const Block = ({title, component})=>(
            <div className={styles.block}>
                <Label className={styles.title}>
                    {title}
                </Label>
                <Row className={styles.component}>
                    <td>{component}</td>
                </Row>
            </div>
        )

        return (
            <div className={styles.slideshow}>
                <div className={styles.top}>
                    <SlideShow></SlideShow>
                </div>
                <div className={styles.container}>
                    <div className={styles.leftside}>
                        <DemandFilterBlock></DemandFilterBlock>
                        <BrandFilterBlock></BrandFilterBlock>
                        <PriceFilterBlock></PriceFilterBlock>
                        <CPUFilterBlock></CPUFilterBlock>
                        <RamFilterBlock></RamFilterBlock>
                        <HardDriveFilterBlock></HardDriveFilterBlock>
                        <ScreenFilterBlock></ScreenFilterBlock>
                    </div>
                    <div className={styles.rightside}>
                        <BrandFilter items={this.brands}></BrandFilter>                    
                        <Block title="Sản phẩm mới"
                            component={<NewProductBlock items={this.productblock}/>}>
                        </Block>
                        <Block title="Top bán chạy"
                            component={<TopSellingBlock items={this.productblock}/>}>
                        </Block>
                        <Block title="Sản phẩm phổ biến"
                            component={<CommonProductBlock items={this.productblock}/>}>
                        </Block>
                        <Block title="Sản phẩm giá rẻ"
                            component={<CheapProductBlock items={this.productblock}/>}>
                        </Block>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;