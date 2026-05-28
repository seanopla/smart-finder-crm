import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // ← tambah ini
import { Ionicons } from "@expo/vector-icons";
import { LeadContext } from "../context/LeadContext";

export default function LeadListScreen({ navigation }: any) {
  const { leads } = useContext(LeadContext);
  const insets = useSafeAreaInsets(); // ← tambah ini

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="search"
            size={22}
            color="#FFF"
            style={{ marginRight: 15 }}
          />
          <Ionicons
            name="funnel-outline"
            size={22}
            color="#FFF"
            style={{ marginRight: 15 }}
          />
          <Ionicons name="add-circle" size={24} color="#FFF" />
        </View>
      ),
    });
  }, [navigation]);

  const renderLeadCard = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: item.initialsBg }]}>
          <Text style={[styles.avatarText, { color: item.initialsColor }]}>
            {item.initials}
          </Text>
        </View>

        <View style={styles.cardMiddle}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            {item.isNew && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Baru</Text>
              </View>
            )}
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={11} color="#9E9E9E" />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.phone}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="briefcase-outline" size={11} color="#9E9E9E" />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.company}
            </Text>
          </View>
          {/* Fix: amount dan lokasi dipisah baris agar tidak wrap aneh */}
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={11} color="#9E9E9E" />
            <Text style={styles.infoText} numberOfLines={1}>
              {item.amount}
            </Text>
            <Text style={styles.dotSep}>·</Text>
            <Ionicons name="location-outline" size={11} color="#9E9E9E" />
            <Text style={styles.infoTextFlex} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Ionicons
            name="ellipsis-vertical"
            size={14}
            color="#BDBDBD"
            style={{ marginTop: 6 }}
          />
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.sourceText}>{item.source}</Text>
        <View
          style={[styles.priorityBadge, { backgroundColor: item.priorityBg }]}
        >
          <Text style={[styles.priorityText, { color: item.priorityColor }]}>
            {item.priority}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Blue header extension with stats */}
      <View style={styles.headerExtension}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#EDE7F6" }]}>
              <Ionicons name="people" size={13} color="#673AB7" />
            </View>
            <Text style={styles.statTitle}>TOTAL LEAD</Text>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statSub}>Leads</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="locate" size={13} color="#4CAF50" />
            </View>
            <Text style={styles.statTitle}>LEAD HARI INI</Text>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSub}>Leads</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF8E1" }]}>
              <Ionicons name="time" size={13} color="#FFC107" />
            </View>
            <Text style={styles.statTitle}>BELUM DIASSIGN</Text>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statSub}>Leads</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="pie-chart" size={13} color="#1976D2" />
            </View>
            <Text style={styles.statTitle}>EST. PLAFOND</Text>
            <Text style={styles.statValue}>Rp12.45B</Text>
            <Text style={styles.statSub}>Plafond</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        <Text style={styles.tabActive}>Semua Lead</Text>
        <Text style={styles.tabInactive}>Belum Diassign</Text>
        <Text style={styles.tabInactive}>Sumber Lead</Text>
        <Text style={styles.tabInactive}>Tanggal</Text>
      </ScrollView>

      {/* Lead List */}
      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        renderItem={renderLeadCard}
        // ← paddingBottom harus lebih dari tinggi bottom container + nav bar
        contentContainerStyle={{
          padding: 12,
          paddingBottom: 100 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom — fix: tambah paddingBottom dari safe area */}
      <View
        style={[styles.bottomContainer, { paddingBottom: insets.bottom + 10 }]}
      >
        <Text style={styles.bottomText}>
          Menampilkan 1 – {leads.length} dari 128 lead
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddLead")}
        >
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addButtonText}>Tambah Lead Baru</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  headerExtension: {
    backgroundColor: "#0047D3",
    paddingBottom: 52,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -36,
    left: 12,
    right: 12,
  },
  statCard: {
    backgroundColor: "#FFF",
    width: "23.5%",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statTitle: {
    fontSize: 7,
    color: "#9E9E9E",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  statValue: { fontSize: 12, fontWeight: "800", color: "#111", marginTop: 2 },
  statSub: { fontSize: 7, color: "#BDBDBD" },

  tabsContainer: {
    marginTop: 48,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFF",
    flexGrow: 0,
  },
  tabsContent: {
    paddingHorizontal: 14,
    alignItems: "center",
  },
  tabActive: {
    color: "#0047D3",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderColor: "#0047D3",
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 18,
    fontSize: 12,
  },
  tabInactive: {
    color: "#757575",
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 18,
    fontSize: 12,
  },
  tabInactiveRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
    paddingBottom: 10,
    paddingTop: 10,
  },

  card: {
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  avatarText: { fontSize: 14, fontWeight: "700" },
  cardMiddle: { flex: 1, overflow: "hidden" }, // ← overflow hidden cegah text keluar batas
  cardRight: { alignItems: "flex-end", minWidth: 70 },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 6,
    flexShrink: 1,
  },
  badge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  badgeText: { color: "#0047D3", fontSize: 9, fontWeight: "700" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  infoText: { fontSize: 11, color: "#757575", marginLeft: 4, marginRight: 2 },
  infoTextFlex: { fontSize: 11, color: "#757575", marginLeft: 4, flex: 1 }, // ← flex:1 agar teks lokasi tidak overflow
  dotSep: { fontSize: 11, color: "#BDBDBD", marginHorizontal: 2 },
  timeText: { fontSize: 10, color: "#BDBDBD" },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#F5F5F5",
  },
  sourceText: {
    fontSize: 11,
    color: "#1976D2",
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
  priorityText: { fontSize: 10, fontWeight: "700" },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    elevation: 10,
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 11,
    color: "#9E9E9E",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#0047D3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});
