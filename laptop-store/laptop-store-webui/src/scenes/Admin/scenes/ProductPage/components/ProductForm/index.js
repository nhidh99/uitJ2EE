import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
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
    render() {
        return (
            <table borderless className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Sản phẩm:</td>
                        <td>
                            <Input type="text" id="name" name="name" placeholder="Tên sản phẩm" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Đơn giá:</td>
                        <td>
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
                                            (formattedValue === "" ||
                                                floatValue < MAXIMUM_UNIT_PRICE)
                                        );
                                    }}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Giảm giá:</td>
                        <td>
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
                                            (formattedValue === "" ||
                                                floatValue < MAXIMUM_UNIT_PRICE)
                                        );
                                    }}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Giá bán:</td>
                        <td>
                            <InputGroup>
                                <Input
                                    readOnly
                                    type="text"
                                    id="actual-price"
                                    placeholder="Giá bán"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Số lượng:</td>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Nhãn hiệu:</td>
                        <td>
                            <Input type="select">
                                <option value="ACER">Acer</option>
                                <option value="ASUS">ASUS</option>
                                <option value="HP">HP</option>
                                <option value="LENOVO">Lenovo</option>
                                <option value="MAC">Mac</option>
                                <option value="MSI">MSI</option>
                            </Input>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>CPU:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <Input type="select">
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
                                        className={`form-control ${styles.cpuSpeed}`}
                                        thousandSeparator={true}
                                        decimalScale={1}
                                        allowNegative={false}
                                        id="price"
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
                                        className={`form-control ${styles.cpuSpeed}`}
                                        thousandSeparator={true}
                                        decimalScale={1}
                                        allowNegative={false}
                                        allowLeadingZeros={false}
                                        id="price"
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
                                <Input type="text" id="cpu" placeholder="Chi tiết CPU" />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>RAM:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <Input type="select">
                                    <option value="4">4 GB</option>
                                    <option value="8">8 GB</option>
                                    <option value="16">16 GB</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option value="DDR4">DDR4</option>
                                    <option value="DDR3">DDR3</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option value="2133">2133 MHz</option>
                                    <option value="2400">2400 MHz</option>
                                    <option value="2666">2666 MHz</option>
                                    <option value="3000">3000 MHz</option>
                                    <option value="3200">3200 MHz</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option value="0">Không hỗ trợ nâng cấp</option>
                                    <option value="1">On Board +1 khe RAM</option>
                                </Input>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Ổ cứng:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <Input type="select">
                                    <option value="SSD">SSD</option>
                                    <option value="HDD">HDD</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option value="128">128 GB</option>
                                    <option value="256">256 GB</option>
                                    <option value="512">512 GB</option>
                                    <option value="1024">1 TB</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="text" id="hard-drive" placeholder="Chi tiết ổ cứng" />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Màn hình:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <InputGroup>
                                    <Input type="select" id="monitor">
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

                            <span>
                                <Input
                                    type="select"
                                    id="resolution-type"
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
                                    <option value="FHD" width="1920" height="1080">
                                        FHD (1920×1080)
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

                            <span>
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
                                                (formattedValue === "" ||
                                                    floatValue < MAXIMUM_RESOLUTION_WIDTH)
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
                                                (formattedValue === "" ||
                                                    floatValue < MAXIMUM_RESOLUTION_HEIGHT)
                                            );
                                        }}
                                    />
                                </InputGroup>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Card màn hình:</td>
                        <td>
                            <Input type="text" id="graphics-card" placeholder="Card màn hình" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Cổng kết nối:</td>
                        <td>
                            <Input type="text" id="ports" placeholder="Cổng kết nối" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Hệ điều hành:</td>
                        <td>
                            <Input type="text" id="os" placeholder="Hệ điều hành" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Thiết kế:</td>
                        <td>
                            <Input type="text" id="design" placeholder="Thiết kế" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Độ dày:</td>
                        <td>
                            <InputGroup>
                                <Input type="text" id="thickness" placeholder="Độ dày" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>mm</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Khối lượng:</td>
                        <td>
                            <InputGroup>
                                <Input type="text" id="weight" placeholder="Khối lượng" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>kg</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Khuyến mãi:</td>
                        <td>
                            <div className={styles.checkboxes}>
                                <PromotionCheckboxes />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Loại sản phẩm:</td>
                        <td>
                            <div className={styles.checkboxes}>
                                <TagCheckboxes />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.imgLabel}>Hình ảnh:</td>
                        <td>
                            <ImageInput imgWidth={200} imgHeight={200} defaultSrc={null} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

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

export default ProductForm;
