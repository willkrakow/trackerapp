import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

type VoidDb = {
  transaction: () => {
    executeSql: () => {};
  };
};
function openDatabase(): SQLite.Database | VoidDb {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    } as VoidDb;
  }

  const db = SQLite.openDatabase("database.db") as SQLite.Database;
  return db;
}

const db = openDatabase();
class Notes {
  static async clear(): Promise<any> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "delete from notes",
          [],
          (_, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
  static async create(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "insert into notes (text) values (?)",
          [text],
          (_, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static async getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from notes",
          [],
          (_, results: any) => resolve(results),
          (error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}

export default Notes;
