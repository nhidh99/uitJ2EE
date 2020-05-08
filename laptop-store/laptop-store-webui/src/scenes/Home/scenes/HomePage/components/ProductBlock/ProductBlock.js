import React, {Component} from 'react';
import styles from './styles.module.scss';
import { Button } from 'reactstrap';
import {FaStar} from 'react-icons/fa';
import Rating from 'react-rating';

class ProductBlock extends Component {
    constructor(props) {
        super(props);

        this.handleReadmoreClicked = this.handleReadmoreClicked.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.productblock =  [
            {
                id: 1,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"16 GB",
                harddrive: "500GB",
                price: 15000000,
                rating: 4,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            },
            {
                id: 2,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"8 GB",
                harddrive: "500GB",
                price: 15000000,
                rating: 4.5,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            },
            {
                id: 3,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"32Gb",
                harddrive: "500GB",
                price: 15000000,
                rating: 3.2,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            },
            {
                id: 4,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"8 GB",
                harddrive: "500GB",
                price: 15000000,
                rating: 5,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            }, 
            {
                id: 5,
                name: "Máy tính cao cấp sang trọng cấu hình cực khủng",
                CPU: "CPU",
                ram:"16 GB",
                harddrive: "500GB",
                price: 15000000,
                rating: 3,
                src: 'https://salt.tikicdn.com/ts/categoryblock/c3/01/eb/41ed16d900533ddf279c3bd795b51a90.png',
            }
        ]
        this.state = {
            productblock: this.productblock
        }
    }

    render (){
        let items = this.state.productblock;
        let products = items.map((product)=>{
            return(
                <div className={styles.product} key={product.id}>
                    <a href="./">
                    <div className={styles.productimage}>
                        <img src={product.src}></img>
                    </div>
                    <table className={styles.productdetail}>
                        <tbody>
                            <tr>         
                                <td className={styles.name}>{product.name}</td>
                            </tr>
                            <tr>
                                <td>CPU: {product.CPU}</td>
                            </tr>
                            <tr>
                                <td>RAM: {product.ram}</td>
                            </tr>
                            <tr>
                                <td>Ổ cứng: {product.harddrive}</td>
                            </tr>
                            <tr>
                                <td className={styles.price}>Giá: {product.price.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <Rating
                                    fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                                    emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                                    initialRating = {product.rating}
                                    readonly = {true}
                                />
                            </tr>
                        </tbody>
                    </table>
                    </a>
                </div>
            )
        })

        return (
            <div className={styles.productblock}>    
                <div className={styles.products}>
                    {products}
                </div>
                <Button className={styles.readmore} onClick={this.handleReadmoreClicked}>Xem thêm...</Button>
            </div>
        )
    }

    handleReadmoreClicked() {

    }

    updateResource(items) {
        this.setState({
            productblock: items
        });
    }
}

export default ProductBlock;