const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Room = require("../models/roomModel");

exports.getRoom = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body;

  try {
    // Find a room with isEmpty=true
    const room = await Room.findOne({ isEmpty: true }).populate({
      path: "members.userId",
      select: "username",
    });

    if (!room) {
      // If no room is found, create a new one with isEmpty=false
      const newRoom = await Room.create({
        isEmpty: true,
        members: [{ userId }],
      }).populate({
        path: "members.userId",
        select: "username",
      });

      return res.status(200).json({
        success: true,
        roomID: newRoom._id,
        members: newRoom.members,
        error: "",
      });
    }

    // If a room is found, add the user to it and check if it's full
    room.members.push({ userId });

    if (room.members.length === 4) {
      room.isEmpty = false;
    }

    await room.save();

    return res.status(200).json({
      success: true,
      roomID: room._id,
      members: room.members,
      error: "",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error",500));
  }
});

exports.leaveRoom = catchAsyncErrors(async (req, res, next) => {
    const { userId, roomId } = req.body;
  
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return next(new ErrorHandler("Room not found",404));
      }
  
      const memberIndex = room.members.findIndex(
        (member) => member.userId.toString() === userId
      );
      if (memberIndex === -1) {
        return next(new ErrorHandler("User not found in the room",404));
      }
  
      room.members.splice(memberIndex, 1);
      if (room.isEmpty===false) {
        room.isEmpty = true;
      }
      await room.save();
  
      return res.status(200).json({
        success: true,
        message: "User has left the room",
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("Internal server error",500));
    }
  });
  
