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
import { PenawaranContext, Penawaran } from "../context/PenawaranContext";

const TABS = ["Semua", "Draft", "Dikirim", "Negosiasi", "Disetujui", "Ditolak"];

export default function PenawaranListScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { penawaranList } = useContext(PenawaranContext);
  const [activeTab, setActiveTab] = useState("Semua");

  // Logic Filter Data
  const filteredData =
    activeTab === "Semua"
      ? penawaranList
      : penawaranList.filter((item) => item.status === activeTab);

  // Logic Hitung Statistik
  const countTotal = penawaranList.length;
  const countDikirim = penawaranList.filter(
    (i) => i.status === "Dikirim",
  ).length;
  const countNegosiasi = penawaranList.filter(
    (i) => i.status === "Negosiasi",
  ).length;
  const countDisetujui = penawaranList.filter(
    (i) => i.status === "Disetujui",
  ).length;

  // Helper Warna Status Badge
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Disetujui":
        return { text: "#4CAF50", bg: "#E8F5E9" };
      case "Dikirim":
        return { text: "#1976D2", bg: "#E3F2FD" };
      case "Negosiasi":
        return { text: "#9C27B0", bg: "#F3E5F5" };
      case "Draft":
        return { text: "#757575", bg: "#F5F5F5" };
      case "Ditolak":
        return { text: "#F44336", bg: "#FFEBEE" };
      default:
        return { text: "#757575", bg: "#F5F5F5" };
    }
  };

  const renderItem = ({ item }: { item: Penawaran }) => {
    const badge = getBadgeStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <View
              style={[styles.iconWrapper, { backgroundColor: item.iconBg }]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.iconColor}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.companyName}>{item.company}</Text>
              <Text style={styles.productText}>{item.product}</Text>
              <Text style={styles.amountText}>{item.amount}</Text>
            </View>
          </View>
          <View style={styles.cardRight}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.statusText, { color: badge.text }]}>
                  {item.status}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical"
                  size={16}
                  color="#9E9E9E"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={12} color="#9E9E9E" />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={12} color="#9E9E9E" />
              <Text style={styles.detailText}>{item.tenor}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="pricetag-outline" size={12} color="#9E9E9E" />
              <Text style={styles.detailText}>{item.interest}</Text>
            </View>
          </View>
          <Text style={styles.picText}>{item.pic}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Putih + Tombol Back */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Penawaran</Text>
            <Text style={styles.headerSubtitle}>
              Kelola dan pantau penawaran produk untuk nasabah Anda
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="document-text" size={16} color="#1976D2" />
            </View>
            <Text style={styles.statVal}>{countTotal}</Text>
            <Text style={styles.statLabel}>Total Penawaran</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#FFF8E1" }]}>
              <Ionicons name="paper-plane" size={16} color="#FFC107" />
            </View>
            <Text style={styles.statVal}>{countDikirim}</Text>
            <Text style={styles.statLabel}>Dikirim</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#F3E5F5" }]}>
              <Ionicons name="hourglass" size={16} color="#9C27B0" />
            </View>
            <Text style={styles.statVal}>{countNegosiasi}</Text>
            <Text style={styles.statLabel}>Negosiasi</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            </View>
            <Text style={styles.statVal}>{countDisetujui}</Text>
            <Text style={styles.statLabel}>Disetujui</Text>
          </View>
        </View>

        {/* Tabs Scrollable */}
        <View style={styles.tabsWrapper}>
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

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Daftar Penawaran</Text>
          <TouchableOpacity style={styles.sortBtn}>
            <Ionicons name="swap-vertical" size={14} color="#757575" />
            <Text style={styles.sortText}>Terbaru</Text>
            <Ionicons name="chevron-down" size={12} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* FlatList Data */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // Dikontrol oleh ScrollView utama
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "#9E9E9E" }}>
                Tidak ada penawaran dengan status ini.
              </Text>
            </View>
          }
        />
      </ScrollView>

      {/* FAB Buat Penawaran Baru */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate("AddPenawaran")} // Rute untuk wizard form nanti
      >
        <Ionicons name="add" size={20} color="#FFF" />
        <Text style={styles.fabText}>Buat Penawaran Baru</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: { paddingHorizontal: 16, backgroundColor: "#FFF" },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  headerSubtitle: { fontSize: 11, color: "#757575", marginTop: 2 },
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

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  statCard: { width: "23%", paddingVertical: 12, alignItems: "center" },
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

  tabsWrapper: {
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 15,
  },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 12, position: "relative" },
  tabText: { fontSize: 12, color: "#757575", fontWeight: "500" },
  tabTextActive: { color: "#0047D3", fontWeight: "bold" },
  activeIndicator: {
    position: "absolute",
    bottom: -1,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: "#0047D3",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  listTitle: { fontSize: 14, fontWeight: "bold", color: "#111" },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sortText: { fontSize: 11, fontWeight: "500", color: "#333" },

  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardLeft: { flexDirection: "row", flex: 1 },
  iconWrapper: {
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
  productText: { fontSize: 11, color: "#757575", marginBottom: 4 },
  amountText: { fontSize: 14, fontWeight: "bold", color: "#111" },

  cardRight: { alignItems: "flex-end" },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: "bold" },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#F5F5F5",
  },
  footerDetails: { flexDirection: "row", alignItems: "center", gap: 12 },
  detailItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  detailText: { fontSize: 10, color: "#757575" },
  picText: { fontSize: 10, color: "#9E9E9E", fontWeight: "500" },

  fab: {
    position: "absolute",
    right: 16,
    left: 16,
    backgroundColor: "#0047D3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fabText: { fontSize: 14, fontWeight: "bold", color: "#FFF" },
});
