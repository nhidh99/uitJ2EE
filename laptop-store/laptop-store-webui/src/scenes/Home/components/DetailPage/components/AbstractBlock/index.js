import React from 'react';
import { Row, Label } from "reactstrap";
import styles from './styles.module.scss'

const AbstractBlock = ({ title, component }) => (
    <section className={styles.section}>
        <Label className={styles.title}>{title}</Label>
        <Row className={styles.info}>{component}</Row>
    </section>
);

export default AbstractBlock;