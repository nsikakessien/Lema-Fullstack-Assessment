import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersWithAddersTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<any>(
      selectUsersWithAddersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, rows) => {
        if (error) {
          reject(error);
          return;
        }
        const usersMap: Record<number, User> = {};
        rows.forEach((row) => {
          if (!usersMap[row.id]) {
            usersMap[row.id] = {
              id: row.id,
              name: row.name,
              username: row.username,
              email: row.email,
              phone: row.phone,
              adders: {},
            };
          }
          if (row.adderKey && row.adderValue) {
            usersMap[row.id].adders[row.adderKey] = row.adderValue;
          }
        });
        resolve(Object.values(usersMap));
      }
    );
  });
