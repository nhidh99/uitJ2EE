import React, { Component } from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";
import {
    convertCPUType,
    convertResolutionType,
    convertBrandType,
} from "../../../../../../services/helper";

class DetailBlock extends Component {
    render() {
        const { product } = this.props;
        const { cpu, ram, hard_drive, monitor } = product;
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th>Thương hiệu</th>
                        <td>{convertBrandType(product["brand"])}</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>{`${convertCPUType(cpu["type"])} ${cpu["detail"]}, ${
                            cpu["speed"]
                        } GHz`}</td>
                    </tr>
                    <tr>
                        <th>RAM</th>
                        <td>{`${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz (${
                            ram["extra_slot"] === 0
                                ? "Không hỗ trợ nâng cấp"
                                : "On board +1 khe RAM"
                        })`}</td>
                    </tr>
                    <tr>
                        <th>Ổ cứng</th>
                        <td>
                            {`${hard_drive["type"]} 
                            ${hard_drive["size"] === 1024 ? "1 TB" : `${hard_drive["size"]} GB`} 
                            ${hard_drive["detail"]}`}
                        </td>
                    </tr>
                    <tr>
                        <th>Màn hình</th>
                        <td>
                            {`${monitor["size"]} inch,
                            ${convertResolutionType(monitor["resolution_type"])} 
                            (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`}
                        </td>
                    </tr>
                    <tr>
                        <th>Card màn hình</th>
                        <td>{product["graphics_card"]}</td>
                    </tr>
                    <tr>
                        <th>Cổng kết nối</th>
                        <td>{product["ports"]}</td>
                    </tr>
                    <tr>
                        <th>Hệ điều hành</th>
                        <td>{product["os"]}</td>
                    </tr>
                    <tr>
                        <th>Thiết kế</th>
                        <td>{product["design"]}</td>
                    </tr>
                    <tr>
                        <th>Kích thước</th>
                        <td>{`Dày ${product["thickness"]} mm, ${product["weight"]} kg`}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default DetailBlock;
