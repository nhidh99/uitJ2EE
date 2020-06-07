import FilterBlock from '../FilterBlock.js';
import {RAMFILTERTITLE, ALL, RAM4, RAM8, RAM12, RAM16, RAM32, RAM32_}
from '../../../../../../../constants';

class RamFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: RAMFILTERTITLE,
            filterTypes: [
                ALL,
                RAM4,
                RAM8,
                RAM12,
                RAM16,
                RAM32_
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default RamFilterBlock;