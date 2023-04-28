const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:[true,"Please Provide message tag"]
    },
    messages: [
        {
            message: {
                type: String,
                required: [true, "please provide the message"]
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: [true, "please provide your user"]
            },
            timestamp: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = mongoose.model("Message", messageSchema);
