import"./login.css"
import {useRef} from 'react'

const Login = ({fetchData}) => {
    const email = useRef();
    const password = useRef();
    const handleClick = (e) =>{
        e.preventDefault();
        console.log("clicked")
        fetchData()
    }
    return (
        
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="logi">Connect with friends and the world around you on Facebook
                    </span>
                </div>
                <div className="loginRight" >
                    <form className="loginBox">
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
                        <button type="submit" className="loginButton" onClick={handleClick}>Log IN</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login
