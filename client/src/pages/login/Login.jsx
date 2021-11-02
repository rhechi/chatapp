import"./login.css"
import {useRef , useContext } from 'react'
import { loginCall } from "../../api/apiCalls";
import {Context} from '../../contextAPI/Context'
import { Redirect } from "react-router";

const Login = () => {
    const {user,isFetching,error,dispatch} =  useContext(Context)
    const email = useRef();
    const password = useRef();


    const onSubmit = (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value ,password:password.current.value},dispatch)
    }

    console.log(user? true : false)
    return (
        
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Facebook
                    </span>
                </div>
                <div className="loginRight" >
                    <form className="loginBox" onSubmit={onSubmit}>
                    <input type="email" 
                        className="loginInput" 
                        placeholder="Email" 
                        ref={email}
                        required
                     />
                    <input type="password" 
                        className="loginInput" 
                        minLength="6"
                        placeholder="Password" 
                        ref={password}
                        required
                     />
                    <button type="submit" className="loginButton" disabled={isFetching}>{isFetching?"loading": "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">{isFetching?"loading":"Create a New Account"}</button>
                        
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login
