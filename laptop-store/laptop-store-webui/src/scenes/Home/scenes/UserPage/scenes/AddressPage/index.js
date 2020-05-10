import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import { getCookie } from "../../../../../../services/helper/cookie";

class AddressPage extends Component {

    state = {
        addressList: [],
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("/api/addresses/me", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });

        if (response.ok) {
            const addressList = await response.json();
            this.setState({
                addressList: addressList,
            });
        }
        else {
            const status = parseInt(response.status);
            switch (status) {
                case 403:
                    this.setState({
                        error: "Not permission",
                        loading: false
                    });
                    break;
                case 401:
                    alert('You have to login to access this page.')
                    window.location.href = "/auth/login";
                    break;
                default:
                    this.setState({
                        error: "Server error",
                        loading: false
                    });
            }
        }
    };
    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBook />
                        &nbsp;&nbsp;SỔ ĐỊA CHỈ
                    </label>
                    <Link to=
                        {{
                            pathname: '/user/address/create',
                            state: {
                                address: null,
                            }
                        }}>
                        <Button color="success" className={styles.submit}>
                            Thêm địa chỉ
                        </Button>
                    </Link>

                </div>

                {
                    this.state.addressList.map((address) => (
                        <AddressBlock address={address} />
                    ))
                }



            </Fragment >
        );
    }
}
export default AddressPage;
