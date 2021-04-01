const express = require("express");
const path = require("path");
const session = require("express-session");
const redis = require("redis");
const config = require("config");
const redisStore = require("connect-redis")(session);
const passport = require("passport");
const flash = require("req-flash");
const cors = require("cors");

const app = express();

require("../common/setup");
/**
 *
 */
app.use("/assets", express.static(path.resolve("server/public")));
app.use(express.static(path.resolve("client/build")));

/**
 *
 */
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

/**
 *
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 *
 */
app.use(
  cors({
    origin: "*",
  })
);

/**
 * Session
 */
app.use(
  session({
    name: "__connect.sid",
    secret: "ed760a3bd92862d969a67f62e0f0b08855fbef9e",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({
      host: config.get("redis.host"),
      port: config.get("redis.port"),
      client: redis.createClient(),
      ttl: config.get("redis.ttl"),
    }),
  })
);

app.use(flash({ locals: "flash" }));

// Passport Initialized
app.use(passport.initialize());
app.use(passport.session());
require("../common/database");
require("../common/passport");

/**
 *
 */
app.use("/api", require("../routes/api"));
app.use("/", require("../routes/web"));

module.exports = app;
