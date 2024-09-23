// screens/UserListScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig'; // Import db
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const [visible, setVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const menuAnchorRef = useRef(null);

  const fetchUsers = async () => {
    setLoading(true); // Start loading
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
    setLoading(false); // Stop loading after data is fetched
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleDeleteUser = async (id) => {
    setLoading(true); // Start loading
    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef);
    fetchUsers(); // Refresh the user list after deletion
    setLoading(false); // Stop loading
  };

  const showMenu = (id, anchor) => {
    setSelectedUserId(id);
    setVisible(true);
  };

  const hideMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.container}>
        {loading ? ( // Show loading indicator when loading
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{`Tên: ${item.name}`}</Text>
                  <Text style={styles.itemText}>{`Email: ${item.email}`}</Text>
                  <Text style={styles.itemText}>{`Tuổi: ${item.age}`}</Text>
                </View>
                <TouchableOpacity
                  onPress={(event) => {
                    menuAnchorRef.current = event.nativeEvent.target;
                    showMenu(item.id);
                  }}
                  style={styles.menuButton}
                >
                  <Text style={styles.menuText}>⋮</Text>
                </TouchableOpacity>
                <Menu
                  visible={visible && selectedUserId === item.id}
                  onDismiss={hideMenu}
                  anchor={<View ref={menuAnchorRef} style={styles.menuAnchor} />}
                  contentStyle={styles.menuContent}
                  style={styles.menuPosition}
                >
                  <TouchableOpacity
                    style={[styles.menuItem, styles.deleteButton]}
                    onPress={() => {
                      hideMenu();
                      Alert.alert(
                        "Xác nhận xoá người dùng",
                        "Bạn chắc chắn muốn xoá người dùng này chứ?",
                        [
                          { text: "Huỷ", onPress: hideMenu, style: "cancel" },
                          { text: "Xoá", onPress: () => handleDeleteUser(item.id) }
                        ]
                      );
                    }}
                  >
                    <Text style={styles.menuItemText}>Xoá</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.menuItem, styles.updateButton]}
                    onPress={() => {
                      hideMenu();
                      navigation.navigate('UpdateUser', { userId: item.id });
                    }}
                  >
                    <Text style={styles.menuItemText}>Cập nhật</Text>
                  </TouchableOpacity>
                </Menu>
              </View>
            )}
          />
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbe4ce',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#f1efbe',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    color: '#333',
  },
  menuContent: {
    backgroundColor: '#e6bb77',
  },
  menuItem: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  updateButton: {
    backgroundColor: '#4caf50',
  },
  menuItemText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  menuAnchor: {
    width: 1,
    height: 1,
  },
  menuPosition: {
    position: 'left',
    left: 200,
    transform: [{ translateY: -40 }],
    width: 100,
  },
});

export default UserListScreen;
