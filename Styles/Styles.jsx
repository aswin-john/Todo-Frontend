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

  CreateTaskText:{
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color:'white'
  },

  textContainer:{
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
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
    backgroundColor:'#007BFF',
    alignItems:'center',
    justifyContent:'center',
    elevation: 8,
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
    borderColor:"#007BFF",
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

  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  },

  modalContainer: { 
    backgroundColor: "white", 
    padding: 20, 
    width: "90%", 
    borderRadius: 10 
  },

  modalTitle: { 
    fontSize: 18, 
    fontFamily: 'Poppins-Medium',
    textAlign: "center", 
    marginBottom: 10 
  },


  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 20 
  },
  cancelButton: { 
    flex: 1, 
    backgroundColor: "#ccc", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center", 
    marginRight: 10 
  },
  createButton: { 
    flex: 1, 
    backgroundColor: "#007BFF", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },

  
 
});

export default Styles;
