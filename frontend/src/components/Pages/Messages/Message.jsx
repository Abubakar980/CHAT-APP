import { useAuthContext } from "../../../context/AuthContext";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleColor = fromMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-xl">
          <img
            src="http://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            alt="User avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble rounded-full ${bubbleColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Message;
