import React, { Component } from "react";
import styles from "./styles.module.scss";
import AdminNavBar from "./components/AdminNavBar";

class Admin extends Component {
    render() {
        return (
            <div className={styles.container}>
                <AdminNavBar />
            </div>
        );
    }
}

export default Admin;
