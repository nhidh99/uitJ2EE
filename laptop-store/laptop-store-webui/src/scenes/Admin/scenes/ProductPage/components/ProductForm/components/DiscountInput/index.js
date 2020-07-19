import React from "react";
import { InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";
import NumberFormat from "react-number-format";
import { MAXIMUM_UNIT_PRICE } from "../../../../../../../../constants";

const DiscountInput = (props) => (
    <InputGroup>
        <NumberFormat
            id="discountPrice"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Giảm giá"
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

export default DiscountInput;
