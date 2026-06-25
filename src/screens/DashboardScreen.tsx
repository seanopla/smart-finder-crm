import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SmallStatCard = ({
  title,
  value,
  sub,
  iconName,
  iconColor,
  bgIcon,
}: any) => (
  <View style={styles.smallCard}>
    <View style={[styles.cardIconWrapper, { backgroundColor: bgIcon }]}>
      <Ionicons name={iconName} size={16} color={iconColor} />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
    <Text style={styles.cardSub}>{sub}</Text>
  </View>
);

const WideStatCard = ({ title, value, cardBgColor, iconColor }: any) => (
  <View style={[styles.wideCard, { backgroundColor: cardBgColor }]}>
    <View style={styles.wideCardHeader}>
      <View style={[styles.cardIconWrapper, { backgroundColor: "#FFFFFF" }]}>
        <Ionicons name="clipboard-outline" size={18} color={iconColor} />
      </View>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const MenuItem = ({ title, iconName, color, bgColor, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIconWrapper, { backgroundColor: bgColor }]}>
      <Ionicons name={iconName} size={22} color={color} />
    </View>
    <Text style={styles.menuText} numberOfLines={2}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Biru */}
        <View style={styles.header}>
          <Text style={styles.headerGreeting}>Hello,</Text>
          <View style={styles.headerRow}>
            <Text style={styles.headerName}>Rizky Ridho</Text>
            <View style={styles.headerIcons}>
              <Ionicons
                name="pie-chart"
                size={24}
                color="#FFC107"
                style={{ marginRight: 15 }}
              />
              <View>
                <Ionicons name="notifications" size={24} color="#FFC107" />
                <View style={styles.notificationDot} />
              </View>
            </View>
          </View>
        </View>

        {/* Area Kartu Statistik (Overlapping) */}
        <View style={styles.statsContainer}>
          <View style={styles.row}>
            <SmallStatCard
              title="TOTAL LEAD"
              value="128"
              sub="Leads"
              iconName="people"
              iconColor="#673AB7"
              bgIcon="#EDE7F6"
            />
            <SmallStatCard
              title="FOLLOW UP"
              value="45"
              sub="Leads"
              iconName="locate"
              iconColor="#4CAF50"
              bgIcon="#E8F5E9"
            />
            <SmallStatCard
              title="KONVERSI"
              value="18"
              sub="Leads"
              iconName="star"
              iconColor="#FFC107"
              bgIcon="#FFF8E1"
            />
            <SmallStatCard
              title="TOTAL DEAL"
              value="Rp1.25B"
              sub="Plafond"
              iconName="bar-chart"
              iconColor="#2196F3"
              bgIcon="#E3F2FD"
            />
          </View>
          <View style={[styles.row, { marginTop: 12 }]}>
            <WideStatCard
              title="AMOUNT SUBMISSION"
              value="Rp500.000.000"
              cardBgColor="#F4F8FF"
              iconColor="#0047D3"
            />
            <WideStatCard
              title="TOTAL ONBOARDING"
              value="0"
              cardBgColor="#FFF9EE"
              iconColor="#FF9800"
            />
          </View>
        </View>

        {/* Sync Info */}
        <View style={styles.syncRow}>
          <Text style={styles.syncText}>
            Last synchronize:{" "}
            <Text style={{ color: "#9E9E9E" }}>20 Mei 2024 09:30</Text>
          </Text>
          <Ionicons name="refresh" size={20} color="#0047D3" />
        </View>

        {/* Menu Sections */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Lead Management</Text>
          <View style={styles.menuGrid}>
            <MenuItem
              title="Leads Baru"
              iconName="people"
              color="#2196F3"
              bgColor="#E3F2FD"
              onPress={() => navigation.navigate("LeadList")}
            />
            <MenuItem
              title="Pipeline"
              iconName="funnel"
              color="#9C27B0"
              bgColor="#F3E5F5"
              onPress={() => navigation.navigate("Pipeline")}
            />
            <MenuItem
              title="Follow Up"
              iconName="locate"
              color="#3F51B5"
              bgColor="#E8EAF6"
              onPress={() => navigation.navigate("FollowUpList")}
            />
            <MenuItem
              title="Leads Saya"
              iconName="briefcase"
              color="#673AB7"
              bgColor="#EDE7F6"
            />
          </View>

          <Text style={styles.sectionTitle}>Customer Profile</Text>
          <View style={styles.menuGrid}>
            <MenuItem
              title="Profil Nasabah"
              iconName="person"
              color="#4CAF50"
              bgColor="#E8F5E9"
            />
            <MenuItem
              title="Perusahaan"
              iconName="business"
              color="#03A9F4"
              bgColor="#E1F5FE"
            />
            <MenuItem
              title="Analisa Kredit"
              iconName="eye"
              color="#FF9800"
              bgColor="#FFF3E0"
            />
            <MenuItem
              title="Riwayat Kredit"
              iconName="receipt"
              color="#E91E63"
              bgColor="#FCE4EC"
            />
          </View>

          <Text style={styles.sectionTitle}>Customer Relation Management</Text>
          <View style={styles.menuGrid}>
            <MenuItem
              title="Relasi Saya"
              iconName="hand-right"
              color="#F44336"
              bgColor="#FFEBEE"
              onPress={() => navigation.navigate("RelationList")}
            />
            <MenuItem
              title="Aktivitas"
              iconName="calendar"
              color="#2196F3"
              bgColor="#E3F2FD"
              onPress={() => navigation.navigate("ActivityList")}
            />
            <MenuItem
              title="Komunikasi"
              iconName="chatbubble-ellipses"
              color="#4CAF50"
              bgColor="#E8F5E9"
            />
            <MenuItem
              title="Penawaran"
              iconName="gift"
              color="#9C27B0"
              bgColor="#F3E5F5"
              onPress={() => navigation.navigate("PenawaranList")}
            />
          </View>

          <Text style={styles.sectionTitle}>Appointment</Text>
          <View style={styles.menuGrid}>
            <MenuItem
              title="Journey Plan"
              iconName="map"
              color="#00BCD4"
              bgColor="#E0F7FA"
              onPress={() => navigation.navigate("JourneyList")}
            />
            <MenuItem
              title="Jadwal Visit"
              iconName="calendar-outline"
              color="#4CAF50"
              bgColor="#E8F5E9"
              onPress={() => navigation.navigate("JadwalVisit")}
            />
            <MenuItem
              title="Appointment Baru"
              iconName="person-add"
              color="#FF9800"
              bgColor="#FFF3E0"
            />
            <View style={styles.menuItem} />{" "}
            {/* Empty slot for grid alignment */}
          </View>

          <Text style={styles.sectionTitle}>Persetujuan Kredit</Text>
          <View style={styles.menuGrid}>
            <MenuItem
              title="Inbox"
              iconName="mail"
              color="#FF9800"
              bgColor="#FFF3E0"
            />
            <MenuItem
              title="Inprogress"
              iconName="sync-circle"
              color="#4CAF50"
              bgColor="#E8F5E9"
            />
            <MenuItem
              title="Arsip"
              iconName="archive"
              color="#E91E63"
              bgColor="#FCE4EC"
            />
            <MenuItem
              title="Draft"
              iconName="document-text"
              color="#9E9E9E"
              bgColor="#F5F5F5"
            />
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#0047D3",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 90,
  },
  headerGreeting: { color: "#E0E0E0", fontSize: 16, marginBottom: 4 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerName: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  notificationDot: {
    position: "absolute",
    right: 2,
    top: 0,
    width: 8,
    height: 8,
    backgroundColor: "#F44336",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#0047D3",
  },

  statsContainer: { paddingHorizontal: 16, marginTop: -70 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  smallCard: {
    backgroundColor: "#FFF",
    width: "23.5%",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 9,
    color: "#757575",
    fontWeight: "600",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  cardSub: { fontSize: 9, color: "#9E9E9E" },

  wideCard: {
    backgroundColor: "#FFF",
    width: "48.5%",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  wideCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  syncRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 0,
  },
  syncText: { fontSize: 12, color: "#333", fontWeight: "500" },

  menuContainer: { paddingHorizontal: 20, marginBottom: 100 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
    marginTop: 16,
  },
  menuGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  menuItem: { alignItems: "center", width: "23%", marginBottom: 12 },
  menuIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuText: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
});
