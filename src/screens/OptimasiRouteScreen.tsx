import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ROUTE_DATA = [
  {
    id: "1",
    title: "PT Maju Jaya",
    type: "Meeting",
    typeColor: "#1976D2",
    time: "09:00 - 10:00",
    address: "Jl. Sudirman No. 123\nJakarta Selatan",
    dist: "2,4 km",
    dur: "25 menit",
    color: "#1976D2",
  },
  {
    id: "2",
    title: "CV Sukses Mandiri",
    type: "Survey",
    typeColor: "#4CAF50",
    time: "10:30 - 11:30",
    address: "Jl. Gatot Subroto No. 45\nJakarta Selatan",
    dist: "3,1 km",
    dur: "20 menit",
    color: "#4CAF50",
  },
  {
    id: "3",
    title: "PT Sentosa Abadi",
    type: "Follow Up",
    typeColor: "#9C27B0",
    time: "12:00 - 13:00",
    address: "Jl. Kuningan Mulia No. 9\nJakarta Selatan",
    dist: "4,2 km",
    dur: "25 menit",
    color: "#FF9800",
  },
  {
    id: "4",
    title: "Koperasi Sejahtera",
    type: "Meeting",
    typeColor: "#1976D2",
    time: "14:00 - 15:00",
    address: "Jl. TB Simatupang No. 89\nJakarta Selatan",
    dist: "5,6 km",
    dur: "30 menit",
    color: "#E65100",
  },
  {
    id: "5",
    title: "UD Makmur Jaya",
    type: "Survey",
    typeColor: "#4CAF50",
    time: "15:30 - 16:15",
    address: "Jl. Raya Pasar Minggu No. 15\nJakarta Selatan",
    dist: "4,8 km",
    dur: "25 menit",
    color: "#673AB7",
  },
  {
    id: "6",
    title: "PT Berkah Abadi",
    type: "Meeting",
    typeColor: "#1976D2",
    time: "16:45 - 17:30",
    address: "Jl. Warung Buncit Raya No. 21\nJakarta Selatan",
    dist: "3,7 km",
    dur: "20 menit",
    color: "#1E88E5",
  },
];

export default function OptimasiRouteScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Optimasi Route</Text>
          <Text style={styles.headerSubtitle}>
            Rute terbaik untuk kunjungan Anda
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* TOP INFO CARD */}
      <View style={styles.topInfoCard}>
        <View style={styles.infoCol}>
          <View style={styles.infoIconBg}>
            <Ionicons name="location" size={16} color="#0047D3" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Lokasi Awal</Text>
            <Text style={styles.infoValue}>Kantor Cabang Jakarta</Text>
            <Text style={styles.infoSub}>Jl. Jenderal Sudirman No. 10</Text>
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoCol}>
          <View style={[styles.infoIconBg, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons name="flag" size={16} color="#4CAF50" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Estimasi Total</Text>
            <Text style={styles.infoValue}>5 Jam 45 Menit</Text>
            <Text style={styles.infoSub}>6 Kunjungan • 23,8 km</Text>
          </View>
        </View>
      </View>

      {/* SPLIT VIEW */}
      <View style={styles.splitContainer}>
        {/* KOLOM KIRI: DAFTAR RUTE */}
        <View style={styles.leftListPane}>
          <View style={styles.listHeaderRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="car-outline"
                size={16}
                color="#0047D3"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.listTitle}>Urutan Kunjungan (6)</Text>
            </View>
            <Ionicons name="menu" size={16} color="#9E9E9E" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {ROUTE_DATA.map((item) => (
              <View key={item.id} style={styles.routeItem}>
                <View style={styles.routeNumberCol}>
                  <View
                    style={[
                      styles.numberCircle,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <Text style={styles.numberText}>{item.id}</Text>
                  </View>
                  <View style={styles.routeDashedLine} />
                </View>

                <View style={styles.routeContentCol}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Text style={styles.routeCompany} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={[styles.routeType, { color: item.typeColor }]}>
                      {item.type}
                    </Text>
                  </View>
                  <Text style={styles.routeTime}>{item.time}</Text>
                  <Text style={styles.routeAddress}>{item.address}</Text>

                  <View style={styles.distanceBox}>
                    <Text style={styles.distanceText}>{item.dist}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons
                        name="car-outline"
                        size={10}
                        color="#9E9E9E"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.durationText}>{item.dur}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            <View style={[styles.routeItem, { marginBottom: 0 }]}>
              <View style={styles.routeNumberCol}>
                <View
                  style={[
                    styles.numberCircle,
                    { backgroundColor: "#4CAF50", borderRadius: 6 },
                  ]}
                >
                  <Ionicons name="flag" size={12} color="#FFF" />
                </View>
              </View>
              <View
                style={[
                  styles.routeContentCol,
                  { justifyContent: "center", paddingBottom: 0 },
                ]}
              >
                <Text style={styles.routeCompany}>Kembali ke Kantor</Text>
                <Text style={styles.routeAddress}>
                  Kantor Cabang Jakarta{"\n"}Jl. Jenderal Sudirman No. 10
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* KOLOM KANAN: MAP DENGAN RUTE BERBELOK (SNAKE PATH) */}
        <View style={styles.rightMapPane}>
          <View style={styles.dummyMapBackground}>
            {/* Ilustrasi Jalan Raya di Latar Belakang */}
            <View
              style={[
                styles.dummyRoad,
                {
                  width: "150%",
                  height: 12,
                  top: "25%",
                  transform: [{ rotate: "-15deg" }],
                },
              ]}
            />
            <View
              style={[
                styles.dummyRoad,
                {
                  width: "150%",
                  height: 8,
                  top: "65%",
                  transform: [{ rotate: "20deg" }],
                },
              ]}
            />
            <View
              style={[
                styles.dummyRoad,
                {
                  height: "150%",
                  width: 14,
                  left: "30%",
                  transform: [{ rotate: "5deg" }],
                },
              ]}
            />
            <View
              style={[
                styles.dummyRoad,
                {
                  width: "150%",
                  height: 6,
                  top: "85%",
                  transform: [{ rotate: "-5deg" }],
                },
              ]}
            />

            <TouchableOpacity style={styles.btnFullMap}>
              <Ionicons
                name="expand"
                size={12}
                color="#0047D3"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.btnFullMapText}>Peta Penuh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnUbahManual}>
              <Ionicons
                name="pencil"
                size={12}
                color="#0047D3"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.btnUbahManualText}>Ubah Rute</Text>
            </TouchableOpacity>

            {/* --- CONTAINER GARIS RUTE BERBELOK --- */}
            <View style={styles.snakeMapContainer}>
              <View style={styles.snakeLineWrapper}>
                <View style={styles.curveRightFull} />
                <View style={styles.curveLeftFull} />
                <View style={styles.curveRightOpenTop} />
                <View style={styles.curveLeftHalf} />
              </View>

              {/* TITIK-TITIK LOKASI (Dihitung matematis agar tepat di atas garis melengkung) */}

              {/* Node Start (Mulai) */}
              <View style={[styles.nodeWrapper, { top: "0%", left: "0%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: "#111", width: 10, height: 10 },
                  ]}
                />
              </View>

              {/* Node 1 */}
              <View
                style={[styles.nodeWrapper, { top: "14.2%", left: "100%" }]}
              >
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[0].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>1</Text>
                </View>
              </View>

              {/* Node 2 */}
              <View style={[styles.nodeWrapper, { top: "28.5%", left: "40%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[1].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>2</Text>
                </View>
              </View>

              {/* Node 3 */}
              <View style={[styles.nodeWrapper, { top: "42.8%", left: "0%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[2].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>3</Text>
                </View>
              </View>

              {/* Node 4 */}
              <View style={[styles.nodeWrapper, { top: "57.1%", left: "60%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[3].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>4</Text>
                </View>
              </View>

              {/* Node 5 */}
              <View
                style={[styles.nodeWrapper, { top: "71.4%", left: "100%" }]}
              >
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[4].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>5</Text>
                </View>
              </View>

              {/* Node 6 */}
              <View style={[styles.nodeWrapper, { top: "85.7%", left: "40%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    { backgroundColor: ROUTE_DATA[5].color },
                  ]}
                >
                  <Text style={styles.mapNodeText}>6</Text>
                </View>
              </View>

              {/* Node Finish (Kantor) */}
              <View style={[styles.nodeWrapper, { top: "100%", left: "0%" }]}>
                <View
                  style={[
                    styles.mapNode,
                    {
                      backgroundColor: "#4CAF50",
                      borderRadius: 4,
                      width: 14,
                      height: 14,
                    },
                  ]}
                >
                  <Ionicons name="flag" size={10} color="#FFF" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* BOTTOM ACTION BAR */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 16 },
        ]}
      >
        <View style={styles.warningBox}>
          <Ionicons
            name="information-circle-outline"
            size={14}
            color="#1976D2"
          />
          <Text style={styles.warningText}>
            Rute ini dioptimalkan berdasarkan jarak, waktu tempuh, dan kondisi
            lalu lintas terkini.
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabelRow}>
              <Ionicons name="map-outline" size={12} color="#757575" />
              <Text style={styles.summaryLabel}>Total Jarak</Text>
            </View>
            <Text style={styles.summaryVal}>23,8 km</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabelRow}>
              <Ionicons name="time-outline" size={12} color="#757575" />
              <Text style={styles.summaryLabel}>Total Waktu</Text>
            </View>
            <Text style={styles.summaryVal}>5 Jam 45 Menit</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabelRow}>
              <Ionicons name="briefcase-outline" size={12} color="#757575" />
              <Text style={styles.summaryLabel}>Kunjungan</Text>
            </View>
            <Text style={styles.summaryVal}>6</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabelRow}>
              <MaterialCommunityIcons
                name="gas-station"
                size={12}
                color="#757575"
              />
              <Text style={styles.summaryLabel}>Estimasi BBM</Text>
            </View>
            <Text style={styles.summaryVal}>Rp 28.000</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="navigate-outline"
            size={18}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnPrimaryText}>Gunakan Rute Ini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: { color: "#111", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#757575", fontSize: 11, marginTop: 2 },

  topInfoCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 1,
  },
  infoCol: { flex: 1, flexDirection: "row", alignItems: "center" },
  infoIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoLabel: { fontSize: 9, color: "#757575", marginBottom: 2 },
  infoValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  infoSub: { fontSize: 9, color: "#9E9E9E" },
  infoDivider: { width: 1, backgroundColor: "#EEEEEE", marginHorizontal: 10 },

  splitContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  leftListPane: {
    flex: 1.4,
    paddingLeft: 16,
    paddingTop: 16,
    borderRightWidth: 1,
    borderRightColor: "#EEEEEE",
  },
  listHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginBottom: 15,
  },
  listTitle: { fontSize: 12, fontWeight: "bold", color: "#111" },
  routeItem: { flexDirection: "row", marginBottom: 5 },
  routeNumberCol: { width: 30, alignItems: "center" },
  numberCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  numberText: { fontSize: 9, fontWeight: "bold", color: "#FFF" },
  routeDashedLine: {
    position: "absolute",
    top: 18,
    bottom: -5,
    width: 1,
    borderLeftWidth: 1,
    borderColor: "#BDBDBD",
    borderStyle: "dashed",
    zIndex: 1,
  },
  routeContentCol: { flex: 1, paddingBottom: 25, paddingRight: 10 },
  routeCompany: { fontSize: 12, fontWeight: "bold", color: "#111", flex: 1 },
  routeType: { fontSize: 9, fontWeight: "600", marginLeft: 6 },
  routeTime: { fontSize: 10, color: "#757575", marginVertical: 2 },
  routeAddress: { fontSize: 10, color: "#9E9E9E", lineHeight: 14 },
  distanceBox: {
    position: "absolute",
    right: 10,
    top: 25,
    alignItems: "flex-end",
  },
  distanceText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  durationText: { fontSize: 9, color: "#9E9E9E" },

  rightMapPane: { flex: 1, backgroundColor: "#E1EFDB" },
  dummyMapBackground: { flex: 1, position: "relative", overflow: "hidden" },
  dummyRoad: { position: "absolute", backgroundColor: "#FFFFFF", opacity: 0.6 },

  btnFullMap: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  btnFullMapText: { fontSize: 9, color: "#0047D3", fontWeight: "bold" },
  btnUbahManual: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  btnUbahManualText: { fontSize: 9, color: "#0047D3", fontWeight: "bold" },

  snakeMapContainer: {
    position: "absolute",
    top: "15%",
    bottom: "15%",
    left: "25%",
    right: "25%",
    zIndex: 2,
  },
  snakeLineWrapper: { ...StyleSheet.absoluteFillObject },

  curveRightFull: {
    flex: 1,
    borderColor: "#4285F4",
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  curveLeftFull: {
    flex: 1,
    borderColor: "#4285F4",
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 30,
    marginTop: -4,
  },

  curveRightOpenTop: {
    flex: 1,
    borderColor: "#4285F4",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 30,
    marginTop: -4,
  },

  curveLeftHalf: {
    flex: 0.5,
    borderColor: "#4285F4",
    borderLeftWidth: 4,
    marginTop: -4,
  },

  nodeWrapper: {
    position: "absolute",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1EFDB",
    zIndex: 3,
    marginLeft: -10,
    marginTop: -10,
    borderRadius: 10,
  },
  mapNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFF",
    elevation: 3,
  },
  mapNodeText: { fontSize: 9, fontWeight: "bold", color: "#FFF" },

  bottomContainer: {
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 16,
    paddingTop: 12,
    elevation: 15,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F4FF",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 9,
    color: "#1976D2",
    marginLeft: 6,
    flex: 1,
    lineHeight: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryItem: { flex: 1, alignItems: "flex-start" },
  summaryLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  summaryLabel: { fontSize: 9, color: "#757575", marginLeft: 4 },
  summaryVal: { fontSize: 10, fontWeight: "bold", color: "#111" },
  btnPrimary: {
    backgroundColor: "#0047D3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnPrimaryText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
});
