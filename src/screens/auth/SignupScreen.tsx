import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { AuthStackScreenProps } from '../../navigation/types';

type Props = AuthStackScreenProps<'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isLoading } = useAuthStore();

  const handleSignup = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await signup(email, password, fullName);
      // Navigation will happen automatically through the auth state change
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
         
          <View className="px-6 py-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="w-10 h-10 items-center justify-center"
              disabled={isLoading}
            >
              <ArrowLeft color="#000" size={24} />
            </TouchableOpacity>
          </View>

        
          <View className="px-6 mb-8">
            <Text className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600 text-lg">
              Join EasySplit and start splitting expenses
            </Text>
          </View>

          {/* Form */}
          <View className="px-6 space-y-4">
            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-sm">
                Full Name
              </Text>
              <View className="flex-row items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200">
                <User color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="John Doe"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-sm">
                Email Address
              </Text>
              <View className="flex-row items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200">
                <Mail color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="john@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!isLoading}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-sm">
                Password
              </Text>
              <View className="flex-row items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200">
                <Lock color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="At least 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-sm">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-200">
                <Lock color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Terms & Conditions */}
            {/* <View className="py-2">
              <Text className="text-gray-600 text-xs text-center">
                By creating an account, you agree to our{' '}
                <Text className="text-emerald-600 font-semibold">
                  Terms of Service
                </Text>
                {' '}and{' '}
                <Text className="text-emerald-600 font-semibold">
                  Privacy Policy
                </Text>
              </Text>
            </View> */}

            <TouchableOpacity
              className="bg-emerald-500 py-4 rounded-2xl items-center mb-4"
              onPress={handleSignup}
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center justify-center py-4 mb-6">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                disabled={isLoading}
              >
                <Text className="text-emerald-600 font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}