/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Label, Input, Button, Spinner } from "reactstrap";
import { FaBook, FaSave } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import store from "../../../../../../services/redux/store";
import { buildModal, buildErrorModal } from "../../../../../../services/redux/actions";
import Loader from "react-loader-advanced";
import addressApi from "../../../../../../services/api/addressApi";

const EditAddressPage = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [address, setAddress] = useState(null);
    const [cityId, setCityId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [wardId, setWardId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!cityId) return;
        loadDistricts();
    }, [cityId]);

    useEffect(() => {
        if (!districtId) return;
        loadWards();
    }, [districtId]);

    const loadData = async () => {
        const [address, cities] = await Promise.all([loadAddress(), loadCities()]);
        if (address) {
            const cityId = cities.find((c) => c["name"] === address["city"])?.id;
            const districts = await loadDistrictsByCity(cityId);
            const districtId = districts.find((d) => d["name"] === address["district"])?.id;
            const wards = await loadWardsByDistrict(districtId);
            const wardId = wards.find((w) => w["name"] === address["ward"])?.id;

            setCityId(cityId);
            setDistrictId(districtId);
            setWardId(wardId);
        } else {
            setDistrictId("");
        }
        setAddress(address);
        setCities(cities);
        setLoading(false);
    };

    const loadCities = async () => {
        try {
            const response = await addressApi.getCities();
            return response.data["data"];
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const loadDistrictsByCity = async (cityId) => {
        try {
            const response = await addressApi.getDistricts(cityId);
            return response.data["data"];
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const loadWardsByDistrict = async (districtId) => {
        try {
            const response = await addressApi.getWards(districtId);
            return response.data["data"];
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const loadAddress = async () => {
        if (id === "create") return null;
        try {
            const response = await addressApi.getById(id);
            return response.data;
        } catch (err) {
            console.log("fail");
            return null;
        }
    };

    const loadDistricts = async () => {
        setReloading(true);
        const districts = await loadDistrictsByCity(cityId);
        setDistricts(districts);
        if (!loading) {
            setWardId("");
        }
        setReloading(false);
    };

    const loadWards = async () => {
        setReloading(true);
        const wards = await loadWardsByDistrict(districtId);
        setWards(wards);
        setReloading(false);
    };

    const buildAddressData = () => {
        const receiverName = document.getElementById("receiver-name").value;
        const receiverPhone = document.getElementById("receiver-phone").value;
        const city = document.getElementById(`city-${cityId}`)?.text;
        const district = document.getElementById(`district-${districtId}`)?.text;
        const ward = document.getElementById(`ward-${wardId}`)?.text;
        const street = document.getElementById("street").value;
        const addressNum = document.getElementById("address-num").value;

        return {
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            city: city,
            district: district,
            ward: ward,
            street: street,
            addressNum: addressNum,
        };
    };

    const validateInputs = (inputs) => {
        const errors = [];
        const validate = (message, condition) => (condition() ? null : errors.push(message));
        validate("Họ và tên không được để trống hoặc chứa chữ số", () =>
            inputs["receiverName"].match(/^[a-zA-Z\s\p{L}]{3,30}$/gu)
        );
        validate("Số điện thoại từ 6 - 12 chữ số", () =>
            inputs["receiverPhone"].match(/^\d{6,12}$/)
        );
        validate("Tỉnh/Thành phố không được để trống", () => inputs["city"]?.length > 0);
        validate("Quận huyện không được để trống", () => inputs["district"]?.length > 0);
        validate("Phường xã không được để trống", () => inputs["ward"]?.length > 0);
        validate("Đường không được để trống", () => inputs["street"].length > 0);
        validate("Số nhà không được để trống", () => inputs["addressNum"].length > 0);
        return errors;
    };

    const createAddress = async () => {
        const data = buildAddressData();
        const errors = validateInputs(data);

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const method = id === "create" ? "POST" : "PUT";
            setErrors([]);
            if (method === "POST") {
                const response = await addressApi.postAddress(data);
                const addressId = response.data;
                window.location.href = `/user/address/${addressId}`;
            } else {
                await addressApi.putAddress(id, data);
                const modal = {
                    title: "Cập nhật thành công",
                    message: "Cập nhật địa chỉ mới thành công",
                    confirm: null,
                };
                store.dispatch(buildModal(modal));
            }
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Loader show={loading || reloading} message={<Spinner />}>
            <header className={styles.header}>
                <FaBook />
                &nbsp;&nbsp;{id === "create" ? "THÊM ĐỊA CHỈ" : "SỬA ĐỊA CHỈ"}
                <div className={styles.buttons}>
                    <Button color="success" onClick={createAddress}>
                        <FaSave />
                        &nbsp;&nbsp;Lưu địa chỉ
                    </Button>
                </div>
            </header>

            {errors.length > 0 ? (
                <p>
                    {errors.map((error) => (
                        <label className={styles.error}>{error}.</label>
                    ))}
                </p>
            ) : null}

            <table className={styles.form}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label>Họ và tên:</Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="receiver-name"
                                id="receiver-name"
                                placeholder="Nhập họ và tên"
                                defaultValue={address != null ? address["receiver_name"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Điện thoại:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="receiver-phone"
                                id="receiver-phone"
                                placeholder="Nhập số điện thoại"
                                defaultValue={address != null ? address["receiver_phone"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Tỉnh/Thành:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="city"
                                id="city"
                                onChange={(e) => setCityId(e.target.value)}
                                value={cityId}
                            >
                                <option value="" hidden>
                                    Chọn Tỉnh/Thành
                                </option>
                                {cities.map((city) => (
                                    <option value={city["id"]} id={`city-${city["id"]}`}>
                                        {city["name"]}
                                    </option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Quận/Huyện:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="district"
                                id="district"
                                onChange={(e) => setDistrictId(e.target.value)}
                                value={districtId}
                            >
                                <option value="" hidden>
                                    Chọn Quận/Huyện
                                </option>
                                {districts.map((district) => (
                                    <option
                                        value={district["id"]}
                                        id={`district-${district["id"]}`}
                                    >
                                        {district["name"]}
                                    </option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Phường/Xã:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="ward"
                                id="ward"
                                onChange={(e) => setWardId(e.target.value)}
                                value={wardId}
                            >
                                <option value="" hidden>
                                    Chọn Phường/Xã
                                </option>
                                {wards.map((ward) => (
                                    <option value={ward["id"]} id={`ward-${ward["id"]}`}>
                                        {ward["name"]}
                                    </option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Đường:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="street"
                                id="street"
                                placeholder="Nhập tên đường"
                                defaultValue={address != null ? address["street"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Địa chỉ:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="address-num"
                                id="address-num"
                                rows="3"
                                placeholder="Nhập địa chỉ (hẻm, số nhà)"
                                defaultValue={address != null ? address["address_num"] : null}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Loader>
    );
};

export default EditAddressPage;
