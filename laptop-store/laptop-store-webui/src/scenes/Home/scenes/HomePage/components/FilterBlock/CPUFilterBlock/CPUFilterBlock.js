import FilterBlock from '../FilterBlock.js';

class CPUFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "CPU",
            filterTypes: [
                "Tất cả",
                "Intel i3",
                "Intel i5",
                "Intel i7",
                "Itel i9"
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default CPUFilterBlock;