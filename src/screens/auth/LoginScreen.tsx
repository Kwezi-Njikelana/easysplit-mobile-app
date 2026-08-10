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
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, SeparatorVertical } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { AuthStackScreenProps } from '../../navigation/types';
import { THEME } from '../../utils/theme';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background.base }}>
      <LinearGradient colors={THEME.background.upper} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.9 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-12">
            <LinearGradient
              colors={THEME.background.button}
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <SeparatorVertical color="white" size={40} />
            </LinearGradient>
            <Text className="text-4xl font-bold mb-2" style={{ color: THEME.text.primary }}>
              EasySplit
            </Text>
            <Text className="text-lg" style={{ color: THEME.text.secondary }}>
              Scan. Split. Settle.
            </Text>
          </View>

          <View className="space-y-4 mb-6">
            <TextInput
              className="px-4 py-4 mb-4 rounded-2xl text-base"
              style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle, color: THEME.text.primary }}
              placeholderTextColor={THEME.text.muted}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <View className="flex-row items-center rounded-2xl" style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}>

            <TextInput
              className="flex-1 px-4 py-4 text-base"
              style={{ color: THEME.text.primary }}
              placeholderTextColor={THEME.text.muted}
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
                ? <EyeOff size={20} color={THEME.text.muted} />
                  : <Eye size={20} color={THEME.text.muted} />
                }

            </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="rounded-2xl mb-4 overflow-hidden"
            onPress={handleLogin}
            disabled={isLoading}
          >
            <LinearGradient colors={THEME.background.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: "center", paddingVertical: 16 }}>
              {isLoading ? (
                <ActivityIndicator color={THEME.text.dark} />
              ) : (
                <Text className="font-bold text-lg" style={{ color: THEME.text.dark }}>Sign In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 rounded-2xl mb-6 items-center"
            style={{ borderWidth: 1, borderColor: THEME.border.glow, backgroundColor: THEME.background.chip }}
            onPress={() => navigation.navigate('Signup')}
            disabled={isLoading}
          >
            <Text className="font-bold text-lg" style={{ color: THEME.text.primary }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
