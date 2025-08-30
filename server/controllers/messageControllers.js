import imagekit from "../config/imagekit.js";
import Chat from "../models/chat.js";   // ✅ Capitalized model
import User from "../models/User.js";
import axios from "axios";
import openai from "../config/opanai.js"

// Text-based AI Chat Message Controller

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    //check credits
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "you don't have enough credits to use this feature",
      });
    }

    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });  // ✅ Use Chat
    chat.messages.push({                                       // ✅ messages (plural)
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };
    res.json({ success: true, reply });

    chat.messages.push(reply);   // ✅ messages (plural)
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Image Generation message Controller

export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    //check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "you don't have enough credits to use this feature",
      });
    }
    const { prompt, chatId, isPublished } = req.body;
    //Find chat
    const chat = await Chat.findOne({ userId, _id: chatId });   // ✅ Use Chat
    //push user message
    chat.messages.push({                                       // ✅ messages (plural)
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    //Encode the prompt
    const encodePrompt = encodeURIComponent(prompt);

    //construct ImageKit AI generation URL
    const generatedImageUrl = `${
      process.env.IMAGEKIT_URL_ENDPOINT
    }/ik-genimg-prompt-${encodePrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    //Trigger generation by fetching
    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    //Convert to Base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    //upload to Imagekit Media Library
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "quickgpt",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };
    res.json({ success: true, reply });

    chat.messages.push(reply);   // ✅ messages (plural)
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
