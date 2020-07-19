import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import NumberFormat from "react-number-format";

const WeightInput = (props) => (
    <InputGroup>
        <NumberFormat
            id="weight"
            className="form-control"
            thousandSeparator=""
            decimalScale={2}
            allowNegative={false}
            placeholder="Khối lượng"
            defaultValue={props.defaultValue}
            isAllowed={(values) => {
                const { formattedValue, floatValue } = values;
                return (
                    !formattedValue.startsWith("0") && (formattedValue === "" || floatValue < 100)
                );
            }}
        />
        <InputGroupAddon addonType="append">
            <InputGroupText>kg</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

export default WeightInput;
