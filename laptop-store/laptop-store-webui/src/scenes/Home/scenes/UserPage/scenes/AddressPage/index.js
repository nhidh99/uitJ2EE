import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
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
        const response = await fetch("/api/address/me", {
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
                    <Button color="success" className={styles.submit}>
                        Thêm địa chỉ
                    </Button>
                </div>

                {this.state.addressList.map((address) => ( 
                    
                    <AddressBlock
                    receiverName={address['receiver_name']}
                    address={address['address_num'] + ' ' + address['street'] + ' ' + address['ward'] + ' ' + address['district'] + ' ' + address['city']}
                    telephone={address['phone']} />
                ))}
                
                <AddressBlock
                    receiverName="ĐINH HOÀNG NHI"
                    address="KTX Khu B ĐHQG Phường Đông Hòa Thị xã Dĩ An Bình Dương"
                    telephone="0336251885" />
                <AddressBlock
                    receiverName="ĐINH HOÀNG NHI"
                    address="KTX Khu B ĐHQG Phường Đông Hòa Thị xã Dĩ An Bình Dương"
                    telephone="0336251885" />


            </Fragment>
        );
    }
}
export default AddressPage;
