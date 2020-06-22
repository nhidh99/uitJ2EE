import React, { Component } from "react";
import styles from './styles.module.scss';
import FilterProductBlock from "../HomePage/components/ProductBlock/FilterProductBlock/FilterProductBlock";
import SlideShow from "../HomePage/components/SlideShow/SlideShow";
import DemandFilterBlock from "../HomePage/components/FilterBlock/DemandFilterBlock/DemandFIlterBlock";
import BrandFilterBlock from "../HomePage/components/FilterBlock/BrandFilterBlock/BrandFilterBlock";
import PriceFilterBlock from "../HomePage/components/FilterBlock/PriceFilterBlock/PriceFilterBlock";
import CPUFilterBlock from "../HomePage/components/FilterBlock/CPUFilterBlock/CPUFilterBlock";
import RamFilterBlock from "../HomePage/components/FilterBlock/RamFilterBlock/RamFilterBlock";
import HardDriveFilterBlock from "../HomePage/components/FilterBlock/HardDriveFilterBlock/HardDriveFilterBlock";
import ScreenFilterBlock from "../HomePage/components/FilterBlock/ScreenFilterBlock/ScreenFilterBlock";
import BrandFilter from "../HomePage/components/BrandFilter/BrandFilter";
import { Label, Row } from "reactstrap";

class ResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            brands: []
        }
    }

    async componentDidMount() {
        await fetch('/api/brands')
        .then(response => response.json())
        .then(data => this.setState({
            isLoading: false,
            brands: data
        }))
    }

    render() {
        
        let brands = this.state.brands;

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
                        <DemandFilterBlock/>
                        <BrandFilterBlock/>
                        <PriceFilterBlock/>
                        <CPUFilterBlock/>
                        <RamFilterBlock/>
                        <HardDriveFilterBlock/>
                        <ScreenFilterBlock/>
                    </div>
                    <div className={styles.rightside}>
                        <BrandFilter items={brands}></BrandFilter>
                        <Block title="SẢN PHẨM PHÙ HỢP" component={<FilterProductBlock/>}>
                        </Block>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultPage;