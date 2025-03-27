import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import Styles from '../../Styles/Styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const navigation = useNavigation();
  const { loading, createTaskFunc, taskDisplayFunc } = useContext(AuthContext);

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
    const combinedDateTime = `${formattedDateBackend}${formattedTimeBackend.substring(10)}`;
    console.log('Combined DateTime:', combinedDateTime);

    try {
      const response = await createTaskFunc(taskTitle, taskDescription, combinedDateTime);
      console.log("Response---->", response);
      if (response?.status === 200 || response?.status === 201) {
        console.log("Response Data---->", response?.data);
        alert(response?.data?.message ? response?.data?.message : "Task created successfully");
        setTaskTitle('');
        setTaskDescription('');
        setDate(new Date());
        setTime(new Date());
        setFormattedDateBackend('');
        setFormattedTimeBackend('');
        setModalVisible(false);
      }
    } catch (error) {
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
        setTaskList([]);
      }
    } catch (error) {
      console.log('Hello Here home error-->', error);
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
      const formattedTime = selectedTime.toISOString();
      console.log('Selected Time:', formattedTime);
      setFormattedTimeBackend(formattedTime);
    } else {
      console.log('No time selected');
    }
  }

  useEffect(() => {
    console.log('Date has changed:', date);
  }, [date]);

  const renderTaskList = ({ item }) => (
    <View style={styles.taskItem}>
      {/* Task Title & Description */}
      <Text style={styles.taskTitle}>{item?.title}</Text>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
      <Text style={styles.taskDescription}>{item?.description}</Text>
      <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View</Text>
          <Icon name="visibility" size={16} color="#007AFF" />
        </TouchableOpacity>
        </View>
  
      {/* Colored Separator */}
      <View style={styles.separator} />
  
      {/* Due Date & "View" Button */}
      <View style={styles.row}>
        <Text style={styles.taskDueDate}>{item?.dueDate}</Text>
        
      </View>
  
      {/* Edit & Delete Buttons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="edit" size={20} color="#007AFF" />
          <Text style={styles.iconLabel}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="delete" size={20} color="#FF3B30" />
          <Text style={styles.iconLabel}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const taskListHandler = () => (
    <FlatList
      data={taskList}
      renderItem={renderTaskList}
      keyExtractor={(item) => item?._id.toString()}
      contentContainerStyle={styles.taskListContainer}
    />
  );

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
        {taskListHandler()}
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
  taskListContainer: {
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskDueDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },

  separator: {
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  viewText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  iconButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
});

export default Home;