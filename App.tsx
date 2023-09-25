import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadScreen from './src/screens/LoadScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoadScreen">
        <Stack.Screen name="LoadScreen" component={LoadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
