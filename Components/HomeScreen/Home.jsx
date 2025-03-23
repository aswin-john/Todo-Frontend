import React, {useEffect, useState, createRef, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import eventoqlogo from '../../Images/logo/eventoqlogo.png';
import Styles from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const navigation = useNavigation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  const createTaskModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.modalOverlay}>
          <View style={Styles.modalContainer}>
          <Text style={Styles.modalTitle}>New Task ToDo</Text>
          {/* Task Title Input */}
          <Text style={[Styles.textContainer,{fontFamily: 'Poppins-Regular',}]}>Title Task</Text>
                <View style={[Styles.textInputContainer, { marginTop: 5,backgroundColor:'#F9FFFA', }]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 ,width:'90%'}}
                    placeholder='Add Task Name...'
                    placeholderTextColor='#A1A1A1'
                    value={loginEmail}
                    onChangeText={(text) => setLoginEmail(text)}
                    keyboardType="email-address"
                  />
                </View>
          {/* Task Description Input */}
          <Text style={[Styles.textContainer,{fontFamily: 'Poppins-Regular',marginTop: 10,}]}> Description </Text>
                <View style={[Styles.textInputContainer, { backgroundColor:'#F9FFFA', height:150,}]}>
                  <TextInput
                    style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1 ,width:'90%',height:150,}}
                    placeholder='Add Decsription...'
                    placeholderTextColor='#A1A1A1'
                    value={loginEmail}
                    onChangeText={(text) => setLoginEmail(text)}
                    keyboardType="email-address"
                  />
                </View>

                {/* Date and Time Picker Text Labels */}

                <View style={{flexDirection:'row',width:'100%',}}>
                  <View style = {{width:'50%',}}>
                    <Text style={[Styles.textContainer,{fontFamily: 'Poppins-Regular',marginTop: 10,}]}> Date </Text>
                  </View>
                  <View style = {{width:'50%',}}>
                    <Text style={[Styles.textContainer,{fontFamily: 'Poppins-Regular',marginTop: 10,}]}> Time </Text>
                  </View>
                </View>

          {/* Date and Time Picker */}
          <View style={Styles.dateTimeContainer}>
              <TouchableOpacity style={Styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.dateButton} onPress={() => setShowTimePicker(true)}>
                <Text>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}


          {/* Action Buttons */}
          <View style={Styles.buttonRow}>
              <TouchableOpacity style={Styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={Styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.createButton}>
                <Text style={Styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>


          </View>
          
        </View>
      </Modal>
    );
  };

  const footerCreatePortion = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={[Styles.buttonContainer]} onPress={() => setModalVisible(true)}>
          <Text style={Styles.CreateTaskText}>Create New</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Your other components go here */}
      </ScrollView>
      {footerCreatePortion()}
      {createTaskModal()}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: windowHeight / 10, // Adjust the height as needed
  },


  
  
 
  
 


});

export default Home;