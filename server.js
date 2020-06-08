const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

const myPosts = [
  { id: 1, title: "post 1", content: "Lorem Ipsum 1" },
  { id: 2, title: "my post 2", content: "Lorem Ipsum 2" },
  { id: 3, title: "my post 3", content: "Lorem Ipsum 3" },
];

app.get("/", (req, res) => res.send("My blog app"));

app.get("/posts", (req, res) => res.json(myPosts));

app.get("/posts/:id", (req, res) => {
  const postId = myPosts.find((post) => post.id === parseInt(req.params.id));
  if (!postId) {
    res.status(404).json({ error: "post not found" });
  }
  res.json(postId);
});

app.post("/posts/new", (req, res) => {
  const lastItem = myPosts[myPosts.length - 1];
  const lastId = lastItem.id;
  const post = {
    id: lastId + 1,
    title: req.body.title,
    content: req.body.content,
  };
  myPosts.push(post);
  res.send(post);
});

app.get("/2", (req, res) =>
  res.send(
    `<h1>Some Title</h1>
    <a href=\'/2/newsletter\'>Newsletter</a>`
  )
);

app.get("/2/newsletter", (req, res) => {
  res.send(`
  <form action="/2/newsletter" method="post">
    <input type="email" name="email"><input type="submit">
  </form>`);
});

app.post("/2/newsletter", (req, res) => {
  res.json({
    status: 200,
    email: req.body.email,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
