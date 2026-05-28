import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LeadContext } from "../context/LeadContext";

export default function LeadListScreen({ navigation }: any) {
  const { leads } = useContext(LeadContext);

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={[styles.avatar, { backgroundColor: item.initialsBg }]}>
            <Text style={[styles.avatarText, { color: item.initialsColor }]}>
              {item.initials}
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
              {item.isNew && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Baru</Text>
                </View>
              )}
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={12} color="#757575" />
              <Text style={styles.infoText}>{item.phone}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color="#9E9E9E"
            style={{ marginTop: 4 }}
          />
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={14} color="#757575" />
          <Text style={styles.detailText}>{item.company}</Text>
        </View>
      </View>

      <View style={[styles.detailsRow, { marginBottom: 12 }]}>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={14} color="#757575" />
          <Text style={styles.detailText}>{item.amount}</Text>
        </View>
        <View style={[styles.detailItem, { marginLeft: 15 }]}>
          <Ionicons name="location-outline" size={14} color="#757575" />
          <Text style={styles.detailText}>{item.location}</Text>
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
      {/* Header */}
      <View style={styles.headerExtension}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#EDE7F6" }]}>
              <Ionicons name="people" size={14} color="#673AB7" />
            </View>
            <Text style={styles.statTitle}>TOTAL LEAD</Text>
            <Text style={styles.statValue}>
              128 <Text style={styles.statSub}>Leads</Text>
            </Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="locate" size={14} color="#4CAF50" />
            </View>
            <Text style={styles.statTitle}>LEAD HARI INI</Text>
            <Text style={styles.statValue}>
              12 <Text style={styles.statSub}>Leads</Text>
            </Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF8E1" }]}>
              <Ionicons name="time" size={14} color="#FFC107" />
            </View>
            <Text style={styles.statTitle}>BELUM DIASSIGN</Text>
            <Text style={styles.statValue}>
              8 <Text style={styles.statSub}>Leads</Text>
            </Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="pie-chart" size={14} color="#1976D2" />
            </View>
            <Text style={styles.statTitle}>EST. PLAFOND</Text>
            <Text style={styles.statValue}>
              Rp12.45B <Text style={styles.statSub}>Plafond</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        <Text style={styles.tabActive}>Semua Lead</Text>
        <Text style={styles.tabInactive}>Belum Diassign</Text>
        <Text style={styles.tabInactive}>
          Sumber Lead <Ionicons name="chevron-down" size={12} />
        </Text>
        <Text style={styles.tabInactive}>
          Tanggal <Ionicons name="chevron-down" size={12} />
        </Text>
      </ScrollView>

      {/* List */}
      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        renderItem={renderLeadCard}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Menampilkan 1 - {leads.length} dari 128 lead
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddLead")}
        >
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Tambah Lead Baru</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  headerExtension: { backgroundColor: "#0047D3", paddingBottom: 60, zIndex: 1 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -40,
    left: 16,
    right: 16,
  },
  statCard: {
    backgroundColor: "#FFF",
    width: "23%",
    padding: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statTitle: { fontSize: 8, color: "#757575", fontWeight: "bold" },
  statValue: { fontSize: 12, fontWeight: "bold", color: "#111", marginTop: 4 },
  statSub: { fontSize: 8, color: "#9E9E9E", fontWeight: "normal" },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  tabActive: {
    color: "#0047D3",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#0047D3",
    paddingBottom: 10,
    marginRight: 20,
  },
  tabInactive: {
    color: "#757575",
    paddingBottom: 10,
    marginRight: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: 16, fontWeight: "bold" },
  name: { fontSize: 15, fontWeight: "bold", color: "#111" },
  badge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: { color: "#0047D3", fontSize: 10, fontWeight: "bold" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  infoText: { fontSize: 12, color: "#757575", marginLeft: 4 },
  timeText: { fontSize: 10, color: "#9E9E9E" },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingLeft: 52,
  },
  detailItem: { flexDirection: "row", alignItems: "center" },
  detailText: { fontSize: 12, color: "#757575", marginLeft: 6 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 52,
  },
  sourceText: { fontSize: 11, color: "#1976D2", fontWeight: "600" },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  priorityText: { fontSize: 10, fontWeight: "bold" },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 16,
    elevation: 10,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 12,
    color: "#757575",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#0047D3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
});
