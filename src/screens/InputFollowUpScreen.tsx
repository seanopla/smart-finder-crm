import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FollowUpContext } from "../context/FollowUpContext";

export default function InputFollowUpScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { addFollowUp } = useContext(FollowUpContext);

  // States Form Utama
  const [metode, setMetode] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [durasi, setDurasi] = useState("");
  const [hasil, setHasil] = useState("");
  const [minat, setMinat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [rencana, setRencana] = useState("");
  const [isNextScheduled, setIsNextScheduled] = useState(true);
  const [tglBerikutnya, setTglBerikutnya] = useState("");
  const [waktuBerikutnya, setWaktuBerikutnya] = useState("");

  // States Modal (Bottom Sheet Custom)
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [onSelectOption, setOnSelectOption] = useState<(val: string) => void>(
    () => {},
  );

  // Fungsi Pembuka Modal
  const openModal = (
    title: string,
    options: string[],
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setModalTitle(title);
    setModalOptions(options);
    setOnSelectOption(() => (val: string) => {
      setter(val);
      setModalVisible(false);
    });
    setModalVisible(true);
  };

  const handleSimpan = () => {
    if (!metode || !tanggal || !hasil) {
      alert("Mohon isi field yang wajib (Metode, Tanggal, Hasil)");
      return;
    }
    // Set icon & color dinamis berdasarkan metode
    let mIcon = "call-outline";
    let mColor = "#1976D2";
    let mBg = "#E3F2FD";
    if (metode === "WhatsApp") {
      mIcon = "logo-whatsapp";
      mColor = "#4CAF50";
      mBg = "#E8F5E9";
    }
    if (metode === "Meeting" || metode === "Visit") {
      mIcon = "people-outline";
      mColor = "#9C27B0";
      mBg = "#F3E5F5";
    }

    addFollowUp({
      company: "PT Maju Jaya",
      type: "Modal Kerja",
      plafond: "Rp 500.000.000",
      status: "Follow Up Selesai",
      date: tanggal,
      pic: "Rizky Pratama",
      time: waktu || "12:00",
      method: metode,
      methodIcon: mIcon,
      methodColor: mColor,
      methodBg: mBg,
      priority: minat || "Sedang",
      category: "Selesai",
    });
    navigation.goBack();
  };

  // Komponen Input Klik (Triggers Modal)
  const SelectInput = ({
    label,
    icon,
    placeholder,
    value,
    onPress,
    required = false,
  }: any) => (
    <View style={styles.inputWrap}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={styles.inputBox}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color="#0047D3"
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          style={[
            styles.inputText,
            { flex: 1, color: value ? "#333" : "#9E9E9E" },
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#757575" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.blueHeader, { paddingTop: insets.top + 15 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="close" size={28} color="#FFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Input Follow Up</Text>
            <Text style={styles.headerSubtitle}>
              Catat hasil follow up dan rencana tindak lanjut
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >
          <View style={styles.infoCard}>
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
              <View style={styles.infoIconBg}>
                <Ionicons name="call-outline" size={20} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.infoTitle}>PT Maju Jaya</Text>
                <Text style={styles.infoDesc}>
                  Modal Kerja • Rp 500.000.000
                </Text>
                <View style={styles.infoBadge}>
                  <Text style={styles.infoBadgeText}>Survey</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="calendar-outline" size={12} color="#9E9E9E" />
              <Text style={styles.infoFooterText}>20 Mei 2026</Text>
              <Ionicons
                name="person-outline"
                size={12}
                color="#9E9E9E"
                style={{ marginLeft: 15 }}
              />
              <Text style={styles.infoFooterText}>Rizky Pratama</Text>
            </View>
          </View>

          {/* Form Real Interaktif */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <SelectInput
                label="Metode Followup"
                required
                icon="call-outline"
                placeholder="Pilih Metode"
                value={metode}
                onPress={() =>
                  openModal(
                    "Pilih Metode",
                    ["Telepon", "WhatsApp", "Meeting", "Visit"],
                    setMetode,
                  )
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectInput
                label="Tanggal Followup"
                required
                icon="calendar-outline"
                placeholder="Pilih Tanggal"
                value={tanggal}
                onPress={() =>
                  openModal(
                    "Pilih Tanggal",
                    ["20 Mei 2026", "21 Mei 2026", "22 Mei 2026"],
                    setTanggal,
                  )
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <SelectInput
                label="Waktu Followup"
                icon="time-outline"
                placeholder="Pilih Waktu"
                value={waktu}
                onPress={() =>
                  openModal(
                    "Pilih Waktu",
                    ["09:00", "10:00", "13:00", "15:00"],
                    setWaktu,
                  )
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.inputWrap}>
                <Text style={styles.label}>Durasi (menit)</Text>
                <View style={styles.inputBox}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#0047D3"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    placeholder="15"
                    keyboardType="numeric"
                    value={durasi}
                    onChangeText={setDurasi}
                  />
                </View>
              </View>
            </View>
          </View>

          <SelectInput
            label="Hasil Followup"
            required
            placeholder="Pilih Hasil"
            value={hasil}
            onPress={() =>
              openModal(
                "Pilih Hasil",
                [
                  "Tertarik, minta penawaran detail",
                  "Sedang dipikirkan",
                  "Tidak tertarik",
                  "Tidak bisa dihubungi",
                ],
                setHasil,
              )
            }
          />
          <SelectInput
            label="Minat Nasabah"
            placeholder="Pilih Minat"
            value={minat}
            onPress={() =>
              openModal(
                "Pilih Minat Nasabah",
                ["Tinggi", "Sedang", "Rendah"],
                setMinat,
              )
            }
          />

          <View style={styles.inputWrap}>
            <Text style={styles.label}>
              Catatan Followup <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={3}
              placeholder="Ketik catatan detail..."
              value={catatan}
              onChangeText={setCatatan}
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.label}>
              Rencana Tindak Lanjut <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={3}
              placeholder="Ketik rencana selanjutnya..."
              value={rencana}
              onChangeText={setRencana}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={[styles.label, { marginBottom: 0 }]}>
              Jadwalkan Followup Berikutnya
            </Text>
            <Switch
              trackColor={{ false: "#E0E0E0", true: "#E3F2FD" }}
              thumbColor={isNextScheduled ? "#0047D3" : "#f4f3f4"}
              onValueChange={() => setIsNextScheduled(!isNextScheduled)}
              value={isNextScheduled}
            />
          </View>

          {isNextScheduled && (
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <SelectInput
                  icon="calendar-outline"
                  placeholder="Tanggal"
                  value={tglBerikutnya}
                  onPress={() =>
                    openModal(
                      "Tanggal Berikutnya",
                      ["22 Mei 2026", "23 Mei 2026", "24 Mei 2026"],
                      setTglBerikutnya,
                    )
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <SelectInput
                  icon="time-outline"
                  placeholder="Waktu"
                  value={waktuBerikutnya}
                  onPress={() =>
                    openModal(
                      "Waktu Berikutnya",
                      ["09:00", "11:00", "14:00"],
                      setWaktuBerikutnya,
                    )
                  }
                />
              </View>
            </View>
          )}
          <SelectInput
            label="Pengingat"
            icon="notifications-outline"
            value="1 jam sebelum waktu followup"
            onPress={() =>
              openModal(
                "Waktu Berikutnya",
                [
                  "1 jam sebelum waktu followup",
                  "2 jam sebelum waktu followup",
                  "3 jam sebelum waktu followup",
                ],
                setWaktuBerikutnya,
              )
            }
          />
        </ScrollView>
      </View>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.btnBatal}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnBatalText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSimpan} onPress={handleSimpan}>
          <Ionicons
            name="save-outline"
            size={18}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnSimpanText}>Simpan Hasil</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent={true}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            {modalOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalOptionBtn}
                onPress={() => onSelectOption(opt)}
              >
                <Text style={styles.modalOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0047D3" },
  blueHeader: {
    backgroundColor: "#0047D3",
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#E3F2FD", fontSize: 11, marginTop: 2 },

  formContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  infoCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  infoDesc: { fontSize: 12, color: "#757575", marginBottom: 6 },
  infoBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  infoBadgeText: { fontSize: 10, fontWeight: "bold", color: "#4CAF50" },
  infoFooterText: { fontSize: 11, color: "#9E9E9E", marginLeft: 6 },

  row: { flexDirection: "row" },
  inputWrap: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: "bold", color: "#111", marginBottom: 8 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFF",
  },
  inputText: { fontSize: 13, padding: 0 },

  textArea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
    fontSize: 13,
    textAlignVertical: "top",
    height: 80,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 10,
  },
  btnBatal: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0047D3",
    alignItems: "center",
    marginRight: 8,
  },
  btnBatalText: { color: "#0047D3", fontWeight: "bold", fontSize: 14 },
  btnSimpan: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0047D3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  btnSimpanText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },

  // Styles untuk Modal Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOptionBtn: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  modalOptionText: { fontSize: 14, color: "#333", textAlign: "center" },
  modalCancelBtn: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  modalCancelText: {
    fontSize: 14,
    color: "#F44336",
    textAlign: "center",
    fontWeight: "bold",
  },
});
