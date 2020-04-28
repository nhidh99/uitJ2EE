import React, { Component, Fragment } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionCheckboxes from "./components/PromotionCheckboxes";
import ImageInput from "../../../../components/ImageInput";
import TagCheckboxes from "./components/TagCheckboxes";
import NumberFormat from "react-number-format";
import {
    MAXIMUM_UNIT_PRICE,
    MAXIMUM_QUANTITY,
    MAXIMUM_RESOLUTION_WIDTH,
    MAXIMUM_RESOLUTION_HEIGHT,
} from "../../../../../../constants";

class ProductForm extends Component {
    submit = async () => {
        const data = buildProductData();
        const response = await fetch("/api/laptops", {
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data; charset=utf-8",
            },
            body: data,
        });

        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        const { toggle } = this.props;
        return (
            <Fragment>
                <table borderless className={styles.table}>
                    <tbody>
                        <InputRow
                            title="Sản phẩm"
                            component={<Input type="text" id="name" placeholder="Tên sản phẩm" />}
                        />
                        <InputRow title="Đơn giá" component={<PriceInput />} />
                        <InputRow title="Giảm giá" component={<DiscountInput />} />
                        <InputRow title="Giá bán" component={<ActualPriceInput />} />
                        <InputRow title="Số lượng" component={<QuantityInput />} />
                        <InputRow title="Nhãn hiệu" component={<BrandInput />} />
                        <InputRow title="CPU" component={<CPUInputs />} />
                        <InputRow title="RAM" component={<RAMInputs />} />
                        <InputRow title="Ổ cứng" component={<HardDriveInputs />} />
                        <InputRow title="Màn hình" component={<MonitorInputs />} />
                        <InputRow
                            title="Card màn hình"
                            component={
                                <Input type="text" id="graphics-card" placeholder="Card màn hình" />
                            }
                        />
                        <InputRow
                            title="Cổng kết nối"
                            component={<Input type="text" id="ports" placeholder="Cổng kết nối" />}
                        />
                        <InputRow
                            title="Hệ điều hành"
                            component={<Input type="text" id="os" placeholder="Hệ điều hành" />}
                        />
                        <InputRow
                            title="Thiết kế"
                            component={<Input type="text" id="design" placeholder="Thiết kế" />}
                        />
                        <InputRow title="Độ dày" component={<ThicknessInput />} />
                        <InputRow title="Khối lượng" component={<WeightInput />} />
                        <InputRow title="Khuyến mãi" component={<PromotionCheckboxes />} />
                        <InputRow title="Loại sản phẩm" component={<TagCheckboxes />} />

                        <InputImageRow />
                    </tbody>
                </table>

                <div className={styles.buttons}>
                    <Button color="success" onClick={this.submit}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const InputRow = (props) => {
    const { title, component } = props;
    return (
        <tr>
            <td className={styles.labelCol}>{title}:</td>
            <td className={styles.inputCol}>{component}</td>
        </tr>
    );
};

const InputImageRow = () => (
    <tr>
        <td className={styles.imgLabel}>Hình ảnh:</td>
        <td>
            <ImageInput imgWidth={200} imgHeight={200} defaultSrc={null} />
        </td>
    </tr>
);

const PriceInput = () => (
    <InputGroup>
        <NumberFormat
            id="unit-price"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Đơn giá"
            onChange={updateActualPrice}
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

const DiscountInput = () => (
    <InputGroup>
        <NumberFormat
            id="discount-price"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Giảm giá"
            onChange={updateActualPrice}
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

const ActualPriceInput = () => (
    <InputGroup>
        <Input readOnly type="text" id="actual-price" placeholder="Giá bán" />
        <InputGroupAddon addonType="append">
            <InputGroupText>đ</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
);

const QuantityInput = () => (
    <InputGroup>
        <NumberFormat
            id="quantity"
            className={"form-control"}
            thousandSeparator={true}
            decimalSeparator={false}
            allowNegative={false}
            placeholder="Số lượng"
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

const BrandInput = () => (
    <Input id="brand" type="select">
        <option value="ACER">Acer</option>
        <option value="ASUS">ASUS</option>
        <option value="HP">HP</option>
        <option value="LENOVO">Lenovo</option>
        <option value="MAC">Mac</option>
        <option value="MSI">MSI</option>
    </Input>
);

const CPUInputs = () => (
    <Fragment>
        <span>
            <Input id="cpu-type" type="select">
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
                    id="cpu-speed"
                    className={`form-control ${styles.cpuSpeed}`}
                    thousandSeparator={true}
                    decimalScale={1}
                    allowNegative={false}
                    placeholder="Tốc độ CPU"
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
                    id="cpu-max-speed"
                    className={`form-control ${styles.cpuSpeed}`}
                    thousandSeparator={true}
                    decimalScale={1}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    placeholder="Tốc độ tối đa"
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
            <Input type="text" id="cpu-detail" placeholder="Chi tiết CPU" />
        </span>
    </Fragment>
);

const RAMInputs = () => (
    <Fragment>
        <span>
            <Input id="ram-size" type="select">
                <option value="4">4 GB</option>
                <option value="8">8 GB</option>
                <option value="16">16 GB</option>
            </Input>
        </span>
        <span>
            <Input id="ram-type" type="select">
                <option value="DDR4">DDR4</option>
                <option value="DDR3">DDR3</option>
            </Input>
        </span>
        <span>
            <Input id="ram-bus" type="select">
                <option value="2133">2133 MHz</option>
                <option value="2400">2400 MHz</option>
                <option value="2666">2666 MHz</option>
                <option value="3000">3000 MHz</option>
                <option value="3200">3200 MHz</option>
            </Input>
        </span>
        <span>
            <Input id="ram-extra-slot" type="select">
                <option value="0">Không hỗ trợ nâng cấp</option>
                <option value="1">On Board +1 khe RAM</option>
            </Input>
        </span>
    </Fragment>
);

const HardDriveInputs = () => (
    <Fragment>
        <span>
            <Input id="hd-type" type="select">
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
            </Input>
        </span>
        <span>
            <Input id="hd-size" type="select">
                <option value="128">128 GB</option>
                <option value="256">256 GB</option>
                <option value="512">512 GB</option>
                <option value="1024">1 TB</option>
            </Input>
        </span>
        <span>
            <Input id="hd-detail" type="text" placeholder="Chi tiết ổ cứng" />
        </span>
    </Fragment>
);

const MonitorInputs = () => (
    <Fragment>
        <span for="monitor-size">
            <InputGroup>
                <Input type="select" id="monitor-size">
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
                id="resolution-type"
                type="select"
                name="resolution-type"
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

        <span for="resolution-width">
            <InputGroup>
                <NumberFormat
                    id="resolution-width"
                    className={`form-control ${styles.resolutionSize}`}
                    thousandSeparator=""
                    decimalSeparator={false}
                    allowNegative={false}
                    placeholder="Độ dài (px)"
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
                    id="resolution-height"
                    className={`form-control ${styles.resolutionSize}`}
                    thousandSeparator=""
                    decimalSeparator={false}
                    allowNegative={false}
                    placeholder="Độ rộng (px)"
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

const ThicknessInput = () => (
    <InputGroup>
        <NumberFormat
            id="thickness"
            className="form-control"
            thousandSeparator=""
            decimalScale={2}
            allowNegative={false}
            placeholder="Độ dày"
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

const WeightInput = () => (
    <InputGroup>
        <NumberFormat
            id="weight"
            className="form-control"
            thousandSeparator=""
            decimalScale={2}
            allowNegative={false}
            placeholder="Khối lượng"
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

const updateActualPrice = () => {
    const unitPriceInput = document.getElementById("unit-price");
    const discountPriceInput = document.getElementById("discount-price");
    const actualPriceInput = document.getElementById("actual-price");

    const unitPrice = parseInt(unitPriceInput.value.replace(/,/g, ""));
    const discountPrice = parseInt(discountPriceInput.value.replace(/,/g, ""));
    if (isNaN(unitPrice) || isNaN(discountPrice)) {
        actualPriceInput.value = "";
    } else {
        actualPriceInput.value = (unitPrice - discountPrice).toLocaleString();
    }
};

const updateResolutionSize = (e) => {
    const resolutionWidthInput = document.getElementById("resolution-width");
    const resolutionHeightInput = document.getElementById("resolution-height");
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

const buildProductData = () => {
    const output = new FormData();
    const data = [
        buildProductStringData(),
        buildProductIntData(),
        buildProductFloatData(),
        buildProductArrayData(),
        buildProductImageData(),
    ].reduce((a, b) => Object.assign(a, b));
    Object.keys(data).forEach((key) => output.append(key, data[key]));
    return output;
};

const buildProductStringData = () => {
    const output = {};
    [
        "name",
        "brand",
        "cpu-type",
        "cpu-detail",
        "ram-type",
        "hd-type",
        "hd-detail",
        "resolution-type",
        "graphics-card",
        "ports",
        "os",
        "design",
    ].forEach((name) => {
        const input = document.getElementById(name);
        output[name] = input.value;
    });
    return output;
};

const buildProductIntData = () => {
    const output = {};
    [
        "unit-price",
        "discount-price",
        "quantity",
        "ram-size",
        "ram-bus",
        "ram-extra-slot",
        "hd-size",
        "resolution-width",
        "resolution-height",
    ].forEach((name) => {
        const input = document.getElementById(name);
        output[name] = parseInt(input.value.replace(/,/g, ""));
    });
    return output;
};

const buildProductFloatData = () => {
    const output = {};
    ["cpu-speed", "cpu-max-speed", "monitor-size", "thickness", "weight"].forEach((name) => {
        const input = document.getElementById(name);
        output[name] = parseFloat(input.value.replace(/,/g, ""));
    });
    return output;
};

const buildProductArrayData = () => {
    const output = {};
    ["promotions", "tags"].forEach((name) => {
        const inputs = Array.from(document.querySelectorAll(`input[name=${name}]:checked`));
        const arr = inputs.map((input) => parseInt(input.value));
        output[name] = JSON.stringify(arr);
    });
    return output;
};

const buildProductImageData = () => {
    const files = document.getElementById("image").files;
    const image = files.length > 0 ? files[0] : null;
    return { image: image };
};

export default ProductForm;
