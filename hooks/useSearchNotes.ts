import { useState, useEffect } from "react";
import { useDatabase } from "../entities/db";
import { Note } from "../entities/note";

const useSearchNotes = (query?: string) => {
  const [data, setData] = useState<Note[]>([]);

  const db = useDatabase();
  useEffect(() => {
    const getNotes = async () => {
      const titleMatches = await db.manager.findBy(Note, {title: query})
      const textMatches = await db.manager.findBy(Note, {text: query});
      setData([...titleMatches, ...textMatches]);
    };
    if(query){
        getNotes();
    }
  }, [db, query]);

  return { data };
};

export default useSearchNotes;
