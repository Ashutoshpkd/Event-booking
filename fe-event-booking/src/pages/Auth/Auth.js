import React, { useRef, useState } from "react";
import classes from './Auth.module.css';

function Auth(props) {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const createUser = async (email, pass) => {
        const requestBody = {
            query: ` 
            mutation {
                createUser(email: "${email}", password: "${pass}") {
                  _id
                  email
                }
              }
        `
        };
        try {
            const response = await fetch('http://localhost:3001/graphql',
             {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('ERROR' - error.message);
            console.log('COMPLETE ERROR', error, JSON.stringify(error));
        }
    }

    const login = async (email, pass) => {
        const requestBody = {
            query: ` 
            query {
                login(email: "${email}", password: "${pass}") {
                  userId
                  expiresIn
                  email
                  token
                }
              }
        `
        };
        try {
            const response = await fetch('http://localhost:3001/graphql',
             {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if(data.data.login.token) {
                const storage = window.sessionStorage;
                storage.setItem('signInToken', data.data.login.token);
                props.loginHandler({token: data.data.login.token, userId: data.data.login.userId});   
            }
        } catch (error) {
            console.log('ERROR' - error.message);
            console.log('COMPLETE ERROR', error, JSON.stringify(error));
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        login(email, password);
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        createUser(email, password);
    }
    
    return (
        <div className={classes.main}>
            <form className={classes.mainform} onSubmit={onSubmitHandler}>
                <div className={classes.form_control}>
                <label className={classes.form_control_label}>Email</label>
                <input type='text' className={classes.form_input} placeholder="Email" ref={emailRef}/>
                </div>
                <div className={classes.form_control}>
                <label className={classes.form_control_label}>Password</label>
                <input type='password' className={classes.form_input} placeholder="Password" ref={passwordRef}/>
                </div>
                <div className={classes.form_control_button}>
                    <button type="submit" className={classes.button}>Login</button>
                    <button type="button" className={classes.button} onClick={signUpHandler}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Auth;