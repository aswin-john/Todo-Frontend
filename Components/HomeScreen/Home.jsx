import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import Styles from '../../Styles/Styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const navigation = useNavigation();
  const { loading, createTaskFunc,taskDisplayFunc } = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [formattedDateBackend, setFormattedDateBackend] = useState('');
  const [formattedTimeBackend, setFormattedTimeBackend] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const createTaskHandler = async () => {
    // console.log("Function called----->>");
    // console.log('Task Title', taskTitle);
    // console.log('Task Description', taskDescription);
    // console.log('Task Date', formattedDateBackend);
    // console.log('Task Time', formattedTimeBackend);

    // Combine date and time into the desired format
  const combinedDateTime = `${formattedDateBackend}${formattedTimeBackend.substring(10)}`;
  console.log('Combined DateTime:', combinedDateTime);

    try {
      const response = await createTaskFunc(taskTitle, taskDescription, combinedDateTime);
      console.log("Response---->", response);
      if (response?.status === 200 || response?.status === 201) {
        console.log("Response Data---->", response?.data);
        // Snackbar.show({
        //   text: response?.message ? response?.message : "Task created successfully",
        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   textColor: Colors.WHITE,
        //   marginBottom: 30
        // });
        alert(response?.data?.message ? response?.data?.message : "Task created successfully");
        // Reset the values
        setTaskTitle('');
        setTaskDescription('');
        setDate(new Date());
        setTime(new Date());
        setFormattedDateBackend('');
        setFormattedTimeBackend('');
        setModalVisible(false);
      } else {
        // Snackbar.show({
        //   text: response?.error ? response?.error : 'Something went wrong',
        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   textColor: Colors.WHITE,
        //   marginBottom: 30
        // });
      }
    } catch (error) {
      // Snackbar.show({
      //   text: error?.message ? error?.message : 'Something went wrong',
      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //   textColor: Colors.WHITE,
      //   marginBottom: 30
      // });
      console.log("Error --->>", error);
    }
  };


  const fetchTaskFunction = async () => {
    try {
      const response = await taskDisplayFunc();
      console.log('Response fetchInventoryFunction--->', response);
      if (response.status === 200 || response.status === 201) {
        console.log('Response--->', response?.data?.data)
        setTaskList(response?.data?.data);
        if (response.data.length < 1) {
          setTaskList([]);
        }
      } else {
        Snackbar.show({
          text: response.message ? response.message : t('something-went-wrong'),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          textColor: Colors.WHITE,
          marginBottom: 30,
        });
        setTaskList([]);
      }
    } catch (error) {
      console.log('Hello Here home error-->',error);
      Snackbar.show({
        text: t('something-went-wrong'),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        textColor: Colors.WHITE,
        marginBottom: 30,
      });
      setTaskList([]);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    fetchTaskFunction();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      
      setDate(selectedDate);
      // Format the date as needed (e.g., 'YYYY-MM-DD')
    const formattedDate = selectedDate.toISOString().split('T')[0];
    console.log('Selected Date:', formattedDate);
    setFormattedDateBackend(formattedDate);
    } else {
      console.log('No date selected');
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      // Format the time as needed (e.g., 'HH:mm:ss')
      const formattedTime = selectedTime.toISOString()
      console.log('Selected Time:', formattedTime);
      setFormattedTimeBackend(formattedTime);
    } else {
      console.log('No time selected');
    }
  }

  useEffect(() => {
    console.log('Date has changed:', date);
  }, [date]);

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
            <Text style={[Styles.textContainer, { fontFamily: 'Poppins-Regular' }]}>Title Task</Text>
            <View style={[Styles.textInputContainer, { marginTop: 5, backgroundColor: '#F9FFFA' }]}>
              <TextInput
                style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1, width: '90%' }}
                placeholder='Add Task Name...'
                placeholderTextColor='#A1A1A1'
                value={taskTitle}
                onChangeText={(text) => setTaskTitle(text)}
              />
            </View>
            <Text style={[Styles.textContainer, { fontFamily: 'Poppins-Regular', marginTop: 10 }]}>Description</Text>
            <View style={[Styles.textInputContainer, { backgroundColor: '#F9FFFA', height: 150 }]}>
              <TextInput
                style={{ start: 16, color: '#000000', fontFamily: 'Inter-Regular', marginVertical: 1, width: '90%', height: 150 }}
                placeholder='Add Description...'
                placeholderTextColor='#A1A1A1'
                value={taskDescription}
                onChangeText={(text) => setTaskDescription(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '50%' }}>
                <Text style={[Styles.textContainer, { fontFamily: 'Poppins-Regular', marginTop: 10 }]}>Date</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={[Styles.textContainer, { fontFamily: 'Poppins-Regular', marginTop: 10 }]}>Time</Text>
              </View>
            </View>
            <View style={Styles.dateTimeContainer}>
              <TouchableOpacity style={Styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text>{date ? date.toLocaleDateString() : 'Select Date'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.dateButton} onPress={() => setShowTimePicker(true)}>
              <Text>{time ? time.toLocaleTimeString() : 'Select Time'}</Text>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <View style={Styles.buttonRow}>
              <TouchableOpacity style={Styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={Styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.createButton} onPress={createTaskHandler}>
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
    height: windowHeight / 10,
  },
});

export default Home;