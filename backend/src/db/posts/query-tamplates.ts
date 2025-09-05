export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const insertPostTemplate = `
INSERT INTO posts (title, body, user_id)
VALUES (?, ?, ?)
`;

export const deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;
