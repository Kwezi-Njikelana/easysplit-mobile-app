import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import { ScanCTA } from './components/ScanCTA';
import { ManualEntryButton } from './components/ManualEntryButton';
import { RecentSplitsList } from './components/RecentSplitsList';
import { HomeHeader } from './components/HomeHeader';
import { THEME } from '../../utils/theme';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background.base }} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={THEME.background.upper}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.9 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 48 }}
        >
          <HomeHeader firstName={firstName} />

          <LinearGradient
            colors={THEME.background.lower}
            style={{
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              marginTop: -16,
              paddingHorizontal: 20,
              paddingTop: 28,
              minHeight: 520,
            }}
          >
            <ScanCTA />
            <ManualEntryButton />
            <RecentSplitsList splits={mockRecentSplits} />
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
