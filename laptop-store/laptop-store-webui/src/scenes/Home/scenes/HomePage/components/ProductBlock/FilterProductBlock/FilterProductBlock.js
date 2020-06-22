import React, {Component} from 'react';
import ProductBlock from '../ProductBlock.js';
class FilterProductBlock extends ProductBlock {
    constructor(props) {
        super(props);
        this.numberOfPage = 1;
    }

    async componentDidMount() {
       this.fetchResource(this.numberOfPage);
    }

    handleReadmoreClicked() {
        this.numberOfPage +=1;
        this.fetchResource(this.numberOfPage);
    }

    fetchResource(page) {
        const params = new URLSearchParams(window.location.search);
        var type = params.get("type");
        var value = params.get("value");
        console.log("type: " + type + ": value: " + value);
        var bodyContent = new FormData();
        bodyContent.append(type, value);
        bodyContent.append("page", page);
        const requestOption = {
            method: "POST",
            header: {"Content-Type": "application/json; charset=utf-8"},
            body: bodyContent
        }
        let url = "/api/laptops/result";
        console.log(type + ":" + value + "" + url);
        console.log("option: " + JSON.stringify(bodyContent));
        console.log(url);
        fetch(url, requestOption)
        .then(response => response.json())
        .then(data => this.productblock = data)
        .then(()=> {
            let laptops =  this.productblock;
            this.images = [];
            if(laptops) {
                laptops.map((laptop)=>{
                    let alt = laptop.alt;
                    let id = laptop.id;
                    let url = "/api/images/600/laptops/" + id + "/" + alt + ".jpg";
                    this.images.push(url);
                })
            }
            console.log("laptops: " + this.productblock);
            super.updateResource(this.productblock, this.images);
        })   
    }
}

export default FilterProductBlock;