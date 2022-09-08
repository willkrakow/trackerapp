import { StatusBar } from 'expo-status-bar';
import 'reflect-metadata';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ThemeProvider } from '@rneui/themed';
import theme from './utils/createTheme';
import { DatabaseWrapper } from './entities/db';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
 
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <DatabaseWrapper>
          <ThemeProvider theme={theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>
        </DatabaseWrapper>
      </SafeAreaProvider>
    );
  }
}
