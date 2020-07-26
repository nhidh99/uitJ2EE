import FilterBlock from '../FilterBlock.js';
import {CPUFILTERTITLE, ALL, CPUI3, CPUI5, CPUI7, CPUCELERON, CUPPENTIUM,CPUAMD }
from '../../../../../../../constants';
class CPUFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: CPUFILTERTITLE,
            filterTypes: [
                ALL,
                CPUI3,
                CPUI5,
                CPUI7,
                CPUCELERON,
                CUPPENTIUM,
                CPUAMD
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default CPUFilterBlock;