// navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import { DisneyCharacter } from '../services/api';

export type RootStackParamList = {
  Home: undefined;
  Disneys: { character: DisneyCharacter };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={ListScreen} />
      <Stack.Screen name="Disneys" component={DetailScreen} />
    </Stack.Navigator>
  );
}
