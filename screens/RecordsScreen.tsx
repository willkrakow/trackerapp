import { Text, View } from "../components/Themed";
import {
  Dimensions,
  Modal,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  FAB,
  ListItem,
  SpeedDial,
  withTheme,
} from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NewRecordForm from "../components/NewRecordForm";
import Calendar from "../components/Calendar";
import dayjs from "dayjs";
import { Record } from "../entities/record";
import { useDatabase } from "../entities/db";
import NewNoteForm from "../components/NewNoteForm";
import { notEmpty } from "../utils/common";

const crampingSide = (side?: number) => {
  if(!notEmpty(side)) return "";
  switch (side) {
    case 0:
      return "(left side)";
    case 1:
      return "(middle)";
    case 2:
      return "(right side)";
    default:
      return "";
  }
}


const RecordsScreen = () => {
  const [invalidated, setInvalidated] = useState(true);
  const [isSpeedDialOpen, setSpeedDialOpen] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [data, setData] = useState<Record[]>([]);
  const listRef = useRef<VirtualizedList<Record> | null>(null);
  const colorscheme = useColorScheme();
  const connection = useDatabase();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  useEffect(() => {
    if (invalidated) {
      (async () => {
        try {
          const records = await connection.manager.find(Record);
          console.log(records)
          setData(records);
          console.log(records[records.length - 1]);
          setInvalidated(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [invalidated]);

  const handleAddNote = () => {
    setOpenModal("note");
    setSpeedDialOpen(false);
  };
  const handleAddRecord = () => {
    setOpenModal("record");
    setSpeedDialOpen(false);
  };
  const handleOpenSpeedDial = () => setSpeedDialOpen(true);
  const handleCloseSpeedDial = () => setSpeedDialOpen(false);

  const handleSuccess = () => {
    setOpenModal(null);
    setInvalidated(true);
  };

  const handleSuccessNote = () => {
    setOpenModal(null);
    setInvalidated(true);
  }

  const handleCancel = () => {
    setOpenModal(null);
  };

  const handleRefetch = () => {
    setInvalidated(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={handleRefetch} title="Refetch" />
      <SafeAreaView>
        <ListItem.Accordion
          bottomDivider
          isExpanded={isCalendarExpanded}
          onPress={() => setIsCalendarExpanded((p) => !p)}
          content={<ListItem.Title>Calendar</ListItem.Title>}
        >
          <Calendar />
        </ListItem.Accordion>
        <VirtualizedList
          ref={listRef}
          data={data}
          getItemCount={(data) => data?.length}
          getItem={(data, index) => data[index]}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Title>
                {dayjs(item.created_at).format("MMM")}~{"\n"}
                {dayjs(item.created_at).format("D")}
              </ListItem.Title>
              <ListItem.Content>
                {item.on_period && (
                  <ListItem.Subtitle style={styles.listItemSubtitle}>
                    <Ionicons
                      size={20}
                      style={styles.subtitleIcon}
                      name="checkmark"
                    />
                    On period
                  </ListItem.Subtitle>
                )}
                {item.cramping && (
                  <ListItem.Subtitle style={styles.listItemSubtitle}>
                    <Ionicons
                      size={20}
                      style={styles.subtitleIcon}
                      name="checkmark"
                    />
                    Cramping {crampingSide(item.cramping_side)}
                  </ListItem.Subtitle>
                )}
                {item.acne && (
                  <>
                    <ListItem.Subtitle style={styles.listItemSubtitle}>
                      <Ionicons
                        size={20}
                        style={styles.subtitleIcon}
                        name="checkmark"
                      />
                      Acne
                    </ListItem.Subtitle>
                  </>
                )}
              </ListItem.Content>
            </ListItem>
          )}
        />
      </SafeAreaView>
      <SpeedDial
        onOpen={handleOpenSpeedDial}
        onClose={handleCloseSpeedDial}
        isOpen={isSpeedDialOpen}
        placement="right"
        visible={openModal === null}
        icon={{
          name: "add",
          color: "white",
        }}
        openIcon={{ name: "close", color: "white" }}
      >
        <SpeedDial.Action
          icon={{
            name: "note",
            color: "white",
          }}
          onPress={handleAddNote}
        />
        <SpeedDial.Action
          icon={{
            name: "calendar-today",
            color: "white",
          }}
          onPress={handleAddRecord}
        />
      </SpeedDial>
      <Modal
        visible={openModal === "note"}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            minHeight: Dimensions.get("screen").height,
            paddingTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors[colorscheme].secondary,
              fontWeight: "bold",
            }}
          >
            New Note
          </Text>
          <NewNoteForm onSuccess={handleSuccessNote} />
        </View>
        <FAB
          visible={openModal !== null}
          onPress={handleCancel}
          placement="left"
          useForeground
          icon={<Ionicons name="close" color="white" size={20} />}
        />
      </Modal>
      <Modal
        visible={openModal === "record"}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            minHeight: Dimensions.get("screen").height,
            paddingTop: 40,
          }}
        >
          <NewRecordForm onSuccess={handleSuccess} />
        </View>
        <FAB
          visible={openModal !== null}
          onPress={handleCancel}
          placement="left"
          useForeground
          icon={<Ionicons name="close" color="white" size={20} />}
        />
      </Modal>
    </View>
  );
};

export default withTheme(RecordsScreen);


const styles = StyleSheet.create({
  listItemSubtitle: {
    marginBottom: 5,
    paddingLeft: 5,
    marginTop: 5,
    fontSize: 20,
  },
  subtitleIcon: {
    marginRight: 5,
  }
})