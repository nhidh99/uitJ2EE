import FilterBlock from '../FilterBlock.js';
import {PRICEFILTERTITLE, ALL, PRICE_15, PRICE15_20, PRICE20_25, PRICE25_35, PRICE35_}
from '../../../../../../../constants';

class PriceFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: PRICEFILTERTITLE,
            filterTypes: [
                ALL,
                PRICE_15,
                PRICE15_20,
                PRICE20_25,
                PRICE25_35,
                PRICE35_
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default PriceFilterBlock;