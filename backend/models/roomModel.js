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
        required: [true, "provide if empty or not"]
    },
    default: false
});

module.exports = mongoose.model("Room", roomSchema);
