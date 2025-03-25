import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
// import {BASE_URL} from '../assets/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [tokensValue, setTokenValue] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [userInformation, setUserInformation] = useState(null);
  // console.log('User Information -----*************************%>', userInformation);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          console.log('Token Called=====>', parsedValue?.accesToken);
          setTokenValue(parsedValue?.accesToken);
        } else {
          setTokenValue('');
          // console.log('Token Not set');
        }
      } catch (error) {
        // console.error('Error reading value:', error);
      }
    };
    fetchToken();
    

    
  }, [tokensValue]);

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


  const usingEmailLogin = async (userLoginEmail, loginPassword) => {
    setLoading(true);
    //const BASE_URL = 'http://127.0.0.1:8000/api/';
    const url = `https://todo-frontend-mvps.onrender.com/api/auth/signin`;
    // console.log('URL---->', url);
    const data = {
      email: userLoginEmail,
      password: loginPassword,
    };
    try {
      const response = await axios.post(url, data);
      //console.log("The response is ---->", response);
      // console.log('Token Called=====>', response.data);
      setUserInfo(response.data);
      AsyncStorage.setItem('userInfo', JSON.stringify(response?.data));
      setTokenValue(response?.data?.accesToken);
      setLoading(false);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setLoading(false);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        setLoading(false);
      } else {
        // Something happened in setting up the request that triggered an Error
        setLoading(false);
      }
    }
  };




  return (
    <AuthContext.Provider
      value={{
        agentRegistration,
        usingEmailLogin
      }}>
      {children}
    </AuthContext.Provider>
  );
};
