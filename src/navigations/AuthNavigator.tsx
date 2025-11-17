import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import DetailScreen from '../screens/DetailScreen';
import EditScreen from '../screens/EditScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={{ refetch: false }}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
