import React, {useEffect, useState, createRef, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,Dimensions, TextInput,KeyboardAvoidingView,ScrollView, TouchableOpacity } from 'react-native'
import eventoqlogo from '../../Images/logo/eventoqlogo.png'
import Styles from '../../Styles/Styles';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SignUp = () => {
  const navigation = useNavigation();

    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

    const { loading,  agentRegistration,  } = useContext(AuthContext)

    const signUpHandler = async () => {
      //navigation.navigate("SignupContinue");
      console.log("SignUP fields ----",signUpName,signUpEmail, signUpPassword)

      const isAgentValid = agentdataValidation()
      if (isAgentValid) {
        console.log("After Validation ");

          try {
              const response = await agentRegistration(signUpName,signUpEmail, signUpPassword);
              console.log("Response----->>>>",response)
              console.log("Response----->>>>",response?.message)

            if(response?.message === 'User created successfully')
            {
              Alert.alert('Success', response?.message);
              navigation.navigate('Login')
            }

              
              
          } catch (error) {
              

              // Snackbar.show({
              //     text: "Something went wrong",
              //     //text: response?.message,
              //     duration: Snackbar.LENGTH_LONG,
              //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
              //     textColor: Colors.WHITE,
              //     marginBottom: 30,
              // });
              Alert.alert('Success', response?.message);
              console.log('Registration failed signup====>', error);
          }
      }
  }


  const agentdataValidation = () => {
    // Perform your validation checks here
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword ) {
      
       
        // Snackbar.show({
        //     text: t('all-field-required'),
        //     duration: Snackbar.LENGTH_LONG,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     textColor: Colors.WHITE,
        //     marginBottom: 30,
        // });
        console.warn('All fields are required');
        console.log("All fields are required")
   
        return false;
    }

    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
        
        console.warn('Invalid email format');
        console.log("Invalid email format")

        return false;
    }

    // Validate password length
    if (signUpPassword.length < 6) {
       
        // Snackbar.show({
        //     text: t('password-character-size-warning'),
        //     duration: Snackbar.LENGTH_LONG,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     textColor: Colors.WHITE,
        //     marginBottom: 30
        // });
        console.warn('Password should be at least 6 characters long');
        console.log("Password should be at least 6 characters long")

        return false;
    }

    // Validate password and confirm password match
    if (signUpPassword !== signUpConfirmPassword) {
        
        // Snackbar.show({
        //     text: t('password-not-match'),
        //     duration: Snackbar.LENGTH_LONG,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     textColor: Colors.WHITE,
        //     marginBottom: 30
        // });
        console.warn('Password and confirm password do not match');
        console.log("Password and confirm password do not match")
        
        return false;
    }
    // Additional custom validations can be added based on  requirements

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

      const signUpTextFunc = () => {
        return (
          <View style={{  marginTop: 50,alignItems: 'center', }}>
            <Text style={Styles.loginText}>Sign Up</Text>
          </View>
        );
      };

      const signUpForm = () => {
        return (
          // <KeyboardAvoidingView
          //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //   style={{ flex: 1 }}
          // >
          //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ marginTop: 40, marginLeft: 52, marginRight: 48, alignItems: 'flex-start' }}>

                {/* Textinput & Text for Name */}
                <Text style={Styles.textContainer}>Name</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5 }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 }}
                    placeholder='Enter Your Name'
                    placeholderTextColor='#A1A1A1'
                    value={signUpName}
                    onChangeText={(text) => setSignUpName(text)}
                    keyboardType="email-address"
                  />
                </View>




                {/* Textinput & Text for email */}
                <Text style={[Styles.textContainer,{marginTop: 20}]}>Email</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5 }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 }}
                    placeholder='Enter Your email'
                    placeholderTextColor='#A1A1A1'
                    value={signUpEmail}
                    onChangeText={(text) => setSignUpEmail(text)}
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
                    value={signUpPassword}
                    onChangeText={(text) => setSignUpPassword(text)}
                  />
                </View>


                {/* Textinput & Text for confirm password */}
                <Text style={[Styles.textContainer, { marginTop: 20 }]}>Confirm Password</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5 }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 }}
                    placeholder='Enter Your Password'
                    placeholderTextColor='#A1A1A1'
                    secureTextEntry={true}
                    value={signUpConfirmPassword}
                    onChangeText={(text) => setSignUpConfirmPassword(text)}
                  />
                </View>


                {/* Terms and Condition */}
                <View style = {{width:'98%',marginTop:13,flexDirection:"row",height:30,}}>
                  <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity 
                    style={[Styles.checkBoxContainer,{alignSelf:'center'}]}
                    >
                      
                    </TouchableOpacity> 
                    <Text style={[Styles.poppinsMed14,{marginLeft:7,alignSelf:'center'}]}>I have accepted the </Text>              
                  </View>
                  <TouchableOpacity style={{alignSelf:'center'}}>
                    <Text style={[Styles.poppinsMed14Primary,{}]}>terms & conditions</Text>
                  </TouchableOpacity>  
                </View>

                {/* Sign Up  Button */}
                <View style = {{marginTop:35,width:'100%'}}>
                  <TouchableOpacity 
                  style={[Styles.buttonContainer,{}]}
                  onPress={signUpHandler}
                  >
                    <Text style={Styles.poppinsSemi17White}>Sign Up</Text>

                  </TouchableOpacity>

                </View>



                {/* Signup Section */}
                <View style={{marginTop:40,height:33,width:"100%",alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:102}}>
                  <Text style={[Styles.poppinsMed14,{color:'#A5A5A5'}]}>Already have an account ? </Text>  
                  <TouchableOpacity style = {{marginLeft:9}}>
                    <Text style={[Styles.poppinsMed15Primary,{}]}>Login</Text>
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
      {signUpTextFunc()}
      {signUpForm()}
    </ScrollView>
    
  )
}
export default SignUp