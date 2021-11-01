export const LoginStart = (userCreds) =>({
    type: "Login_START"
})
export const LoginSuccess = (user) =>({
    type: "Login_SUCCESS",
    payload: user
})
export const LoginFailure = (error) =>({
    type: "Login_FAILURE",
    payload:error
})