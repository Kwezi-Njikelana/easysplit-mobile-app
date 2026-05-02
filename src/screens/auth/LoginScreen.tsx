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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, SeparatorVertical } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { AuthStackScreenProps } from '../../navigation/types';

type Props = AuthStackScreenProps<'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !password) {
      Alert.alert('Missing fields', 'Please enter both your email and password.');
      return;
    }
    try {
      await login(trimmedEmail, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error?.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-emerald-500 rounded-3xl items-center justify-center mb-4">
              <SeparatorVertical color="white" size={40} />
            </View>
            <Text className="text-4xl font-bold text-gray-900 mb-2">
              EasySplit
            </Text>
            <Text className="text-gray-600 text-lg">
              Scan. Split. Settle.
            </Text>
          </View>

          <View className="space-y-4 mb-6">
            <TextInput
              className="bg-white px-4 py-4 mb-4 rounded-2xl border border-gray-200 text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <View className="flex-row items-center bg-white rounded-2xl border border-gray-200">

            <TextInput
              className="flex-1 px-4 py-4 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            className="px-4"
            disabled={isLoading}
            >
              {showPassword 
                ? <EyeOff size={20} color="#9ca3af" />
                  : <Eye size={20} color="#9ca3af" />
                }

            </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-emerald-500 py-4 rounded-2xl mb-4 items-center"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 py-4 rounded-2xl mb-6 items-center"
            onPress={() => navigation.navigate('Signup')}
            disabled={isLoading}
          >
            <Text className="text-gray-700 font-bold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}