import chat from "../models/chat.js";

// API Controller for creating a new chat

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await chat.create(chatData);
    res.json({ success: true, messages: "Chat created" });
  } catch (error) {
    res.json({ success: false, message: error.messages });
  }
};

// API Controller for getting all chats

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await chat.find({ userId }).sort({ updateAt: -1 });
    res.json({success: true, chats})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
};

// API Controller for deleting a chat

export const deleteChat = async (req, res) => {
     try {
        const userId = req.user._id
        const {chatId} = req.body

        await chat.deleteOne({_id: chatId, userId})

        res.json({success: true, message: 'Chat Deleted'})
     } catch (error) {
        res.json({success: false, message: error.message})
     }
}