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
      return response?.data;
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


  const createTaskFunc = async (
    taskTitle,taskDescription ,combinedDateTime
  ) => {
    setLoading(true);
    console.log(
      'status________________________________________',
      taskTitle,taskDescription ,combinedDateTime
    );

    console.log(
      'Date & TIme from Auth',
      combinedDateTime
    );
    const url = `https://todo-frontend-mvps.onrender.com/api/tasks`;

    

   

    const data = {
      title: taskTitle,
      description: taskDescription,
      status:'in_progress',
      dueDate: combinedDateTime,
      
      priority: 'high',
      
    };
    console.log('Data--->', data);
    try {
      const response = await axios.post(url, data, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokensValue}`,
          // Replace 'Bearer' with your actual authentication type if it's different
        },
      });
      setLoading(false);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("The server responded with an error:", error.response.data);
        // console.log("Error message--->", error.response.data.message);
        // console.log("Status code:", error.response.status);
        setLoading(false);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // console.log("No response received from the server:", error.request);
        setLoading(false);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error setting up the request:", error.message);
        setLoading(false);
      }
    }
  };


  const taskDisplayFunc = async () => {
    setLoading(true);

    console.log(
      'for temperory use only tokn----------------------------',
      tokensValue,
    );

    const url = `https://todo-frontend-mvps.onrender.com/api/tasks`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokensValue}`,
        },
      });
      //console.log("Response--->",response)
      // console.log("Response--->",response.data)
      setLoading(false);
      return response;
    } catch (error) {
      if (error.response) {
        setLoading(false);
        return error.response.data;
      } else if (error.request) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const deleteTaskItem = async deleteId => {
    setLoading(true);
    console.log('delete id,', deleteId);
    const url = `https://todo-frontend-mvps.onrender.com/api/tasks/${deleteId}`;
    // console.log('delete id,', deleteId);
    // console.log('BAse url', BASE_URL);
    // console.log('Data---->', url);
    // console.log('This is token value ...........................', tokensValue);
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokensValue}`,
        },
      });
      // console.log('this is delete response', response);

      setLoading(false);

      return response;
    } catch (error) {
      // console.log('error response', error);
      if (error.response) {
        // console.log("The server responded with an error:", error.response.data);
        // console.log("Error message--->", error.response.data.message);
        // console.log("Status code:", error.response.status);
        setLoading(false);
        // console.log('this is delete response', error.response);
        return error.response;
      } else if (error.request) {
        // console.log("No response received from the server:", error.request);
        setLoading(false);
        return error.request;
        // console.log('this is delete response', error.request);
      } else {
        //console.log("Error setting up the request:", error.message);
        setLoading(false);
        // console.log('this is delete response', error.message);
        return error.message;
      }
    }
  };




  return (
    <AuthContext.Provider
      value={{
        agentRegistration,
        usingEmailLogin,
        createTaskFunc,
        taskDisplayFunc,
        deleteTaskItem,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
