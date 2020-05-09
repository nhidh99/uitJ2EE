import FilterBlock from '../FilterBlock.js';

class DemandFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "Nhu cầu sử dụng",
            filterTypes: [
                "Tất cả",
                "Học tập",
                "Đồ họa - Kỹ thuật",
                "Văn phòng",
                "Cao cấp - Sang trọng",
                "Game"
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default DemandFilterBlock;