import { DataSource } from "typeorm";
import { Note } from "./note";
import { Record } from "./record";
import React, { createContext, useEffect, useState } from "react";
import { Settings } from "./settings";

export const dataSource = new DataSource({
  database: "mydatabase.db",
  driver: require("expo-sqlite"),
  entities: [Note, Record, Settings],
  synchronize: true,
  type: "expo",
  dropSchema: true,
});

interface IDatabaseContext {
  connection?: DataSource;
}
const DatabaseContext = createContext<IDatabaseContext>({});

export const DatabaseWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<DataSource>();

  useEffect(() => {
    const connect = async () => {
      const conn = await dataSource.initialize();
      setConnection(conn);
      console.log("connected");
    };
    
    if (!connection) {
      connect();
    }

    return () => {
      if (connection) {
        connection.destroy();
      }
    }
  }, [connection]);

  return (
    <DatabaseContext.Provider value={{ connection }}>
      {children}
    </DatabaseContext.Provider>
  );
};


export const useDatabase = () => {
  const { connection } = React.useContext(DatabaseContext);
  if (!connection) {
    throw new Error("Database not initialized");
  }
  return connection;
}