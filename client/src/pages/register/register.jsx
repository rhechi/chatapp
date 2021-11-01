import"./register.css"

function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="logi">Connect with friends and the world around you on Facebook
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="text" className="loginInput" placeholder="Username"/>
                        <input type="text" className="loginInput" placeholder="Email"/>
                        <input type="text" className="loginInput" placeholder="Password"/>
                        <input type="text" className="loginInput" placeholder="Password Again"/>
                        <button className="loginButton">Sign Up</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Log into Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
