import { Router, Request, Response } from "express";
import { addPost, deletePost, getPosts } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;

  if (!title || !body || !userId) {
    res.status(400).send({ error: "title, body and userId are required" });
    return;
  }

  try {
    await addPost(title, body, userId);
    res.status(201).send({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    await deletePost(postId);
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error: any) {
    if (error.message === "Post not found") {
      res.status(404).send({ error: "Post not found" });
    } else {
      res.status(500).send({ error: "Failed to delete post" });
    }
  }
});

export default router;
