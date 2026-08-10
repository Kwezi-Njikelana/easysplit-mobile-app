import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useAuthStore } from "../../store/authStore";
import { RootStackParamList } from "../../navigation/types";
import { ChevronRight } from "lucide-react-native";
import { THEME } from "../../utils/theme";

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
      style={{ borderBottomWidth: 1, borderBottomColor: THEME.border.subtle }}
    >
      <Text
        className="text-sm font-medium tracking-wide"
        style={{ color: danger ? THEME.accent.danger : THEME.text.primary }}
      >
        {label}
      </Text>
      {value ? (
        <Text className="text-sm" style={{ color: THEME.text.muted }}>{value}</Text>
      ) : (
        <ChevronRight size={24} color={THEME.text.muted} />
      )}
    </TouchableOpacity>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <Text
      className="text-xs font-semibold uppercase tracking-widest mt-8 mb-1"
      style={{ color: THEME.text.muted }}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background.base }} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={THEME.background.upper} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.9 }} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}>
        <View className="px-5 pt-6 pb-10">
          <Text className="text-base mb-1 tracking-wide" style={{ color: THEME.accent.cyan }}>
            Account
          </Text>
          <Text className="text-white text-3xl font-bold">{firstName}</Text>
        </View>

        <LinearGradient
          colors={THEME.background.lower}
          style={{
            borderRadius: 28,
            marginTop: -16,
            paddingHorizontal: 20,
            paddingTop: 32,
            flexGrow: 1,
          }}
        >
          <View className="flex-row items-center gap-4 mb-2">
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: THEME.background.mutedCard,
                borderWidth: 1,
                borderColor: THEME.border.glow,
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
                className="font-bold text-4xl text-white"
                style={{ fontSize: 18, lineHeight: 24 }}
              >
                {fullName}
              </Text>
              {email ? (
                <Text className="text-base mt-0.5" style={{ color: THEME.text.secondary }}>{email}</Text>
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
                borderColor: THEME.border.glow,
                backgroundColor: THEME.background.chip,
              }}
            >
              <Text
                style={{ fontSize: 12, color: THEME.accent.cyan, fontWeight: "500" }}
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
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: THEME.accent.danger,
                alignItems: "center",
              }}
            >
              <Text className="text-lg font-semibold" style={{ color: THEME.accent.danger }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            className="text-center text-xs mt-8"
            style={{ color: THEME.text.muted }}
          >
            EasySplit v{APP_VERSION}
          </Text>
        </LinearGradient>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
