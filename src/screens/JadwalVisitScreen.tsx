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
import { VisitContext, Visit } from "../context/VisitContext";

const CALENDAR_DATES = [
  { day: "Sen", date: "20", dots: ["#1976D2", "#4CAF50"] },
  { day: "Sel", date: "21", dots: ["#1976D2", "#4CAF50", "#FF9800"] },
  { day: "Rab", date: "22", dots: ["#9C27B0", "#1976D2"] },
  { day: "Kam", date: "23", dots: [] },
  { day: "Jum", date: "24", dots: ["#4CAF50"] },
  { day: "Sab", date: "25", dots: ["#F44336", "#1976D2"] },
  { day: "Min", date: "26", dots: [] },
];

export default function JadwalVisitScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { visits } = useContext(VisitContext);

  const [activeTab, setActiveTab] = useState("Agenda Hari Ini");
  const [selectedDate, setSelectedDate] = useState("21");

  // Logic Filter Data
  const getFilteredVisits = () => {
    return visits.filter((v) => v.date === selectedDate);
  };

  const filteredData = getFilteredVisits();

  // Helper Warna Status / Tipe Kunjungan
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return { text: "#1976D2", bg: "#E3F2FD", icon: "business" };
      case "Survey":
        return { text: "#4CAF50", bg: "#E8F5E9", icon: "map" };
      case "Follow Up":
        return { text: "#9C27B0", bg: "#F3E5F5", icon: "document-text" };
      default:
        return { text: "#757575", bg: "#F5F5F5", icon: "calendar" };
    }
  };

  const renderTimelineItem = ({
    item,
    index,
  }: {
    item: Visit;
    index: number;
  }) => {
    const isLast = index === filteredData.length - 1;
    const typeStyle = getTypeColor(item.type);

    return (
      <View style={styles.timelineRow}>
        {/* Kolom Kiri: Jam */}
        <View style={styles.timeCol}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {/* Kolom Tengah: Ikon Timeline */}
        <View style={styles.lineCol}>
          {!isLast && <View style={styles.timelineLine} />}
          {item.isBreak ? (
            <View
              style={[styles.timelineIconBg, { backgroundColor: "#FFF8E1" }]}
            >
              <Ionicons name="restaurant" size={14} color="#FF9800" />
            </View>
          ) : (
            <View
              style={[
                styles.timelineIconBg,
                { backgroundColor: typeStyle.text },
              ]}
            >
              <Ionicons name={typeStyle.icon as any} size={14} color="#FFF" />
            </View>
          )}
        </View>

        {/* Kolom Kanan: Card Konten */}
        <View style={styles.cardCol}>
          <View style={[styles.cardContent, item.isBreak && styles.cardBreak]}>
            <View style={styles.cardHeader}>
              <Text style={styles.companyText} numberOfLines={1}>
                {item.company}
              </Text>
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
                  style={{ marginRight: 4, marginTop: 2 }}
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

            {/* Tombol Isi Kunjungan */}
            {!item.isBreak && (
              <TouchableOpacity
                style={styles.btnIsiKunjungan}
                onPress={() => navigation.navigate("IsiKunjungan")}
              >
                <Text style={styles.btnIsiText}>Isi Kunjungan</Text>
                <Ionicons name="chevron-forward" size={10} color="#0047D3" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER PUTIH */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Jadwal Visit</Text>
            <Text style={styles.headerSubtitle}>
              Agenda kunjungan kerja Anda
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons name="search" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notifBadge}>
                <Text style={styles.notifText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* CALENDAR SECTION */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.monthDropdown}>
              <Ionicons name="calendar-outline" size={14} color="#333" />
              <Text style={styles.monthText}>Mei 2024</Text>
              <Ionicons name="chevron-down" size={14} color="#333" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={styles.todayBtn}>
                <Ionicons name="calendar" size={14} color="#0047D3" />
                <Text style={styles.todayText}>Hari ini</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name="funnel-outline" size={14} color="#333" />
              </TouchableOpacity>
            </View>
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
                  <Text
                    style={[
                      styles.dateDay,
                      { color: isActive ? "#FFF" : "#757575" },
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateNum,
                      { color: isActive ? "#FFF" : "#111" },
                    ]}
                  >
                    {item.date}
                  </Text>

                  <View style={styles.dotsRow}>
                    {item.dots.map((color, dIdx) => (
                      <View
                        key={dIdx}
                        style={[
                          styles.dateDot,
                          { backgroundColor: isActive ? "#FFF" : color },
                        ]}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* TABS */}
        <View style={styles.tabsContainer}>
          {["Agenda Hari Ini", "Minggu Ini", "Agenda Mendatang"].map((tab) => (
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
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderDate}>Selasa, 21 Mei 2024</Text>
          <Text style={styles.listHeaderCount}>7 Agenda</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderTimelineItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 0,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#111" },
  headerSubtitle: { fontSize: 11, color: "#757575", marginTop: 2 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
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

  calendarSection: { paddingHorizontal: 16, marginBottom: 15 },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  monthText: { fontSize: 12, fontWeight: "bold", color: "#333" },
  todayBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  todayText: { fontSize: 11, color: "#0047D3", fontWeight: "bold" },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 6,
    borderRadius: 6,
  },

  dateSlider: { gap: 12, paddingRight: 16 },
  dateCard: {
    width: 45,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-between",
    height: 75,
  },
  dateCardActive: { backgroundColor: "#0047D3" },
  dateDay: { fontSize: 10, fontWeight: "600" },
  dateNum: { fontSize: 16, fontWeight: "bold" },
  dotsRow: { flexDirection: "row", gap: 2, height: 4 },
  dateDot: { width: 4, height: 4, borderRadius: 2 },

  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  tabBtnActive: { borderColor: "#0047D3" },
  tabText: { fontSize: 11, color: "#757575", fontWeight: "500" },
  tabTextActive: { color: "#0047D3", fontWeight: "bold" },

  listHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#FAFAFA",
  },
  listHeaderDate: { fontSize: 12, fontWeight: "bold", color: "#111" },
  listHeaderCount: { fontSize: 11, color: "#757575" },

  listContainer: { paddingHorizontal: 16, paddingTop: 10 },
  timelineRow: { flexDirection: "row", marginBottom: 15 },
  timeCol: { width: 45, alignItems: "center", paddingTop: 10 },
  timeText: { fontSize: 12, fontWeight: "bold", color: "#111" },

  lineCol: { width: 30, alignItems: "center" },
  timelineLine: {
    position: "absolute",
    top: 30,
    bottom: -20,
    width: 1,
    backgroundColor: "#E0E0E0",
    borderStyle: "dashed",
    marginRight: 4,
  },
  timelineIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginTop: 4,
    marginRight: 4,
  },

  cardCol: { flex: 1, paddingBottom: 5 },
  cardContent: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  cardBreak: { backgroundColor: "#FFF8E1", borderColor: "#FFE082" },

  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  companyText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginRight: 8,
    flex: 1,
  },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 9, fontWeight: "bold" },
  productText: { fontSize: 12, color: "#333", marginBottom: 8 },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  detailText: { fontSize: 11, color: "#757575", flex: 1, lineHeight: 15 },

  btnIsiKunjungan: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E4FF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F0F4FF",
  },
  btnIsiText: {
    fontSize: 10,
    color: "#0047D3",
    fontWeight: "bold",
    marginRight: 4,
  },
});
