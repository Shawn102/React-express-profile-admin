const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/Usermodel");

dotenv.config();

const LocalStrategy = passportLocal.Strategy;

// Creating my express app
const app = express();
// connecting mongoose to my app
mongoose.connect("mongodb://localhost:27017/reactTodoAuthDB", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Your app successfully connected to mongodb server!");
  }
});

// using the required packages to my "express app"
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "Shawn",
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    // },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

// Register route
app.post("/register", (req, res) => {
  const { username, phone, password, isAdmin, adminPassword } = req.body;
  if (!username || !password) {
    res.send("Improper values please check username or password is valid!");
    return;
  }
  // normal user register
  else if (username && password && !isAdmin) {
    User.findOne({ username }, async (err, foundUser) => {
      if (err) {
        res.send(err);
      } else {
        if (foundUser) {
          res.send("Same username found. Can't register");
        } else if (!foundUser) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = new User({
            username,
            password: hashedPassword,
            phone,
            isAdmin,
          });
          await newUser.save();
          res.send("Successfully registered!");
        }
      }
    });
  }
  // this for admin register
  else if (username && password && isAdmin) {
    if (adminPassword === process.env.forCheckingAdminPassword) {
      User.findOne({ username }, async (err, foundUser) => {
        if (err) {
          res.send(err);
        } else {
          if (foundUser) {
            res.send("Same username found. Can't register.");
          } else if (!foundUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const adminHashedPassword = await bcrypt.hash(adminPassword, salt);
            const newUser = new User({
              username,
              password: hashedPassword,
              phone,
              isAdmin,
              adminPassword: adminHashedPassword,
            });
            await newUser.save();
            res.send("Successfully registered!");
          }
        }
      });
    } else {
      res.send("Admin password is incorrect!");
      return;
    }
  }
});
// login routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send("Please check your username and password!");
    return;
  }
  if (username && password) {
    const logUser = new User({ username, password });
    req.login(logUser, (err) => {
      if (err) {
        res.send(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("Successfully authenticated!");
        });
      }
    });
  }
});

app.get("/logout" , (req, res) => {
  try {
    req.logOut(req.user, (err) => {
      if (err) {
        console.log("error", err);
        res.send(err);
      } else {
        res.send("Successfully logout");
      }
    });
  } catch (e) {
    console.log(e);
  }
})

// creating a home route for my express app
app.get("/", (req, res) => {
  res.send("Hello");
});

// const checkLogin = (req, res, next) => {
//   const { user } = req;
//   if (user) {
//     User.findOne({ username: user.username }, (err, foundUser) => {
//       if (err) {
//         res.send(err)
//       } else {
//         if (foundUser) {
//           res.send("ok you are in");
//         }
//       }
//     });
//   } else {
//     res.send("Sorry your are not logged in!");
//   }
// };
app.get("/users", (req, res) => {
  res.send(req.user);
});

// creating the port for my app
const port = process.env.PORT || 4100;

app.listen(port, () => {
  console.log(`Your app started on port ${port}`);
});
