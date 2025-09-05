import { connection } from "./connection";

connection.run("DELETE FROM user_adders", [], (err) => {
  if (err) {
    console.error("Error clearing user_adders table:", err);
    return;
  }

  console.log("Cleared user_adders table");
});
