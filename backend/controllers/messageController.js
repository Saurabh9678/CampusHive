const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Message = require("../models/messageModel");

//Register user
exports.getMessages = catchAsyncErrors(async (req, res, next) => {
  const { tag, messageData } = req.body;
  const mes = {
    message: messageData.message,
    user: messageData.user,
    // timestamp: messageData.timestamp,
  };
  const allMessage = await Message.findOne({ tag });
  if (!allMessage) {
    const m = await Message.create({
      tag,
      messages: [mes],
    });

    res.status(200).json({
      success: true,
      tag: m.tag,
      messages: m.messages,
      error: "",
    });
  } else {
    allMessage.messages.push(mes);
    await allMessage.save();
    res.status(200).json({
      success: true,
      tag: allMessage.tag,
      messages: allMessage.messages,
      error: "",
    });
  }
});

exports.getAllTags = catchAsyncErrors(async (req, res, next) => {
  const tags = await Message.distinct("tag");
  res.status(200).json({
    success: true,
    tags: tags,
  });
});

exports.getMessagesByTag = catchAsyncErrors(async (req, res, next) => {
    const tag = req.params.tag;
    const messages = await Message.findOne({ tag })
      .select('messages')
      .populate('messages.user', 'username');
    if (!messages) {
      return res.status(404).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      messages: messages.messages
    });
  });
  