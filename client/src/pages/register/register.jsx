import"./register.css"
import { useRef } from 'react'
import {registerCall} from '../../api/apiCalls'
import { useHistory } from "react-router"

function Register() {
    const history = useHistory()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const passwordAgain = useRef()
    const onSubmit= async (e)=>{
        e.preventDefault()
        //returning error?
        if(passwordAgain.current.value !== password.current.value) { password.current.customValidity("passwords don't match")} 
        else{
            const user = {
                username: username.current.value,
                firstName : firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value
            }
            const res = await registerCall(user)
            console.log(res)
            if(res){history.push("/login")}
        } 
        
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Facebook
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={onSubmit}>
                        <input type="text" className="loginInput" placeholder="Username" ref={username} required/>
                        <input type="text" className="loginInput" placeholder="firstName" ref={firstName} required/>
                        <input type="text" className="loginInput" placeholder="lastName" ref={lastName} required/>
                        <input type="email" className="loginInput" placeholder="Email" ref={email} required/>
                        <input type="password" className="loginInput" placeholder="Password" ref={password} required/>
                        <input type="password" className="loginInput" placeholder="Password Again" ref={passwordAgain} required/>
                        <button type="submit" className="loginButton">Sign Up</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
