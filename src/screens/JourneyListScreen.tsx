import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { JourneyContext, Journey } from "../context/JourneyContext";

export default function JourneyListScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { journeys } = useContext(JourneyContext);

  const [activeTab, setActiveTab] = useState("Plan");

  // Menghitung statistik untuk Ringkasan Hari Ini
  const totalVisit = journeys.filter((j) => !j.isBreak).length;
  const countPlan = journeys.filter(
    (j) => j.status === "Plan" && !j.isBreak,
  ).length;
  const countOnGoing = journeys.filter(
    (j) => j.status === "On Going" && !j.isBreak,
  ).length;
  const countSelesai = journeys.filter(
    (j) => j.status === "Selesai" && !j.isBreak,
  ).length;

  // Filter Data berdasarkan Tab
  const filteredData = journeys.filter((j) => {
    if (j.isBreak) return true; // Break selalu dimunculkan di timeline
    return j.status === activeTab || activeTab === "Plan";
    // Asumsi: Tab Plan memunculkan semua, atau sesuaikan dengan logika bisnis Anda
  });

  // Helper untuk warna badge Type (Meeting, Survey, dll)
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return { text: "#1976D2", bg: "#E3F2FD" }; // Biru
      case "Survey":
        return { text: "#4CAF50", bg: "#E8F5E9" }; // Hijau
      case "Follow Up":
        return { text: "#9C27B0", bg: "#F3E5F5" }; // Ungu
      default:
        return { text: "#757575", bg: "#F5F5F5" };
    }
  };

  const renderTimelineItem = ({
    item,
    index,
  }: {
    item: Journey;
    index: number;
  }) => {
    const isLast = index === filteredData.length - 1;
    const typeStyle = getTypeColor(item.type);

    return (
      <View style={styles.timelineRow}>
        {/* Kolom 1: Jam */}
        <View style={styles.timeCol}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {/* Kolom 2: Garis & Ikon Penanda */}
        <View style={styles.lineCol}>
          <View style={styles.timelineLine} />
          {item.isBreak ? (
            <View
              style={[
                styles.timelineDot,
                { backgroundColor: "#FFF3E0", borderColor: "#FF9800" },
              ]}
            >
              <Ionicons name="restaurant" size={14} color="#FF9800" />
            </View>
          ) : (
            <View
              style={[
                styles.timelineDot,
                { backgroundColor: "#E3F2FD", borderColor: "#0047D3" },
              ]}
            >
              <Ionicons name="location" size={14} color="#0047D3" />
            </View>
          )}
        </View>

        {/* Kolom 3: Kartu Konten */}
        <View style={styles.cardCol}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.companyText}>{item.company}</Text>
              {!item.isBreak && (
                <View
                  style={[styles.typeBadge, { backgroundColor: typeStyle.bg }]}
                >
                  <Text style={[styles.typeText, { color: typeStyle.text }]}>
                    {item.type}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={[styles.productText, item.isBreak && { marginBottom: 0 }]}
            >
              {item.product}
            </Text>

            <View style={styles.detailRow}>
              {!item.isBreak && (
                <Ionicons
                  name="location-outline"
                  size={12}
                  color="#9E9E9E"
                  style={{ marginRight: 4 }}
                />
              )}
              <Text style={styles.detailText}>{item.address}</Text>
            </View>

            {!item.isBreak && (
              <View style={styles.detailRow}>
                <Ionicons
                  name="person-outline"
                  size={12}
                  color="#9E9E9E"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.detailText}>{item.pic}</Text>
              </View>
            )}
          </View>
          <Ionicons name="chevron-forward" size={16} color="#9E9E9E" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER PUTIH + TOMBOL BACK */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Journey Plan</Text>
            <Text style={styles.headerSubtitle}>
              Rencanakan perjalanan dan kunjungan nasabah Anda
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notifBadge}>
              <Text style={styles.notifText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Baris Tanggal & Filter */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.dateSelector}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="#333"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.dateText}>Selasa, 20 Mei 2024</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="#757575"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="funnel-outline"
              size={16}
              color="#333"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* RINGKASAN HARI INI */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Ringkasan Hari ini</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#0047D3" }]}>
                {totalVisit}
              </Text>
              <Text style={styles.statLabel}>Total Visit</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#4CAF50" }]}>
                {countPlan}
              </Text>
              <Text style={styles.statLabel}>Terjadwal</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#FF9800" }]}>
                {countOnGoing}
              </Text>
              <Text style={styles.statLabel}>On Going</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#757575" }]}>
                {countSelesai}
              </Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabsContainer}>
          {["Plan", "On Going", "Selesai"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab} (
                {tab === "Plan"
                  ? countPlan + countOnGoing + countSelesai
                  : tab === "On Going"
                    ? countOnGoing
                    : countSelesai}
                )
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TIMELINE LIST */}
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderTimelineItem}
            scrollEnabled={false} // Dikendalikan oleh ScrollView utama
          />

          {/* Tombol Tambah Kunjungan di akhir timeline */}
          <View style={styles.timelineRow}>
            <View style={styles.timeCol} />
            <View style={styles.lineCol}>
              <View style={[styles.timelineLine, { height: "50%" }]} />
            </View>
            <View style={styles.cardCol}>
              <TouchableOpacity
                style={styles.btnAddDashed}
                onPress={() => navigation.navigate("AddJourney")} // Menuju rute Tambah
              >
                <Ionicons name="add" size={16} color="#0047D3" />
                <Text style={styles.btnAddText}>Tambah Kunjungan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM FIXED BUTTON (Optimasi Route) */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.btnOptimasi}
          onPress={() => navigation.navigate("OptimasiRoute")}
        >
          <Ionicons
            name="map-outline"
            size={18}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnOptimasiText}>Optimasi Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  // Header Styles
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 15,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#111" },
  headerSubtitle: { fontSize: 11, color: "#757575", marginTop: 2 },
  notifBadge: {
    position: "absolute",
    top: -2,
    right: -4,
    backgroundColor: "#F44336",
    borderRadius: 10,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  notifText: { color: "#FFF", fontSize: 8, fontWeight: "bold" },

  filterRow: { flexDirection: "row", justifyContent: "space-between" },
  dateSelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  dateText: { fontSize: 12, fontWeight: "bold", color: "#333" },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterBtnText: { fontSize: 12, fontWeight: "600", color: "#333" },

  // Summary Styles
  summaryContainer: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: { alignItems: "center", flex: 1 },
  statNum: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  statLabel: { fontSize: 10, color: "#757575" },
  statDivider: { width: 1, height: 30, backgroundColor: "#EEEEEE" },

  // Tabs Styles
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#EEEEEE",
  },
  tabBtnActive: {
    borderColor: "#0047D3",
    backgroundColor: "#F0F4FF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabText: { fontSize: 12, color: "#757575", fontWeight: "500" },
  tabTextActive: { color: "#0047D3", fontWeight: "bold" },

  // Timeline Styles
  listContainer: { paddingHorizontal: 16 },
  timelineRow: { flexDirection: "row", minHeight: 80 },
  timeCol: { width: 45, alignItems: "center", paddingTop: 4 },
  timeText: { fontSize: 12, fontWeight: "bold", color: "#111" },

  lineCol: { width: 30, alignItems: "center" },
  timelineLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  cardCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  cardContent: { flex: 1, paddingLeft: 10 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  companyText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginRight: 8,
  },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 9, fontWeight: "bold" },
  productText: { fontSize: 12, color: "#333", marginBottom: 6 },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  detailText: { fontSize: 11, color: "#757575", flex: 1 },

  // Tambah Kunjungan Button
  btnAddDashed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0047D3",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 10,
    flex: 1,
  },
  btnAddText: {
    color: "#0047D3",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6,
  },

  // Bottom Fixed Button
  bottomBar: {
    backgroundColor: "#FFF",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 10,
  },
  btnOptimasi: {
    backgroundColor: "#0047D3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnOptimasiText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
});
