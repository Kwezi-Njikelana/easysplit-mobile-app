import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PenLine, ChevronRight } from 'lucide-react-native';
import { THEME } from '../../../utils/theme';

export function ManualEntryButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('EditReceipt' as never)}
      className="rounded-2xl px-5 py-4 flex-row items-center justify-between mb-8"
      style={{ backgroundColor: THEME.background.mutedCard, borderWidth: 1, borderColor: THEME.border.subtle }}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: "rgba(34,226,210,0.14)" }}>
          <PenLine color={THEME.accent.cyan} size={18} strokeWidth={1.75} />
        </View>
        <View>
          <Text className="text-white text-lg font-semibold">Enter manually</Text>
          <Text className="text-sm mt-0.5" style={{ color: THEME.text.secondary }}>Type in an amount to split</Text>
        </View>
      </View>
      <ChevronRight size={24} color={THEME.text.secondary} />
    </TouchableOpacity>
  );
}
