import React, { Component } from "react";
import logo from '../../resources/logo.jpg';
import { IoMdMail } from "react-icons/io";
import styles from './styles.module.scss';

class ForgotPage extends Component {
    render() {
        return (
            <div className={styles.forgot_password}>
                <div className={styles.body}>
                    <div className={styles.login_form}>
                        <div className={styles.logo}>
                            <a href="/">
                                <img src={logo}></img>
                            </a>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.form_body}>
                                <div className={styles.title}>
                                    <p><b>Forgot your password? </b><br></br>
                                        Enter your email address:
                                    </p>
                                </div>
                                <div className={styles.email}>
                                    <section><IoMdMail></IoMdMail></section>
                                    <input type="text" name="email" placeholder="Email"></input>
                                </div>
                                <div className={styles.status} name="status">Your email is invalid!</div>
                            </div>
                            
                            <div className={styles.form_bottom}>
                                <div className={styles.form_submit}>
                                    <a href="./login"><button name="back" className={styles.button_back}>Back</button></a>
                                    <button name="submit" className={styles.button_forgot}>Get Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPage;