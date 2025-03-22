import React, {useEffect, useState, createRef, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import eventoqlogo from '../../Images/logo/eventoqlogo.png';
import Styles from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const navigation = useNavigation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const footerCreatePortion = () => {
    return (
      <View style={styles.footer}>
        <Text style={Styles.loginText}>Home</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Your other components go here */}
      </ScrollView>
      {footerCreatePortion()}
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, // Adjust the height as needed
  },
});

export default Home;