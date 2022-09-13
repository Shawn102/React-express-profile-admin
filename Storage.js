const router = require("express").Router();
const User = require("./models/Usermodel");
// const som = require("../client/public/uploads/profile/")
const multer = require("multer");

// image storage for profile picture uploads
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/profile/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// image storage for cover picture
const stoage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/cover/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  
});

// this for profile picture
const upload1 = multer({ storage: storage1 });
const profileImg = upload1.single("articleImage");
router.route("/uploads/profile").post(profileImg, (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  User.findOneAndUpdate(
    { _id: userId },
    {
      profileimg: req.file.originalname,
    },
    async (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("successfully saved profile image to db!");
      }
    }
  );
});

// this for cover upload
const upload2 = multer({ storage: stoage2 });
const coverImg = upload2.single("coverUpload");
router.route("/uploads/cover").post(coverImg, (req, res) => {
  const currentUserId = req.user.id;
  console.log(currentUserId);
  User.findOneAndUpdate(
    { _id: currentUserId },
    { coverimg: req.file.originalname },
    async (err) => {
      if (err) {
        res.sendStatus(400).json("Can't added image!");
      } else {
        res.send("successfully saved cover image to db!");
      }
    }
  );
});

module.exports = router;
