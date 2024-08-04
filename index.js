const express = require("express");
const app = express();
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const port = 9090;
const bodyParser = require("body-parser");
const path = require("path");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: uuidv4(), username: "satish chandra", content: "i Love tea" },
  { id: uuidv4(), username: "chandra", content: "i Love chandra's" },
  { id: uuidv4(), username: "devil", content: "i Love night" },
  { id: uuidv4(), username: "White", content: "i Love day" },
];

// ===================== ROOT Routes===========>
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// ===================== CREATE A NEW POST Routes===========>
app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({
    id: id,
    username: username,
    content: content,
  });
  res.redirect("/posts");
});

// =====View In Specific Id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("show", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// =====Modify each specific post through id
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);

  post.content = newContent;
  res.redirect("/posts");
});

// =====Edit a specific post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("edit.ejs", { post });
});
// ==================delete Route========>
app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  // res.send("delete ho gya");
  res.redirect("/posts");
});
// ======PORT IS RUNNING ======>
app.listen(port, () => {
  // console.log("port is listening");
});
