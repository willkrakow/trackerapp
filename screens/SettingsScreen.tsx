import { Input, Switch, Text, BottomSheet, ListItem, Button } from "@rneui/themed";
import { useState } from "react";
import { View } from "../components/Themed";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { useDatabase } from "../entities/db";
import {
  Settings,
  SettingsType,
  WeightUnit,
  HeightUnit,
  RelationshipStatus,
} from "../entities/settings";
import { useEffect } from "react";
import StatusModal from "../components/StatusModal";

const SettingsScreen = () => {
  const [visibleModal, setVisibleModal] = useState<
    "success" | "error" | "confirm_clear" | null
  >(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [settingsForm, setSettingsForm] = useState<SettingsType>({
    clear_on_interval: false,
    clear_interval: 7,
    age: undefined,
    name: "",
    weight: undefined,
    weight_unit_preference: WeightUnit.lbs,
    height: undefined,
    height_unit_preference: HeightUnit.in,
    relationship_status: undefined,
  });
  const db = useDatabase();

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleSubmit = async () => {
    await db.manager.upsert(Settings, settingsForm, { conflictPaths: ["id"] });
    setHasChanges(false);
    setVisibleModal("success");
  };
  const handleChangeHeightPreference = (value: 0 | 1) => {
    const height_unit_preference = value === 0 ? HeightUnit.cm : HeightUnit.in;
    setSettingsForm({
      ...settingsForm,
      height_unit_preference,
    });
  };

  const handleChangeWeightPreference = (value: 0 | 1) => {
    const weight_unit_preference = value === 0 ? WeightUnit.kg : WeightUnit.lbs;
    setSettingsForm({
      ...settingsForm,
      weight_unit_preference,
    });
  };

  const handlePressBottomSheet = () => {
    setShowBottomSheet(true);
  };

  useEffect(() => {
    if (visibleModal !== null) {
      setTimeout(() => {
        setVisibleModal(null);
      }, 2000);
    }
  }, [visibleModal]);

  useEffect(() => {
    const findAndLoad = async () => {
        try {
            const existing = await db.manager.findOne(Settings, {});
            if(existing){
                setSettingsForm(existing);
                setHasChanges(false)
            }
        } catch(err){
            console.log(err);
        }
    }
    findAndLoad();
  }, [db]);

  useEffect(() => {
    setHasChanges(true);
  }, [settingsForm]);
  return (
    <ScrollView>
      <View style={[styles.zone, styles.plainZone]}>
        <ListItem>
          <ListItem.Title>Name</ListItem.Title>
          <ListItem.Input
            textContentType="name"
            value={settingsForm.name}
            onChangeText={(text) =>
              setSettingsForm({ ...settingsForm, name: text })
            }
          />
        </ListItem>
        <ListItem>
          <ListItem.Title>Age</ListItem.Title>
          <ListItem.Input
            value={settingsForm.age?.toString()}
            onChangeText={(text) =>
              setSettingsForm({ ...settingsForm, age: parseInt(text) })
            }
          />
        </ListItem>
        <ListItem>
          <TouchableOpacity onPress={handlePressBottomSheet}>
            <ListItem.Title>Relationship Status</ListItem.Title>
            <ListItem.Subtitle>
              {settingsForm.relationship_status || ""}
            </ListItem.Subtitle>
          </TouchableOpacity>
          <BottomSheet
            isVisible={showBottomSheet}
            onBackdropPress={() => setShowBottomSheet(false)}
          >
            {Object.entries(RelationshipStatus).map(([key, value]) => (
              <Button
                key={key}
                onPress={() => {
                  setSettingsForm({
                    ...settingsForm,
                    relationship_status:
                      RelationshipStatus[
                        key as keyof typeof RelationshipStatus
                      ],
                  });
                  setShowBottomSheet(false);
                }}
                title={value}
              />
            ))}
          </BottomSheet>
        </ListItem>
        <ListItem>
          <ListItem.Title>Height</ListItem.Title>
          <ListItem.Input
            value={settingsForm.height?.toString()}
            onChangeText={(text) =>
              setSettingsForm({ ...settingsForm, height: parseInt(text) })
            }
            keyboardType="numeric"
          />
          <ListItem.ButtonGroup
            buttons={[HeightUnit.cm, HeightUnit.in]}
            onPress={handleChangeHeightPreference}
            selectedIndex={
              settingsForm.height_unit_preference === HeightUnit.cm ? 0 : 1
            }
            containerStyle={styles.rounded}
          />
        </ListItem>
        <ListItem>
          <ListItem.Title>Weight</ListItem.Title>
          <ListItem.Input
            value={settingsForm.weight?.toString()}
            onChangeText={(text) =>
              setSettingsForm({ ...settingsForm, weight: parseInt(text) })
            }
            keyboardType="numeric"
          />
          <ListItem.ButtonGroup
            buttons={[WeightUnit.kg, WeightUnit.lbs]}
            onPress={handleChangeWeightPreference}
            selectedIndex={
              settingsForm.weight_unit_preference === WeightUnit.kg ? 0 : 1
            }
            containerStyle={styles.rounded}
          />
        </ListItem>
      </View>
      <View style={[styles.dangerZone, styles.zone]}>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Clear regularly</ListItem.Title>
              </ListItem.Content>
              <Switch
                value={settingsForm?.clear_on_interval}
                onChange={() =>
                  setSettingsForm({
                    ...settingsForm,
                    clear_on_interval: !settingsForm.clear_on_interval,
                  })
                }
              />
            </>
          }
          isExpanded={settingsForm.clear_on_interval}
        >
          <View style={styles.row}>
            <Text style={styles.labelText}>Clear every</Text>
            <Input
              value={settingsForm.clear_interval?.toString()}
              containerStyle={{ flex: 0.3, marginBottom: -5 }}
              style={{ textAlign: "center" }}
              keyboardType="number-pad"
              onChangeText={(val) =>
                setSettingsForm({
                  ...settingsForm,
                  clear_interval: parseInt(val),
                })
              }
            />
            <Text style={styles.labelText}>days</Text>
          </View>
        </ListItem.Accordion>
      </View>
      <Button title="Save" onPress={handleSubmit} disabled={!hasChanges} />
      <StatusModal
        isVisible={visibleModal === "success"}
        text="Settings saved successfully"
        onDone={() => setVisibleModal(null)}
        status="success"
        timeout={3000}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  zone: {
    borderWidth: 2,
    borderRadius: 5,
  },
  plainZone: {
    backgroundColor: "white",
    borderColor: "hsl(250, 20%, 90%)",
  },
  dangerZone: {
    borderColor: "hsl(354, 70%, 60%)",
    padding: 10,
  },
  rounded: {
    borderRadius: 5,
  },
  textLeft: {
    textAlign: "left",
  },
  modalButton: {
    margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  labelText: {
    fontSize: 16,
  },
});
