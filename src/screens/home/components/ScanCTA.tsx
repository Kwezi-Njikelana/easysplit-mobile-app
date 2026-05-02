import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScanLine, ChevronRight } from 'lucide-react-native';

export function ScanCTA() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ScanReceipt' as never)}
      className="rounded-3xl overflow-hidden mb-3"
    >
      <View className="bg-emerald-500 px-6 py-8">
        {/* Decorative circles */}
        <View className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
        <View className="absolute -bottom-10 -right-2 w-24 h-24 rounded-full bg-white/10" />
        <View className="absolute top-4 right-24 w-10 h-10 rounded-full bg-white/10" />

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
      </View>
    </TouchableOpacity>
  );
}