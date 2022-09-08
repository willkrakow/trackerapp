import { useState, useEffect } from "react";
import { useDatabase } from "../entities/db";
import { Note } from "../entities/note";

const useNotes = () => {
  const [data, setData] = useState<Note[]>([]);

  const db = useDatabase();
  useEffect(() => {
    const getNotes = async () => {
      const res = await db.manager.find(Note);
      setData(res);
    };
    getNotes();
  }, [db]);

  return {data}
};

export default useNotes;
