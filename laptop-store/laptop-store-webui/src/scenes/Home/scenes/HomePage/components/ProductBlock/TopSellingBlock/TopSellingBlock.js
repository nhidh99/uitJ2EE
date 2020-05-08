import React, {Component} from 'react';
import ProductBlock from '../ProductBlock.js';

class TopSellingBlock extends ProductBlock {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
     
    }

    handleReadmoreClicked() {
        let items =  [
            {
                id: 1,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"ram",
                price: 15000000,
                rating: 3,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            }
        ]
        console.log(items);
        super.updateResource(items);
    }
}

export default TopSellingBlock;