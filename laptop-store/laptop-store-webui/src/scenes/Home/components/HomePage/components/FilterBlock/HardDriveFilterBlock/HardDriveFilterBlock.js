import FilterBlock from '../FilterBlock.js';

class HardDriveFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "Ổ cứng",
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

export default HardDriveFilterBlock;