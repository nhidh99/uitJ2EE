import React, { Component } from "react";
import styles from './styles.module.scss';
import logo from '../../resources/logo.jpg';
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: true
        }
    }
    
    render() {

        const {isError} = this.state;
        let status = ""
        if(isError) {
            status = "Your email or password is incorrect."
            console.log(status);
        }

        return (
            <div className={styles.login}>
                <div className={styles.body}>
                    <div className={styles.login_form}>
                        <div className={styles.logo}>
                            <a href="/">
                                <img src={logo}></img>
                            </a>
                        </div>
                        <form method="POST" className={styles.form}>
                            <div className={styles.form_body}>
                                <div className={styles.title}>
                                    <p><b>Login with your Email or </b><a href="./register">Sign Up</a></p>
                                </div>
                                <div className={styles.username}>
                                    <section><IoMdMail></IoMdMail></section>
                                    <input type="text" name="email" placeholder="Email"></input>
                                </div>
                                <div className={styles.password}>
                                    <section><FaLock></FaLock></section>
                                    <input type="password" name="password" placeholder="Password"></input>
                                </div>
                                <div className={styles.status} name="status">{status}</div>
                            </div>
                            <div className={styles.form_bottom}>
                                <div className={styles.form_submit}>
                                    <a href="./forgot">Forgot your password?</a>
                                    <button type="submit" name="submit">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;