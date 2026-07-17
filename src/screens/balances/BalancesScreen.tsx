import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react-native";

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
  {
    id: "4",
    name: "Priya Dlamini",
    initials: "PD",
    amount: 87.0,
    type: "owed_to_you",
    lastSplit: "Concert tickets",
    date: "2d ago",
  },
  {
    id: "5",
    name: "Mike Rossouw",
    initials: "MR",
    amount: 33.0,
    type: "you_owe",
    lastSplit: "Braai supplies",
    date: "3d ago",
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
        backgroundColor: "#EDF0F4",
        borderRadius: 24,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
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
                  ? "#E8E8E8"
                  : isOwedToYou
                    ? "#d1fae5"
                    : "#ffe4e6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: isSettled
                    ? "#9ca3af"
                    : isOwedToYou
                      ? "#059669"
                      : "#f43f5e",
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
                  color: "#111111",
                  letterSpacing: -0.3,
                }}
              >
                {balance.name}
              </Text>
              <Text
                style={{ fontSize: 13, color: "#9ca3af", marginTop: 1 }}
                numberOfLines={1}
              >
                {balance.lastSplit} · {balance.date}
              </Text>
            </View>
          </View>

          <ChevronRight size={20} color="#d1d5db" />
        </View>

        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: "#E8E8E8", marginVertical: 12 }}
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
                backgroundColor: "#E8E8E8",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#9ca3af" }}
              >
                Settled up ✓
              </Text>
            </View>
          ) : isOwedToYou ? (
            <View
              style={{
                backgroundColor: "#d1fae5",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ArrowDownLeft size={12} color="#059669" strokeWidth={2.5} />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#059669" }}
              >
                Owes you
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "#ffe4e6",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ArrowUpRight size={12} color="#f43f5e" strokeWidth={2.5} />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#f43f5e" }}
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
                color: isOwedToYou ? "#10b981" : "#f43f5e",
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#09090b" }}
      edges={["top"]}
    >
      {/* Dark header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 40,
          backgroundColor: "#09090b",
        }}
      >
        <Text
          style={{
            color: "#34d399",
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
            color: "#ffffff",
            fontSize: 34,
            fontWeight: "800",
            letterSpacing: -0.8,
            lineHeight: 40,
          }}
        >
          Balances
        </Text>
        <Text style={{ color: "#71717a", fontSize: 15, marginTop: 6 }}>
          Track what's owed between you.
        </Text>

        {/* Net summary row */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 24 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#18181b",
              borderRadius: 20,
              padding: 16,
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
              <TrendingUp size={13} color="#10b981" strokeWidth={2.5} />
              <Text
                style={{
                  color: "#71717a",
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
                color: "#10b981",
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
              backgroundColor: "#18181b",
              borderRadius: 20,
              padding: 16,
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
              <TrendingDown size={13} color="#f43f5e" strokeWidth={2.5} />
              <Text
                style={{
                  color: "#71717a",
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
                color: "#f43f5e",
                fontSize: 22,
                fontWeight: "800",
                letterSpacing: -0.5,
              }}
            >
              R{totalYouOwe.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Net bar */}
        <View
          style={{
            backgroundColor: "#18181b",
            borderRadius: 20,
            padding: 16,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#71717a", fontSize: 13, fontWeight: "600" }}>
            Net balance
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              letterSpacing: -0.5,
              color: net >= 0 ? "#10b981" : "#f43f5e",
            }}
          >
            {net >= 0 ? "+" : ""}R{net.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* White card */}
      <View
        style={{
          backgroundColor: "#f9fafb",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          marginTop: -16,
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 28,
        }}
      >
        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={{ marginBottom: 20, marginHorizontal: -20 }}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 8,
            paddingHorizontal: 20,
            paddingRight: 40,
          }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(f)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 99,
                backgroundColor: activeFilter === f ? "#111111" : "#E8E8E8",
                alignSelf: "center", // add this
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: activeFilter === f ? "#ffffff" : "#6b7280",
                }}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text
          style={{
            fontSize: 11,
            fontWeight: "700",
            color: "#9ca3af",
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
      </View>
    </SafeAreaView>
  );
}
