import * as SQLite from "expo-sqlite";

type PromiseResolve<T> = (value: T) => void;
type PromiseReject = (reason: any) => void;

export class Model<T extends { id: string }> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  private get db() {
    const entity = this.name;
    const db = SQLite.openDatabase(`${entity}.db`);
    return db;
  }

  public async getAll() {
    const db = this.db;
    const data = await new Promise(
      (resolve: PromiseResolve<T[]>, reject: PromiseReject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM ${this.name}`,
            [],
            (_, { rows }) => resolve(rows._array as T[]),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      }
    );

    return data;
  }

  public async getById(id: string) {
    const db = this.db;
    const data = await new Promise(
      (resolve: PromiseResolve<T>, reject: PromiseReject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM ${this.name} WHERE id = ?`,
            [id],
            (_, { rows }) => resolve(rows._array[0] as T),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      }
    );

    return data;
  }

  public async insert(data: T) {
    const db = this.db;
    const { id, ...rest } = data;
    const values = Object.values(rest) as (string | number)[];
    const keys = Object.keys(rest);
    const sql = `INSERT INTO ${this.name} (${keys.join(",")}) VALUES (${keys
      .map(() => "?")
      .join(",")})`;
    const result = await new Promise(
      (resolve: PromiseResolve<T>, reject: PromiseReject) => {
        db.transaction((tx) => {
          tx.executeSql(
            sql,
            values,
            (_, { rows }) => resolve(rows._array[0] as T),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      }
    );

    return result;
  }

  public async delete(id: string) {
    const db = this.db;
    const result = await new Promise(
      (resolve: PromiseResolve<boolean>, reject: PromiseReject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `DELETE FROM ${this.name} WHERE id = ?`,
            [id],
            () => resolve(true),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      }
    );

    return result;
  }

  public async update(data: Partial<T> & { id: string }) {
    const db = this.db;
    const { id, ...rest } = data;
    const values = Object.values(rest) as (string | number)[];
    const keys = Object.keys(rest);
    const sql = `UPDATE ${this.name} SET ${keys
      .map((key) => `${key} = ?`)
      .join(",")} WHERE id = ?`;
    const result = await new Promise(
      (resolve: PromiseResolve<T>, reject: PromiseReject) => {
        db.transaction((tx) => {
          tx.executeSql(
            sql,
            values.concat(id),
            (_, { rows }) => resolve(rows._array[0] as T),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      }
    );

    return result;
  }
}
