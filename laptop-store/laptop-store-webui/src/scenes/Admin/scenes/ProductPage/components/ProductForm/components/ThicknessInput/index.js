import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import NumberFormat from "react-number-format";

const ThicknessInput = (props) => (
    <InputGroup>
        <NumberFormat
            id="thickness"
            className="form-control"
            thousandSeparator=""
            decimalScale={2}
            allowNegative={false}
            placeholder="Độ dày"
            defaultValue={props.defaultValue}
            isAllowed={(values) => {
                const { formattedValue, floatValue } = values;
                return (
                    !formattedValue.startsWith("0") && (formattedValue === "" || floatValue < 100)
                );
            }}
        />
        <InputGroupAddon addonType="append">
            <InputGroupText>mm</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

export default ThicknessInput;
