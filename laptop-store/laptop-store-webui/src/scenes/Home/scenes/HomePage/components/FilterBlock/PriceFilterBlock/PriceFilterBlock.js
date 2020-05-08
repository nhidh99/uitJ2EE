import FilterBlock from '../FilterBlock.js';

class PriceFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "Giá",
            filterTypes: [
                "Tất cả",
                "Dưới 15 triệu",
                "Từ 15 - 20 triệu",
                "Từ 20 - 25 triệu",
                "Từ 25 - 35 triệu",
                "Từ 35 triệu trở lên"
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default PriceFilterBlock;