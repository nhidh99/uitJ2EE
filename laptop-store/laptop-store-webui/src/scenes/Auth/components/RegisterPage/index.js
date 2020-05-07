import React, { Component } from "react";
import styles from './styles.module.scss';
import logo from '../../resources/logo.jpg';
import {FaLock, FaGenderless, FaPhone, FaUser} from 'react-icons/fa';
import {IoMdMail} from 'react-icons/io';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
    }

    register = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        this.processRegister(username, password, email, name, phone);
    }

    processRegister = async (username, password, email, name, phone) => {
        const url = "/api/auth/register";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
                email: email,
                name: name, 
                phone: phone
            })
        });

        if (response.ok) {
            alert('Register successful');
            window.location.href = "/";
        }
    }

    render() {
        return (
           <div className={styles.signup}>
                <div className={styles.body}>
                    <div className={styles.signup_form}>
                        <div className={styles.logo}>
                            <a href="/">
                                <img src={logo}></img>
                            </a>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.form_body}>
                                <div className={styles.title}>
                                    <p><b>Sign up your new account</b></p>
                                </div>
                                <div className={styles.name}>
                                    <section><FaUser></FaUser></section>
                                    <input type="text" name="username" id="username" placeholder="Name"></input>
                                </div>
                                <div className={styles.email}>
                                <section><IoMdMail></IoMdMail></section>
                                    <input type="text" name="email" id="email" placeholder="Email"></input>
                                </div>
                                <div className={styles.phone_number}>
                                    <section><FaPhone></FaPhone></section>
                                    <input type="text" name="phonenumbber" id="name" placeholder="Name"></input>
                                </div>
                                <div className={styles.phone_number}>
                                    <section><FaPhone></FaPhone></section>
                                    <input type="text" name="phonenumbber" id="phone" placeholder="Phone Number"></input>
                                </div>
                                <div className={styles.password}>
                                    <section><FaLock></FaLock></section>
                                    <input type="password" name="password" id="password" placeholder="Password"></input>
                                </div>
                                <div className={styles.repassword}>
                                    <section><FaLock></FaLock></section>
                                    <input type="password" name="password" placeholder="Retype Password"></input>
                                </div>
                                <div className={styles.gender}>
                                    <section><FaGenderless></FaGenderless></section>
                                    <select name="gender">
                                        <option>Man</option>
                                        <option>Woman</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className={styles.form_bottom}>
                                <div className={styles.form_submit}>
                                    <a href="./login">Already Have An Account? Login Here.</a>
                                    <button name="submit" onClick={this.register}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default RegisterPage;