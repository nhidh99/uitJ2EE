import React, {Component} from 'react';
import styles from './styles.module.scss';

class BrandFilter extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        let brandCard = this.props.items.map((item)=>{
            return(
                <button key={item} className={styles.brand}>{item}</button>
            );
        })
        return (
            <div className={styles.brandfilter}>
                {brandCard}
            </div>
        );
    }
}

export default BrandFilter;