import React, { Fragment } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import NumberFormat from "react-number-format";
import styles from "./styles.module.scss";

const CPUInput = (props) => {
    const { cpu } = props;
    return (
        <Fragment>
            <span>
                <Input id="cpuType" type="select" defaultValue={cpu?.["type"]}>
                    <option value="INTEL_CORE_I7">Intel Core i7</option>
                    <option value="INTEL_CORE_I5">Intel Core i5</option>
                    <option value="INTEL_CORE_I3">Intel Core i3</option>
                    <option value="INTEL_CELERON">Intel Celeron</option>
                    <option value="INTEL_PENTIUM">Intel Pentium</option>
                    <option value="AMD">AMD</option>
                </Input>
            </span>
            <span>
                <InputGroup>
                    <NumberFormat
                        id="cpuSpeed"
                        className={`form-control ${styles.cpuSpeed}`}
                        thousandSeparator={true}
                        decimalScale={1}
                        allowNegative={false}
                        placeholder="Tốc độ CPU"
                        defaultValue={cpu?.["speed"]}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return (
                                !formattedValue.startsWith("0") &&
                                (formattedValue === "" || floatValue < 10)
                            );
                        }}
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>GHz</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </span>
            <span>
                <InputGroup>
                    <NumberFormat
                        id="cpuMaxSpeed"
                        className={`form-control ${styles.cpuSpeed}`}
                        thousandSeparator={true}
                        decimalScale={1}
                        allowNegative={false}
                        allowLeadingZeros={false}
                        placeholder="Tốc độ tối đa"
                        defaultValue={cpu?.["max_speed"]}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return (
                                !formattedValue.startsWith("0") &&
                                (formattedValue === "" || floatValue < 10)
                            );
                        }}
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>GHz</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </span>
            <span>
                <Input
                    type="text"
                    id="cpuDetail"
                    placeholder="Chi tiết CPU"
                    defaultValue={cpu?.["detail"]}
                />
            </span>
        </Fragment>
    );
};

export default CPUInput;
