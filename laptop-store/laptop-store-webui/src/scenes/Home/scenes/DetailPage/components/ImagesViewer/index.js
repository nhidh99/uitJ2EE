import React, { useState, useEffect } from "react";
import ImgsViewer from "react-images-viewer";

const ImagesViewer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currImg, setCurrImg] = useState(0);

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen]);

    const gotoNextImg = () => {
        if (props.imgs.length - 1 === currImg) {
            setCurrImg(0);
        } else {
            setCurrImg(currImg + 1);
        }
    };

    const gotoPrevImg = () => {
        if (currImg === 0) {
            setCurrImg(props.imgs.length - 1);
        } else {
            setCurrImg(currImg - 1);
        }
    };

    const closeImgsViewer = () => {
        setIsOpen(false);
    };

    return (
        <ImgsViewer
            imgs={props.imgs}
            isOpen={isOpen}
            currImg={currImg}
            onClickPrev={gotoPrevImg}
            onClickNext={gotoNextImg}
            onClose={closeImgsViewer}
            showCloseBtn={false}
            showImgCount={false}
            width={500}
        />
    );
};

export default ImagesViewer;
