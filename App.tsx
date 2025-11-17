import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorSystem } from './src/helpers/colorSystem';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colorSystem.primary}
          />
          <MenuProvider>
            <AuthNavigator />
          </MenuProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
