import React from "react";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const ActualPriceInput = (props) => (
    <InputGroup>
        <Input
            readOnly
            type="text"
            id="actualPrice"
            placeholder="Giá bán"
            defaultValue={props.defaultValue}
        />
        <InputGroupAddon addonType="append">
            <InputGroupText>đ</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

export default ActualPriceInput;
