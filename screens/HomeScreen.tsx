import { Button, StyleSheet, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useContext, useEffect, useMemo, useState } from 'react';
import {AuthContext} from '../navigation/auth';
import ColorBlock from '../components/ColorBlock';
import Colors from '../constants/Colors';
import Onboarding from '../components/Onboarding';


type UserData = {
  name?: string;
  age?: number;
}
export default function TabOneScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = useContext(AuthContext);
  
  useEffect(() => {
    const getSavedData = async () => {
      const savedUserData = await SecureStore.getItemAsync('userData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }
    getSavedData();
  }, []);

  const hasSavedData = useMemo(() => {
    return userData !== null;
  }, [userData]);

  const handleLogout = async () => {
    setUserData(null);
    await auth.deauthenticate();
  }

  return (
    <View style={styles.container}>
      <ColorBlock color="background">
        {hasSavedData && (
            <Text style={styles.title}>{userData?.name}</Text>
        )}
        {!hasSavedData && (
          <Onboarding onSubmit={setUserData} />
        )}
      </ColorBlock>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
