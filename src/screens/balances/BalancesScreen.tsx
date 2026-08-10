import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react-native";
import { THEME } from "../../utils/theme";

const mockBalances = [
  {
    id: "1",
    name: "James Müller",
    initials: "JM",
    amount: 120.0,
    type: "owed_to_you",
    lastSplit: "Dinner at Laparada",
    date: "2h ago",
  },
  {
    id: "2",
    name: "Sarah Kim",
    initials: "SK",
    amount: 54.5,
    type: "you_owe",
    lastSplit: "Uber home",
    date: "5h ago",
  },

];

const FILTERS = ["All", "Owed to you", "You owe", "Settled"] as const;
type Filter = (typeof FILTERS)[number];

type Balance = (typeof mockBalances)[number];

function BalanceCard({ balance }: { balance: Balance }) {
  const isOwedToYou = balance.type === "owed_to_you";
  const isSettled = balance.type === "settled";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        backgroundColor: THEME.background.mutedCard,
        borderRadius: 24,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: THEME.border.subtle,
      }}
    >
      <View style={{ padding: 16 }}>
        {/* Top row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              flex: 1,
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: isSettled
                  ? THEME.background.chip
                  : isOwedToYou
                    ? "rgba(34,226,210,0.15)"
                    : "rgba(255,91,116,0.14)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: isSettled
                    ? THEME.text.muted
                    : isOwedToYou
                      ? THEME.accent.cyan
                      : THEME.accent.danger,
                }}
              >
                {balance.initials}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: THEME.text.primary,
                  letterSpacing: -0.3,
                }}
              >
                {balance.name}
              </Text>
              <Text
                style={{ fontSize: 13, color: THEME.text.muted, marginTop: 1 }}
                numberOfLines={1}
              >
                {balance.lastSplit} · {balance.date}
              </Text>
            </View>
          </View>

          <ChevronRight size={20} color={THEME.text.muted} />
        </View>

        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: THEME.border.subtle, marginVertical: 12 }}
        />

        {/* Bottom row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Direction pill */}
          {isSettled ? (
            <View
              style={{
                backgroundColor: THEME.background.chip,
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: THEME.text.muted }}
              >
                Settled up ✓
              </Text>
            </View>
          ) : isOwedToYou ? (
            <View
              style={{
                backgroundColor: "rgba(34,226,210,0.15)",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ArrowDownLeft size={12} color={THEME.accent.cyan} strokeWidth={2.5} />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: THEME.accent.cyan }}
              >
                Owes you
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "rgba(255,91,116,0.14)",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ArrowUpRight size={12} color={THEME.accent.danger} strokeWidth={2.5} />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: THEME.accent.danger }}
              >
                You owe
              </Text>
            </View>
          )}

          {/* Amount */}
          {!isSettled && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                letterSpacing: -0.5,
                color: isOwedToYou ? THEME.accent.cyan : THEME.accent.danger,
              }}
            >
              {isOwedToYou ? "+" : "-"}R{balance.amount.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function BalancesScreen() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const totalOwedToYou = mockBalances
    .filter((b) => b.type === "owed_to_you")
    .reduce((s, b) => s + b.amount, 0);
  const totalYouOwe = mockBalances
    .filter((b) => b.type === "you_owe")
    .reduce((s, b) => s + b.amount, 0);
  const net = totalOwedToYou - totalYouOwe;

  const filtered = mockBalances.filter((b) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Owed to you") return b.type === "owed_to_you";
    if (activeFilter === "You owe") return b.type === "you_owe";
    if (activeFilter === "Settled") return b.type === "settled";
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background.base }} edges={["top"]}>
      <LinearGradient colors={THEME.background.upper} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.9 }} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
        <Text
          style={{
            color: THEME.accent.cyan,
            fontSize: 13,
            fontWeight: "600",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          EasySplit
        </Text>
        <Text
          style={{
            color: THEME.text.primary,
            fontSize: 34,
            fontWeight: "800",
            letterSpacing: -0.8,
            lineHeight: 40,
          }}
        >
          Balances
        </Text>
        <Text style={{ color: THEME.text.secondary, fontSize: 15, marginTop: 6 }}>
          Track what's owed between you.
        </Text>

        {/* Net summary row */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 24 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: THEME.background.mutedCard,
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: THEME.border.subtle,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <TrendingUp size={13} color={THEME.accent.cyan} strokeWidth={2.5} />
              <Text
                style={{
                  color: THEME.text.muted,
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Owed to you
              </Text>
            </View>
            <Text
              style={{
                color: THEME.accent.cyan,
                fontSize: 22,
                fontWeight: "800",
                letterSpacing: -0.5,
              }}
            >
              R{totalOwedToYou.toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: THEME.background.mutedCard,
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: THEME.border.subtle,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <TrendingDown size={13} color={THEME.accent.danger} strokeWidth={2.5} />
              <Text
                style={{
                  color: THEME.text.muted,
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                You owe
              </Text>
            </View>
            <Text
              style={{
                color: THEME.text.primary,
                fontSize: 22,
                fontWeight: "800",
                letterSpacing: -0.5,
              }}
            >
              R{totalYouOwe.toFixed(2)}
            </Text>
          </View>
        </View>

      
      </View>

      <LinearGradient
        colors={THEME.background.lower}
        style={{
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          marginTop: -16,
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 28,
        }}
      >
        {/* Filter tabs */}
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            marginBottom: 20,
          }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(f)}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 999,
                backgroundColor: activeFilter === f ? THEME.accent.cyan : THEME.background.chip,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 6,
              }}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: activeFilter === f ? THEME.text.dark : THEME.text.secondary,
                }}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={{
            fontSize: 11,
            fontWeight: "700",
            color: THEME.text.muted,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {filtered.length}{" "}
          {activeFilter === "All" ? "people" : activeFilter.toLowerCase()}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 48 }}
        >
          {filtered.map((b) => (
            <BalanceCard key={b.id} balance={b} />
          ))}
        </ScrollView>
      </LinearGradient>
      </LinearGradient>
    </SafeAreaView>
  );
}
