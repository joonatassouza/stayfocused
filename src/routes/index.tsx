import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import {useSettings} from '../hooks/settings';

import Home from '../pages/Home';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
  const {resting} = useSettings();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#C7D9D7',
          inactiveTintColor: resting ? '#F25D27' : '#8C4E37',
          style: {
            backgroundColor: resting ? '#8C4E37' : '#F25D27',
            elevation: 0,
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color}: {color: string}) => (
              <Icon size={25} color={color} name="crosshair" />
            ),
            title: '',
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color}: {color: string}) => (
              <Icon size={25} color={color} name="settings" />
            ),
            title: '',
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
