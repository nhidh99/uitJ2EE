import React, { useState } from "react";
import { Collapse, Table, Label, Input } from "reactstrap";
import styles from "./styles.module.scss";
import store from "../../services/redux/store";
import { withRouter } from "react-router-dom";
import { closeFilter } from "../../services/redux/actions";

const Filter = (props) => {
    const brands = ["ACER", "ASUS", "DELL", "HP", "LENOVO", "MAC", "MSI"];
    const isInSearchPage = props.location.pathname === "/search";
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useState(() => {
        store.subscribe(() => {
            const isOpen = store.getState()["filter"];
            setIsOpen(isOpen);
        });
    }, []);

    const toggleSelectedBrands = (brand) => {
        const label = document.getElementById("brand-" + brand);
        if (selectedBrands.includes(brand)) {
            const brands = selectedBrands.filter((b) => b !== brand);
            setSelectedBrands(brands);
            label.style.border = "1px solid lightgray";
        } else {
            setSelectedBrands([...selectedBrands, brand]);
            label.style.border = "5px solid #52a2e1";
        }
    };

    const clearSelections = () => {
        setSelectedBrands([]);
        brands.forEach((brand) => {
            if (selectedBrands.includes(brand)) {
                const label = document.getElementById("brand-" + brand);
                label.style.border = "1px solid lightgray";
            }
        });

        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((item) => (item.checked = false));

        const radios = document.querySelectorAll("input[type=radio]");
        radios.forEach((item) => (item.checked = false));
        document.getElementById("default-price").checked = true;
    };

    const buildURLSearchParams = () => {
        const params = new URLSearchParams();

        const selectedPrice = document.querySelector("input[name='price']:checked").value;

        const selectedTags = Array(...document.querySelectorAll("input[name='tag']:checked")).map(
            (input) => input.value
        );

        const selectedCPUs = Array(...document.querySelectorAll("input[name='cpu']:checked")).map(
            (input) => input.value
        );

        const selectedRAMs = Array(...document.querySelectorAll("input[name='ram']:checked")).map(
            (input) => input.value
        );

        if (parseInt(selectedPrice) !== 0) params.append("price", selectedPrice);
        selectedBrands.forEach((brand) => params.append("brands", brand));
        selectedTags.forEach((tag) => params.append("tags", tag));
        selectedRAMs.forEach((ram) => params.append("rams", ram));
        selectedCPUs.forEach((cpu) => {
            if (cpu === "CELERON_PENTIUM") {
                params.append("cpus", "INTEL_CELERON");
                params.append("cpus", "INTEL_PENTIUM");
            } else {
                params.append("cpus", cpu);
            }
        });
        return params;
    };

    const submit = async () => {
        store.dispatch(closeFilter());
        const params = buildURLSearchParams();
        const url = `/search?${params.toString()}`;
        props.history.push(url);
    };

    return (
        <Collapse
            isOpen={isOpen}
            className={`${styles.collapse} ${
                isInSearchPage ? styles.relativeCollapse : styles.absoluteCollapse
            }`}
        >
            <Table borderless className={styles.table}>
                <tr>
                    <td colSpan={4}>
                        <div className={styles.logosRow}>
                            {brands.map((brand) => (
                                <Label
                                    id={`brand-${brand}`}
                                    onClick={() => toggleSelectedBrands(brand)}
                                    className={styles.logoLabel}
                                >
                                    <img
                                        className={styles.logo}
                                        src={require(`../../images/logos/${brand.toLowerCase()}.png`)}
                                        alt="logo"
                                    />
                                </Label>
                            ))}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Mức giá</b> <br />
                        <Label>
                            <Input
                                id="default-price"
                                type="radio"
                                className={styles.checkbox}
                                defaultChecked
                                name="price"
                                value="0"
                            />{" "}
                            Tất cả mức giá
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="radio"
                                className={styles.checkbox}
                                name="price"
                                value="1"
                            />{" "}
                            Dưới 15 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="radio"
                                className={styles.checkbox}
                                name="price"
                                value="2"
                            />{" "}
                            Từ 15 - 20 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="radio"
                                className={styles.checkbox}
                                name="price"
                                value="3"
                            />{" "}
                            Từ 20 - 25 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="radio"
                                className={styles.checkbox}
                                name="price"
                                value="4"
                            />{" "}
                            Trên 25 triệu
                        </Label>
                    </td>

                    <td>
                        <b>Nhu cầu</b> <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="tag"
                                value="100003"
                                className={styles.checkbox}
                            />{" "}
                            Học tập - Văn phòng
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="tag"
                                value="100004"
                                className={styles.checkbox}
                            />{" "}
                            Đồ họa - Kỹ thuật
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="tag"
                                value="100005"
                                className={styles.checkbox}
                            />{" "}
                            Laptop Gaming
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="tag"
                                value="100006"
                                className={styles.checkbox}
                            />{" "}
                            Cao cấp sang trọng
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="tag"
                                value="100007"
                                className={styles.checkbox}
                            />{" "}
                            Mỏng nhẹ
                        </Label>
                    </td>

                    <td>
                        <b>CPU</b> <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="cpu"
                                value="INTEL_CORE_I7"
                                className={styles.checkbox}
                            />{" "}
                            Intel Core i7
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="cpu"
                                value="INTEL_CORE_I5"
                                className={styles.checkbox}
                            />{" "}
                            Intel Core i5
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="cpu"
                                value="INTEL_CORE_I3"
                                className={styles.checkbox}
                            />{" "}
                            Intel Core i3
                        </Label>
                        <br />
                        <Label>
                            <Input
                                name="cpu"
                                type="checkbox"
                                value="CELERON_PENTIUM"
                                className={styles.checkbox}
                            />{" "}
                            Intel Core Celeron/Pentium
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="cpu"
                                value="AMD"
                                className={styles.checkbox}
                            />{" "}
                            AMD
                        </Label>
                    </td>

                    <td>
                        <b>RAM</b> <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="ram"
                                value="16"
                                className={styles.checkbox}
                            />{" "}
                            16 GB
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="ram"
                                value="8"
                                className={styles.checkbox}
                            />{" "}
                            8 GB
                        </Label>
                        <br />
                        <Label>
                            <Input
                                type="checkbox"
                                name="ram"
                                value="4"
                                className={styles.checkbox}
                            />{" "}
                            4 GB
                        </Label>
                    </td>
                </tr>
            </Table>

            <button className={`${styles.buttonSearch} ${styles.button}`} onClick={submit}>
                Tìm kiếm
            </button>
            <br />
            <button className={`${styles.buttonClear} ${styles.button}`} onClick={clearSelections}>
                Bỏ tất cả lựa chọn
            </button>
        </Collapse>
    );
};

export default withRouter(Filter);
