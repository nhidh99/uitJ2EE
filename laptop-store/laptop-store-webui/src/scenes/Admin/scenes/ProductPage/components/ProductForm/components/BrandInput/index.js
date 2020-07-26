import React from "react";
import { Input } from "reactstrap";

const BrandInput = (props) => (
    <Input id="brand" type="select" defaultValue={props.defaultValue}>
        <option value="ACER">Acer</option>
        <option value="ASUS">ASUS</option>
        <option value="DELL">DELL</option>
        <option value="HP">HP</option>
        <option value="LENOVO">Lenovo</option>
        <option value="MAC">Mac</option>
        <option value="MSI">MSI</option>
    </Input>
);

export default BrandInput;
