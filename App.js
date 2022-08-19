import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar , Button , Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import CartScreen from './src/views/screens/CartScreen';

import LoginScreen from './srcs/views/screens/LoginScreen';
import RegistrationScreen from './srcs/views/screens/RegistrationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './srcs/views/components/Loader';


const Stack = createStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('BoardScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };


  return (
    <NavigationContainer>
  
  {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" /> 

          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: true}}>
            
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen} options = {{headerShown : false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options = {{headerShown : false}} />
      
            <Stack.Screen name="Cart" component={CartScreen}  options={{headerShown : false}}/>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen}  options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={BottomNavigator} options={{headerShown : false}} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown : false}} />
      </Stack.Navigator>
      </>
   )}

    </NavigationContainer>
    
  );
};

export default App;