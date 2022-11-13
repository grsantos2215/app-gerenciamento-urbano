import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AlagamentoScreen from '../screens/AlagamentoScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapScreen from '../screens/MapScreen';
import DesmatamentoScreen from '../screens/DesmatamentoScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Tempo') {
                            iconName = focused ? 'cloud' : 'cloud-outline';
                        } else if (route.name === 'Alagamento') {
                            iconName = focused ? 'water' : 'water-outline';
                        } else if (route.name === 'Mapa') {
                            iconName = focused ? 'ios-map' : 'ios-map-outline';
                        } else if (route.name === 'Desmatamento') {
                            iconName = focused ? 'leaf' : 'leaf-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Tempo" component={HomeScreen} />
                <Tab.Screen name="Alagamento" component={AlagamentoScreen} />
                <Tab.Screen name="Desmatamento" component={DesmatamentoScreen} />
                <Tab.Screen name="Mapa" component={MapScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
