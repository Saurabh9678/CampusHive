const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    members: [
        {
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            }
        }
    ],
    isEmpty: {
        type: Boolean,
        default: true
    },
    
});

module.exports = mongoose.model("Room", roomSchema);
