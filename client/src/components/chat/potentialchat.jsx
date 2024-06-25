import { useContext } from "react";
import { chatContext } from "../../../context/chatContext";
import { AuthContext } from "../../../context/AuthContect";

const PotentialChats = () => {
    const {user} = useContext(AuthContext)
    const {potentialChat, createChat} = useContext(chatContext)
    return 
    (
    <>
    <div className="all-users">
        {potentialChat && potentialChat.map((u, index) => {
          return (
            <div className="single-user" key={index} 
            onClick={() => {createChat(user._id, u._id)}}>
            (u.name)
            <span className="user-online"></span>
        </div>
          )
        })}
    </div>
    </>
    )
}
 
export default PotentialChats;