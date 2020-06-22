import FilterBlock from '../FilterBlock.js';
import {SCREENFILTERTITLE, ALL, SCREEN_14, SCREEN14_16, SCREEN16_}
from '../../../../../../../constants';
class ScreenFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: SCREENFILTERTITLE,
            filterTypes: [
                ALL,
                SCREEN_14,
                SCREEN14_16,
                SCREEN16_
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default ScreenFilterBlock;