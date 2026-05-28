import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { JourneyContext } from "../context/JourneyContext";

// --- KOMPONEN INPUT REUSABLE ---
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
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <TouchableOpacity
      style={styles.inputBox}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color="#757575"
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

// Komponen Input Khusus untuk Lokasi dengan tombol "Pilih di Peta"
const LocationInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
}: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <View style={[styles.inputBox, { paddingRight: 8 }]}>
      <Ionicons
        name="location-outline"
        size={18}
        color="#757575"
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={[styles.inputText, { flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        style={{
          paddingLeft: 8,
          borderLeftWidth: 1,
          borderLeftColor: "#EEEEEE",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#0047D3",
            marginLeft: 4,
          }}
        >
          Pilih di Peta
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function AddJourneyScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { addJourney } = useContext(JourneyContext);

  // States Form
  const [nasabah, setNasabah] = useState("");
  const [produk, setProduk] = useState("");

  const [durasi, setDurasi] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [agenda, setAgenda] = useState("");
  const [lokasi, setLokasi] = useState("");

  const [rm, setRm] = useState("Rizky Pratama"); // Default seperti di gambar
  const [metode, setMetode] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [catatan, setCatatan] = useState("");

  // States Date & Time Picker
  const [tanggal, setTanggal] = useState(new Date());
  const [waktu, setWaktu] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // States Modal Dropdown Select
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

  // Format Date & Time
  const formatDate = (date: Date) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    return `${hours}:${minutes}`;
  };

  const handleSimpan = () => {
    if (!nasabah || !lokasi || !tujuan) {
      alert(
        "Mohon lengkapi data esensial seperti Nasabah, Lokasi, dan Tujuan Kunjungan.",
      );
      return;
    }

    addJourney({
      time: formatTime(waktu),
      company: nasabah,
      product: produk || "-",
      address: lokasi,
      pic: `${rm} (RM)`,
      type: tujuan || "Meeting",
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* HEADER PUTIH */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Tambah Kunjungan</Text>
          <Text style={styles.headerSubtitle}>Buat jadwal kunjungan baru</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* KARTU 1: Informasi Nasabah */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="business"
              size={16}
              color="#0047D3"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sectionTitle}>Informasi Nasabah</Text>
          </View>

          <SelectInput
            label="Nasabah"
            required
            placeholder="Pilih atau cari nasabah"
            value={nasabah}
            onPress={() =>
              openModal(
                "Pilih Nasabah",
                ["PT Maju Jaya", "CV Sukses Mandiri", "Koperasi Sejahtera"],
                setNasabah,
              )
            }
            rightIcon="search"
          />
          <SelectInput
            label="Produk / Kebutuhan"
            placeholder="Pilih produk atau kebutuhan"
            value={produk}
            onPress={() =>
              openModal(
                "Produk",
                [
                  "Kredit Modal Kerja",
                  "Kredit Investasi",
                  "Pembukaan Rekening",
                ],
                setProduk,
              )
            }
          />
        </View>

        {/* KARTU 2: Informasi Jadwal */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="calendar"
              size={16}
              color="#0047D3"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sectionTitle}>Informasi Jadwal</Text>
          </View>

          <View style={styles.rowTop}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <SelectInput
                label="Tanggal Kunjungan"
                required
                icon="calendar-outline"
                value={formatDate(tanggal)}
                onPress={() => setShowDatePicker(true)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectInput
                label="Waktu"
                required
                icon="time-outline"
                value={formatTime(waktu)}
                onPress={() => setShowTimePicker(true)}
              />
            </View>
          </View>

          <SelectInput
            label="Estimasi Durasi"
            icon="time-outline"
            placeholder="Pilih durasi"
            value={durasi}
            onPress={() =>
              openModal(
                "Estimasi Durasi",
                ["30 Menit", "1 Jam", "2 Jam"],
                setDurasi,
              )
            }
          />
        </View>

        {/* KARTU 3: Detail Kunjungan */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="flag"
              size={16}
              color="#0047D3"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sectionTitle}>Detail Kunjungan</Text>
          </View>

          <SelectInput
            label="Tujuan Kunjungan"
            required
            placeholder="Pilih tujuan kunjungan"
            value={tujuan}
            onPress={() =>
              openModal("Tujuan", ["Meeting", "Survey", "Follow Up"], setTujuan)
            }
          />
          <TextAreaInput
            label="Agenda / Topik"
            placeholder="Tulis agenda atau topik yang akan dibahas"
            value={agenda}
            onChangeText={setAgenda}
            maxLength={200}
          />
          <LocationInput
            label="Lokasi Kunjungan"
            required
            placeholder="Masukkan alamat lokasi kunjungan"
            value={lokasi}
            onChangeText={setLokasi}
          />
        </View>

        {/* KARTU 4: Penanggung Jawab */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="person"
              size={16}
              color="#0047D3"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sectionTitle}>Penanggung Jawab</Text>
          </View>

          <SelectInput
            label="Relationship Manager (RM)"
            required
            icon="person-outline"
            placeholder="Pilih RM"
            value={rm}
            onPress={() =>
              openModal(
                "Relationship Manager",
                ["Rizky Pratama", "Budi Santoso", "Dewi Anggraini"],
                setRm,
              )
            }
          />

          <View style={styles.rowTop}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <SelectInput
                label="Metode Kunjungan"
                icon="car-outline"
                placeholder="Pilih metode"
                value={metode}
                onPress={() =>
                  openModal(
                    "Metode",
                    ["Kendaraan Pribadi", "Kendaraan Umum"],
                    setMetode,
                  )
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectInput
                label="Prioritas"
                icon="flag-outline"
                placeholder="Pilih prioritas"
                value={prioritas}
                onPress={() =>
                  openModal(
                    "Prioritas",
                    ["Tinggi", "Sedang", "Rendah"],
                    setPrioritas,
                  )
                }
              />
            </View>
          </View>

          <TextAreaInput
            label="Catatan (Opsional)"
            placeholder="Tambahkan catatan tambahan jika diperlukan"
            value={catatan}
            onChangeText={setCatatan}
            maxLength={300}
          />
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
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

      {/* MODAL BOTTOM SHEET */}
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

      {/* DATE & TIME PICKERS */}
      {showDatePicker && (
        <DateTimePicker
          value={tanggal}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate) setTanggal(selectedDate);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={waktu}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(Platform.OS === "ios");
            if (selectedTime) setWaktu(selectedTime);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
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
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#111" },

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
    fontSize: 13,
    textAlignVertical: "top",
    height: 80,
  },
  charCount: {
    textAlign: "right",
    fontSize: 10,
    color: "#9E9E9E",
    marginTop: 4,
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
