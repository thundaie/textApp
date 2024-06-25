import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContect";
import { chatContext } from "../../../context/chatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchReciepient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(chatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const { textMessage, setTextMessage } = useState("");

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chat...</p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );
  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message self align-self-end flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>

      <Stack
        direction="horizontal"
        gap={3}
        className="chat-input flex-grow-0"
      ></Stack>
      <InputEmoji
        value={textMessage}
        onChange={setTextMessage}
        fontFamily="nunito"
        borderColor="rgba(72, 112, 223, 0.2)"
      />
    </Stack>
  );[[]]
};

export default ChatBox;
