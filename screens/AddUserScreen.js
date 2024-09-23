import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Import db
import { collection, addDoc } from 'firebase/firestore';

const AddUserScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleAddUser = async () => {
    if (!name || !email || !age) {
      Alert.alert('Vui lòng điền đầy đủ các trường.');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        age: Number(age),
      });
      Alert.alert('Thêm người dùng thành công!');
      navigation.navigate('UserList'); // Trở về màn hình UserList
      if (route.params?.refresh) {
        route.params.refresh(); // Gọi lại hàm refresh nếu có
      }
    } catch (error) {
      Alert.alert('Lỗi trong quá trình thêm: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbe4ce',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 150, // Adjust the width as needed
    alignSelf: 'center', // Center the button
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddUserScreen;
