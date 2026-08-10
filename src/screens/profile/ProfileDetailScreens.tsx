import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";

function PageShell({
  eyebrow = "Profile",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}
      >
        <View className="px-5 pt-6 pb-10">
          <Text className="text-emerald-400 text-base mb-1 tracking-wide">
            {eyebrow}
          </Text>
          <Text className="text-white text-3xl font-bold">{title}</Text>
        </View>

        <View className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-8 flex-grow">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="text-xs font-semibold uppercase tracking-widest mb-2 mt-5"
      style={{ color: "#a3a3a3" }}
    >
      {children}
    </Text>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address";
  secureTextEntry?: boolean;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: "#71717a", fontSize: 13, marginBottom: 7 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#e4e4e7",
          borderRadius: 16,
          color: "#18181b",
          fontSize: 15,
          paddingHorizontal: 14,
          paddingVertical: 13,
        }}
      />
    </View>
  );
}

function PrimaryButton({
  label,
  danger,
  onPress,
}: {
  label: string;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        alignItems: "center",
        backgroundColor: danger ? "#ef4444" : "#10b981",
        borderRadius: 16,
        marginTop: 8,
        paddingVertical: 15,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function InfoBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderColor: "#f0f0f0",
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 12,
        padding: 16,
      }}
    >
      <Text style={{ color: "#18181b", fontSize: 16, fontWeight: "700" }}>
        {title}
      </Text>
      <Text style={{ color: "#71717a", fontSize: 14, lineHeight: 21, marginTop: 6 }}>
        {body}
      </Text>
    </View>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#f0f0f0",
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "row",
        gap: 12,
        marginBottom: 12,
        padding: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#18181b", fontSize: 15, fontWeight: "700" }}>
          {label}
        </Text>
        <Text style={{ color: "#71717a", fontSize: 13, lineHeight: 19, marginTop: 3 }}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e4e4e7", true: "#a7f3d0" }}
        thumbColor={value ? "#10b981" : "#f4f4f5"}
      />
    </View>
  );
}

export function EditProfileScreen() {
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");

  const saveProfile = () => {
    if (!user) return;
    setUser({ ...user, fullName, email, phoneNumber });
    Alert.alert("Profile saved", "Your profile details have been updated.");
  };

  return (
    <PageShell title="Edit Profile">
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          borderColor: "#f0f0f0",
          borderRadius: 24,
          borderWidth: 1,
          marginBottom: 20,
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#18181b",
            borderRadius: 36,
            height: 72,
            justifyContent: "center",
            width: 72,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
            {fullName
              .split(" ")
              .map((name) => name[0] ?? "")
              .join("")
              .slice(0, 2)
              .toUpperCase() || "ES"}
          </Text>
        </View>
        <Text style={{ color: "#71717a", fontSize: 13, marginTop: 10 }}>
          Avatar upload can connect here later.
        </Text>
      </View>

      <Field label="Full name" value={fullName} onChangeText={setFullName} />
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Field
        label="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <PrimaryButton label="Save Changes" onPress={saveProfile} />
    </PageShell>
  );
}

export function NotificationSettingsScreen() {
  const [splitUpdates, setSplitUpdates] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [productNews, setProductNews] = useState(false);

  return (
    <PageShell title="Notifications">
      <SectionTitle>Alerts</SectionTitle>
      <ToggleRow
        label="Split updates"
        description="Get notified when friends change items or settle balances."
        value={splitUpdates}
        onValueChange={setSplitUpdates}
      />
      <ToggleRow
        label="Payment reminders"
        description="Receive reminders for outstanding balances."
        value={paymentReminders}
        onValueChange={setPaymentReminders}
      />
      <ToggleRow
        label="Product news"
        description="Occasional updates about new EasySplit features."
        value={productNews}
        onValueChange={setProductNews}
      />
    </PageShell>
  );
}

export function SecuritySettingsScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Missing fields", "Please complete all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match", "Please confirm the same new password.");
      return;
    }

    Alert.alert("Password ready", "Connect this action to Supabase password update.");
  };

  return (
    <PageShell title="Security">
      <SectionTitle>Change Password</SectionTitle>
      <Field
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <Field
        label="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Field
        label="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <PrimaryButton label="Update Password" onPress={changePassword} />
    </PageShell>
  );
}

export function HelpSupportScreen() {
  const openEmail = () => {
    Linking.openURL("mailto:support@easysplit.app");
  };

  return (
    <PageShell title="Help & Support">
      <InfoBlock
        title="Contact support"
        body="Need help with a split, receipt scan, or account issue? Send the team a message and include screenshots when useful."
      />
      <PrimaryButton label="Email Support" onPress={openEmail} />

      <SectionTitle>Common Questions</SectionTitle>
      <InfoBlock
        title="How do I split a receipt?"
        body="Use the scan button on Home, review the detected items, then assign each item to the people who shared it."
      />
      <InfoBlock
        title="How do balances work?"
        body="Balances show who owes money after each split. Once someone pays, you can mark the balance as settled."
      />
      <InfoBlock
        title="Can I edit a split later?"
        body="Yes. Open the receipt details from your recent activity and update items, people, or amounts."
      />
    </PageShell>
  );
}

export function PrivacyPolicyScreen() {
  return (
    <PageShell title="Privacy Policy">
      <InfoBlock
        title="Information we use"
        body="EasySplit stores account details, split activity, receipt information, and preferences needed to run the app."
      />
      <InfoBlock
        title="How we use it"
        body="Your information is used to manage your account, calculate shared expenses, improve reliability, and provide support."
      />
      <InfoBlock
        title="Your choices"
        body="You can update profile details, change notification preferences, log out, or request account deletion from your profile."
      />
    </PageShell>
  );
}

export function TermsConditionsScreen() {
  return (
    <PageShell title="Terms & Conditions">
      <InfoBlock
        title="Using EasySplit"
        body="EasySplit helps organize shared expenses. You are responsible for checking amounts before confirming or settling balances."
      />
      <InfoBlock
        title="Account access"
        body="Keep your login details secure and let support know if you think your account has been accessed without permission."
      />
      <InfoBlock
        title="Service changes"
        body="Features may change over time as the app improves. Important account or privacy changes should be communicated clearly."
      />
    </PageShell>
  );
}

export function DeleteAccountScreen() {
  const { logout } = useAuthStore();

  const confirmDelete = () => {
    Alert.alert(
      "Delete account?",
      "This is where permanent account deletion should connect to your backend.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", style: "destructive", onPress: logout },
      ]
    );
  };

  return (
    <PageShell title="Delete Account">
      <InfoBlock
        title="Before you delete"
        body="Deleting your account should permanently remove your profile and personal account data. You may lose access to previous split history."
      />
      <InfoBlock
        title="Settled balances"
        body="Make sure any outstanding balances are handled before deleting your account."
      />
      <PrimaryButton label="Delete Account" danger onPress={confirmDelete} />
    </PageShell>
  );
}
