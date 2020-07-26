import React from "react";
import { InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";
import NumberFormat from "react-number-format";
import { MAXIMUM_UNIT_PRICE } from "../../../../../../../../constants";

const PriceInput = (props) => (
    <InputGroup>
        <NumberFormat
            id="unitPrice"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Đơn giá"
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            isAllowed={(values) => {
                const { formattedValue, floatValue } = values;
                return (
                    !formattedValue.startsWith("0") &&
                    (formattedValue === "" || floatValue < MAXIMUM_UNIT_PRICE)
                );
            }}
        />
        <InputGroupAddon addonType="append">
            <InputGroupText>đ</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

export default PriceInput;
