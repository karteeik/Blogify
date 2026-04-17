import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ejs from "ejs";
import path from "path";
import { router as userRoute } from "./routes/user.js";
import { router as blogRoute } from "./routes/blog.js";
import { connectToMongodb } from "./connection.js";
import cookieParser from "cookie-parser";
import { checkForAuthentication } from "./middleware/auth.js";
import { Blog } from "./models/blog.js";

const app = express();
const PORT = process.env.PORT || 1010;

app.use(express.urlencoded({ extended: false })); // for form data store
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

connectToMongodb(process.env.MONGO_URL);

// engine specified.....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
