const express = require("express");
const {
  getRoom,
  leaveRoom
} = require("../controllers/roomController");


const router = express.Router();



router.route("/joinroom").post(getRoom);
router.route("/leaveroom").post(leaveRoom);




module.exports = router;