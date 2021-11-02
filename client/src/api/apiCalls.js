import axios from 'axios'

export const loginCall = async (creds,dispatch) =>{
    dispatch({type: "LOGIN_START"})
    try {
        const res = await axios.post("/auth/login",creds)
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE",payload: err})
    }
}


export const registerCall = async (user)=>{
    try {
        const res = await axios.post("/auth/register",user)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}
