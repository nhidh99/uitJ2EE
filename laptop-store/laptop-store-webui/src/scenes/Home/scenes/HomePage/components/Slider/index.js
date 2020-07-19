import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Slider = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = ["HP", "LENOVO", "ACER", "MAC"].map((brand) => ({
        src: `${brand.toLowerCase() + "-ad"}.png`,
        altText: `${brand}-ad`,
        href: `/search?brands=${brand}`,
    }));

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <Link to={item.href}>
                    <img
                        src={require(`../../../../../../images/ads/${item.src}`)}
                        alt={item.altText}
                    />
                </Link>
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            className={styles.slider}
        >
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
};

export default Slider;
