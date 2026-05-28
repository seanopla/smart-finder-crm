import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

// --- KOMPONEN KUSTOM: TEXT AREA DENGAN COUNTER ---
const TextAreaInput = ({ label, value, onChangeText, maxLength }: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.sectionTitle}>{label}</Text>
    <View style={styles.textAreaContainer}>
      <TextInput
        style={styles.textArea}
        multiline
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
      <Text style={styles.charCount}>
        {value.length}/{maxLength}
      </Text>
    </View>
  </View>
);

// --- KOMPONEN KUSTOM: CHECKBOX ---
const CustomCheckbox = ({ label, isChecked, onPress }: any) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}
    </View>
    <Text
      style={[
        styles.checkboxLabel,
        isChecked && { color: "#0047D3", fontWeight: "bold" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function IsiKunjunganScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  // State Text Area (Pre-filled sesuai gambar mockup)
  const [ringkasan, setRingkasan] = useState(
    "Melakukan meeting dengan Bapak Andi selaku Direktur Keuangan. Pembahasan terkait kebutuhan tambahan modal kerja untuk pembelian bahan baku.",
  );
  const [tindakLanjut, setTindakLanjut] = useState(
    "Nasabah akan melengkapi dokumen laporan keuangan 2 tahun terakhir dan proyeksi arus kas. Dokumen akan dikirim maksimal 27 Mei 2024.",
  );
  const [komitmen, setKomitmen] = useState(
    "Mengirimkan dokumen ke email RM paling lambat 27 Mei 2024.",
  );

  // State Checkboxes (Multi-select)
  const [topik, setTopik] = useState<string[]>([
    "Pembahasan Kredit",
    "Review Limit",
  ]);

  const toggleTopik = (t: string) => {
    if (topik.includes(t)) {
      setTopik(topik.filter((item) => item !== t));
    } else {
      setTopik([...topik, t]);
    }
  };

  const TOPIK_LIST = [
    "Follow Up",
    "Pembahasan Kredit",
    "Review Limit",
    "Pengambilan Dokumen",
    "Penagihan",
    "Lainnya",
  ];

  // State Lampiran
  const [lampiran, setLampiran] = useState<any[]>([
    { id: "1", type: "image_dummy", uri: "https://via.placeholder.com/150" }, // Dummy foto
    { id: "2", type: "doc", name: "Dokumen Pendukung.pdf", size: "1.2 MB" }, // Dummy PDF
  ]);

  const handleAddLampiran = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Maaf, butuh izin galeri untuk menambah lampiran!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setLampiran([
        ...lampiran,
        { id: Date.now().toString(), type: "image", uri: result.assets[0].uri },
      ]);
    }
  };

  const removeLampiran = (id: string) => {
    setLampiran(lampiran.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* HEADER KHUSUS */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 15 }}
        >
          <Ionicons name="chevron-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Isi Kunjungan</Text>
          <Text style={styles.headerSubtitle}>PT Maju Jaya</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* KARTU INFO NASABAH */}
        <View style={styles.infoCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.iconCompanyBg}>
              <Ionicons name="business" size={20} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Text style={styles.companyTitle}>PT Maju Jaya</Text>
                <View style={styles.badgeMeeting}>
                  <Text style={styles.badgeMeetingText}>Meeting</Text>
                </View>
              </View>
              <Text style={styles.productText}>Kredit Modal Kerja</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Ionicons name="location-outline" size={12} color="#9E9E9E" />
                <Text style={styles.detailText}>
                  Jl. Sudirman No. 123, Jakarta Selatan
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Ionicons name="person-outline" size={12} color="#9E9E9E" />
                <Text style={styles.detailText}>Rizky Pratama (RM)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
          </View>
        </View>

        {/* KARTU STATUS GRID */}
        <View style={styles.statusGridCard}>
          <View style={styles.statusGridItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="#0047D3"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.statusGridLabel}>Selasa, 21 Mei 2024</Text>
            <Text style={styles.statusGridVal}>08:30 - 09:30</Text>
          </View>
          <View style={styles.statusGridDivider} />
          <View style={styles.statusGridItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#0047D3"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.statusGridLabel}>Status Kunjungan</Text>
            <Text style={[styles.statusGridVal, { color: "#4CAF50" }]}>
              Selesai
            </Text>
          </View>
          <View style={styles.statusGridDivider} />
          <View style={styles.statusGridItem}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#0047D3"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.statusGridLabel}>Check-in</Text>
            <Text style={styles.statusGridVal}>08:32 WIB</Text>
          </View>
          <View style={styles.statusGridDivider} />
          <View style={styles.statusGridItem}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#0047D3"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.statusGridLabel}>Check-out</Text>
            <Text style={styles.statusGridVal}>09:25 WIB</Text>
          </View>
        </View>

        {/* FORM 1: RINGKASAN */}
        <TextAreaInput
          label="1. Ringkasan Hasil Kunjungan"
          value={ringkasan}
          onChangeText={setRingkasan}
          maxLength={500}
        />

        {/* FORM 2: TOPIK CHECKBOX */}
        <View style={styles.inputWrap}>
          <Text style={styles.sectionTitle}>
            2. Topik yang Dibahas{" "}
            <Text
              style={{ fontSize: 10, color: "#9E9E9E", fontWeight: "normal" }}
            >
              (Pilih salah satu atau lebih)
            </Text>
          </Text>
          <View style={styles.checkboxWrapper}>
            {TOPIK_LIST.map((t, idx) => (
              <CustomCheckbox
                key={idx}
                label={t}
                isChecked={topik.includes(t)}
                onPress={() => toggleTopik(t)}
              />
            ))}
          </View>
        </View>

        {/* FORM 3 & 4: HASIL & KOMITMEN */}
        <TextAreaInput
          label="3. Hasil / Tindak Lanjut"
          value={tindakLanjut}
          onChangeText={setTindakLanjut}
          maxLength={500}
        />
        <TextAreaInput
          label="4. Komitmen Nasabah"
          value={komitmen}
          onChangeText={setKomitmen}
          maxLength={500}
        />

        {/* FORM 5: LAMPIRAN */}
        <View style={styles.inputWrap}>
          <Text style={styles.sectionTitle}>
            5. Lampiran{" "}
            <Text
              style={{ fontSize: 10, color: "#9E9E9E", fontWeight: "normal" }}
            >
              (Foto / Dokumen)
            </Text>
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingVertical: 5 }}
          >
            {/* List Lampiran */}
            {lampiran.map((item) => (
              <View key={item.id} style={styles.attachmentCard}>
                <TouchableOpacity
                  style={styles.removeAttBtn}
                  onPress={() => removeLampiran(item.id)}
                >
                  <Ionicons name="close" size={12} color="#757575" />
                </TouchableOpacity>

                {item.type === "image" || item.type === "image_dummy" ? (
                  <View style={styles.imgAttBox}>
                    <Ionicons name="image-outline" size={24} color="#9E9E9E" />
                    {item.type === "image" && (
                      <Image
                        source={{ uri: item.uri }}
                        style={StyleSheet.absoluteFillObject}
                        borderRadius={8}
                      />
                    )}
                  </View>
                ) : (
                  <View style={styles.docAttBox}>
                    <View style={styles.docIconBg}>
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 8,
                          fontWeight: "bold",
                        }}
                      >
                        PDF
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.docAttName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.docAttSize}>{item.size}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}

            {/* Tombol Tambah Lampiran */}
            <TouchableOpacity
              style={styles.btnAddLampiran}
              onPress={handleAddLampiran}
            >
              <Ionicons name="add" size={20} color="#0047D3" />
              <Text style={styles.btnAddLampiranText}>Tambah Lampiran</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* FORM 6: LOKASI KUNJUNGAN */}
        <View style={styles.inputWrap}>
          <Text style={styles.sectionTitle}>6. Lokasi Kunjungan</Text>
          <View style={styles.locationCard}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                name="location"
                size={16}
                color="#0047D3"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.locAddress}>
                Jl. Sudirman No. 123, Jakarta Selatan
              </Text>
              <View style={styles.badgeSesuai}>
                <Text style={styles.badgeSesuaiText}>Sesuai Lokasi</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <View>
                <Text style={styles.locTime}>
                  Check-in: <Text style={{ color: "#111" }}>08:32 WIB</Text>
                </Text>
                <Text style={styles.locTime}>
                  Check-out: <Text style={{ color: "#111" }}>09:25 WIB</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.btnMap}>
                <Ionicons
                  name="map-outline"
                  size={14}
                  color="#0047D3"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.btnMapText}>Lihat Lokasi di Maps</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM SIMPAN BUTTON */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.btnSimpan}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnSimpanText}>Simpan Kunjungan</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: { color: "#111", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#757575", fontSize: 12, marginTop: 2 },

  infoCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 1,
    marginBottom: 12,
  },
  iconCompanyBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#0047D3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  companyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginRight: 8,
  },
  badgeMeeting: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeMeetingText: { color: "#1976D2", fontSize: 9, fontWeight: "bold" },
  productText: { fontSize: 11, color: "#333", marginBottom: 6 },
  detailText: { fontSize: 10, color: "#757575", marginLeft: 6 },

  statusGridCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 1,
    marginBottom: 20,
  },
  statusGridItem: { flex: 1, alignItems: "center" },
  statusGridLabel: {
    fontSize: 8,
    color: "#757575",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  statusGridVal: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  statusGridDivider: {
    width: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 5,
  },

  inputWrap: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
  },

  textAreaContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
  },
  textArea: {
    fontSize: 12,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 80,
  },
  charCount: {
    textAlign: "right",
    fontSize: 9,
    color: "#9E9E9E",
    marginTop: 8,
  },

  // Checkbox Styles
  checkboxWrapper: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: { backgroundColor: "#0047D3", borderColor: "#0047D3" },
  checkboxLabel: { fontSize: 11, color: "#757575" },

  // Attachment Styles
  attachmentCard: {
    width: 120,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  removeAttBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  imgAttBox: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  docAttBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingRight: 20,
  },
  docIconBg: {
    width: 24,
    height: 28,
    backgroundColor: "#F44336",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  docAttName: {
    fontSize: 9,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 2,
  },
  docAttSize: { fontSize: 8, color: "#9E9E9E" },

  btnAddLampiran: {
    width: 100,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0047D3",
    borderStyle: "dashed",
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddLampiranText: {
    fontSize: 10,
    color: "#0047D3",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  // Location Box Styles
  locationCard: {
    backgroundColor: "#F4F8FF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D6E4FF",
  },
  locAddress: { fontSize: 11, color: "#333", flex: 1 },
  badgeSesuai: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeSesuaiText: { color: "#4CAF50", fontSize: 9, fontWeight: "bold" },
  locTime: { fontSize: 10, color: "#757575", marginBottom: 4 },
  btnMap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D6E4FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnMapText: { fontSize: 10, fontWeight: "bold", color: "#0047D3" },

  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
  },
  btnSimpan: {
    backgroundColor: "#0047D3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnSimpanText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
