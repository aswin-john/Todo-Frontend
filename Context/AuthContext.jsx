import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
// import {BASE_URL} from '../assets/Api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [tokensValue, setTokenValue] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [userInformation, setUserInformation] = useState(null);
  // console.log('User Information -----*************************%>', userInformation);

  const agentRegistration = async (
    signUpName,signUpEmail, signUpPassword
  ) => {
    setLoading(true);
    console.log('SignUP fields from Auth',signUpName,signUpEmail, signUpPassword);
    const url = `https://todo-frontend-mvps.onrender.com/api/auth/signup`;
    const userDetails = {
      username: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      
    };
  console.log('this is User details >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',userDetails);
    

    try {
      const response = await axios.post(url, userDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // setUserInfo(response.data);
      // AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      // setTokenValue(response.data.data.tokens.access);
      console.log("Response Data",response)
      setLoading(false);
      return response.data;
    } catch (error) {
      if (error.response) {
        setLoading(false);
        return error.response;
      } else if (error.request) {
        setLoading(false);
        return error.request;
      } else {
        setLoading(false);
        return error.message;
      }
    }
  };



  return (
    <AuthContext.Provider
      value={{
        agentRegistration
      }}>
      {children}
    </AuthContext.Provider>
  );
};
