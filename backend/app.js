const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://kartik:AFfEkYJotJ1dXWnz@cluster0.b7r4g.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//AFfEkYJotJ1dXWnz;

app.post("/api/accounts", (req, res, next) => {
  const post = new Post({
    title: req.body.firstName,
    content: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  post.save((createdPost) => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id,
    });
  });
});

app.delete("/api/accounts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted !" });
  });
});
app.use("/api/accounts", (req, res, next) => {
  Post.find().then((documents) => {
    return res.status(200).json({
      message: "Posts fetched succesfully.",
      posts: documents,
    });
  });
});

module.exports = app;
