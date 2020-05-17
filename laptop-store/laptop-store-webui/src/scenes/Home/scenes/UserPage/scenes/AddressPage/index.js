import React, { Component } from "react";
import { Button, Spinner } from "reactstrap";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";

class AddressPage extends Component {
    state = {
        addresses: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
        });

        if (response.ok) {
            const addresses = await response.json();
            this.setState({ addresses: addresses, loading: false });
        }
    };

    render() {
        const { addresses, loading } = this.state;
        return (
            <Loader
                show={loading}
                message={<Spinner color="primary" />}
                className={styles.loader}
                backgroundStyle={{ backgroundColor: "transparent" }}
            >
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBook />
                        &nbsp;&nbsp;SỔ ĐỊA CHỈ
                    </label>
                    <Link to={{ pathname: "/user/address/create", state: { address: null } }}>
                        <Button color="success" className={styles.submit}>
                            Thêm địa chỉ
                        </Button>
                    </Link>
                </div>

                {addresses.map((address) => (
                    <AddressBlock address={address} />
                ))}
            </Loader>
        );
    }
}
export default AddressPage;
