import React from 'react';
import { View, Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';

type Props = {
  firstName: string;
};

export function HomeHeader({ firstName }: Props) {
  return (
    <View className="px-6 pt-6 pb-10 bg-zinc-950">
      <View className="flex-row items-center justify-between mb-8">
        <Text className="text-emerald-400 text-md font-medium tracking-widest uppercase">
          EasySplit
        </Text>
        
      </View>

      <Text className="text-white text-4xl font-bold tracking-tight leading-tight">
        Hey {firstName},{'\n'}split something? 
      </Text>
      <Text className="text-zinc-500 text-base mt-2">
        Scan a receipt and let us do the math.
      </Text>
    </View>
  );
}