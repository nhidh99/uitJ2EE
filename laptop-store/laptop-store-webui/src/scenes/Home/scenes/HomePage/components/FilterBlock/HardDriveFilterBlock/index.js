import FilterBlock from '../FilterBlock.js';
import { HARDDRIVEFILTERTITLE, ALL, HARDDRIVE128, HARDDRIVE256, HARDDRIVE512, HARDDRIVE1TB_ } 
from '../../../../../../../constants';

class HardDriveFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.filterblock = {
            title: HARDDRIVEFILTERTITLE,
            filterTypes: [
                ALL,
                HARDDRIVE128,
                HARDDRIVE256,
                HARDDRIVE512,                
                HARDDRIVE1TB_
            ]
        }
        this.state = {}
        super.setResources(this.filterblock);
    }
}

export default HardDriveFilterBlock;