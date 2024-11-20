const express = require("express");
const router = express.Router();

//================== require models for this routes ======================
const Account = require("../models/acountsModel");

//===================== add content ==================================
router.post('/add', async  function (req, res) {
  const accounts = new Account(req.body)

  const accountsResult = await accounts.save()

  console.log('accountsResultResult :>> ', accountsResult);
  res.json({ msg: "countent created successfully", accountsResultObj: accountsResult });
})
module.exports = router;