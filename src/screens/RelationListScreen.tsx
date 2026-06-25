import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RelationContext, Relation } from "../context/RelationContext";

export default function RelationListScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { relations } = useContext(RelationContext);

  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi Filter Pencarian (Nama, Perusahaan, atau Jabatan)
  const filteredRelations = relations.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.position.toLowerCase().includes(query)
    );
  });

  // Hitung statistik dinamis
  const countNasabah = relations.filter((r) => r.type === "Nasabah").length;
  const countProspek = relations.filter((r) => r.type === "Prospek").length;
  const countMitra = relations.filter((r) => r.type === "Mitra").length;

  // Fungsi Helper untuk Warna Badge
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "Nasabah":
        return { bg: "#E3F2FD", text: "#1976D2" };
      case "Prospek":
        return { bg: "#FFF3E0", text: "#F57C00" };
      case "Mitra":
        return { bg: "#E8F5E9", text: "#388E3C" };
      default:
        return { bg: "#F5F5F5", text: "#757575" };
    }
  };

  const renderItem = ({ item }: { item: Relation }) => {
    const badge = getBadgeStyle(item.type);

    return (
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name={item.avatarPlaceholder as any}
            size={24}
            color="#9E9E9E"
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.descText}>{item.position}</Text>
          <Text style={styles.descText}>{item.company}</Text>
          <View style={styles.cardFooter}>
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.badgeText, { color: badge.text }]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons name="call-outline" size={20} color="#757575" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color="#757575" />
            </TouchableOpacity>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#111"
          style={{ marginLeft: "auto" }}
        />
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={16} color="#FFF" />
        </View>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Relasi Saya</Text>
        <Text style={styles.pageSubtitle}></Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#9E9E9E"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama, perusahaan, atau jabatan"
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* <TouchableOpacity style={styles.filterBtn}>
          <Ionicons
            name="funnel-outline"
            size={18}
            color="#333"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: "#FFEBEE" }]}>
            <Ionicons name="people" size={16} color="#F44336" />
          </View>
          <Text style={styles.statValue}>{relations.length}</Text>
          <Text style={styles.statLabel}>Total Relasi</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="person" size={16} color="#1976D2" />
          </View>
          <Text style={styles.statValue}>{countNasabah}</Text>
          <Text style={styles.statLabel}>Nasabah</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons name="business" size={16} color="#4CAF50" />
          </View>
          <Text style={styles.statValue}>{countProspek}</Text>
          <Text style={styles.statLabel}>Prospek</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconBg, { backgroundColor: "#F3E5F5" }]}>
            <Ionicons name="hand-right" size={16} color="#9C27B0" />
          </View>
          <Text style={styles.statValue}>{countMitra}</Text>
          <Text style={styles.statLabel}>Mitra</Text>
        </View>
      </View>

      <View style={styles.listHeaderRow}>
        <Text style={styles.listTitle}>
          Daftar Relasi{" "}
          <Text style={{ color: "#757575" }}>({filteredRelations.length})</Text>
        </Text>
        <View style={styles.sortBtn}>
          <Text style={styles.sortText}>Terbaru</Text>
          <Ionicons
            name="chevron-down"
            size={12}
            color="#333"
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>

      <FlatList
        data={filteredRelations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={{ color: "#9E9E9E" }}>Tidak ada relasi ditemukan</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate("AddRelasi")}
      >
        <Ionicons name="add" size={20} color="#FFF" />
        <Text style={styles.fabText}>Tambah Relasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#B0BEC5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },

  titleSection: { paddingHorizontal: 16, marginTop: 10, marginBottom: 20 },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  pageSubtitle: { fontSize: 12, color: "#757575" },

  searchRow: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 20 },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    // marginRight: 10,
  },
  searchInput: { flex: 1, fontSize: 12, color: "#333" },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
  },
  filterBtnText: { fontSize: 13, fontWeight: "600", color: "#333" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  statCard: {
    width: "23%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  statLabel: { fontSize: 9, color: "#757575" },

  listHeaderRow: {
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
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sortText: { fontSize: 11, fontWeight: "600", color: "#333" },

  card: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#F5F5F5",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%" }, // Aktifkan ini nanti jika sudah ada foto
  cardContent: { flex: 1, justifyContent: "center" },
  nameText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  descText: { fontSize: 11, color: "#757575", marginBottom: 2 },
  cardFooter: { flexDirection: "row", marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: "bold" },

  cardRight: { alignItems: "flex-end", justifyContent: "space-between" },
  actionIcons: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  dateText: { fontSize: 10, color: "#9E9E9E", marginBottom: 5 },

  emptyState: { alignItems: "center", marginTop: 40 },

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
  fabText: { fontSize: 14, fontWeight: "bold", color: "#FFF", marginLeft: 8 },
});
