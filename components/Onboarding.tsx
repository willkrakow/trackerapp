import { Button } from "@rneui/base";
import { useState } from "react";
import { TextInput } from "react-native";
import { View } from "./Themed";
import * as SecureStore from 'expo-secure-store';
import VariantButton from "./Button";

type NewUserData = {
  name?: string;
  age?: number;
};

interface IOnboarding {
    onSubmit: (userData: NewUserData) => void;
}
const Onboarding = ({onSubmit}: IOnboarding) => {
    const [newUserData, setNewUserData] = useState<NewUserData>({
      name: undefined,
      age: undefined,
    });
    return (
    <View>
      <TextInput
        placeholder="Name"
        value={newUserData.name}
        onChangeText={(name) => setNewUserData({ ...newUserData, name })}
      />
      <TextInput
        placeholder="Age"
        keyboardType="number-pad"
        value={newUserData.age?.toString()}
        onChangeText={(age) =>
          setNewUserData({ ...newUserData, age: parseInt(age) })
        }
      />
      <VariantButton
        title="Save data"
        onPress={async () => {
          await SecureStore.setItemAsync(
            "userData",
            JSON.stringify(newUserData)
          );
          onSubmit(newUserData);
        }}
      />
    </View>)
}

export default Onboarding;