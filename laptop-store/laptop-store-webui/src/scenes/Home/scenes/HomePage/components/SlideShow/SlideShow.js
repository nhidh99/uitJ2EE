import React, {Component} from 'react';
import styles from './styles.module.scss';
import {Fade} from "react-slideshow-image";

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftitems: [
                {
                    id: 1,
                    src: 'https://salt.tikicdn.com/cache/w885/ts/banner/d3/be/71/5ef563e60c6474802ae5fe8ae0b4f9ee.jpg',
                    title: "Picture 1"
                }, 
                {
                    id: 2,
                    src: 'https://salt.tikicdn.com/cache/w885/ts/banner/ad/51/c6/aa1a0e23b0525755ade46fe9d72723c3.jpg',
                    title: "Picture 2"
                }, 
                {
                    id: 3,
                    src:'https://salt.tikicdn.com/cache/w885/ts/banner/2e/e1/6d/a0c3e2bd0fa53ede55a3f9c2a30ee5e7.jpg',
                    title: "Picture 3"
                }
            ],
            rightitems: [
                {
                    id: 1,
                    src: 'https://salt.tikicdn.com/cache/w885/ts/banner/06/21/ac/b7872b67a058e3143d849233f75798c1.jpg',
                    title: "Picture 1"
                }, 
                {
                    id: 2,
                    src: 'https://salt.tikicdn.com/cache/w885/ts/banner/2e/e1/6d/a0c3e2bd0fa53ede55a3f9c2a30ee5e7.jpg',
                    title: "Picture 2"
                }
            ]
        }
    }

    render(){

        let leftitems = this.state.leftitems.map((item)=>{
            return (
                <div className={styles.each_fade} key={item.id}>
                    <div className={styles.image_container}>
                        <img src={item.src} />
                    </div>
                    <h2>{item.title}</h2>
                </div>
            )
        })

        let rightitems  = this.state.rightitems.map((item)=>{
            return(
                <img src={item.src} key={item.id}></img>
            )
        })
        const fadeProperties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: false,
            indicators: true
        }

        return (
            <div className={styles.slide_container}>
                <Fade {...fadeProperties} className={styles.leftside}>
                        {leftitems}
                </Fade>
               <div className={styles.rightside}>
                    <div className={styles.rightitems}>{rightitems}</div>
               </div>
            </div>
        )
    }
}

export default SlideShow;