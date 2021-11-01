import {Children, createContext , useReducer} from 'react'

const INITIAL_STATE = {
    user:null,
    isFetching:false,
    error:false
}

export const Context = createContext(INITIAL_STATE) 

export const ContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(Context, INITIAL_STATE)
    return(
        <Context.Provider 
        value={{
            user:state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
            }}>
                {children}
        </Context.Provider>
    )
}