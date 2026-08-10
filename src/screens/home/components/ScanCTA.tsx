import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScanLine, ChevronRight } from 'lucide-react-native';
import { THEME } from '../../../utils/theme';

export function ScanCTA() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ScanReceipt' as never)}
      className="rounded-3xl overflow-hidden mb-3"
    >
      <LinearGradient
        colors={THEME.background.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 24, paddingVertical: 32 }}
      >
        <LinearGradient
          colors={THEME.background.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: -42,
            right: -28,
            width: 190,
            height: 190,
            borderRadius: 95,
            opacity: 0.22,
          }}
        />

        <View className="bg-white/20 w-14 h-14 rounded-2xl items-center justify-center mb-4">
          <ScanLine color="#fff" size={28} strokeWidth={1.75} />
        </View>
        <Text className="text-white text-2xl font-bold tracking-tight">
          Scan Receipt
        </Text>
        <Text className="text-white/70 text-base mt-1">
          Point your camera — we'll handle the rest
        </Text>
        <View className="flex-row items-center gap-1 mt-5">
          <Text className="text-white text-xs font-semibold tracking-wide">
            TAP TO START
          </Text>
          <ChevronRight size={14} color="rgba(255,255,255,0.9)" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
