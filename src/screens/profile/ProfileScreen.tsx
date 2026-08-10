import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useAuthStore } from "../../store/authStore";
import { RootStackParamList } from "../../navigation/types";
import { ChevronRight } from "lucide-react-native";

function Row({
  label,
  value,
  danger,
  onPress,
}: {
  label: string;
  value?: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center justify-between py-4"
      style={{ borderBottomWidth: 1, borderBottomColor: "#f0f0f0" }}
    >
      <Text
        className="text-sm font-medium tracking-wide"
        style={{ color: danger ? "#ef4444" : "#1a1a1a" }}
      >
        {label}
      </Text>
      {value ? (
        <Text className="text-sm text-zinc-400">{value}</Text>
      ) : (
        <ChevronRight size={24} color="#d1d5db" />
      )}
    </TouchableOpacity>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <Text
      className="text-xs font-semibold uppercase tracking-widest mt-8 mb-1"
      style={{ color: "#a3a3a3" }}
    >
      {text}
    </Text>
  );
}

const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuthStore();

  const fullName = user?.fullName ?? "Anonymous";
  const email = user?.email ?? "";
  const firstName = fullName.split(" ")[0];

  const initials = fullName
    .split(" ")
    .map((n: string) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}
      >
        <View className="px-5 pt-6 pb-10">
          <Text className="text-emerald-400 text-base mb-1 tracking-wide">
            Account
          </Text>
          <Text className="text-white text-3xl font-bold">{firstName}</Text>
        </View>

        <View className="bg-gray-50 rounded-3xl -mt-4 px-5 pt-8 flex-grow">
          <View className="flex-row items-center gap-4 mb-2">
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#18181b",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "700",
                  letterSpacing: 1,
                }}
              >
                {initials}
              </Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-zinc-900 font-bold text-4xl"
                style={{ fontSize: 18, lineHeight: 24 }}
              >
                {fullName}
              </Text>
              {email ? (
                <Text className="text-zinc-400 text-base mt-0.5">{email}</Text>
              ) : null}
            </View>

            {/* Edit pill */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("EditProfile")}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "#e4e4e7",
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "#52525b", fontWeight: "500" }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <SectionLabel text="Account" />
          <Row
            label="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />

          <SectionLabel text="Settings" />
          <Row
            label="Notifications"
            onPress={() => navigation.navigate("NotificationSettings")}
          />

          <SectionLabel text="Security" />
          <Row
            label="Change Password"
            onPress={() => navigation.navigate("SecuritySettings")}
          />

          <SectionLabel text="Support" />
          <Row
            label="Help & Support"
            onPress={() => navigation.navigate("HelpSupport")}
          />

          <SectionLabel text="Legal" />
          <Row
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <Row
            label="Terms & Conditions"
            onPress={() => navigation.navigate("TermsConditions")}
          />

          <SectionLabel text="Account Actions" />
          <Row
            label="Delete Account"
            danger
            onPress={() => navigation.navigate("DeleteAccount")}
          />

          <View className="mt-10">
            <TouchableOpacity
              onPress={logout}
              activeOpacity={0.7}
              style={{
                paddingVertical: 15,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#F0055A",
                alignItems: "center",
              }}
            >
              <Text className="text-lg border-raspberryRedColor font-semibold bg-white text-raspberryRedColor">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            className="text-center text-xs mt-8"
            style={{ color: "#d4d4d4" }}
          >
            EasySplit v{APP_VERSION}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
