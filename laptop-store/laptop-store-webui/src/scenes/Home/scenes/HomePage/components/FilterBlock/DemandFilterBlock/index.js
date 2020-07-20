import FilterBlock from '../FilterBlock.js';
import  {DEMANDFILTERTITLE, ALL} from '../../../../../../../constants';

class DemandFilterBlock extends FilterBlock {
    constructor(props) {
        super(props);
        this.tagObject = [];
        this.state = {
            title: DEMANDFILTERTITLE,
            filterTypes: [],
            tags: []
        }
    }

    async componentDidMount() {
        await fetch('/api/tags')
        .then(response => response.json())
        .then(data => this.setState({
            tags: data
        }))
        .then(() => {
            for(var i=0; i< this.state.tags.length; i++) {
                this.state.filterTypes.push(this.state.tags[i].name)
            }
            this.state.filterTypes.unshift(ALL);
            super.setResources(this.state);
        })
    }
}

export default DemandFilterBlock;