import React from 'react';
import {MaterialIcons} from "@expo/vector-icons";
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import PlanningScreen from './screens/PlanningScreen';
import WhatsUpScreen from './screens/WhatsUpScreen';
import GamesScreen from './screens/gamesScreen';
import BottleSpinningScreen from './screens/BottleSpinningScreen';
import ListScreen from './screens/ListScreen';
import SettingsScreen from './screens/SettingsScreen';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import firebase from "firebase";


const config = {
  apiKey:            "AIzaSyCSGIQfrebP0DZN_6zeA7AsrhfrmazjVLQ",
  authDomain:        "partyone-92039.firebaseapp.com",
  databaseURL:       "https://partyone-92039.firebaseio.com",
  projectId:         "partyone-92039",
  storageBucket:     "partyone-92039.appspot.com",
  messagingSenderId: "53518038795",
};
firebase.initializeApp(config);

const LoginSwitch = createSwitchNavigator({
  LoginScreen,
  SignUpScreen,
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Home   ",
    }),
  },
  Login: {
    screen: LoginSwitch,
    navigationOptions: () => ({
      title: "Login   ",
    })
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="home" size={25} color={tintColor}/>
  ),
};

const PlanningStack = createStackNavigator({
  Planning: {
    screen: PlanningScreen,
    navigationOptions: () => ({
      title: "Planung     ",
    }),
  },
  Login: {
    screen: LoginSwitch,
    navigationOptions: () => ({
      title: "Login   ",
    })
  },
  List: {
    screen: ListScreen,
  }
});

PlanningStack.navigationOptions = {
  tabBarLabel: 'Planung',
  tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="perm-contact-calendar" size={25} color={tintColor}/>
  ),
};

const EventsStack = createStackNavigator({
  Events: {
    screen: WhatsUpScreen,
    navigationOptions: () => ({
      title: "Events    ",
    }),
  },
  Login: {
    screen: LoginSwitch,
    navigationOptions: () => ({
      title: "Login   ",
    })
  }
});

EventsStack.navigationOptions = {
  tabBarLabel: 'Whats Up?',
  tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="star" size={25} color={tintColor}/>
  ),
};

const MoreStack = createStackNavigator({
  Links: {
    screen: MoreScreen,
    navigationOptions: () => ({
      title: "Mehr   ",
    }),
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: () => ({
      title: "Spiele   ",
    }),
  },
  GameBottleSpinning: {
    screen: BottleSpinningScreen,
    navigationOptions: () => ({
      title: "Flaschendrehen             ",
    }),
  },
  Login: {
    screen: LoginSwitch,
    navigationOptions: () => ({
      title: "Login   ",
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      title: 'Einstellungen        ',
    })
  }
});

MoreStack.navigationOptions = {
  tabBarLabel: 'Mehr',
  tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="more-horiz" size={25} color={tintColor}/>
  ),
};

const MainNavigator = createBottomTabNavigator({
  HomeStack,
  PlanningStack,
  EventsStack,
  MoreStack,
});

export default createAppContainer(MainNavigator);
