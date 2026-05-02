import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Users } from 'lucide-react-native';

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
        backgroundColor: '#EDF0F4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="px-4 pt-4 pb-4">
        {/* Top row */}
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View
              className="w-12 h-12 rounded-2xl items-center justify-center"
              style={{ backgroundColor: '#E8E8E8' }}
            >
              <Text className="text-2xl">{split.emoji}</Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: '#111111' }}
                numberOfLines={1}
              >
                {split.title}
              </Text>
              <Text className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
                {split.date}
              </Text>
            </View>
          </View>

          <ChevronRight size={24} color="#d1d5db" />
        </View>

        {/* Divider */}
        <View className="h-px my-3" style={{ backgroundColor: '#E8E8E8' }} />

        {/* Bottom row */}
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#E8E8E8' }}
          >
            <Users size={12} color="#6b7280" strokeWidth={2} />
            <Text className="text-sm font-semibold" style={{ color: '#6b7280' }}>
              {split.people} people
            </Text>
          </View>

          <View className="flex-row items-baseline gap-2">
            <View className="items-end">
              <Text className="text-md" style={{ color: '#9ca3af' }}>total</Text>
              <Text className="text-lg font-bold" style={{ color: '#111111' }}>
                R{split.total.toFixed(2)}
              </Text>
            </View>

            <View className="w-px h-6" style={{ backgroundColor: '#E8E8E8' }} />

            <View className="items-end">
              <Text className="text-md" style={{ color: '#9ca3af' }}>per person</Text>
              <Text className="text-lg font-bold" style={{ color: '#10b981' }}>
                R{perPerson}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}