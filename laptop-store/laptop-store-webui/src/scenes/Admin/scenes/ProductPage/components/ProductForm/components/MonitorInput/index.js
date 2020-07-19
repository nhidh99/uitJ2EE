import React, { Fragment } from "react";
import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";
import {
    MAXIMUM_RESOLUTION_HEIGHT,
    MAXIMUM_RESOLUTION_WIDTH,
} from "../../../../../../../../constants";
import NumberFormat from "react-number-format";
import styles from "./styles.module.scss";

const MonitorInput = (props) => {
    const { monitor } = props;

    const updateResolutionSize = (e) => {
        const resolutionWidthInput = document.getElementById("resolutionWidth");
        const resolutionHeightInput = document.getElementById("resolutionHeight");
        const isUpdatable = e.target.value === "CUSTOM";

        resolutionWidthInput.disabled = !isUpdatable;
        resolutionHeightInput.disabled = !isUpdatable;

        if (isUpdatable) {
            resolutionWidthInput.value = "";
            resolutionHeightInput.value = "";
        } else {
            const index = e.target.selectedIndex;
            const option = e.target.options[index];
            resolutionWidthInput.value = option.getAttribute("width");
            resolutionHeightInput.value = option.getAttribute("height");
        }
    };

    return (
        <Fragment>
            <span for="monitor-size">
                <InputGroup>
                    <Input type="select" id="monitorSize" defaultValue={monitor?.["size"]}>
                        <option value="13.3">13.3</option>
                        <option value="14">14</option>
                        <option value="15.6">15.6</option>
                        <option value="17.3">17.3</option>
                    </Input>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>inch</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </span>

            <span for="resolution-type">
                <Input
                    id="resolutionType"
                    type="select"
                    name="resolutionType"
                    defaultValue={monitor?.["resolution_type"]}
                    onChange={updateResolutionSize}
                >
                    <option value="CUSTOM">Tùy chỉnh độ phân giải</option>
                    <option value="HD" width="1280" height="720">
                        HD (1280×720)
                    </option>
                    <option value="WXGA" width="1280" height="800">
                        WXGA (1280×800)
                    </option>
                    <option value="WXGA" width="1366" height="768">
                        WXGA (1366×768)
                    </option>
                    <option value="WXGA_PLUS" width="1440" height="900">
                        WXGA+ (1440x900)
                    </option>
                    <option value="HD_PLUS" width="1600" height="900">
                        HD+ (1600×900)
                    </option>
                    <option value="FULL_HD" width="1920" height="1080">
                        Full HD (1920×1080)
                    </option>
                    <option value="QHD" width="2560" height="1440">
                        2K (2560×1440)
                    </option>
                    <option value="QHD_PLUS" width="3200" height="1800">
                        3K (3200×1800)
                    </option>
                    <option value="UHD" width="3840" height="2160">
                        4K (3840×2160)
                    </option>
                </Input>
            </span>

            <span for="resolutionWidth">
                <InputGroup>
                    <NumberFormat
                        id="resolutionWidth"
                        className={`form-control ${styles.resolutionSize}`}
                        thousandSeparator=""
                        decimalSeparator={false}
                        allowNegative={false}
                        placeholder="Độ dài (px)"
                        defaultValue={monitor?.["resolution_width"]}
                        disabled={(monitor?.["resolution_type"] ?? "CUSTOM") !== "CUSTOM"}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return (
                                !formattedValue.startsWith("0") &&
                                (formattedValue === "" || floatValue < MAXIMUM_RESOLUTION_WIDTH)
                            );
                        }}
                    />
                    <InputGroupAddon className="input-group-prepend input-group-append">
                        <InputGroupText>x</InputGroupText>
                    </InputGroupAddon>
                    <NumberFormat
                        id="resolutionHeight"
                        className={`form-control ${styles.resolutionSize}`}
                        thousandSeparator=""
                        decimalSeparator={false}
                        allowNegative={false}
                        placeholder="Độ rộng (px)"
                        disabled={(monitor?.["resolution_type"] ?? "CUSTOM") !== "CUSTOM"}
                        defaultValue={monitor?.["resolution_height"]}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return (
                                !formattedValue.startsWith("0") &&
                                (formattedValue === "" || floatValue < MAXIMUM_RESOLUTION_HEIGHT)
                            );
                        }}
                    />
                </InputGroup>
            </span>
        </Fragment>
    );
};

export default MonitorInput;
