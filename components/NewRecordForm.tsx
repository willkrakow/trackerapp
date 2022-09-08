import { View } from "../components/Themed";
import { useState } from "react";
import { ButtonGroup, ListItem, Slider, Switch, Button } from "@rneui/themed";
import dayjs from "dayjs";
import DatePicker from '@react-native-community/datetimepicker';
import { Record } from "../entities/record";
import { } from 'typeorm';
import { dataSource } from "../entities/db";
import { StyleSheet } from "react-native";
const CRAMPING_SIDES: number[] = [0, 1, 2];

interface INewRecordForm {
    onSuccess: () => void;
}
const NewRecordForm = ({onSuccess}: INewRecordForm) => {
  const [formValue, setFormValue] = useState<any>({
  on_period: false,
    cramping: false,
    acne: false,
    mood: 0,
    libido: 0,
    record_date: dayjs().toISOString(),
    flow_level: undefined,
  });

  const handleFormBoolean = (key: any) => {
    setFormValue({
      ...formValue,
      [key]: !formValue[key],
    });
  };

  const handleSubmit = async () => {
    try {
        const payload = {
            ...formValue,
            cramping_side: formValue.cramping_side ? CRAMPING_SIDES.indexOf(formValue.cramping_side) : 0,
            record_date: dayjs(formValue.created_at).toISOString(),
        }
      const newRecord = dataSource.manager.create<Record>(Record, payload)
      await dataSource.manager.save(newRecord);
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCrampingSide = (value: 0 | 1 | 2) => {
    setFormValue({
      ...formValue,
      cramping_side: value,
    });
  };

  const handleFlowLevel = (value: 0 | 1 | 2) => {
    setFormValue({
      ...formValue,
      flow_level: value
    })
  }

  const handleDateChange = (_: any, date: Date | undefined) => {
    setFormValue({
        ...formValue,
        created_at: dayjs(date).toISOString(),
    });
    }

  return (
    <View style={styles.container}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Date</ListItem.Title>
        </ListItem.Content>
        <DatePicker
          value={dayjs(formValue.created_at).toDate()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      </ListItem>
      <ListItem.Accordion
        noIcon
        isExpanded={formValue.on_period}
        content={
          <>
            <Switch
              value={formValue.on_period}
              onValueChange={() => handleFormBoolean("on_period")}
            />
            <ListItem.Content style={styles.accordionContent}>
              <ListItem.Title>On period</ListItem.Title>
            </ListItem.Content>
          </>
        }
      >
        <ListItem style={styles.accordionInner}>
          <ListItem.Content>
            <ButtonGroup
              buttons={["Light", "Moderate", "Heavy"]}
              onPress={(val) => handleFlowLevel(val)}
              selectedIndex={formValue.flow_level}
            />
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
      <ListItem.Accordion
        noIcon
        isExpanded={formValue.cramping}
        content={
          <>
            <Switch
              value={formValue.cramping}
              onValueChange={() => handleFormBoolean("cramping")}
            />
            <ListItem.Content style={styles.accordionContent}>
              <ListItem.Title>Cramping</ListItem.Title>
            </ListItem.Content>
          </>
        }
      >
        <ListItem style={styles.accordionInner}>
          <ListItem.Content>
            <ButtonGroup
              buttons={["Left side", "Middle", "Right side"]}
              onPress={(val) => handleCrampingSide(val)}
              selectedIndex={formValue.cramping_side}
            />
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
      <ListItem>
        <Switch
          value={formValue.acne}
          onValueChange={() => handleFormBoolean("acne")}
        />
        <ListItem.Content>
          <ListItem.Title>Acne</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Libido</ListItem.Title>
          <Slider
            value={formValue.libido}
            onValueChange={(value) =>
              setFormValue({ ...formValue, libido: value })
            }
            maximumValue={5}
            minimumValue={0}
            step={1}
            allowTouchTrack
          />
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Mood</ListItem.Title>
          <ButtonGroup
            buttons={["😭", "😔", "😕", "😊", "😁"]}
            onPress={(val) => setFormValue({ ...formValue, mood: val })}
            selectedIndex={formValue.mood}
            textStyle={styles.emojis}
          />
        </ListItem.Content>
      </ListItem>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  datePicker: { flex: 1, backgroundColor: "white" },
  accordionContent: {
    marginLeft: 15,
  },
  accordionInner: {
    paddingLeft: 20
  },
  emojis: {fontSize: 30,},
  buttonContainer: {
    padding: 20,
  }
});

export default NewRecordForm;