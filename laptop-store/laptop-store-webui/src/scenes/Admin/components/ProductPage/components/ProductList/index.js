import React, { Component, useState, Fragment } from "react";
import {
    Button,
    Table,
    ButtonGroup,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
} from "reactstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import styles from "./styles.module.scss";

class ProductList extends Component {
    render() {
        return (
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã sản phẩm</th>
                        <th className={styles.nameCol}>Tên sản phẩm</th>
                        <th className={styles.priceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112843</td>
                        <td className={styles.nameCol}>
                            Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                            DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)
                        </td>
                        <td className={styles.priceCol}>16,900,000đ</td>
                        <td className={styles.quantityCol}>20</td>
                        <td>
                            <ButtonGroup>
                                <ButtonGroup>
                                    <RemoveProductModal
                                        productName="Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                                        DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)"
                                    />
                                    <UpdateProductModal />
                                </ButtonGroup>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112845</td>
                        <td className={styles.nameCol}>
                            Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                            DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)
                        </td>
                        <td className={styles.priceCol}>14,900,000đ</td>
                        <td className={styles.quantityCol}>12</td>
                        <td>
                            <ButtonGroup>
                                <RemoveProductModal
                                    productName="Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                                        DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)"
                                />
                                <UpdateProductModal />
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

const RemoveProductModal = ({ productId, productName }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button className={styles.button} color="danger" onClick={toggle}>
                <FaTrash />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaTrash />
                    &nbsp;&nbsp;Xóa sản phẩm
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa sản phẩm <b>{productName}</b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

const UpdateProductModal = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button className={styles.button} color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaPen />
                    &nbsp;&nbsp;Cập nhật sản phẩm
                </ModalHeader>

                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </ModalBody>

                <ModalFooter>
                    <Button color="primary">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default ProductList;
