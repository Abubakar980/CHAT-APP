import { getRandomEmoji } from "../../../utils/emojis";
import useGetConversation from "../../Hooks/useGetConversation";
import Conversation from "./Conversation";
import useConversation from "../../../zustand/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className="overflow-auto">
      {loading ? (
        <p className="text-white px-4">Loading...</p>
      ) : (
        conversations.map((user) => (
          <Conversation
            key={user._id}
            user={user}
            emoji={getRandomEmoji()}
            isSelected={selectedConversation?._id === user._id}
            onClick={() => setSelectedConversation(user)}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;

