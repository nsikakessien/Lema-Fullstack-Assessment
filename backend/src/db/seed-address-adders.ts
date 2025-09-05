import { connection } from "./connection";

connection.run("DELETE FROM user_adders", (err) => {
  if (err) {
    console.error("Error clearing user_adders:", err);
    return;
  }
  console.log("Cleared user_adders table");

  // Get all users
  connection.all("SELECT id FROM users", (err, users: { id: number }[]) => {
    if (err) {
      console.error("Error fetching users:", err);
      return;
    }

    if (!users.length) {
      console.log("No users found to seed adders");
      return;
    }

    users.forEach((user, idx) => {
      const adders = [
        { key: "street", value: `123${idx} Alagomeji Street` },
        { key: "state", value: `State ${idx}` },
        { key: "city", value: `City ${idx}` },
        { key: "zipcode", value: `1000${idx}` },
      ];

      adders.forEach(({ key, value }) => {
        connection.run(
          "INSERT INTO user_adders (user_id, key, value) VALUES (?, ?, ?)",
          [user.id, key, value],
          (err2) => {
            if (err2) {
              console.error(
                `Error inserting ${key} for user ${user.id}:`,
                err2
              );
            } else {
              console.log(`Inserted ${key} for user ${user.id}`);
            }
          }
        );
      });
    });
  });
});
