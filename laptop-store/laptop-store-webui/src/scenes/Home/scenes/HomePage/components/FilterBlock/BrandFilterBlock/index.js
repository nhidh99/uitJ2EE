import FilterBlock from '../FilterBlock.js';
import { convertBrandType } from '../../../../../../../services/helper/converter.js';
import {BRANDFILTERTITLE, ALL} from '../../../../../../../constants';

class BrandFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.state = {
            title: BRANDFILTERTITLE,
            filterTypes: [
            ]
        }
    }
    async componentDidMount() {
        await fetch('/api/brands')
        .then(response => response.json())
        .then(data => this.setState({
            filterTypes: data
        }))
        .then(()=> {
            let brands = [];
            this.state.filterTypes.map((item) => {
                brands.push(convertBrandType(item));
            })
            brands.unshift(ALL);
            this.setState({
                filterTypes: brands
            })
            super.setResources(this.state);
        })
    }
}

export default BrandFilterBlock;