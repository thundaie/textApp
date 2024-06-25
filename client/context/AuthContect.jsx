import { createContext, useCallback, useEffect, useState } from "react";
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

    const [logInError, setlogInError] = useState(null)
    const [isLogInLoading, setisLogInLoading] = useState(false)

    const [logInInfo, setLogInInfo] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        const user = localStorage.getItem("user")

        setUser(JSON.parse(user))
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLogInInfo = useCallback((info) => {
        setLogInInfo(info)
    }, [])

    const registerUser = useCallback(async(e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/signup`, JSON.stringify(registerInfo))
        
        setIsRegisterLoading(false)
        
        if(response.error){
            return setRegisterError(response)
        }
        localStorage.setItem("user", JSON.stringify(response))

        setUser(response)
    }, [registerInfo])



    const logInUser = useCallback(async (e) => {
        e.preventDefault()
        setisLogInLoading(true)
        setlogInError(null)

        const response = await postRequest(
            `${baseUrl}/users/signin`, 
            JSON.stringify(logInInfo)
        )

        setisLogInLoading(false)

        if(response.error){
            return setlogInError(response)
        }
        localStorage.setItem("user", JSON.stringify(response))

        setUser(response)



    },[logInInfo])

    const logOutUser = useCallback(() => {
        localStorage.removeItem("user")
        setUser(null)
    },[])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        isRegisterLoading,
        logOutUser,
        logInUser,
        logInError,
        logInInfo,
        updateLogInInfo,
        isLogInLoading
    }}>
        {children}
    </AuthContext.Provider>
}