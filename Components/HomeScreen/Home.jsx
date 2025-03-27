import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import Styles from '../../Styles/Styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const navigation = useNavigation();
  const { loading, createTaskFunc, taskDisplayFunc , deleteTaskItem, taskSingleItemDisplay, updateTaskFunc} = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [formattedDateBackend, setFormattedDateBackend] = useState('');
  const [formattedTimeBackend, setFormattedTimeBackend] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [singleTask, setSingleTask] = useState({});
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const createTaskHandler = async () => {
    const combinedDateTime = `${formattedDateBackend}${formattedTimeBackend.substring(10)}`;
    // console.log('Combined DateTime:', combinedDateTime);

    try {
      const response = await createTaskFunc(taskTitle, taskDescription, combinedDateTime);
      // console.log("Response---->", response);
      if (response?.status === 200 || response?.status === 201) {
        // console.log("Response Data---->", response?.data);
        alert(response?.data?.message ? response?.data?.message : "Task created successfully");
        setTaskTitle('');
        setTaskDescription('');
        setDate(new Date());
        setTime(new Date());
        setFormattedDateBackend('');
        setFormattedTimeBackend('');
        setModalVisible(false);
        fetchTaskFunction();
      }
    } catch (error) {
      console.log("Error --->>", error);
    }
  };


  const updateTaskHandler = async () => {
    const combinedDateTime = `${formattedDateBackend}${formattedTimeBackend.substring(10)}`;
    // console.log('Combined DateTime:', combinedDateTime);
    // console.log('Combined DateTime:', selectedTaskId);

    try {
      const response = await updateTaskFunc(selectedTaskId,taskTitle, taskDescription, combinedDateTime);
      // console.log("Response---->", response);
      if (response?.status === 200 || response?.status === 201) {
        // console.log("Response Data---->", response?.data);
        alert(response?.data?.message ? response?.data?.message : "Task created successfully");
        setTaskTitle('');
        setTaskDescription('');
        setDate(new Date());
        setTime(new Date());
        setFormattedDateBackend('');
        setFormattedTimeBackend('');
        setEditModalVisible(false);
        fetchTaskFunction();

      }
    } catch (error) {
      console.log("Error --->>", error);
    }
  };

  const fetchTaskFunction = async () => {
    try {
      setRefreshing(true); // Start refreshing
      const response = await taskDisplayFunc();
      // console.log('Response fetchTaskFunction--->', response);
      if (response.status === 200 || response.status === 201) {
        // console.log('Response--->', response?.data?.data)
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
    finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  useEffect(() => {
    console.log('useEffect called');
  },[taskTitle, taskDescription, date, time, formattedDateBackend, formattedTimeBackend]);
  
  useEffect(() => {
    console.log('useEffect called');
    fetchTaskFunction();
  }, []);

  useEffect(() => {
    console.log('useEffect called');
    viewTaskHandler();
  }, [selectedTaskId]);

  const viewTaskHandler = async () => {
    console.log("View task handler function called ===>>>")
    console.log('view task  Idd----->>>>>>>',selectedTaskId);
    try {
      const response = await taskSingleItemDisplay(selectedTaskId);
      console.log('Response fetchTaskFunction--->', response?.data);
      if (response.status === 200 || response.status === 201) {
        console.log('Response--->', response?.data?.data[0])
        setSingleTask(response?.data?.data[0]);
        setTaskTitle(response?.data?.data[0]?.title);
        setTaskDescription(response?.data?.data[0]?.description);
        // setDate(new Date(response?.data?.data[0]?.dueDate));
        // setTime(new Date(response?.data?.data[0]?.dueDate));
        
        
      } else {
        setSingleTask({});
      }
    } catch (error) {
      console.log('Hello Here home error-->', error);
      setSingleTask({});
    }
  };

  const taskDeleteHandler = async () => {
    // console.log('delete task  Idd----->>>>>>>',selectedTaskId);
    try {
      const response = await deleteTaskItem(selectedTaskId);
      // console.log('delete task  Idd after response from screen----->>>>>>>',selectedTaskId);
      // console.log('Response for delete task items ----->>>>>>>', response);
      // console.log('Response Status for delete task items ----->>>>>>>', response?.status);
      if (response.status === 200 || response.status === 201) {
        console.log(
          'Response for delete tsaks ----->>>>>>>',
          response.data,
        );
        // console.log("Response banner----->>>>>>>", response.data.data.banner.banner_offer);
        // Snackbar.show({
        //   text: response.message ? response.message : 'Something went wrong',
        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   textColor: 'white',
        //   marginBottom: 30,
        // });
        alert(response?.data ? response?.data : 'Task deleted successfully');
        setDeleteModalVisible(false);
        fetchTaskFunction();

      } else {
        // Snackbar.show({
        //   text: response.message ? response.message : 'Something went wrong',
        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   textColor: 'white',
        //   marginBottom: 30,
        // });
      }
    } catch (error) {
      // Snackbar.show({
      //   text: 'Something went wrong',
      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //   textColor: 'white',
      //   marginBottom: 30,
      // });
      console.log('Error in delete Promotion ----->>>>>>>', error);
    }
  };

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

  const handleDeletePress = (taskId) => {
    console.log('Task ID:', taskId);
    setSelectedTaskId(taskId);
    setDeleteModalVisible(true);
  };

  const handleEditPress = (taskId) => {
    setSelectedTaskId(taskId);
    // Navigate to the edit screen or open an edit modal
    console.log("Editing task with ID:", taskId);
    // Example: navigation.navigate('EditScreen', { taskId });
    setEditModalVisible(true)
    viewTaskHandler()

  };

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
        <TouchableOpacity style={styles.iconButton}
        onPress={() => 
          // setEditModalVisible(true)
          handleEditPress(item?._id)
        }
        >
          <Icon name="edit" size={20} color="#007AFF" />

          <Text style={styles.iconLabel}>Edit</Text>
        </TouchableOpacity>
         {/* Update the TouchableOpacity for delete */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDeletePress(item?._id)}
        >
          <Icon name="delete" size={20} color="#FF3B30" />
          <Text style={styles.iconLabel}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Function to render delete confirmation modal
  const deleteConfirmationModal = () => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalDeleteContainer}>
          <View style={styles.modalDeleteContent}>
            <Text style={styles.modalText}>
              <Text style={{ fontStyle: "italic" }}>Do you wish a</Text>{" "}
              <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                Permanent Delete?
              </Text>
            </Text>

            {/* Buttons */}
            <View style={styles.buttonDeleteContainer}>
              <TouchableOpacity
                style={styles.cancelDeleteButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  taskDeleteHandler();
                  // setDeleteModalVisible(false);
                }}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const taskListHandler = () => (
    <FlatList
      data={taskList}
      renderItem={renderTaskList}
      keyExtractor={(item) => item?._id.toString()}
      contentContainerStyle={styles.taskListContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchTaskFunction} // Trigger fetchTaskFunction on pull-to-refresh
        />
      }
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
            <Text style={Styles.modalTitle}>Add New Task </Text>
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


  const editTaskModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={Styles.modalOverlay}>
          <View style={Styles.modalContainer}>
            <Text style={Styles.modalTitle}>Edit Task </Text>
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
              <TouchableOpacity style={Styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                <Text style={Styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.createButton} onPress={updateTaskHandler}>
                <Text style={Styles.buttonText}>Save</Text>
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
         {/* Render Delete Confirmation Modal */}
      {deleteConfirmationModal()}
      </ScrollView>
      {footerCreatePortion()}
      {createTaskModal()}
      {editTaskModal()}
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


  modalDeleteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalDeleteContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  buttonDeleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  cancelDeleteButton: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#D1006E",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default Home;