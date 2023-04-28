const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
                default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        }
    ]
});

module.exports = mongoose.model("Message", messageSchema);
