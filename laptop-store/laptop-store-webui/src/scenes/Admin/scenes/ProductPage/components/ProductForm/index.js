/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionCheckboxes from "./components/PromotionCheckboxes";
import ImageInput from "../../../../components/ImageInput";
import TagCheckboxes from "./components/TagCheckboxes";
import ProductSubmit from "./components/ProductSubmit";
import PriceInput from "./components/PriceInput";
import DiscountInput from "./components/DiscountInput";
import ActualPriceInput from "./components/ActualPriceInput";
import QuantityInput from "./components/QuantityInput";
import BrandInput from "./components/BrandInput";
import CPUInput from "./components/CPUInput";
import RAMInput from "./components/RAMInput";
import HardDriveInput from "./components/HardDriveInput";
import MonitorInput from "./components/MonitorInput";
import ThicknessInput from "./components/ThicknessInput";
import WeightInput from "./components/WeightInput";
import laptopApi from "../../../../../../services/api/laptopApi";
import tagApi from "../../../../../../services/api/tagApi";
import promotionApi from "../../../../../../services/api/promotionApi";

const ProductForm = ({ toggle, product }) => {
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [productTags, setProductTags] = useState([]);
    const [productPromotions, setProductPromotions] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [tags, promotions, productTags, productPromotions] = await Promise.all([
            loadTags(),
            loadPromotions(),
            loadProductTags(),
            loadProductPromotions(),
        ]);
        setTags(tags);
        setPromotions(promotions);
        setProductTags(productTags);
        setProductPromotions(productPromotions);
        setLoading(false);
    };

    const loadTags = async () => {
        try {
            const response = await tagApi.getAll();
            return response.data;
        } catch (err) {
            console.log("fail");
            return [];
        }
    };

    const loadPromotions = async () => {
        try {
            const response = await promotionApi.getAll();
            return response.data;
        } catch (err) {
            console.log("fail");
            return [];
        }
    };

    const loadProductTags = async () => {
        if (!product) return [];
        try {
            const response = await laptopApi.getLaptopTags(product["id"]);
            return response.data;
        } catch (err) {
            console.log("fail");
            return [];
        }
    };

    const loadProductPromotions = async () => {
        if (!product) return [];
        try {
            const response = await laptopApi.getLaptopPromotions(product["id"]);
            return response.data;
        } catch (err) {
            console.log("fail");
            return [];
        }
    };

    const InputImageRow = (props) => (
        <tr>
            <td className={styles.imgLabel}>Hình ảnh:</td>
            <td>
                <ImageInput imgWidth={300} imgHeight={300} defaultSrc={props.defaultSrc} />
            </td>
        </tr>
    );

    const InputRow = ({ title, component }) => {
        return (
            <tr>
                <td className={styles.labelCol}>{title}:</td>
                <td className={styles.inputCol}>{component}</td>
            </tr>
        );
    };

    const updateActualPrice = () => {
        const unitPriceInput = document.getElementById("unitPrice");
        const discountPriceInput = document.getElementById("discountPrice");
        const actualPriceInput = document.getElementById("actualPrice");

        const unitPrice = parseInt(unitPriceInput.value.replace(/,/g, ""));
        const discountPrice = parseInt(discountPriceInput.value.replace(/,/g, ""));
        if (isNaN(unitPrice) || isNaN(discountPrice)) {
            actualPriceInput.value = "";
        } else {
            actualPriceInput.value = (unitPrice - discountPrice).toLocaleString();
        }
    };

    return loading ? null : (
        <Fragment>
            <table borderless className={styles.table}>
                <tbody>
                    <InputRow
                        title="Sản phẩm"
                        component={
                            <Input
                                type="text"
                                id="name"
                                placeholder="Tên sản phẩm"
                                defaultValue={product?.["name"]}
                            />
                        }
                    />

                    <InputRow
                        title="Đơn giá"
                        component={
                            <PriceInput
                                defaultValue={product?.["unit_price"]}
                                onChange={updateActualPrice}
                            />
                        }
                    />

                    <InputRow
                        title="Giảm giá"
                        component={
                            <DiscountInput
                                defaultValue={product?.["discount_price"]}
                                onChange={updateActualPrice}
                            />
                        }
                    />

                    <InputRow
                        title="Giá bán"
                        component={
                            <ActualPriceInput
                                defaultValue={
                                    product
                                        ? (
                                              product["unit_price"] - product["discount_price"]
                                          ).toLocaleString()
                                        : null
                                }
                            />
                        }
                    />

                    <InputRow
                        title="Số lượng"
                        component={<QuantityInput defaultValue={product?.["quantity"]} />}
                    />

                    <InputRow
                        title="Nhãn hiệu"
                        component={<BrandInput defaultValue={product?.["brand"]} />}
                    />

                    <InputRow title="CPU" component={<CPUInput cpu={product?.["cpu"]} />} />

                    <InputRow title="RAM" component={<RAMInput ram={product?.["ram"]} />} />

                    <InputRow
                        title="Ổ cứng"
                        component={<HardDriveInput hd={product?.["hard_drive"]} />}
                    />

                    <InputRow
                        title="Màn hình"
                        component={<MonitorInput monitor={product?.["monitor"]} />}
                    />

                    <InputRow
                        title="Card màn hình"
                        component={
                            <Input
                                type="text"
                                id="graphicsCard"
                                placeholder="Card màn hình"
                                defaultValue={product?.["graphics_card"]}
                            />
                        }
                    />

                    <InputRow
                        title="Cổng kết nối"
                        component={
                            <Input
                                type="text"
                                id="ports"
                                placeholder="Cổng kết nối"
                                defaultValue={product?.["ports"]}
                            />
                        }
                    />

                    <InputRow
                        title="Hệ điều hành"
                        component={
                            <Input
                                type="text"
                                id="os"
                                placeholder="Hệ điều hành"
                                defaultValue={product?.["os"]}
                            />
                        }
                    />

                    <InputRow
                        title="Thiết kế"
                        component={
                            <Input
                                type="text"
                                id="design"
                                placeholder="Thiết kế"
                                defaultValue={product?.["design"]}
                            />
                        }
                    />

                    <InputRow
                        title="Độ dày"
                        component={<ThicknessInput defaultValue={product?.["thickness"]} />}
                    />

                    <InputRow
                        title="Khối lượng"
                        component={<WeightInput defaultValue={product?.["weight"]} />}
                    />

                    <InputRow
                        title="Khuyến mãi"
                        component={
                            <PromotionCheckboxes
                                promotions={promotions}
                                productPromotions={productPromotions}
                            />
                        }
                    />

                    <InputRow
                        title="Loại sản phẩm"
                        component={<TagCheckboxes tags={tags} productTags={productTags} />}
                    />

                    <InputImageRow
                        defaultSrc={
                            product
                                ? `/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`
                                : null
                        }
                    />
                </tbody>
            </table>

            <div className={styles.buttons}>
                <ProductSubmit product={product} disabled={loading} />
                <Button color="secondary" onClick={toggle}>
                    Đóng
                </Button>
            </div>
        </Fragment>
    );
};

export default ProductForm;
