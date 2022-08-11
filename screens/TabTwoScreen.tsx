import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ColorBlock from '../components/ColorBlock';
import { MCRecord, MCRecordType } from "../models/MCRecord";
import { NewRecord } from '../types';
import { ButtonGroup } from '@rneui/base';

export default function TabTwoScreen() {
  const [data, setData] = useState<NewRecord<MCRecordType>>({
    acne: false,
    cramping: false,
    on_period: false,
  });

  const handleButtonGroupChange = (index: number, name: keyof MCRecordType) => {
    setData({
      ...data,
      [name]: index === 0,
    });
  }

  return (
    <ColorBlock color="background">
      <Text>Acne</Text>
      <ButtonGroup buttons={["YES", "NO"]} onPress={(index) => handleButtonGroupChange(index, "acne")} />
      <Text>Cramping</Text>
      <ButtonGroup buttons={["YES", "NO"]} onPress={(index) => handleButtonGroupChange(index, "cramping")} />
      <Text>On Period</Text>
      <ButtonGroup buttons={["YES", "NO"]} onPress={(index) => handleButtonGroupChange(index, "on_period")} />
    </ColorBlock>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
