import React, {Component} from 'react';
import styles from './styles.module.scss';
import { Label, Button } from 'reactstrap';
import {ALL, DEMANDFILTERTITLE, BRANDFILTERTITLE, PRICEFILTERTITLE, RAMFILTERTITLE,
    CPUFILTERTITLE, HARDDRIVEFILTERTITLE, SCREENFILTERTITLE, PRICE_15, PRICE15_20, 
    PRICE20_25, PRICE25_35, RAM4, RAM8, RAM12, RAM16, RAM32_, HARDDRIVE128, HARDDRIVE256, 
    HARDDRIVE512, HARDDRIVE1TB_, SCREEN_14, SCREEN14_16, SCREEN16_, PRICE35_ } from '../../../../../../constants';
import { Redirect } from 'react-router-dom';

class FilterBlock extends Component {
    constructor(props){
        super(props);
        this.setResources = this.setResources.bind(this);
        this.filterblock = {
            title: "",
            filterTypes: [],
            canRedirect : false
        }
        this.state = {}
    }

    render() {
        let url ="/result?type=" + this.type + "&value=" + this.filterValue;
        if(this.state.canRedirect) {
            return window.location.replace(url);
        }
        let buttons = this.filterblock.filterTypes.map((filtertype)=>{
            return (
                <button className={styles.filtertype} key={filtertype} onClick = { () =>this.handleFilter(filtertype)}>{filtertype}</button>
            )
        })
        return (
            <div className={styles.filterblock}>
                <label className={styles.title}>{this.filterblock.title}</label>
                {buttons}
            </div>
        )
    }

    setResources (filterblock) {
        this.filterblock = filterblock;
        this.setState({});
    }

    handleFilter(filterValue) {
        var filterType = convertTitleToFilterType(this.filterblock.title);
        var value = convertFilterValueToValue(this.filterblock.title, filterValue);
        // sessionStorage.clear();
        // sessionStorage.setItem("filterType", filterType);
        // sessionStorage.setItem("filter", value);
        this.type = filterType;
        this.filterValue = value;
        this.setState({
            canRedirect: true,
            filterTypes: this.state.filterTypes,
            title: this.state.title
        })
    }
}

function convertFilterValueToValue(filterTitle, filterValue) {
    switch(filterTitle) {
        case PRICEFILTERTITLE: {
            switch(filterValue) {
                case ALL:
                case PRICE_15:
                    return 0;
                case PRICE15_20:
                    return 15000000;
                case PRICE20_25:
                    return 20000000;
                case PRICE25_35:
                    return 25000000;
                case PRICE35_:
                    return 35000000;
            }
        }
        case RAMFILTERTITLE: {
            switch(filterValue) {
                case ALL:
                    return 0;
                case RAM4:
                    return 4;
                case RAM8:
                    return 8;
                case RAM12:
                    return 12;
                case RAM16:
                    return 16;
                case RAM32_:
                    return 32;
            }
        }
        case HARDDRIVEFILTERTITLE: {
            switch(filterValue) {
                case ALL:
                    return 0;
                case HARDDRIVE128:
                    return 128;
                case HARDDRIVE256:
                    return 256;
                case HARDDRIVE512: 
                    return 512;
                case HARDDRIVE1TB_:
                    return 1024;
            }
        }
        case SCREENFILTERTITLE: {
            switch(filterValue) {
                case ALL:
                case SCREEN_14:
                    return 0;
                case SCREEN14_16:
                    return 14;
                case SCREEN16_: 
                    return 16;
            }
        }
        default:
            if(filterValue == ALL) {
                return "";
            } else {
                return filterValue;
            }
    }
}

function convertTitleToFilterType(filterType) {
    switch(filterType) {
        case DEMANDFILTERTITLE: {
            return "demand";
        }
        case BRANDFILTERTITLE: {
            return "brand";
        }
        case PRICEFILTERTITLE: {
            return "price";
        }
        case CPUFILTERTITLE: {
            return "cpu";
        }
        case RAMFILTERTITLE: {
            return "ram";
        }
        case HARDDRIVEFILTERTITLE: {
            return "hardDrive";
        }
        case SCREENFILTERTITLE: {
            return "monitor";
        }
    }
}

export default FilterBlock;