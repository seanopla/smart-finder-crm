import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityContext } from "../context/ActivityContext";

const SelectInput = ({
  label,
  placeholder,
  value,
  onPress,
  required,
  icon,
  rightIcon = "chevron-down",
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
          color="#9E9E9E"
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
      <Ionicons name={rightIcon} size={16} color="#757575" />
    </TouchableOpacity>
  </View>
);

const TextAreaInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  maxLength,
}: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <TextInput
      style={styles.textArea}
      multiline
      placeholder={placeholder}
      placeholderTextColor="#9E9E9E"
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
    />
    <Text style={styles.charCount}>
      {value.length}/{maxLength}
    </Text>
  </View>
);

export default function AddActivityScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { addActivity } = useContext(ActivityContext);

  // States Form Utama
  const [jenisAktivitas, setJenisAktivitas] = useState("Telepon");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [durasi, setDurasi] = useState("");
  const [status, setStatus] = useState("");

  const [terkait, setTerkait] = useState("");
  const [pic, setPic] = useState("");
  const [perusahaan, setPerusahaan] = useState("");

  const [tujuan, setTujuan] = useState("");
  const [catatan, setCatatan] = useState("");
  const [nextAction, setNextAction] = useState("");

  // States Modal Bottom Sheet
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [onSelectOption, setOnSelectOption] = useState<(val: string) => void>(
    () => {},
  );

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
    if (!tanggal || !tujuan) {
      alert("Mohon isi minimal Tanggal dan Tujuan/Agenda!");
      return;
    }

    // Menentukan icon dan warna berdasarkan jenis aktivitas
    let mIcon = "call";
    let mColor = "#1976D2";
    let mBg = "#E3F2FD";
    if (jenisAktivitas === "Meeting") {
      mIcon = "calendar";
      mColor = "#1976D2";
      mBg = "#E3F2FD";
    }
    if (jenisAktivitas === "Visit") {
      mIcon = "location";
      mColor = "#4CAF50";
      mBg = "#E8F5E9";
    }
    if (jenisAktivitas === "Follow Up") {
      mIcon = "document-text";
      mColor = "#FF9800";
      mBg = "#FFF3E0";
    }
    if (jenisAktivitas === "Reminder") {
      mIcon = "time";
      mColor = "#F44336";
      mBg = "#FFEBEE";
    }

    // Simpan ke Context
    addActivity({
      time: waktu || "09:00",
      type: jenisAktivitas,
      desc: tujuan,
      pic: pic || "Tanpa Nama",
      company: perusahaan || "Perusahaan Umum",
      date: tanggal ? tanggal.split(" ")[0] : "20",
      status: (status as any) || "Mendatang",
      icon: mIcon,
      iconColor: mColor,
      iconBg: mBg,
    });

    navigation.goBack();
  };

  // Render Tombol Jenis Aktivitas
  const ActivityTypeBtn = ({
    title,
    iconName,
  }: {
    title: string;
    iconName: any;
  }) => {
    const isActive = jenisAktivitas === title;
    return (
      <TouchableOpacity
        style={[styles.typeBtn, isActive && styles.typeBtnActive]}
        onPress={() => setJenisAktivitas(title)}
      >
        <Ionicons
          name={iconName}
          size={22}
          color={isActive ? "#0047D3" : "#757575"}
          style={{ marginBottom: 4 }}
        />
        <Text style={[styles.typeText, isActive && styles.typeTextActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Tambah Aktivitas</Text>
          <Text style={styles.headerSubtitle}>
            Lengkapi Informasi aktivitas
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* KARTU 1: Informasi Aktivitas */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Aktivitas</Text>

          <Text style={styles.label}>
            Jenis Aktivitas <Text style={{ color: "red" }}>*</Text>
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}
          >
            <ActivityTypeBtn title="Telepon" iconName="call-outline" />
            <ActivityTypeBtn title="Meeting" iconName="calendar-outline" />
            <ActivityTypeBtn title="Visit" iconName="location-outline" />
            <ActivityTypeBtn
              title="Follow Up"
              iconName="document-text-outline"
            />
            <ActivityTypeBtn
              title="Reminder"
              iconName="notifications-outline"
            />
          </ScrollView>

          <View style={styles.rowTop}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <SelectInput
                label="Tanggal & Waktu"
                required
                icon="calendar-outline"
                placeholder="20 Mei 2024"
                value={tanggal}
                onPress={() =>
                  openModal(
                    "Pilih Tanggal",
                    ["20 Mei 2024", "21 Mei 2024", "22 Mei 2024"],
                    setTanggal,
                  )
                }
              />
            </View>
            <View style={{ flex: 1, marginTop: 24 }}>
              <SelectInput
                icon="time-outline"
                placeholder="09:30"
                value={waktu}
                onPress={() =>
                  openModal(
                    "Pilih Waktu",
                    ["09:30", "10:00", "13:00", "15:00"],
                    setWaktu,
                  )
                }
              />
            </View>
          </View>

          <SelectInput
            label="Durasi"
            icon="time-outline"
            placeholder="30 menit"
            value={durasi}
            onPress={() =>
              openModal(
                "Pilih Durasi",
                ["15 menit", "30 menit", "1 jam", "2 jam"],
                setDurasi,
              )
            }
          />
          <SelectInput
            label="Status"
            required
            placeholder="Pilih status"
            value={status}
            onPress={() =>
              openModal(
                "Pilih Status",
                ["Hari Ini", "Mendatang", "Selesai"],
                setStatus,
              )
            }
          />
        </View>

        {/* KARTU 2: Informasi Terkait */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Terkait</Text>
          <SelectInput
            label="Terkait Dengan"
            required
            icon="search"
            placeholder="Cari relasi, nasabah, atau perusahaan"
            value={terkait}
            onPress={() =>
              openModal(
                "Terkait Dengan",
                ["PT Maju Jaya", "CV Sukses Mandiri", "PT Cipta Karya"],
                setTerkait,
              )
            }
          />
          <SelectInput
            label="PIC / Kontak"
            placeholder="Pilih PIC atau kontak"
            value={pic}
            onPress={() =>
              openModal(
                "PIC / Kontak",
                ["Rizky Pratama", "Dewi Anggraini", "Budi Santoso"],
                setPic,
              )
            }
          />
          <SelectInput
            label="Perusahaan"
            placeholder="Pilih perusahaan"
            value={perusahaan}
            onPress={() =>
              openModal(
                "Perusahaan",
                ["PT Maju Jaya", "CV Sukses Mandiri"],
                setPerusahaan,
              )
            }
          />
        </View>

        {/* KARTU 3: Detail Aktivitas */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detail Aktivitas</Text>
          <TextAreaInput
            label="Tujuan / Agenda"
            required
            placeholder="Tuliskan tujuan atau agenda aktivitas"
            value={tujuan}
            onChangeText={setTujuan}
            maxLength={200}
          />
          <TextAreaInput
            label="Catatan Hasil"
            placeholder="Tuliskan catatan hasil aktivitas"
            value={catatan}
            onChangeText={setCatatan}
            maxLength={500}
          />
          <TextAreaInput
            label="Next Action / Tindak Lanjut"
            placeholder="Tuliskan tindak lanjut berikutnya (opsional)"
            value={nextAction}
            onChangeText={setNextAction}
            maxLength={200}
          />

          <Text style={styles.label}>Lampiran (Opsional)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="attach" size={20} color="#0047D3" />
            <Text style={styles.uploadTitle}>Tambah Lampiran</Text>
            <Text style={styles.uploadSub}>
              Maks. 5 file, ukuran maks. 10MB per file
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTTOM BAR BUTTONS */}
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
          <Text style={styles.btnSimpanText}>Simpan</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL UNTUK SELECT INPUT */}
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
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
  },
  headerTitle: { color: "#111", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#757575", fontSize: 12, marginTop: 2 },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },

  // Kotak Jenis Aktivitas
  typeRow: { flexDirection: "row", paddingBottom: 16, gap: 10 },
  typeBtn: {
    width: 75,
    height: 75,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  typeBtnActive: { borderColor: "#0047D3", backgroundColor: "#F0F4FF" },
  typeText: { fontSize: 10, color: "#757575", fontWeight: "500", marginTop: 4 },
  typeTextActive: { color: "#0047D3", fontWeight: "bold" },

  rowTop: { flexDirection: "row", alignItems: "flex-start" },

  inputWrap: { marginBottom: 16 },
  label: { fontSize: 11, fontWeight: "600", color: "#333", marginBottom: 8 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  inputText: { fontSize: 12, padding: 0 },

  textArea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
    fontSize: 12,
    textAlignVertical: "top",
    height: 80,
  },
  charCount: {
    textAlign: "right",
    fontSize: 10,
    color: "#9E9E9E",
    marginTop: 4,
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0047D3",
    marginTop: 8,
  },
  uploadSub: { fontSize: 9, color: "#9E9E9E", marginTop: 4 },

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
