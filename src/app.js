import express from "express";
import routes from "./routes/index.routes.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.config.js";
import passport from "passport";
import passportMiddleware, { signInGoogle } from "./middlewares/passport.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
var routesArray = ["/signin", "/", "/signup"];
app.use(
  routesArray,
  session({
    name: "sessionCookie",
    key: "express.sessionID",
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
    },
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

let ALLOWED_ORIGINS = [
  "https://e-commerce-five-mu.vercel.app",
  "https://admin-henryshoes.vercel.app",
];

app.use((req, res, next) => {
  let origin = req.headers.origin;
    let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportMiddleware);
passport.use(signInGoogle);

app.use("/", routes);

export default app;
