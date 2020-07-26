import React, { Fragment } from "react";
import { Input } from "reactstrap";

const RAMInput = (props) => {
    const { ram } = props;
    return (
        <Fragment>
            <span>
                <Input id="ramSize" type="select" defaultValue={ram?.["size"]}>
                    <option value="4">4 GB</option>
                    <option value="8">8 GB</option>
                    <option value="16">16 GB</option>
                </Input>
            </span>
            <span>
                <Input id="ramType" type="select" defaultValue={ram?.["type"]}>
                    <option value="DDR4">DDR4</option>
                    <option value="DDR3">DDR3</option>
                </Input>
            </span>
            <span>
                <Input id="ramBus" type="select" defaultValue={ram?.["bus"]}>
                    <option value="2133">2133 MHz</option>
                    <option value="2400">2400 MHz</option>
                    <option value="2666">2666 MHz</option>
                    <option value="3000">3000 MHz</option>
                    <option value="3200">3200 MHz</option>
                </Input>
            </span>
            <span>
                <Input id="ramExtraSlot" type="select" defaultValue={ram?.["extra_slot"]}>
                    <option value="0">Không hỗ trợ nâng cấp</option>
                    <option value="1">On Board +1 khe RAM</option>
                </Input>
            </span>
        </Fragment>
    );
};

export default RAMInput;
