import FilterBlock from '../FilterBlock.js';

class BrandFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: "Thương hiệu",
            filterTypes: [
                "Tất cả" ,"Dell", "Asus", "Acer", "HP", "MacBook", "Lenovo", "MSI" 
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default BrandFilterBlock;