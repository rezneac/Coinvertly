import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CustomBottomBar from './src/components/navigation/CustomBottomBar';
import CurrencyExchangerScreen from './src/screens/CurrencyExchangerScreen';
import CurrencyFinder from './src/components/currencyFinder/CurrencyFinder';

import {Provider} from 'react-redux';
import store from './src/redux-saga/store';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomBottomBar {...props} />}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabStack" screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabStack" component={TabStack} />
          <Stack.Screen name="CurrencyExchangerScreen" component={CurrencyExchangerScreen} />
          <Stack.Screen name="CurrencyFinder" component={CurrencyFinder} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
