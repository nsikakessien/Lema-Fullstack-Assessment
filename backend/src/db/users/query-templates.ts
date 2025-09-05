export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectUsersWithAddersTemplate = `
SELECT u.*, a.key AS adderKey, a.value AS adderValue
FROM users u
LEFT JOIN user_adders a ON u.id = a.user_id
WHERE u.id IN (
  SELECT id FROM users
  ORDER BY name
  LIMIT ?, ?
)
ORDER BY u.name;
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
