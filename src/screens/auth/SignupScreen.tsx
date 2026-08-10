import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, EyeOff, Eye } from "lucide-react-native";
import { useAuthStore } from "../../store/authStore";
import { AuthStackScreenProps } from "../../navigation/types";
import { THEME } from "../../utils/theme";

type Props = AuthStackScreenProps<"Signup">;

export default function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!fullName.trim()) {
      Alert.alert('Signup Failed', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert("Signup Failed", "Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Signup Failed", "Please enter a valid email address");
      return;
    }

    if (!password) {
      Alert.alert("Signup Failed", "Please enter a password");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Signup Failed", "Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Signup Failed", "Passwords do not match");
      return;
    }

    try {
      await signup(email, password, fullName);
    } catch (error: any) {
      Alert.alert('Signup Failed', error?.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background.base }}>
      <LinearGradient colors={THEME.background.upper} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.9 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              <ArrowLeft color={THEME.text.primary} size={24} />
            </TouchableOpacity>
          </View>

          <View className="px-6 mb-8">
            <Text className="text-4xl font-bold mb-2" style={{ color: THEME.text.primary }}>
              Create Account
            </Text>
            
          </View>

          {/* Form */}
          <View className="px-6 space-y-4">
            <View>
              <Text className="font-semibold mb-2 text-sm" style={{ color: THEME.text.secondary }}>
                Full Name
              </Text>
              <View className="flex-row items-center px-4 py-4 rounded-2xl" style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}>
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{ color: THEME.text.primary }}
                  placeholderTextColor={THEME.text.muted}
                  placeholder="John Doe"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
              </View>
            </View>

            <View>
              <Text className="mt-4 font-semibold mb-2 text-sm" style={{ color: THEME.text.secondary }}>
                Email Address
              </Text>
              <View className="flex-row items-center px-4 py-4 rounded-2xl" style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}>
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{ color: THEME.text.primary }}
                  placeholderTextColor={THEME.text.muted}
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
              <Text className="mt-4 font-semibold mb-2 text-sm" style={{ color: THEME.text.secondary }}>
                Password
              </Text>
              <View className="flex-row items-center px-4 py-4 rounded-2xl" style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}>
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{ color: THEME.text.primary }}
                  placeholderTextColor={THEME.text.muted}
                  placeholder="At least 8 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="px-4"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={THEME.text.muted} />
                  ) : (
                    <Eye size={20} color={THEME.text.muted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="mt-4 font-semibold mb-2 text-sm" style={{ color: THEME.text.secondary }}>
                Confirm Password
              </Text>
              <View className="flex-row items-center px-4 py-4 rounded-2xl" style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}>
                <TextInput
                  className="flex-1 ml-3 text-base"
                  style={{ color: THEME.text.primary }}
                  placeholderTextColor={THEME.text.muted}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="px-4"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={THEME.text.muted} />
                  ) : (
                    <Eye size={20} color={THEME.text.muted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            {/* <View className="py-2">
              <Text className="text-gray-600 text-xs text-center">
                By creating an account, you agree to our{' '}
                <Text className="font-semibold" style={{ color: THEME.accent.cyan }}>
                  Terms of Service
                </Text>
                {' '}and{' '}
                <Text className="font-semibold" style={{ color: THEME.accent.cyan }}>
                  Privacy Policy
                </Text>
              </Text>
            </View> */}

            <TouchableOpacity
              className="mt-6 rounded-2xl mb-4 overflow-hidden"
              onPress={handleSignup}
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <LinearGradient colors={THEME.background.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: "center", paddingVertical: 16 }}>
                {isLoading ? (
                  <ActivityIndicator color={THEME.text.dark} />
                ) : (
                  <Text className="font-bold text-lg" style={{ color: THEME.text.dark }}>
                    Create Account
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View className="flex-row items-center justify-center py-4 mb-6">
              <Text style={{ color: THEME.text.secondary }}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                disabled={isLoading}
              >
                <Text className="font-bold" style={{ color: THEME.accent.cyan }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
