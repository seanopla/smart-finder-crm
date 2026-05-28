import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FollowUpContext } from "../context/FollowUpContext";

export default function FollowUpListScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { followUps } = useContext(FollowUpContext);

  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Hari Ini", "Terjadwal", "Terlewat", "Selesai"];

  const getFilteredData = () => {
    const filtered =
      activeTab === "Semua"
        ? followUps
        : followUps.filter((item) => item.category === activeTab);

    const grouped = filtered.reduce((acc: any, item) => {
      if (!acc[item.groupDate]) acc[item.groupDate] = [];
      acc[item.groupDate].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.methodIconWrapper,
              { backgroundColor: item.methodBg },
            ]}
          >
            <Ionicons
              name={item.methodIcon}
              size={20}
              color={item.methodColor}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.companyName}>{item.company}</Text>
            <Text style={styles.typeText}>
              {item.type} • {item.plafond}
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[styles.statusBadge, { backgroundColor: item.statusBg }]}
              >
                <Text style={[styles.statusText, { color: item.statusColor }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.picRow}>
              <Ionicons name="calendar-outline" size={12} color="#9E9E9E" />
              <Text style={styles.picText}>{item.date}</Text>
              <Ionicons
                name="person-outline"
                size={12}
                color="#9E9E9E"
                style={{ marginLeft: 8 }}
              />
              <Text style={styles.picText}>{item.pic}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.methodText}>{item.method}</Text>
            <Text style={[styles.priorityText, { color: item.priorityColor }]}>
              {item.priority}
            </Text>
          </View>
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color="#9E9E9E"
            style={{ marginTop: 4, marginLeft: 10 }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Biru FIX */}
      <View style={[styles.blueHeader, { paddingTop: insets.top + 15 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Follow Up</Text>
            <Text style={styles.headerSubtitle}>
              Kelola aktivitas tindak lanjut calon debitur
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
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
            <Ionicons name="ellipsis-vertical" size={22} color="#FFF" />
          </View>
        </View>
      </View>

      {/* Stats Cards FIX Margin Negatif */}
      <View style={styles.statsWrapper}>
        {[
          {
            title: "HARI INI",
            val: "12",
            color: "#1976D2",
            bg: "#E3F2FD",
            icon: "today",
          },
          {
            title: "TERJADWAL",
            val: "28",
            color: "#FF9800",
            bg: "#FFF3E0",
            icon: "calendar",
          },
          {
            title: "SELESAI",
            val: "156",
            color: "#4CAF50",
            bg: "#E8F5E9",
            icon: "checkmark-circle",
          },
          {
            title: "TERLEWAT",
            val: "7",
            color: "#9C27B0",
            bg: "#F3E5F5",
            icon: "alert-circle",
          },
        ].map((s, i) => (
          <View key={i} style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: s.bg }]}>
              <Ionicons name={s.icon as any} size={14} color={s.color} />
            </View>
            <Text style={styles.statTitle}>{s.title}</Text>
            <Text style={styles.statValue}>{s.val}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.statSub}>Aktivitas</Text>
              <Ionicons
                name="information-circle-outline"
                size={10}
                color="#9E9E9E"
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dropdown Row FIX Flexbox & Overflow */}
      <View style={styles.dropdownRow}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropText} numberOfLines={1}>
            Semua Pipeline
          </Text>
          <Ionicons name="chevron-down" size={12} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropText} numberOfLines={1}>
            Semua Produk
          </Text>
          <Ionicons name="chevron-down" size={12} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropText} numberOfLines={1}>
            Semua Prioritas
          </Text>
          <Ionicons name="chevron-down" size={12} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIcon}>
          <MaterialCommunityIcons
            name="sort-variant"
            size={16}
            color="#757575"
          />
        </TouchableOpacity>
      </View>

      <SectionList
        style={{ flex: 1 }}
        sections={getFilteredData()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionCount}>{data.length} aktivitas</Text>
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Ionicons name="folder-open-outline" size={40} color="#E0E0E0" />
            <Text style={{ color: "#9E9E9E", marginTop: 10 }}>
              Belum ada data / Context belum terpasang
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate("InputFollowUp")}
      >
        <Ionicons name="add" size={20} color="#FFF" />
        <Text style={styles.fabText}>Buat Follow Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  blueHeader: {
    backgroundColor: "#0047D3",
    paddingBottom: 60,
    paddingHorizontal: 16,
  }, // PaddingBottom ditambah agar muat stat card
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#E3F2FD", fontSize: 11, marginTop: 2 },

  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: -40,
    zIndex: 10,
  },
  statCard: {
    backgroundColor: "#FFF",
    width: "23.5%",
    padding: 8,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statIconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statTitle: { fontSize: 7.5, color: "#757575", fontWeight: "bold" },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginVertical: 2,
  },
  statSub: { fontSize: 8, color: "#9E9E9E" },

  tabsWrapper: { paddingLeft: 16, marginTop: 15, marginBottom: 10 },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  tabBtnActive: { backgroundColor: "#E3F2FD", borderColor: "#0047D3" },
  tabText: { fontSize: 12, color: "#757575", fontWeight: "500" },
  tabTextActive: { color: "#0047D3", fontWeight: "bold" },

  // Dropdown Row Styles Fixed
  dropdownRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 15,
    alignItems: "center",
  },
  dropdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#FFF",
    marginRight: 8,
  },
  dropText: { fontSize: 9.5, color: "#333", flexShrink: 1, marginRight: 4 }, // flexShrink mencegah teks mendorong icon out of bounds
  filterIcon: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  sectionCount: { fontSize: 11, color: "#9E9E9E" },

  card: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    elevation: 1,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardLeft: { flexDirection: "row", flex: 1 },
  methodIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfo: { flex: 1 },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  typeText: { fontSize: 11, color: "#757575", marginBottom: 6 },
  statusRow: { flexDirection: "row", marginBottom: 6 },
  statusBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: "bold" },
  picRow: { flexDirection: "row", alignItems: "center" },
  picText: { fontSize: 10, color: "#9E9E9E", marginLeft: 4 },

  cardRight: { flexDirection: "row" },
  timeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 2,
  },
  methodText: { fontSize: 10, color: "#757575", marginBottom: 8 },
  priorityText: { fontSize: 10, fontWeight: "bold" },

  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: "#0047D3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fabText: { color: "#FFF", marginLeft: 8, fontSize: 12, fontWeight: "bold" },
});
