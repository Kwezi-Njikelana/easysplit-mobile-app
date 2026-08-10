import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { ScanCTA } from './components/ScanCTA';
import { ManualEntryButton } from './components/ManualEntryButton';
import { RecentSplitsList } from './components/RecentSplitsList';
import { HomeHeader } from './components/HomeHeader';

const mockRecentSplits = [
  { id: '1', title: 'Dinner at Laparada', total: 255.0, people: 4, date: '2h ago', emoji: '🍣' },
  { id: '2', title: 'Uber home', total: 54.0, people: 3, date: '5h ago', emoji: '🚗' },
  { id: '3', title: 'Groceries', total: 127.0, people: 2, date: 'Yesterday', emoji: '🛒' },
  { id: '4', title: 'Concert tickets', total: 360.0, people: 6, date: '2d ago', emoji: '🎶' },
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const firstName = user?.fullName?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <HomeHeader firstName={firstName} />

        <View className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-7">
          <ScanCTA />
          <ManualEntryButton />
          <RecentSplitsList splits={mockRecentSplits} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}