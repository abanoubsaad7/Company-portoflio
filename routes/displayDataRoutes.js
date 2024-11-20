const express = require("express");
const router = express.Router();
//================== require models for this routes ======================
const Project = require("../models/projectsModel");
const Account = require("../models/acountsModel");
const AboutUs = require("../models/adoutUsContentModel");


//================= display projects ============================
router.get('/projects', (req, res) => {
  Project.find()
    .then((projects)=>{
        res.json({projectsArr:projects})
    })
    .catch((err)=>{
        console.log('display Project error :>> ', err);
    })
})

//================ display accounts ==================================
router.get('/accounts', (req, res) => {
  Account.findOne()
    .then((accounts)=>{
        res.json({accounts:accounts})
    })
    .catch((err)=>{
        console.log('display accounts error :>> ', err);
    })
})

//=================== display about us content ============================
router.get('/aboutUs', (req, res) => {
  AboutUs.findOne()
    .then((aboutUsContent)=>{
        res.json({aboutUsContentObj:aboutUsContent})
    })
    .catch((err)=>{
        console.log('display about us error :>> ', err);
    })
})
module.exports = router;