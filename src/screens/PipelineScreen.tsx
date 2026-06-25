import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PIPELINE_DATA = [
  {
    id: "1",
    title: "1. New Lead",
    desc: "Lead baru masuk, belum dihubungi",
    total: "Rp 3,25 M",
    count: 16,
    icon: "person-add-outline",
    color: "#1976D2",
    bgColor: "#E3F2FD",
    items: [
      {
        id: "1a",
        name: "Toko Berkah Jaya",
        type: "Modal Kerja",
        nominal: "Rp 150.000.000",
        pic: "Rizky Pratama",
        date: "20 Mei 2026",
        priority: "Prioritas Tinggi",
        priorityColor: "#F44336",
        priorityBg: "#FFEBEE",
      },
      {
        id: "1b",
        name: "CV Sumber Makmur",
        type: "Investasi",
        nominal: "Rp 300.000.000",
        pic: "Dewi Anggraini",
        date: "19 Mei 2026",
        priority: "Prioritas Sedang",
        priorityColor: "#FF9800",
        priorityBg: "#FFF3E0",
      },
      {
        id: "1c",
        name: "UD Makmur Abadi",
        type: "Modal Kerja",
        nominal: "Rp 100.000.000",
        pic: "Rizky Pratama",
        date: "19 Mei 2026",
        priority: "Prioritas Rendah",
        priorityColor: "#4CAF50",
        priorityBg: "#E8F5E9",
      },
    ],
  },
  {
    id: "2",
    title: "2. Contacted",
    desc: "Sudah dihubungi oleh AO",
    total: "Rp 6,80 M",
    count: 24,
    icon: "call-outline",
    color: "#F57C00",
    bgColor: "#FFF3E0",
    items: [],
  },
  {
    id: "3",
    title: "3. Survey",
    desc: "Sedang proses survey lapangan",
    total: "Rp 7,50 M",
    count: 18,
    icon: "clipboard-outline",
    color: "#8E24AA",
    bgColor: "#F3E5F5",
    items: [],
  },
  {
    id: "4",
    title: "4. Dokumen Masuk",
    desc: "Dokumen sudah diterima",
    total: "Rp 6,25 M",
    count: 15,
    icon: "document-text-outline",
    color: "#43A047",
    bgColor: "#E8F5E9",
    items: [],
  },
  {
    id: "5",
    title: "5. Analisa Kredit",
    desc: "Sedang dianalisa credit analyst",
    total: "Rp 9,20 M",
    count: 12,
    icon: "trending-up-outline",
    color: "#E65100",
    bgColor: "#FFF8E1",
    items: [],
  },
  {
    id: "6",
    title: "6. Approval",
    desc: "Menunggu persetujuan kredit",
    total: "Rp 8,10 M",
    count: 10,
    icon: "shield-checkmark-outline",
    color: "#1E88E5",
    bgColor: "#E3F2FD",
    items: [],
  },
  {
    id: "7",
    title: "7. Akad",
    desc: "Proses akad kredit",
    total: "Rp 4,35 M",
    count: 6,
    icon: "hand-right-outline",
    color: "#00897B",
    bgColor: "#E0F2F1",
    items: [],
  },
  {
    id: "8",
    title: "8. Disbursement",
    desc: "Dana siap/selesai dicairkan",
    total: "Rp 3,97 M",
    count: 7,
    icon: "cash-outline",
    color: "#7CB342",
    bgColor: "#F1F8E9",
    items: [],
  },
];

export default function PipelineScreen({ navigation }: any) {
  const [expandedId, setExpandedId] = useState<string>("1");

  const insets = useSafeAreaInsets();

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.blueHeader, { paddingTop: insets.top + 15 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Pipeline</Text>
            <Text style={styles.headerSubtitle}>
              Pantau progres pengajuan kredit
            </Text>
          </View>
          <View style={styles.headerIcons}>
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

      <View style={styles.statsWrapper}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View
              style={[styles.statIconWrapper, { backgroundColor: "#E3F2FD" }]}
            >
              <Ionicons name="people" size={12} color="#1976D2" />
            </View>
            <Ionicons
              name="information-circle-outline"
              size={12}
              color="#9E9E9E"
            />
          </View>
          <Text style={styles.statTitle} numberOfLines={1}>
            TOTAL PIPELINE
          </Text>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statSub}>Pengajuan</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View
              style={[styles.statIconWrapper, { backgroundColor: "#E8F5E9" }]}
            >
              <Text
                style={{ fontSize: 8, fontWeight: "bold", color: "#4CAF50" }}
              >
                Rp
              </Text>
            </View>
            <Ionicons
              name="information-circle-outline"
              size={12}
              color="#9E9E9E"
            />
          </View>
          <Text style={styles.statTitle} numberOfLines={1}>
            TOTAL PLAFOND
          </Text>
          <Text style={styles.statValue}>Rp 45,6M</Text>
          <Text style={styles.statSub}>Estimasi</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View
              style={[styles.statIconWrapper, { backgroundColor: "#FFF3E0" }]}
            >
              <Ionicons name="trending-up" size={12} color="#F57C00" />
            </View>
            <Ionicons
              name="information-circle-outline"
              size={12}
              color="#9E9E9E"
            />
          </View>
          <Text style={styles.statTitle} numberOfLines={1}>
            PROBABILITY
          </Text>
          <Text style={styles.statValue}>47%</Text>
          <Text style={styles.statSub}>Rata-rata</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View
              style={[styles.statIconWrapper, { backgroundColor: "#F3E5F5" }]}
            >
              <Ionicons name="trophy" size={12} color="#8E24AA" />
            </View>
            <Ionicons
              name="information-circle-outline"
              size={12}
              color="#9E9E9E"
            />
          </View>
          <Text style={styles.statTitle} numberOfLines={1}>
            DEAL BULAN INI
          </Text>
          <Text style={styles.statValue}>Rp 8,75M</Text>
          <Text style={styles.statSub}>18 Pengajuan</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Semua Produk</Text>
          <Ionicons name="chevron-down" size={12} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Semua AO</Text>
          <Ionicons name="chevron-down" size={12} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons
            name="sort-variant"
            size={14}
            color="#757575"
          />
          <Text style={[styles.filterText, { marginLeft: 4 }]}>
            Urutkan: Terbaru
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {PIPELINE_DATA.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const isLast = index === PIPELINE_DATA.length - 1;

          return (
            <View key={item.id} style={styles.accordionContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleExpand(item.id)}
                style={[
                  styles.accordionRow,
                  isExpanded && styles.accordionRowActive,
                ]}
              >
                <View style={styles.timelineCol}>
                  {!isLast && <View style={styles.timelineLine} />}
                  <View
                    style={[
                      styles.timelineIconBg,
                      { backgroundColor: item.bgColor },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={18}
                      color={item.color}
                    />
                  </View>
                </View>

                <View style={styles.textCol}>
                  <Text style={[styles.accordionTitle, { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.accordionDesc}>{item.desc}</Text>
                  <Text style={styles.accordionTotal}>
                    Total Plafond:{" "}
                    <Text style={{ fontWeight: "bold", color: "#333" }}>
                      {item.total}
                    </Text>
                  </Text>
                </View>

                <View style={styles.rightCol}>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#757575"
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && item.items.length > 0 && (
                <View style={styles.expandedContent}>
                  {!isLast && <View style={styles.expandedTimelineLine} />}

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                  >
                    {item.items.map((subItem) => (
                      <View key={subItem.id} style={styles.miniCard}>
                        <View style={styles.miniCardHeader}>
                          <Text style={styles.miniCardTitle} numberOfLines={1}>
                            {subItem.name}
                          </Text>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={14}
                            color="#9E9E9E"
                          />
                        </View>
                        <Text style={styles.miniCardType}>{subItem.type}</Text>
                        <Text style={styles.miniCardNominal}>
                          {subItem.nominal}
                        </Text>

                        <View style={styles.miniCardRow}>
                          <Ionicons
                            name="person-outline"
                            size={10}
                            color="#757575"
                          />
                          <Text style={styles.miniCardInfoText}>
                            {subItem.pic}
                          </Text>
                        </View>
                        <View style={styles.miniCardRow}>
                          <Ionicons
                            name="calendar-outline"
                            size={10}
                            color="#757575"
                          />
                          <Text style={styles.miniCardInfoText}>
                            {subItem.date}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.priorityBadge,
                            { backgroundColor: subItem.priorityBg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.priorityText,
                              { color: subItem.priorityColor },
                            ]}
                          >
                            {subItem.priority}
                          </Text>
                        </View>
                      </View>
                    ))}

                    <TouchableOpacity style={styles.viewAllCard}>
                      <View style={styles.viewAllCircle}>
                        <Ionicons name="add" size={24} color="#1976D2" />
                      </View>
                      <Text style={styles.viewAllText}>Lihat semua</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  blueHeader: {
    backgroundColor: "#0047D3",
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleBox: { flex: 1 },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#E3F2FD", fontSize: 11, marginTop: 2 },
  headerIcons: { flexDirection: "row", alignItems: "center" },

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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  statIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  statTitle: { fontSize: 7.5, color: "#757575", fontWeight: "bold" },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
    marginVertical: 2,
  },
  statSub: { fontSize: 8, color: "#9E9E9E" },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  filterText: {
    fontSize: 10,
    color: "#333",
    marginRight: 4,
    fontWeight: "500",
  },

  listContainer: { paddingHorizontal: 16, paddingTop: 10 },
  accordionContainer: { position: "relative" },

  accordionRow: { flexDirection: "row", paddingVertical: 12, borderRadius: 12 },
  accordionRowActive: { backgroundColor: "#F8FAFC" },

  timelineCol: { width: 44, alignItems: "center", position: "relative" },
  timelineIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  timelineLine: {
    position: "absolute",
    top: 30,
    bottom: -20,
    width: 2,
    backgroundColor: "#E0E0E0",
    zIndex: 1,
  },

  textCol: { flex: 1, justifyContent: "center", paddingLeft: 4 },
  accordionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
  accordionDesc: { fontSize: 11, color: "#757575", marginBottom: 4 },
  accordionTotal: { fontSize: 11, color: "#757575" },

  rightCol: { flexDirection: "row", alignItems: "center", paddingLeft: 10 },
  countBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  countText: { color: "#0047D3", fontSize: 11, fontWeight: "bold" },

  expandedContent: { position: "relative", paddingBottom: 15 },
  expandedTimelineLine: {
    position: "absolute",
    left: 21,
    top: -10,
    bottom: -15,
    width: 2,
    backgroundColor: "#E0E0E0",
    zIndex: 1,
  },
  horizontalScroll: { paddingLeft: 50, paddingRight: 20 },

  miniCard: {
    backgroundColor: "#FFF",
    width: 150,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 12,
    marginTop: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  miniCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  miniCardTitle: { fontSize: 11, fontWeight: "bold", color: "#333", flex: 1 },
  miniCardType: { fontSize: 9, color: "#757575", marginBottom: 6 },
  miniCardNominal: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  miniCardRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  miniCardInfoText: { fontSize: 9, color: "#757575", marginLeft: 4 },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  priorityText: { fontSize: 9, fontWeight: "bold" },

  viewAllCard: {
    backgroundColor: "#FAFAFA",
    width: 100,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  viewAllCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  viewAllText: { fontSize: 11, color: "#757575", fontWeight: "500" },
});
