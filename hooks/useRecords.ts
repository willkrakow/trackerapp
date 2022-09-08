import { useState, useEffect } from "react";
import { useDatabase } from "../entities/db";
import { Record } from "../entities/record";

const useRecords = () => {
    const [data, setData] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const connection = useDatabase();

    useEffect(() => {
      (async () => {
        try {
          const records = await connection.manager.find(Record);
          setData(records);
        } catch (err) {
          console.log(err);
        } finally {
            setLoading(false);
        }
      })();
    }, []);

    return {data, loading};
}

export default useRecords;