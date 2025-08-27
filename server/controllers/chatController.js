import Chat from "../models/Chat.js";

// Create new chat
export const createChat = async (req, res) => {
  try {
    const chatData = {
      userId: req.user._id,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };
    await Chat.create(chatData);
    res.json({ success: true, message: "Chat created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, chats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete chat
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    await Chat.deleteOne({ _id: chatId, userId: req.user._id });
    res.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
