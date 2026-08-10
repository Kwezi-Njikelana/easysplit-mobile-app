import React from 'react';
import { View, Text } from 'react-native';
import { THEME } from '../../../utils/theme';

type Props = {
  firstName: string;
};

export function HomeHeader({ firstName }: Props) {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
      <View className="flex-row items-center justify-between mb-8">
        <Text
          className="text-md font-medium tracking-widest uppercase"
          style={{ color: THEME.accent.cyan }}
        >
          EasySplit
        </Text>
        
      </View>

      <Text className="text-4xl font-bold tracking-tight leading-tight" style={{ color: THEME.text.primary }}>
        Hey {firstName},{'\n'}split something? 
      </Text>
      <Text className="text-base mt-2" style={{ color: THEME.text.secondary }}>
        Scan a receipt and let us do the math.
      </Text>
    </View>
  );
}
