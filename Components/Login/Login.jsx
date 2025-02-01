import React, {useEffect, useState, createRef, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,Dimensions, TextInput,KeyboardAvoidingView,ScrollView, TouchableOpacity } from 'react-native'
import eventoqlogo from '../../Images/logo/eventoqlogo.png'
import Styles from '../../Styles/Styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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
                  <TouchableOpacity style={[Styles.buttonContainer,{}]}>
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
                  <TouchableOpacity style = {{marginLeft:9}}>
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