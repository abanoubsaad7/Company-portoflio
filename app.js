// Start the server
const port = 6500;

const express = require("express");
const multer = require("multer");

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const streamifier = require("streamifier"); // Add the 'streamifier' package
const stream = require("stream");

const fs = require("fs");

// mongoose
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://AbanoubSaad:dev@cluster0.yoqimye.mongodb.net/company-portoflio-george-fawzy?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error!", err);
  });

//middleare for auth
//session set up
const session = require("express-session");

//token
const jwt = require("jsonwebtoken");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Generate JWT token
const generateToken = (user) => {
  const secretKey = "marigerges-e3dadi-taio"; // Replace with your own secret key
  const payload = {
    userId: user._id,
    username: user.username,
    // Include any additional data you want in the token payload
  };
  const options = {
    expiresIn: "20h", // Token expiration time
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.session.token;

  console.log(
    "req.headers.authorization in verfiy token middleware :>> ",
    req.headers.authorization
  );

  if (!token) {
    return res.json({ msg: "No token provided" });
  }

  // Verify the token here
  const secretKey = "marigerges-e3dadi-taio"; // Replace with your own secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    const userId = decoded.userId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send("Invalid token after decoded");
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        console.error("Error verifying token:", err);
        res.status(500).send("An error occurred while verifying the token");
      });
  });
};

app.get("/", (req, res) => {
  res.send("hello to company portoflio system");
});

app.post("/add-user", async function (req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const resultUser = await newUser.save();

  res.json({ msg: "account created successfully", user: resultUser });
});

app.post("/login", function (req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne(user)
    .then((result) => {
      if (result) {
        const token = generateToken(result);
        req.session.token = token;
        res.json({ success: true, token: token, msg: "log in successfully" });
        console.log({
          success: true,
          token: token,
          msg: "log in successfully",
        });
        console.log("req.session.token in login :>> ", req.session.token);
      } else {
        res.json({ success: false, msg: " log in faild" });
        console.log({ success: false, msg: " log in faild" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//======================= routes ========================================
const displayRoutes = require("./routes/displayDataRoutes");
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const accountsRoutes = require('./routes/accountsRoutes')

//===================== app.use routes =============================================
app.use("/display", displayRoutes);
app.use('/aboutUs',aboutUsRoutes);
app.use('/accounts',accountsRoutes)
