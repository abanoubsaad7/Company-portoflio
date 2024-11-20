const express = require("express");
const router = express.Router();

//================== require models for this routes ======================
const AboutUs = require("../models/adoutUsContentModel");

//===================== add content ==================================
router.post('/add', async  function (req, res) {
  const aboutUsContent = new AboutUs(req.body)

  const aboutUsContentResult = await aboutUsContent.save()

  console.log('aboutUsContentResult :>> ', aboutUsContentResult);
  res.json({ msg: "countent created successfully", aboutUsContentResultObj: aboutUsContentResult });
})
module.exports = router;