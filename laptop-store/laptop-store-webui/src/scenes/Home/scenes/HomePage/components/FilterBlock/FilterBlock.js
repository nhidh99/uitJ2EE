import React, {Component} from 'react';
import styles from './styles.module.scss';
import { Label, Button } from 'reactstrap';

class FilterBlock extends Component {
    constructor(props){
        super(props);
        this.setResources = this.setResources.bind(this);
        this.filterblock = {
            title: "Nhu cầu sử dụng",
            filterTypes: [
                "Học tập",
                "Đồ họa - Kỹ thuật",
                "Văn phòng",
                "Cao cấp - Sang trọng",
                "Game"
            ]
        }
        this.state = {}
    }

    render() {
        let buttons = this.filterblock.filterTypes.map((filtertype)=>{
            return (
                <button className={styles.filtertype} key={filtertype}>{filtertype}</button>
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
        this.setState();
    }
}

export default FilterBlock;