import React, { Component } from "react";
import styles from './styles.module.scss';
import logo from '../../resources/logo.jpg';
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { createCookie } from "../../../../services/helper/cookie";
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: true
        }
    }

    login = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        this.processLogin(username, password);
    }

    processLogin = async (username, password) => {
        const url = "/api/auth/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            })
        });

        if (response.ok) {
            const token = await response.text();
            alert('Login successful');
            createCookie('access_token', token);
            window.location.href = "/";
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
                        <div className={styles.form}>
                            <div className={styles.form_body}>
                                <div className={styles.title}>
                                    <p><b>Login with your Email or </b><a href="./register">Sign Up</a></p>
                                </div>
                                <div className={styles.username}>
                                    <section><IoMdMail></IoMdMail></section>
                                    <input type="text" name="username" id="username" placeholder="Username"></input>
                                </div>
                                <div className={styles.password}>
                                    <section><FaLock></FaLock></section>
                                    <input type="password" name="password" id="password" placeholder="Password"></input>
                                </div>
                                <div className={styles.status} name="status">{status}</div>
                            </div>
                            <div className={styles.form_bottom}>
                                <div className={styles.form_submit}>
                                    <a href="./forgot">Forgot your password?</a>
                                    <button name="submit" onClick={this.login}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;