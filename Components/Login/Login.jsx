import React, {useEffect, useState, createRef, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,Dimensions, TextInput,KeyboardAvoidingView,ScrollView, TouchableOpacity } from 'react-native'
import eventoqlogo from '../../Images/logo/eventoqlogo.png'
import Styles from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = () => {
  const navigation = useNavigation();
  const {loading,  usingEmailLogin, } =
    useContext(AuthContext);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const loginHandler = async () => {
    const isValid = userEmailLoginValidation();
  
    if (isValid) {
      try {
        const response = await usingEmailLogin(loginEmail, loginPassword);
        // Handle the response here
        console.log('response?.data?.user--->', response?.accesToken);
        if (response?.accesToken) {
          console.log('response?.data?.user--->', response?.data);
  
          // Snackbar.show({
          //   text: 'login-successfully',
          //   duration: Snackbar.LENGTH_LONG,
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
          //   textColor: Colors.WHITE,
          //   marginBottom: 30,
          // });
          alert('Login successfully');
          navigation.navigate('Home');
        } else {
          // Snackbar.show({
          //   text: 'please-check-email',
          //   duration: Snackbar.LENGTH_LONG,
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
          //   textColor: Colors.WHITE,
          //   marginBottom: 30,
          // });
          if (error?.message === 'wrong credentials!') {
            // Snackbar.show({
            //   text: 'Unregistered Email Id',
            //   duration: Snackbar.LENGTH_LONG,
            //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
            //   textColor: Colors.WHITE,
            //   marginBottom: 30,
            // });
            alert('Unregistered Email Id');
          } else if (error?.message === 'user not found!') {
            // Snackbar.show({
            //   text: 'Incorrect Password',
            //   duration: Snackbar.LENGTH_LONG,
            //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
            //   textColor: Colors.WHITE,
            //   marginBottom: 30,
            // });
            alert('Incorrect Password');
          } else {
            // Snackbar.show({
            //   text: error?.message ? error?.message : 'something-went-wrong',
            //   duration: Snackbar.LENGTH_LONG,
            //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
            //   textColor: Colors.WHITE,
            //   marginBottom: 30,
            // });
            alert(error?.message ? error?.message : 'Something went wrong');
          }
        }
      } catch (error) {
        console.log('Error---->', error);
        alert(error)
        
      }
    }
  };


  const userEmailLoginValidation = () => {
    // Perform your validation checks here
    if (!loginEmail) {
      // Display an error message or handle the validation failure
      // Snackbar.show({
      //   text: 'enter-mail-password',
      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //   textColor: Colors.WHITE,
      //   marginBottom: 30,
      // });
      alert('Enter your email and password');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      // Snackbar.show({
      //   text: 'invalid-email',
      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //   textColor: Colors.WHITE,
      //   marginBottom: 30,
      // });
      alert('Invalid email');
      return false;
    }
    if (!loginPassword) {
      // Display an error message or handle the validation failure
      // Snackbar.show({
      //   text: 'Password Required',
      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //   textColor: Colors.WHITE,
      //   marginBottom: 30,
      // });
      alert('Password required');
      return false;
    }

    // Validate email format

    // If all validations pass, return true
    return true;
  };



    const topPortion = () => {
        return (
          <Image
            source={eventoqlogo}
            style={{ width: '100%', height: 226 }}
          />
        );
      };

      const loginTextFunc = () => {
        return (
          <View style={{  marginTop: 50,alignItems: 'center', }}>
            <Text style={Styles.loginText}>Login</Text>
          </View>
        );
      };

      const loginForm = () => {
        return (
          // <KeyboardAvoidingView
          //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //   style={{ flex: 1 }}
          // >
          //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ marginTop: 40, marginLeft: 52, marginRight: 48, alignItems: 'flex-start' }}>
                {/* Textinput & Text for email */}
                <Text style={Styles.textContainer}>Email</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5 }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 }}
                    placeholder='Enter Your email'
                    placeholderTextColor='#A1A1A1'
                    value={loginEmail}
                    onChangeText={(text) => setLoginEmail(text)}
                    keyboardType="email-address"
                  />
                </View>
      
                {/* Textinput & Text for password */}
                <Text style={[Styles.textContainer, { marginTop: 20 }]}>Password</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5 }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 }}
                    placeholder='Enter Your Password'
                    placeholderTextColor='#A1A1A1'
                    secureTextEntry={true}
                    value={loginPassword}
                    onChangeText={(text) => setLoginPassword(text)}
                  />
                </View>
                {/* Show Password and Forgot Password container */}
                <View style = {{width:'98%',marginTop:13,flexDirection:"row",justifyContent:'space-between',height:30,}}>
                  <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity 
                    style={[Styles.checkBoxContainer,{alignSelf:'center'}]}
                    >
                      
                    </TouchableOpacity> 
                    <Text style={[Styles.poppinsMed14,{marginLeft:7,alignSelf:'center'}]}>Show Password</Text>              
                  </View>
                  <TouchableOpacity style={{alignSelf:'center'}}>
                    <Text style={[Styles.poppinsMed14,{}]}>Forgot Password ?</Text>
                  </TouchableOpacity>  
                </View>

                {/* Login Button */}
                <View style = {{marginTop:35,width:'100%'}}>
                  <TouchableOpacity 
                  style={[Styles.buttonContainer,{}]}
                  onPress={loginHandler}
                  >
                    <Text style={Styles.poppinsSemi17White}>Login</Text>

                  </TouchableOpacity>

                </View>


                {/* Or section */}
                <View style={{marginTop:14,height:21,width:"100%",alignItems:'center',justifyContent:'center'}}>
                  <Text style={[Styles.poppinsMed14,{color:'#A5A5A5'}]}>Or</Text>
                </View>


                {/*Login with OTP*/}
                <View style = {{marginTop:14,width:'100%'}}>
                  <TouchableOpacity style={[Styles.buttonTransparentContainer,{}]}>
                    <Text style={Styles.poppinsReg16Black}>Login With OTP</Text>
                  </TouchableOpacity>
                </View>


                {/* Signup Section */}
                <View style={{marginTop:40,height:33,width:"100%",alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:102}}>
                  <Text style={[Styles.poppinsMed14,{color:'#A5A5A5'}]}>Don't have an account ?</Text>  
                  <TouchableOpacity 
                    style={{marginLeft:9}} 
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    <Text style={[Styles.poppinsMed15Primary,{}]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>



              </View>
          //   </ScrollView>
          // </KeyboardAvoidingView>
        );
      };
  return (
    
    <ScrollView style={Styles.container}>
      {topPortion()}
      {loginTextFunc()}
      {loginForm()}
    </ScrollView>
    
  )
}
export default Login