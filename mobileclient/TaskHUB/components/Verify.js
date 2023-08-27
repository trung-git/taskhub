import { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Home';
import UserScreen from './UserScreen';
import TaskManage from './TaskManage';
import Header from './Header';
import LoginScreen from './Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../provider/AuthContext';

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

const TabBar = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'briefcase' : 'briefcase-outline';
        } else if (route.name === 'Me') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
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
});

export default Verify;
