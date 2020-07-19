/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "reactstrap";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import store from "../../../../../../services/redux/store";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultAddressId = store.getState()["address"]["default-id"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await userApi.getCurrentUserAddresses();
            const data = response.data;
            const defaultAddress = data.find((address) => address.id === defaultAddressId);
            const addresses = data.filter((address) => address !== defaultAddress);
            if (defaultAddress) {
                addresses.unshift(defaultAddress);
            }
            setAddresses(addresses);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaBook />
                    &nbsp;&nbsp;SỔ ĐỊA CHỈ
                </label>

                <Link to={{ pathname: "/user/address/create" }}>
                    <Button color="success" className={styles.submit}>
                        Thêm địa chỉ
                    </Button>
                </Link>
            </div>

            {addresses.length === 0 ? (
                <EmptyBlock
                    loading={loading}
                    icon={<FaNewspaper />}
                    loadingText="Đang tải sổ địa chỉ"
                    emptyText="Sổ địa chỉ trống"
                />
            ) : (
                addresses.map((address) => (
                    <AddressBlock address={address} isDefault={defaultAddressId === address.id} />
                ))
            )}
        </Fragment>
    );
};

export default AddressPage;
