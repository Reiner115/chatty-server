const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketConnection = require("./websocket/socketConnection");

//express and middlewares
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//config passport
passport.use(require("./config/passport/passportLocalStrategy")());
passport.serializeUser(require("./config/passport/serializeUser"));
passport.deserializeUser(require("./config/passport/deserializeUser"));


app.use(express.static("front-end-build"));
//routes
app.use("/", require("./routes"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
io.use((socket, next) => {
  if (socket.request.user) next();
  else next(new Error("unauthorized"));
});
io.on("connect", (socket) => socketConnection(socket));
const port = process.env.CHAT_PORT || 3002;

server.listen(port  , () =>console.log(`application is running at: http://localhost:${port}`) );
