import { useContext } from "react";
import { chatContext } from "../../context/chatContext";
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/chat/userChat";
import PotentialChats from "../components/chat/potentialchat";
import ChatBox from "../components/chat/chatBox";

const Chat = () => {
    const { user } = useContext(AuthContext)
    const {
        userChat,
        isUserChatLoading,
        userChatError,
        updateCurrentChat
    } = useContext(chatContext)

    return <Container>
        <PotentialChats/>
        {userChat?.length < 1 ? null : <Stack direction="horizontal" gap={4} className="align-item-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
             {isUserChatLoading && <p>Loading Chats...</p>}  
             {userChat?.map((chat, index) => {
                return(
                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user}/>
                    </div>
                )
             })} 

            </Stack>
            <ChatBox/>
            </Stack>}</Container>
}
 
export default Chat;