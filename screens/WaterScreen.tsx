import { View, Text } from "../components/Themed";
import { StyleSheet, Platform, Modal, PlatformColor } from "react-native";
import { useState, useEffect, useCallback, useMemo } from "react";
import * as SQLite from 'expo-sqlite'
import VariantButton from '../components/Button'
import { FAB } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import Records from "../models/Record";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("database.db");
  return db;
}

const db = openDatabase();
const createDbTables = () => {
    const recordTableQuery = "create table if not exists records (id integer primary key not null, level_change integer, created_at timestamp default current_timestamp)"
    const notesTableQuery = "create table if not exists notes (id integer primary key not null, record_id integer, note text, created_at timestamp default current_timestamp)"
    const query = `${recordTableQuery};${notesTableQuery}`
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        () => console.log("Created records + notes tables"),
      );
    });
}
const WaterScreen = () => {
    const [records, setRecords] = useState<any[] | null>(null);
    const [isLowModalOpen, setIsLowModalOpen] = useState(false);
    const [isHighModalOpen, setIsHighModalOpen] = useState(false);
    const [invalidated, setInvalidated] = useState(true);

    useEffect(() => {
        if(invalidated){
        (async () => {
          const records = await Records.getAll();
          setRecords(records);
          setInvalidated(false);
        })()
    }}
    , [invalidated]);

    const overall = useMemo(() => {
        let total = 50;
        if (records && Array.isArray(records) && records.length > 0) {
            records.forEach(record => {
                total += record.level_change;
            });
        }
        return total;
    }, [records]);

    const handleCreateTable = useCallback(createDbTables, []);

    useEffect(() => {
      handleCreateTable();
    }, []);

    const handleCreateRecord = async (change: number) => {
        await Records.create(change);
        setInvalidated(true);
    }
    
    const handleClearRecords = async () => {
        await Records.clear();
        setInvalidated(true);
    }

    useEffect(() => {
        if(overall <= 0){
            setIsLowModalOpen(true)
        }
        if(overall >= 100){
            setIsHighModalOpen(true)
        }
    }, [overall])

    const handleResetFromHigh = () => {
        setIsHighModalOpen(false);
        handleCreateRecord(-50);
    }

    const handleResetFromLow = () => {
        setIsLowModalOpen(false);
        handleCreateRecord(50);
    }

    return (
      <View style={styles.flex}>
        <Text>Water</Text>
        <View style={[styles.waterGlass, styles.bottomBorderCurve]}>
          <View
            style={[
              styles.water,
              styles.bottomBorderCurve,
              { height: overall * 3 },
            ]}
          />
        </View>
        <View style={styles.twoColumns}>
          <VariantButton
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => handleCreateRecord(1)}
            title="+"
          />
          <VariantButton
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => handleCreateRecord(-1)}
            title="-"
          />
        </View>
        <View>
            <VariantButton onPress={handleClearRecords} title="Clear the record" />
        </View>
        <Modal
          visible={isLowModalOpen}
          transparent
          animationType="slide"
          onDismiss={() => setIsLowModalOpen(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Uhoh, feeling kinda weird today?
            </Text>
            <Text>That's alright, it happens to everyone.</Text>
            <FAB onPress={handleResetFromLow} icon={<Ionicons name="close" />} />
          </View>
        </Modal>
        <Modal
          visible={isHighModalOpen}
          animationType="slide"
          onDismiss={() => setIsHighModalOpen(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Nice! You are a cool person.</Text>
            <Text>Time to spread some of those good feelings.</Text>
            <FAB onPress={handleResetFromHigh} icon={<Ionicons name="close" />} />
          </View>
        </Modal>
      </View>
    );
}

export default WaterScreen;

const styles = StyleSheet.create({
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: "transparent",
    width: "100%",
  },
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80,
    padding: 0,
  },
  buttonTitle: {
    fontSize: 50,
    textAlignVertical: "center",
    marginVertical: 0,
  },
  flex: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    overflow: "scroll",
  },
  bottomBorderCurve: {
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  waterGlass: {
    height: 300,
    width: 200,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
    justifyContent: "flex-end",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  water: {
    width: 200,
    backgroundColor: "blue",
    opacity: 0.5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
