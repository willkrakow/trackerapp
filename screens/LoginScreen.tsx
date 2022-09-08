import { Button, StyleSheet, TextInput } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "../components/Themed";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../navigation/auth";

const FACIAL_AUTH = LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION;
const FINGERPRINT_AUTH = LocalAuthentication.AuthenticationType.FINGERPRINT;

export default function LoginScreen() {
  const auth = useContext(AuthContext);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [pin, setPin] = useState<string | null>('');

  const handleAuthenticate = async () => {
    try {
      let isEnrolled = false;
      const authTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const savedPin = await SecureStore.getItemAsync('pin');
      if (authTypes.includes(FACIAL_AUTH) || authTypes.includes(FINGERPRINT_AUTH)) {
        const hasSavedFingerprintOrFacialData = await LocalAuthentication.isEnrolledAsync();
        isEnrolled = hasSavedFingerprintOrFacialData || savedPin !== null;
      } else {
        if (savedPin) {
          isEnrolled = true;
        }
      }
      await auth.authenticate();
      setPin(savedPin);
      setIsFirstLogin(!isEnrolled);
    } catch(err){
      console.log(err)
    }
  }

  const handleLogout = async () => {
    await auth.deauthenticate();
    setIsFirstLogin(false);
    setPin('');
  }

  const handleChangePin = async (pin: string) => {
    setPin(pin);
  }

  const handleSubmitPin = async () => {
    if (pin && pin.length === 4) {
      await SecureStore.setItemAsync('pin', pin);
      setIsFirstLogin(false);
    }
  }

  const showCreatePin = useMemo(() => {
    return isFirstLogin && auth.isAuthenticated;
  }, [isFirstLogin, auth.isAuthenticated]);


  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title={auth.isAuthenticated ? 'Logged in' : 'Login'} onPress={handleAuthenticate} disabled={auth.isAuthenticated} />  
      {showCreatePin && (
        <View>
          <TextInput placeholder="Enter pin" keyboardType='number-pad' onChangeText={handleChangePin} value={pin || undefined} />
          <Button title="Save pin" onPress={handleSubmitPin} />
        </View>
      )}
      {auth.isAuthenticated && (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
