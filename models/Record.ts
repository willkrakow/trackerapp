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
class Records {
  static async clear(): Promise<any> {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql("delete from records", [],
          (_, result) => {
            resolve(result)
          },
            (error) => {
                reject(error);
                return false
            }
          );
        });
    })
    
  }
  static async create(change: number): Promise<any> {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "insert into records (level_change) values (?)",
            [change],
            (_, result) => {
             resolve(result)
            },
            (error) => {
                reject(error);
                return false
            }
          );
        });

    })
  }

  static async getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("select * from records",
            [],
            (_, results: any) => resolve(results),
            (error) => {
                reject(error);
                return false
            }
        );
      });
    });
  }
}

export default Records;