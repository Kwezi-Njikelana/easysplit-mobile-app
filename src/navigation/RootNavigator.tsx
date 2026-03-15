import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Receipt, Users, DollarSign, User, House, HandCoins } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/home/HomeScreen';
import GroupsScreen from '../screens/groups/GroupsScreen';
import BalancesScreen from '../screens/balances/BalancesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditReceiptScreen from '../screens/receipt/EditReceiptScreen';
import AssignItemsScreen from '../screens/receipt/AssignItemsScreen';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';
import ScanReceiptScreen from '../screens/receipt/ScanReceiptScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Auth Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// Main Tab Navigator 
function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 100,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
           headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Users color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Balances"
        component={BalancesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HandCoins color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

// Root Navigator
export default function RootNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {!isAuthenticated ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <RootStack.Screen name="Main" component={MainNavigator} />
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen 
              name="ScanReceipt" 
              component={ScanReceiptScreen}
              options={{
                headerShown: true,
                title: 'Scan Receipt',
                headerStyle: { backgroundColor: '#10b981' },
                headerTintColor: '#fff',
              }}
            />
            <RootStack.Screen 
              name="EditReceipt" 
              component={EditReceiptScreen}
              options={{
                headerShown: true,
                title: 'Edit Receipt',
              }}
            />
            <RootStack.Screen 
              name="AssignItems" 
              component={AssignItemsScreen}
              options={{
                headerShown: true,
                title: 'Assign Items',
              }}
            />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
}