import { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Home';
import UserScreen from './UserScreen';
import TaskManage from './TaskManage';
import Header from './Header';
import IncomeManage from './IncomeManage';
import LoginScreen from './Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../provider/AuthContext';

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  `Bottom Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.`,
]);

const Tab = createBottomTabNavigator();

const TabBar = () => (
  <Tab.Navigator
    initialRouteName="Chat"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconSize = size;

        if (focused) {
          iconSize = size + 4; // Kích thước lớn hơn cho biểu tượng được chọn
        }

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'briefcase' : 'briefcase-outline';
        } else if (route.name === 'Me') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Income') {
          iconName = focused ? 'cash' : 'cash-outline';
        }

        // return <Ionicons name={iconName} size={iconSize} color={color} />;
        return (
          <View style={styles.tabBarButtonContainer}>
            {focused && <View style={styles.tabBarLine} />}
            <Ionicons name={iconName} size={iconSize} color={color} />
          </View>
        );
      },
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
    style={styles.tabBarContainer}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Chat"
      component={TaskManage}
      options={{
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Income"
      component={IncomeManage}
      options={{
        tabBarLabel: () => null,
      }}
    />

    <Tab.Screen
      name="Me"
      component={UserScreen}
      options={{
        tabBarLabel: () => null,
      }}
    />
  </Tab.Navigator>
);

const Verify = () => {
  const { isLoggedIn, isFetchingUserData } = useContext(AuthContext);

  return isFetchingUserData ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {!isLoggedIn ? (
        <LoginScreen />
      ) : (
        <NavigationContainer>
          <View style={styles.container}>
            <Header />
            <TabBar />
          </View>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    marginVertical: 0,
  },
  tabBarContainer: {
    height: 120,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLine: {
    width: '100%',
    height: 4,
    backgroundColor: 'green', // Màu của đường line khi biểu tượng được chọn
    position: 'absolute',
    top: -9,
  },
});

export default Verify;
