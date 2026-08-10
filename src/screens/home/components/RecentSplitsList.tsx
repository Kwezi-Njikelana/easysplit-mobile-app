import React from 'react';
import { View, Text } from 'react-native';
import { RecentSplitCard } from './RecentSplitCard';
import { THEME } from '../../../utils/theme';

type Split = {
  id: string;
  title: string;
  total: number;
  people: number;
  date: string;
  emoji: string;
};

type Props = {
  splits: Split[];
};

export function RecentSplitsList({ splits }: Props) {
  return (
    <View>
      <Text className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: THEME.text.muted }}>
        Recent Splits
      </Text>

      {splits.length === 0 ? (
        <View className="py-12 items-center">
          <Text className="text-3xl mb-3">🧾</Text>
          <Text className="text-sm text-center" style={{ color: THEME.text.muted }}>
            No splits yet.{'\n'}Scan your first receipt to get started!
          </Text>
        </View>
      ) : (
        <View className="gap-2.5">
          {splits.map((split) => (
            <RecentSplitCard key={split.id} split={split} />
          ))}
        </View>
      )}
    </View>
  );
}
