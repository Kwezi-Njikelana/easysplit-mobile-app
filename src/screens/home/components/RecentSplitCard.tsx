import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Users } from 'lucide-react-native';
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
  split: Split;
};

export function RecentSplitCard({ split }: Props) {
  const perPerson = (split.total / split.people).toFixed(2);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      className="rounded-3xl overflow-hidden mb-3"
      style={{
        backgroundColor: THEME.background.mutedCard,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: THEME.border.subtle,
      }}
    >
      <View className="px-4 pt-4 pb-4">
        {/* Top row */}
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View
              className="w-12 h-12 rounded-2xl items-center justify-center"
              style={{ backgroundColor: THEME.background.chip }}
            >
              <Text className="text-2xl">{split.emoji}</Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: THEME.text.primary }}
                numberOfLines={1}
              >
                {split.title}
              </Text>
              <Text className="text-sm mt-0.5" style={{ color: THEME.text.muted }}>
                {split.date}
              </Text>
            </View>
          </View>

          <ChevronRight size={24} color={THEME.text.muted} />
        </View>

        {/* Divider */}
        <View className="h-px my-3" style={{ backgroundColor: THEME.border.subtle }} />

        {/* Bottom row */}
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: THEME.background.chip }}
          >
            <Users size={12} color={THEME.text.secondary} strokeWidth={2} />
            <Text className="text-sm font-semibold" style={{ color: THEME.text.secondary }}>
              {split.people} people
            </Text>
          </View>

          <View className="flex-row items-baseline gap-2">
            <View className="items-end">
              <Text className="text-md" style={{ color: THEME.text.muted }}>total</Text>
              <Text className="text-lg font-bold" style={{ color: THEME.text.primary }}>
                R{split.total.toFixed(2)}
              </Text>
            </View>

            <View className="w-px h-6" style={{ backgroundColor: THEME.border.subtle }} />

            <View className="items-end">
              <Text className="text-md" style={{ color: THEME.text.muted }}>per person</Text>
              <Text className="text-lg font-bold" style={{ color: THEME.accent.cyan }}>
                R{perPerson}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
