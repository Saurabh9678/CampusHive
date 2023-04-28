const express = require("express");
const {
  getMessages,
  getAllTags,
  getMessagesByTag
} = require("../controllers/messageController");


const router = express.Router();



router.route("/messages").post(getMessages);
router.route("/tags").get(getAllTags);
router.route("/tags/:tag").get(getMessagesByTag);



module.exports = router;