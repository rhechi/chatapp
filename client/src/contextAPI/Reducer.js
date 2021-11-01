const AuthReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return{
                user: null,
                isFetching: false,
                error: false,
            }
        case "LOGIN_START":
            return{
                user: null,
                isFetching: false,
                error: false,
            }
        default: return state
    }
}