import { createContext, useReducer, ReactNode } from "react";
import { LoginReducer } from "./loginReducer";




export const loginContext = createContext(null);


const LoginProvider = ({children}: {children: ReactNode} ) => {
    const initialState = {
        user: null   
    }
//CREAR TIPO REDUCER
    // const [state, dispatch] = useReducer(LoginReducer, initialState);



}