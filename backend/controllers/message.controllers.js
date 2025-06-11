import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    if(!conversation){
        conversation = new Conversation({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = new Message( {
        senderId,
        receiverId,
        message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will make both run parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    // Populate the conversation with the new message

    res.status(201).json({
      message: "Message sent successfully",
      data: {
        conversationId: conversation._id,
        message: newMessage,
      },
    });

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const {id:userToChatId} = req.params;
    const userId = req.user._id;
    // Find the conversation between the two users
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, userToChatId] }
    }).populate("messages")  //  not reference but actual messages
     
    if(!conversation) {
      return res.status(404).json({});
    }

    const messages = conversation.messages;

    res.status(200).json(messages)

    res.status(200).json(conversation.messages)
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// continue from 1:24:54