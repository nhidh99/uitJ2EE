import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import styles from "./styles.module.scss";

class ProductForm extends Component {
    render() {
        return (
            <table borderless className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Sản phẩm:</td>
                        <td>
                            <Input type="text" id="name" placeholder="Tên sản phẩm" />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Đơn giá:</td>
                        <td>
                            <InputGroup>
                                <Input type="text" id="unit-price" placeholder="Đơn giá" />
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
                                <Input type="text" id="discount-price" placeholder="Giảm giá" />
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
                                <Input type="text" id="quantity" placeholder="Số lượng" />
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
                                <option hidden>Nhãn hiệu</option>
                                <option value="acer">Acer</option>
                                <option value="dell">Dell</option>
                                <option value="lenovo">Lenovo</option>
                            </Input>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>CPU:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <Input type="select">
                                    <option>Intel Core i7</option>
                                    <option>Intel Core i5</option>
                                    <option>Intel Core i3</option>
                                    <option>Intel Celeron/Pentium</option>
                                    <option>AMD</option>
                                </Input>
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
                                    <option>4 GB</option>
                                    <option>8 GB</option>
                                    <option>16 GB</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option>DDR4</option>
                                    <option>DDR3</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option>2133 MHz</option>
                                    <option>2400 MHz</option>
                                    <option>2666 MHz</option>
                                    <option>3000 MHz</option>
                                    <option>3200 MHz</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option>Không hỗ trợ nâng cấp</option>
                                    <option>On Board +1 khe RAM</option>
                                </Input>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Ổ cứng:</td>
                        <td className={styles.inputsCol}>
                            <span>
                                <Input type="select">
                                    <option>SSD</option>
                                    <option>HDD</option>
                                </Input>
                            </span>
                            <span>
                                <Input type="select">
                                    <option>128 GB</option>
                                    <option>256 GB</option>
                                    <option>512 GB</option>
                                    <option>1 TB</option>
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
                                        <option>13.3</option>
                                        <option>14</option>
                                        <option>15.6</option>
                                        <option>17.3</option>
                                    </Input>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>inch</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </span>

                            <span>
                                <Input type="select" id="monitor">
                                    <option>Tùy chỉnh độ phân giải</option>
                                    <option>HD (1280×720)</option>
                                    <option>WXGA (1280×800)</option>
                                    <option>WXGA (1366×768)</option>
                                    <option>WXGA+ (1440x900)</option>
                                    <option>HD+ (1600×900)</option>
                                    <option>Full HD (1920×1080)</option>
                                    <option>2K (2560×1440)</option>
                                    <option>3K (3200×1800)</option>
                                    <option>4K (3840×2160)</option>
                                </Input>
                            </span>

                            <span>
                                <InputGroup>
                                    <Input type="text" maxLength="4" />
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>x</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" maxLength="4" />
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
                                <input type="checkbox" name="promotions" value="1422052" />
                                &nbsp;1422052 - Balo Laptop Acer
                                <br />
                                <input type="checkbox" name="promotions" value="1521032" />
                                &nbsp;1502441 - Balo Laptop Dell
                                <br />
                                <input type="checkbox" name="promotions" value="1521032" />
                                &nbsp;1521032 - Chuột không dây
                                <br />
                                <input type="checkbox" name="promotions" value="1552854" />
                                &nbsp;1552854 - Office 365 Home
                                <br />
                                <input type="checkbox" name="promotions" value="1552854" />
                                &nbsp;1552857 - Office 365 Professional
                                <br />
                                <label>
                                    <input type="checkbox" name="promotions" value="1552854" />
                                    &nbsp;1552858 - Office 365 Education
                                </label>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Loại sản phẩm:</td>
                        <td>
                            <div className={styles.checkboxes}>
                                <input type="checkbox" name="tags" value="1422052" />
                                &nbsp;Học tập - văn phòng
                                <br />
                                <input type="checkbox" name="tags" value="1521032" />
                                &nbsp;Đồ họa - Kĩ thuật
                                <br />
                                <input type="checkbox" name="tags" value="1521032" />
                                &nbsp;Laptop Gaming
                                <br />
                                <input type="checkbox" name="tags" value="1552854" />
                                &nbsp;Cao cấp sang trọng
                                <br />
                                <input type="checkbox" name="promotions" value="1552854" />
                                &nbsp;Mỏng nhẹ
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Hình ảnh:</td>
                        <td>
                            <Input
                                type="file"
                                accept="image/*"
                                id="image"
                                placeholder="Chọn hình ảnh"
                                onChange={previewImage}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}></td>
                        <td>
                            <img
                                id="image-preview"
                                alt="Xem trước ảnh sản phẩm"
                                className={styles.imgPreview}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const previewImage = () => {
    const input = document.getElementById("image");
    const preview = document.getElementById("image-preview");

    if (input.files.length > 0) {
        preview.src = window.URL.createObjectURL(input.files[0]);
        preview.style.display = "block";
    } else {
        preview.src = null;
        preview.style.display = "none";
    }
};

export default ProductForm;
