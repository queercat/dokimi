import express from "express";
import { Docusnore } from "docusnore";
import { PostService } from "./services/postService";

/* Globals and middleware. */
const app = express();
const store = new Docusnore("store.docusnore");

app.use(express.json());

/* Service DI. */
const postService = new PostService(store);

app.post("/api/post", async (req, res) => {
  const { title, content, author } = req.body;
  await postService.createPost(title, content, author);
  res.sendStatus(200);
});

app.get("/api/posts", async (req, res) => {
  const posts = await postService.getAllPosts();
  res.send(posts);
});

app.listen(process.env.LISTENING_PORT ?? 3000, async () => {
  await store.initStore();
  console.log("Listening on port 3000");
});