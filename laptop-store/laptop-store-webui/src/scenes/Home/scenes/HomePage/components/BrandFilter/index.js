import React, {Component} from 'react';
import styles from './styles.module.scss';
import acerLogo from '../../../../../../images/logos/acer.png';
import asusLogo from '../../../../../../images/logos/asus.png';
import dellLogo from '../../../../../../images/logos/dell.png';
import hpLogo from '../../../../../../images/logos/hp.png';
import lenovoLogo from '../../../../../../images/logos/lenovo.png';
import macLogo from '../../../../../../images/logos/mac.png';
import msiLogo from '../../../../../../images/logos/msi.png';
import { convertBrandType } from "../../../../../../services/helper/converter";

class BrandFilter extends Component {
    constructor(props) {
        super(props);
        this.handleBrandClicked = this.handleBrandClicked.bind(this);
        this.state = {
            logos: [acerLogo, asusLogo, dellLogo, hpLogo, lenovoLogo, macLogo, msiLogo],
            canRedirect: false
        }
    }

    render(){
        let url = "/result?type=" + this.type + "&value=" + this.filtervalue;
        if(this.state.canRedirect)
            return window.location.replace(url);
        let brandCard = this.props.items.map((item, index)=>{
            console.log("url: "+ url);
            return(
                <button key={item} className={styles.brand} onClick = {() =>this.handleBrandClicked(item)}>
                    <img src = {this.state.logos[index]}></img>
                    {convertBrandType(item)}
                </button>
            );
        })
        return (
            <div className={styles.brandfilter}>
                {brandCard}
            </div>
        );
    }

    handleBrandClicked(item) {
        // sessionStorage.setItem("filterType", "brand");
        // sessionStorage.setItem("filter", item);
        this.type = "brand";
        this.filtervalue = item;
        this.setState({
            canRedirect: true
        })
        console.log(this.state.canRedirect);
    }
}

export default BrandFilter;