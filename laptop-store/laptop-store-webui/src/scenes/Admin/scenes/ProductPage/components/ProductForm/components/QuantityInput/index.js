import React from "react";
import { InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";
import NumberFormat from "react-number-format";
import { MAXIMUM_QUANTITY } from "../../../../../../../../constants";

const QuantityInput = (props) => (
    <InputGroup>
        <NumberFormat
            id="quantity"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Số lượng"
            defaultValue={props.defaultValue}
            isAllowed={(values) => {
                const { formattedValue, floatValue } = values;
                return (
                    !formattedValue.startsWith("0") &&
                    (formattedValue === "" || floatValue < MAXIMUM_QUANTITY)
                );
            }}
        />
        <InputGroupAddon addonType="append">
            <InputGroupText>cái</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

export default QuantityInput;
