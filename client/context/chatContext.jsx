import { createContext, useCallback, useEffect, useState } from "react"
import { baseUrl, getRequest, postRequest } from "../src/utils/services"


export const chatContext = createContext()

export const chatContextProvider = ({children, user}) => {
    const [userChat, setUserChat] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [userChatError, setUserChatError] = useState(null)
    const [potentialChat, setPotentialChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)


    useEffect(() => {
        const getUsers = async() => {
            const response = await getRequest(`${baseurl}/users`)

            if(response.error){
                return console.log("Error fetching users", response)
            }

            const pChats = response.filter((u) => {
                let ischatCreated = false

                if(user?._id === u._id) return false

                if(userChat){
                    ischatCreated = userChat?.some((chat) => {
                        return chat.members[0] ===u._id || chat.members[1] === u._id
                    })
                }

                return !ischatCreated
            })
            setPotentialChat(pChats)
        }
        getUsers()
    }, [userChat])


    useEffect(() => {
        const getUserChats = async() => {
            if(user?._id){

                setIsUserChatLoading(true)
                setUserChatError(null)

                const response = await getRequest(`${baseurl}/chats/${user?._id}`)

                setIsUserChatLoading(true)

                if(respose.error){
                    return setUserChatError(response)
                }

                setUserChat(response)
            }
        }

        getUserChats()
    }, [user])


    useEffect(() => {
        const getMessages = async() => {
           

                setIsMessagesLoading(true)
                setMessagesError(null)

                const response = await getRequest(`${baseurl}/messages/${currentChat?._id}`)

                setIsMessagesLoading(false)

                if(respose.error){
                    return setMessagesError(response)
                }

                setMessages(response)
            
        }

        getMessages()
    }, [currentChat])





    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequestRequest(`${baseurl}/chats`, JSON.stringify({
            firstId,
            secondId
        }))
        if(response.error){
            return console.log("error creating Chat", response)
        }
        
        setUserChat((prev) => [...prev, response])
    }, [])

    return <chatContext.Provider value={{
        userChat,
        isUserChatLoading,
        userChatError, 
        potentialChat,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError
    }}>{children}</chatContext.Provider>
}