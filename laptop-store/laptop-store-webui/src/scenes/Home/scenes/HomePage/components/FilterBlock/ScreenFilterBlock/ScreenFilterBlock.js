import FilterBlock from '../FilterBlock.js';

class ScreenFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "Màn hình",
            filterTypes: [
                "Tất cả",
                "Dưới 14 inch",
                "Từ 14 - 16 inch",
                "Trên 16 inch"
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default ScreenFilterBlock;