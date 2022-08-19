import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useEffect} from 'react';
import Button from '../components/Button';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../../conts/colors';
import Axios from "axios";

const HomeScree = ({navigation}) => {
 

  const [foodlist, setfoodlist] = React.useState();
  
    useEffect(() => {
      try{
      Axios.get("http://192.168.0.109:3001/read").then((response) => {
        setfoodlist(response.data); 
      })
    }
    catch(error)
    {
      console.log(error);
    }
    });



  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LoginScreen');
  };

  return (
    <View>
    <View
        style={{
        marginTop:40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold' , marginTop : 20}}>
        Welcome {userDetails?.fullname}
      </Text>
      <Button title="Logout" onPress={logout} />
    </View>
      <ScrollView>
      <View style={style.categoryContainer}>
      {foodlist?.map((item, index) => (
          <View key = {index}>
          <View><Text style = {{fontSize : 50 , textAlign : "center" }}>List</Text></View>
          <View><Text style = {{fontSize : 30 , textAlign : "center"}}>Name : {item.names}</Text></View>
          <View><Text style = {{fontSize : 30, textAlign : "center"}}>Price : {item.price}</Text></View>
          <View><Text style = {{fontSize : 30, textAlign : "center"}}>About : {item.about}</Text></View> 
          </View>
      ))}
    </View>
    </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    textAlign : "center"
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



export default HomeScree;
