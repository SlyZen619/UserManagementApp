import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './screens/UserListScreen';
import AddUserScreen from './screens/AddUserScreen';
import UpdateUserScreen from './screens/UpdateUserScreen'; // Đảm bảo đường dẫn chính xác
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#87bede', // Set your preferred background color
          },
          headerTintColor: '#fff', // Set your preferred title color
          headerTitleStyle: {
            fontWeight: 'bold', // Optional: Customize the title font style
          },
        }}
      >
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={({ navigation }) => ({
            title: 'Màn hình chính',
            headerRight: () => (
              <Icon
                name="add-circle-outline"
                size={30}
                color="#fff" // Match the icon color with the title color
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('AddUser')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUserScreen}
          options={{ title: 'Thêm người dùng' }} // Customize title if needed
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserScreen}
          options={{ title: 'Cập nhật người dùng' }} // Customize title if needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
