import {StyleSheet, Dimensions} from 'react-native';
// import Colors from '../assets/Colors';
// import Fonts from '../assets/Fonts';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  //Containers
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
  },

  loginText:{
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color:'#000000'
  },

  textContainer:{
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color:'#000000'
  },

  textInputContainer:{
    borderWidth:1,
    width: "100%",
    height:50,
    borderRadius:8,
    borderColor:'#A1A1A1',
    backgroundColor:'#FFFFFF',
  },

  checkBoxContainer:{
    width:20,
    height:20,
    borderWidth:1.5,
    borderColor:'#FF6666',
    borderRadius:3,
  },

  poppinsMed14:{
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color:'#848484'
  },

  buttonContainer:{
    // borderWidth:1,
    width: "100%",
    height:46,
    borderRadius:6,
    borderColor:'#A1A1A1',
    backgroundColor:'#FF6666',
    alignItems:'center',
    justifyContent:'center'
  },

  poppinsSemi17White:{
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color:'#FFFFFF'
  },

  buttonTransparentContainer:{
    borderWidth:1,
    width: "100%",
    height:44,
    borderRadius:6,
    borderColor:'#FF6666',
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent:'center'
  },

  poppinsReg16Black:{
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color:'#000000'
  },

  poppinsMed15Primary:{
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color:'#FF6A6A'
  },

  poppinsMed14Primary:{
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color:'#FF6A6A'
  },

  
 
});

export default Styles;
