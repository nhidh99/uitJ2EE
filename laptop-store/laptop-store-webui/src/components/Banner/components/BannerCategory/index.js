import React from "react";
import { Link } from "react-router-dom";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";

const BannerCategory = ({ href, icon, title }) => (
    <Link to={href}>
        <span className={styles.icon}>{icon}</span>
        <br />
        <Label className={styles.label}>{title}</Label>
    </Link>
);

export default BannerCategory;
