const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const cors = require("cors");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/dbx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  expressSession({
    secret: "node secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.userId; // Use res.locals instead of a global variable
  next();
});

// Controllers
const indexController = require("./controllers/indexController");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");
const storeUserController = require("./controllers/storeUserController");
const loginUserController = require("./controllers/loginUserController");
const logoutController = require("./controllers/logoutController");
const homeController = require("./controllers/homeController");
const apiController = require("./controllers/apiController");

// Middleware for routes
const redirectIfAuth = require("./middleware/redirectIfAuth");
const authMiddleware = require("./middleware/authMiddleware");

// Routes
app.get("/", indexController);
app.get("/home", authMiddleware, homeController);
app.get("/login", redirectIfAuth, loginController);
app.get("/register", redirectIfAuth, registerController);
app.post("/user/register", redirectIfAuth, storeUserController);
app.post("/user/login", redirectIfAuth, loginUserController);
app.get("/logout", logoutController);
app.get("/api/user/:id", apiController.getUserData);

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.set("views", path.join(__dirname, "views"));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/home-login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home-login.html"));
});

app.listen(4001, () => {
  console.log("App listening on port 4001");
});
