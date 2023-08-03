import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import LoadScreen from './src/screens/LoadScreen';
import React , {useState,useEffect} from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading,setLoading] = useState(true);
  useEffect(() =>{
    setTimeout(() =>{
      setLoading(false);
    },100000)
  },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loading ? (
           <Stack.Screen name="LoadScreen" component={LoadScreen} options={{ headerShown: false }} />
        ):(
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
