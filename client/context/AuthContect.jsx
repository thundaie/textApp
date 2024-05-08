import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../src/utils/services";


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    // const [registerInfo, setRegisterInfo] = useState()

    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const registerUser = useCallback(async() => {
        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/signup`, JSON.stringify(registerInfo))
        
        setIsRegisterLoading(false)
        
        if(response.error){
            return setRegisterError(response)
        }
        localStorage.setItem("user", JSON.stringify(response))

        setUser(response)
    }, [])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
    }}>
        {children}
    </AuthContext.Provider>
}