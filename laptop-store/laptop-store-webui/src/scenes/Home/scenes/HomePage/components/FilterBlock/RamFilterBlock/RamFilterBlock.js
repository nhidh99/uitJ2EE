import FilterBlock from '../FilterBlock.js';

class RamFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "RAM",
            filterTypes: [
                "Tất cả",
                "4 GB",
                "6 GB",
                "8 GB",
                "16 GB",
                "Từ 32 GB trở lên"
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default RamFilterBlock;