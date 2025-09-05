import { connection } from "../connection";
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const addPost = (
  title: string,
  body: string,
  userId: string
): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.run(insertPostTemplate, [title, body, userId], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID);
      }
    });
  });

export const deletePost = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
      }
      if (this.changes === 0) {
        reject(new Error("Post not found"));
      }
      resolve();
    });
  });
