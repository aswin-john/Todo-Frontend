import React from 'react'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/HomeScreen/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthProvider} from './Context/AuthContext'

function App() {
  const stack = createNativeStackNavigator()
  return (
    // <Login />
    // <SignUp/>
    <AuthProvider>
      <NavigationContainer>
        <stack.Navigator
        initialRouteName='Login'
        >
          <stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <stack.Screen name="Home" component={Home} options={{headerShown: false}}/>

        </stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App
