import ProductBlock from "../index.js";

class CheapProductBlock extends ProductBlock {
    constructor(props) {
        super(props);
        this.numberOfPage = 1;
    }

    componentDidMount() {
        this.fetchResource(this.numberOfPage);
    }

    handleReadmoreClicked() {
        this.numberOfPage += 1;
        this.fetchResource(this.numberOfPage);
    }

    async fetchResource(page) {
        super.updateLoadingState(true);
        let url = "/api/laptops/types/cheap?page=" + page;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => (this.productblock = data));
        let laptops = this.productblock;
        this.images = [];
        laptops.map((laptop) => {
            let alt = laptop.alt;
            let id = laptop.id;
            let url = "/api/images/600/laptops/" + id + "/" + alt + ".jpg";
            this.images.push(url);
        });
        super.updateResource(this.productblock, this.images);
        super.updateLoadingState(false);
    }
}

export default CheapProductBlock;
