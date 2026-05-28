import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityContext, Activity } from "../context/ActivityContext";

const CALENDAR_DATES = [
  { day: "Sen", date: "20", month: "Mei" },
  { day: "Sel", date: "21", month: "Mei" },
  { day: "Rab", date: "22", month: "Mei" },
  { day: "Kam", date: "23", month: "Mei" },
  { day: "Jum", date: "24", month: "Mei" },
  { day: "Sab", date: "25", month: "Mei" },
  { day: "Min", date: "26", month: "Mei" },
];

const TABS = ["Semua", "Hari Ini", "Mendatang", "Selesai", "Overdue"];

export default function ActivityListScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { activities } = useContext(ActivityContext);

  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedDate, setSelectedDate] = useState("20");

  const getFilteredActivities = () => {
    return activities.filter((act) => {
      const matchDate = act.date === selectedDate;
      const matchTab = activeTab === "Semua" ? true : act.status === activeTab;
      return matchDate && matchTab;
    });
  };

  const filteredData = getFilteredActivities();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return { text: "#4CAF50", bg: "#E8F5E9" };
      case "Hari Ini":
        return { text: "#1976D2", bg: "#E3F2FD" };
      case "Mendatang":
        return { text: "#FF9800", bg: "#FFF3E0" };
      case "Overdue":
        return { text: "#F44336", bg: "#FFEBEE" };
      default:
        return { text: "#757575", bg: "#F5F5F5" };
    }
  };

  const renderActivityItem = ({
    item,
    index,
  }: {
    item: Activity;
    index: number;
  }) => {
    const isLast = index === filteredData.length - 1;
    const badge = getStatusColor(item.status);

    return (
      <View style={styles.activityCard}>
        <View style={styles.timelineCol}>
          {!isLast && <View style={styles.timelineLine} />}
          <View
            style={[styles.timelineIconBg, { backgroundColor: item.iconBg }]}
          >
            <Ionicons
              name={item.icon as any}
              size={14}
              color={item.iconColor}
            />
          </View>
        </View>

        <View style={styles.activityContent}>
          <View style={styles.activityHeader}>
            <Text style={styles.timeText}>
              {item.time} <Text style={styles.typeText}>{item.type}</Text>
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.statusText, { color: badge.text }]}>
                  {item.status}
                </Text>
              </View>
              <Ionicons
                name="ellipsis-vertical"
                size={16}
                color="#9E9E9E"
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>

          <Text style={styles.descText}>{item.desc}</Text>

          <View style={styles.footerRow}>
            <Ionicons name="person-outline" size={12} color="#9E9E9E" />
            <Text style={styles.footerText}>{item.pic}</Text>
            <Text style={styles.footerDot}>•</Text>
            <Text style={styles.footerText}>{item.company}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Putih Custom FIX (+ Tombol Back) */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTitleRow}>
          {/* Tombol Back Ditambahkan Di Sini */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            {" "}
            {/* Menggunakan flex: 1 agar title mengisi ruang tengah */}
            <Text style={styles.headerTitle}>Aktivitas</Text>
            <Text style={styles.headerSubtitle}>
              Kelola dan pantau aktivitas Anda
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="funnel-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tabBtn}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.monthDropdown}>
              <Ionicons name="calendar-outline" size={14} color="#333" />
              <Text style={styles.monthText}>Mei 2024</Text>
              <Ionicons name="chevron-down" size={14} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.todayBtn}>
              <Ionicons name="calendar" size={14} color="#0047D3" />
              <Text style={styles.todayText}>Hari ini</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateSlider}
          >
            {CALENDAR_DATES.map((item, idx) => {
              const isActive = selectedDate === item.date;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dateCard, isActive && styles.dateCardActive]}
                  onPress={() => setSelectedDate(item.date)}
                >
                  <Text style={[styles.dateDay, isActive && { color: "#FFF" }]}>
                    {item.day}
                  </Text>
                  <Text style={[styles.dateNum, isActive && { color: "#FFF" }]}>
                    {item.date}
                  </Text>
                  <Text
                    style={[styles.dateMonth, isActive && { color: "#FFF" }]}
                  >
                    {item.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="clipboard" size={16} color="#1976D2" />
            </View>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLabel}>Total Aktivitas</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            </View>
            <Text style={styles.statVal}>7</Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="time" size={16} color="#FF9800" />
            </View>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Mendatang</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#FFEBEE" }]}>
              <Ionicons name="alert-circle" size={16} color="#F44336" />
            </View>
            <Text style={styles.statVal}>2</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
        </View>

        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Daftar Aktivitas</Text>
            <TouchableOpacity style={styles.sortBtn}>
              <Ionicons name="swap-vertical" size={14} color="#333" />
              <Text style={styles.sortText}>Urutkan</Text>
              <Ionicons name="chevron-down" size={14} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderActivityItem}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text style={{ color: "#9E9E9E" }}>
                  Tidak ada aktivitas pada tanggal/filter ini.
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate("AddActivity")}
      >
        <Ionicons name="add" size={20} color="#FFF" />
        <Text style={styles.fabText}>Tambah Aktivitas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
  },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  headerSubtitle: { fontSize: 12, color: "#757575", marginTop: 2 },
  headerIcons: { flexDirection: "row" },
  iconBtn: {
    marginLeft: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },

  tabsRow: { flexDirection: "row" },
  tabBtn: { paddingHorizontal: 15, paddingVertical: 10, position: "relative" },
  tabText: { fontSize: 13, color: "#757575", fontWeight: "500" },
  tabTextActive: { color: "#0047D3", fontWeight: "bold" },
  activeIndicator: {
    position: "absolute",
    bottom: -1,
    left: 15,
    right: 15,
    height: 3,
    backgroundColor: "#0047D3",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  calendarSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#F8F9FA",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthDropdown: { flexDirection: "row", alignItems: "center", gap: 6 },
  monthText: { fontSize: 13, fontWeight: "bold", color: "#333" },
  todayBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  todayText: { fontSize: 11, color: "#0047D3", fontWeight: "bold" },

  dateSlider: { gap: 10, paddingRight: 16 },
  dateCard: {
    width: 55,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  dateCardActive: { backgroundColor: "#0047D3", borderColor: "#0047D3" },
  dateDay: { fontSize: 11, color: "#757575", marginBottom: 4 },
  dateNum: { fontSize: 18, fontWeight: "bold", color: "#111", marginBottom: 2 },
  dateMonth: { fontSize: 10, color: "#9E9E9E" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#F8F9FA",
  },
  statCard: {
    width: "23%",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statVal: { fontSize: 16, fontWeight: "bold", color: "#111" },
  statLabel: {
    fontSize: 9,
    color: "#757575",
    marginTop: 2,
    textAlign: "center",
  },

  listSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#FFF",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  listTitle: { fontSize: 14, fontWeight: "bold", color: "#111" },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sortText: { fontSize: 11, fontWeight: "600", color: "#333" },

  activityCard: { flexDirection: "row", marginBottom: 5 },
  timelineCol: { width: 40, alignItems: "center", position: "relative" },
  timelineLine: {
    position: "absolute",
    top: 25,
    bottom: -25,
    width: 1,
    backgroundColor: "#E0E0E0",
    zIndex: 0,
  },
  timelineIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginTop: 2,
  },

  activityContent: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    marginBottom: 10,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: { fontSize: 12, color: "#757575", fontWeight: "500" },
  typeText: { fontSize: 14, fontWeight: "bold", color: "#111" },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 9, fontWeight: "bold" },

  descText: { fontSize: 12, color: "#333", marginBottom: 8 },
  footerRow: { flexDirection: "row", alignItems: "center" },
  footerText: { fontSize: 10, color: "#757575", marginLeft: 4 },
  footerDot: { fontSize: 10, color: "#9E9E9E", marginHorizontal: 6 },

  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: "#0047D3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fabText: { fontSize: 14, fontWeight: "bold", color: "#FFF" },
});
