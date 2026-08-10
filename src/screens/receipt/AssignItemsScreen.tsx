import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { THEME } from "../../utils/theme";

export default function AssignItemsScreen() {
  return (
    <LinearGradient colors={THEME.background.upper} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text style={{ color: THEME.text.primary }}>Assign Items</Text>
      </View>
    </LinearGradient>
  );
}
