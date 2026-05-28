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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PenawaranContext } from "../context/PenawaranContext";

// --- KOMPONEN INPUT REUSABLE ---
const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  icon,
  keyboardType = "default",
  prefix,
}: any) => (
  <View style={styles.inputWrap}>
    {label && (
      <Text style={styles.label}>
        {label} {required && <Text style={{ color: "red" }}>*</Text>}
      </Text>
    )}
    <View style={styles.inputBox}>
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color="#757575"
          style={{ marginRight: 8 }}
        />
      )}
      {prefix && <Text style={styles.prefixText}>{prefix}</Text>}
      <TextInput
        style={[styles.inputText, { flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const SelectInput = ({ label, placeholder, value, onPress, required }: any) => (
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

// Komponen Helper untuk list key-value di Review
const DetailRow = ({ label, value, boldValue }: any) => (
  <View style={{ flexDirection: "row", marginBottom: 6 }}>
    <Text style={{ flex: 1, fontSize: 10, color: "#757575" }}>{label}</Text>
    <Text
      style={{
        flex: 1.5,
        fontSize: 10,
        color: boldValue ? "#111" : "#333",
        fontWeight: boldValue ? "bold" : "normal",
      }}
    >
      : {value}
    </Text>
  </View>
);

export default function AddPenawaranScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { addPenawaran } = useContext(PenawaranContext);

  const [step, setStep] = useState(1);

  // States Step 1
  const [nasabah, setNasabah] = useState("PT Maju Jaya"); // Pre-filled untuk UI mockup
  const [pic, setPic] = useState("Budi Santoso");
  const [nohp, setNohp] = useState("0812 1234 5678");
  const [email, setEmail] = useState("budi.santoso@majujaya.co.id");
  const [jenisPenawaran, setJenisPenawaran] = useState("Kredit");
  const [tujuan, setTujuan] = useState("Modal Kerja");
  const [rm, setRm] = useState("Rizky Pratama");
  const [cabang, setCabang] = useState("KCP Jakarta Sudirman");
  const [catatan, setCatatan] = useState(
    "Untuk pembelian bahan baku dan kebutuhan operasional usaha",
  );
  const [tglPenawaran, setTglPenawaran] = useState(new Date());
  const [tglBerlaku, setTglBerlaku] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateTarget, setActiveDateTarget] = useState<
    "penawaran" | "berlaku" | null
  >(null);

  // States Step 2
  const [produk, setProduk] = useState("Kredit Modal Kerja");
  const [mataUang, setMataUang] = useState("IDR - Rupiah");
  const [plafond, setPlafond] = useState("5.000.000.000");
  const [tenor, setTenor] = useState("60");
  const [sukuBunga, setSukuBunga] = useState("9.50");
  const [tipeBunga, setTipeBunga] = useState("Floating");
  const [useAgunan, setUseAgunan] = useState(true);

  // States Step 3 & 4
  const [simTab, setSimTab] = useState("Angsuran");
  const [fileName, setFileName] = useState(
    "Proposal_Penawaran_PT_MajuJaya.pdf",
  );
  const [isReadyKirim, setIsReadyKirim] = useState(true);

  // Modal
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

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      if (activeDateTarget === "penawaran") setTglPenawaran(selectedDate);
      else if (activeDateTarget === "berlaku") setTglBerlaku(selectedDate);
    }
  };

  const openDatePicker = (target: "penawaran" | "berlaku") => {
    setActiveDateTarget(target);
    setShowDatePicker(true);
  };

  const formatRupiah = (angka: number) =>
    "Rp" + angka.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) setFileName("Proposal_Penawaran_V1.pdf");
  };

  const handleSimpan = (statusMode: "Draft" | "Dikirim") => {
    if (!nasabah || !produk || !plafond) {
      alert("Mohon isi field esensial seperti Nasabah, Produk, dan Plafond!");
      return;
    }
    addPenawaran({
      company: nasabah,
      product: produk,
      amount: `Rp${plafond}`,
      date: formatDate(tglPenawaran),
      tenor: tenor ? `${tenor} Bulan` : "-",
      interest: sukuBunga ? `${sukuBunga}%` : "-",
      pic: rm || "Admin",
      status: statusMode,
    });
    navigation.goBack();
  };

  const StepIndicator = () => {
    const stepsArr = [
      "Informasi Umum",
      "Detail Produk",
      "Simulasi",
      "Review & Kirim",
    ];
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepLineBg} />
        {stepsArr.map((title, idx) => {
          const stepNum = idx + 1;
          const isActive = step >= stepNum;
          return (
            <View key={idx} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isActive
                    ? styles.stepCircleActive
                    : styles.stepCircleInactive,
                ]}
              >
                {step > stepNum ? (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                ) : (
                  <Text
                    style={[
                      styles.stepNum,
                      isActive ? { color: "#FFF" } : { color: "#9E9E9E" },
                    ]}
                  >
                    {stepNum}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepTitle,
                  isActive ? { color: "#0047D3", fontWeight: "bold" } : {},
                ]}
              >
                {title}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Penawaran Baru</Text>
            <Text style={styles.headerSubtitle}>
              Buat penawaran produk untuk nasabah
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnDraftHeader}
            onPress={() => handleSimpan("Draft")}
          >
            <Ionicons name="document-text-outline" size={16} color="#333" />
            <Text style={styles.btnDraftText}>Simpan Draft</Text>
          </TouchableOpacity>
        </View>
        <StepIndicator />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {step === 1 && (
          // (STEP 1 TETAP SAMA KARENA SUDAH SESUAI)
          <View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Informasi Nasabah</Text>
              <SelectInput
                label="Nasabah / Perusahaan"
                required
                placeholder="Cari nasabah atau perusahaan"
                value={nasabah}
                onPress={() =>
                  openModal(
                    "Pilih Nasabah",
                    ["PT Maju Jaya", "CV Sukses Mandiri"],
                    setNasabah,
                  )
                }
              />
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="PIC / Kontak"
                    placeholder="Pilih PIC"
                    value={pic}
                    onPress={() =>
                      openModal(
                        "Pilih PIC",
                        ["Budi Santoso", "Dewi Anggraini"],
                        setPic,
                      )
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="No. Handphone"
                    placeholder="08xxxxxxxxxx"
                    icon="call-outline"
                    value={nohp}
                    onChangeText={setNohp}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <CustomInput
                label="Email"
                placeholder="nama@email.com"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Informasi Penawaran</Text>
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Jenis Penawaran"
                    required
                    value={jenisPenawaran}
                    onPress={() =>
                      openModal(
                        "Jenis Penawaran",
                        ["Kredit", "Simpanan"],
                        setJenisPenawaran,
                      )
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SelectInput
                    label="Tujuan Penggunaan"
                    required
                    value={tujuan}
                    onPress={() =>
                      openModal(
                        "Tujuan",
                        ["Modal Kerja", "Investasi"],
                        setTujuan,
                      )
                    }
                  />
                </View>
              </View>
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Tanggal Penawaran"
                    required
                    value={formatDate(tglPenawaran)}
                    onPress={() => openDatePicker("penawaran")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SelectInput
                    label="Tanggal Berlaku Hingga"
                    required
                    value={formatDate(tglBerlaku)}
                    onPress={() => openDatePicker("berlaku")}
                  />
                </View>
              </View>
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Relationship Manager"
                    value={rm}
                    onPress={() =>
                      openModal("RM", ["Rizky Pratama", "Budi Santoso"], setRm)
                    }
                    icon="search"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SelectInput
                    label="Cabang"
                    value={cabang}
                    onPress={() =>
                      openModal(
                        "Cabang",
                        ["KCP Jakarta Sudirman", "KCU Thamrin"],
                        setCabang,
                      )
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Catatan Penawaran</Text>
              <TextAreaInput
                label="Catatan (Opsional)"
                placeholder="Tuliskan catatan tambahan untuk penawaran ini"
                value={catatan}
                onChangeText={setCatatan}
                maxLength={250}
              />
            </View>
          </View>
        )}

        {step === 2 && (
          // (STEP 2 TETAP SAMA KARENA SUDAH SESUAI)
          <View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Detail Produk</Text>
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Jenis Penawaran"
                    value={jenisPenawaran}
                    onPress={() => {}}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SelectInput
                    label="Tujuan Penggunaan"
                    value={tujuan}
                    onPress={() => {}}
                  />
                </View>
              </View>
              <SelectInput
                label="Produk"
                required
                placeholder="Pilih produk"
                value={produk}
                onPress={() =>
                  openModal(
                    "Produk",
                    ["Kredit Modal Kerja", "Kredit Investasi", "Kredit Mikro"],
                    setProduk,
                  )
                }
              />
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Mata Uang"
                    value={mataUang}
                    onPress={() =>
                      openModal(
                        "Mata Uang",
                        ["IDR - Rupiah", "USD - Dolar"],
                        setMataUang,
                      )
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="Plafond yang Diajukan"
                    required
                    placeholder="Contoh: 5.000.000.000"
                    value={plafond}
                    onChangeText={setPlafond}
                    keyboardType="numeric"
                    prefix="Rp"
                  />
                </View>
              </View>
              <View style={styles.rowTop}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <SelectInput
                    label="Jangka Waktu (Tenor)"
                    required
                    placeholder="Pilih"
                    value={tenor}
                    onPress={() =>
                      openModal(
                        "Tenor",
                        ["12", "24", "36", "48", "60"],
                        setTenor,
                      )
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SelectInput
                    label="Tipe Suku Bunga"
                    required
                    value={tipeBunga}
                    onPress={() =>
                      openModal(
                        "Tipe Bunga",
                        ["Floating", "Fixed"],
                        setTipeBunga,
                      )
                    }
                  />
                </View>
              </View>
              <CustomInput
                label="Suku Bunga Indicative (%)"
                required
                placeholder="9.50"
                value={sukuBunga}
                onChangeText={setSukuBunga}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}

        {/* ======================= L A N G K A H  3 : PERBAIKAN UI TOTAL ======================= */}
        {step === 3 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111" }}>
                Simulasi Penawaran
              </Text>
              <Text style={{ fontSize: 12, color: "#757575" }}>
                Kredit Modal Kerja
              </Text>
            </View>

            {/* 3.1 Ringkasan Pengajuan (Tampilan Baru) */}
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Text style={styles.sectionTitle}>Ringkasan Pengajuan</Text>
                <TouchableOpacity
                  onPress={() => setStep(2)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#0047D3",
                      fontWeight: "bold",
                      marginLeft: 4,
                    }}
                  >
                    Ubah Detail
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 10, color: "#757575", marginBottom: 2 }}
                  >
                    Plafond yang Diajukan
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "#111" }}
                  >
                    Rp{plafond}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 10, color: "#757575", marginBottom: 2 }}
                  >
                    Jangka Waktu (Tenor)
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "#111" }}
                  >
                    {tenor} Bulan
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 10, color: "#757575", marginBottom: 2 }}
                  >
                    Suku Bunga
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "#111" }}
                  >
                    {sukuBunga}%{" "}
                    <Text style={{ fontSize: 10, fontWeight: "normal" }}>
                      p.a
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 10, color: "#757575" }}>
                    Floating
                  </Text>
                </View>
              </View>
            </View>

            {/* 3.2 Simulasi Perhitungan (Tampilan Baru & Lengkap) */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Simulasi Perhitungan</Text>

              {/* Tabs */}
              <View style={styles.simTabContainer}>
                {["Angsuran", "Bunga Efektif", "Table Angsuran"].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.simTabBtn,
                      simTab === tab && styles.simTabBtnActive,
                    ]}
                    onPress={() => setSimTab(tab)}
                  >
                    <Text
                      style={[
                        styles.simTabText,
                        simTab === tab && styles.simTabTextActive,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Blue Box Result */}
              <View style={styles.blueResultBox}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={14}
                    color="#1976D2"
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#1976D2",
                      marginLeft: 4,
                      fontWeight: "500",
                    }}
                  >
                    Simulasi Angsuran per Bulan
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "#0047D3" }}
                >
                  Rp106.021.667
                </Text>
                <Text style={{ fontSize: 10, color: "#757575", marginTop: 4 }}>
                  Perkiraan angsuran bulanan
                </Text>
              </View>

              {/* List Detail Biaya */}
              <View style={{ marginTop: 15 }}>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Pokok Kredit</Text>
                  <Text style={styles.calcVal}>Rp5.000.000.000</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Suku Bunga</Text>
                  <Text style={styles.calcVal}>9,50% p.a (Floating)</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Jangka Waktu (Tenor)</Text>
                  <Text style={styles.calcVal}>60 Bulan</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Tipe Suku Bunga</Text>
                  <Text style={styles.calcVal}>Floating</Text>
                </View>

                <View style={[styles.calcRow, { marginTop: 10 }]}>
                  <Text style={styles.calcLabel}>Provisi</Text>
                  <Text style={styles.calcLabel}>1,00%</Text>
                  <Text style={styles.calcVal}>Rp50.000.000</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Biaya Administrasi</Text>
                  <Text style={styles.calcVal}>Rp2.500.000</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Asuransi Jiwa (Opsional)</Text>
                  <Text style={styles.calcVal}>Rp1.250.000</Text>
                </View>

                <View
                  style={[
                    styles.calcRow,
                    {
                      marginTop: 10,
                      borderTopWidth: 1,
                      borderTopColor: "#EEEEEE",
                      paddingTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.calcLabel,
                      { fontWeight: "bold", color: "#111" },
                    ]}
                  >
                    Total Biaya Awal
                  </Text>
                  <Text
                    style={[
                      styles.calcVal,
                      { fontWeight: "bold", color: "#111" },
                    ]}
                  >
                    Rp53.750.000
                  </Text>
                </View>
              </View>

              {/* Warning Box */}
              <View style={styles.warningBox}>
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color="#F57C00"
                />
                <Text style={styles.warningText}>
                  Angsuran dan biaya dapat berubah sesuai kebijakan bank.
                </Text>
              </View>
            </View>

            {/* 3.3 Skenario Simulasi (Tampilan Split Kolom) */}
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={styles.sectionTitle}>Skenario Simulasi</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#0047D3",
                      fontWeight: "bold",
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{ fontSize: 10, color: "#757575", marginBottom: 15 }}
              >
                Ubah beberapa parameter untuk melihat perbedaan simulasi
              </Text>

              <View style={{ flexDirection: "row" }}>
                {/* Kolom Kiri: Input */}
                <View
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    borderRightWidth: 1,
                    borderRightColor: "#EEEEEE",
                  }}
                >
                  <CustomInput
                    label="Plafond Kredit"
                    value={plafond}
                    onChangeText={setPlafond}
                    keyboardType="numeric"
                    prefix="Rp"
                  />
                  <SelectInput
                    label="Tenor (Bulan)"
                    value={tenor}
                    onPress={() =>
                      openModal(
                        "Tenor",
                        ["12", "24", "36", "48", "60"],
                        setTenor,
                      )
                    }
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <CustomInput
                        label="Suku Bunga (%)"
                        value={sukuBunga}
                        onChangeText={setSukuBunga}
                        keyboardType="numeric"
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                        fontSize: 10,
                        color: "#757575",
                      }}
                    >
                      %
                    </Text>
                  </View>
                </View>

                {/* Kolom Kanan: Hasil */}
                <View
                  style={{ flex: 1, paddingLeft: 15, justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "#111",
                      marginBottom: 15,
                    }}
                  >
                    Hasil Simulasi
                  </Text>

                  <Text
                    style={{ fontSize: 9, color: "#757575", marginBottom: 2 }}
                  >
                    Angsuran per Bulan
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#0047D3",
                      marginBottom: 10,
                    }}
                  >
                    Rp106.021.667
                  </Text>

                  <Text
                    style={{ fontSize: 9, color: "#757575", marginBottom: 2 }}
                  >
                    Total Pembayaran
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "#111",
                      marginBottom: 10,
                    }}
                  >
                    Rp6.361.300.000
                  </Text>

                  <Text
                    style={{ fontSize: 9, color: "#757575", marginBottom: 2 }}
                  >
                    Total Bunga
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "bold", color: "#111" }}
                  >
                    Rp1.361.300.000
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ======================= L A N G K A H  4 : PERBAIKAN UI TOTAL ======================= */}
        {step === 4 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111" }}>
                Review Penawaran
              </Text>
              <Text style={{ fontSize: 12, color: "#757575" }}>
                Periksa kembali detail penawaran sebelum dikirim ke nasabah
              </Text>
            </View>

            {/* 4.1 Informasi Nasabah */}
            <View style={styles.card}>
              <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>1. Informasi Nasabah</Text>
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={styles.btnUbah}
                >
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text style={styles.textUbah}>Ubah</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#E8F5E9",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name="business" size={20} color="#4CAF50" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "#111" }}
                  >
                    {nasabah}
                  </Text>
                  <Text
                    style={{ fontSize: 10, color: "#757575", marginBottom: 8 }}
                  >
                    Nasabah / Perusahaan
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#333",
                        width: "50%",
                        marginBottom: 4,
                      }}
                    >
                      {pic} - {nohp}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#333",
                        width: "50%",
                        marginBottom: 4,
                      }}
                    >
                      PIC / Kontak: {pic}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#333", width: "50%" }}>
                      {email}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#333", width: "50%" }}>
                      Cabang: {cabang}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 4.2 Detail Penawaran */}
            <View style={styles.card}>
              <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>2. Detail Penawaran</Text>
                <TouchableOpacity
                  onPress={() => setStep(2)}
                  style={styles.btnUbah}
                >
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text style={styles.textUbah}>Ubah</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1.2 }}>
                  <DetailRow label="Jenis Penawaran" value={jenisPenawaran} />
                  <DetailRow label="Tujuan Penggunaan" value={tujuan} />
                  <DetailRow label="Produk" value={produk} />
                  <DetailRow label="Mata Uang" value="IDR" />
                  <DetailRow
                    label="Plafond yang Diajukan"
                    value={`Rp${plafond}`}
                  />
                  <DetailRow
                    label="Jangka Waktu (Tenor)"
                    value={`${tenor} Bulan`}
                  />
                  <DetailRow
                    label="Suku Bunga"
                    value={`${sukuBunga}% p.a (Floating)`}
                  />
                  <DetailRow label="Tipe Suku Bunga" value="Floating" />
                </View>
                <View style={{ flex: 0.8, paddingLeft: 10 }}>
                  <View
                    style={{
                      backgroundColor: "#F0F4FF",
                      borderRadius: 8,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#D6E4FF",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Ionicons
                        name="document-text-outline"
                        size={12}
                        color="#0047D3"
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#0047D3",
                          marginLeft: 4,
                        }}
                      >
                        Ringkasan Pengajuan
                      </Text>
                    </View>
                    <Text style={{ fontSize: 9, color: "#757575" }}>
                      Plafond
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#111",
                        marginBottom: 4,
                      }}
                    >
                      Rp{plafond}
                    </Text>
                    <Text style={{ fontSize: 9, color: "#757575" }}>Tenor</Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#111",
                        marginBottom: 4,
                      }}
                    >
                      {tenor} Bulan
                    </Text>
                    <Text style={{ fontSize: 9, color: "#757575" }}>
                      Suku Bunga
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#111",
                      }}
                    >
                      {sukuBunga}% p.a
                    </Text>
                    <Text style={{ fontSize: 9, color: "#757575" }}>
                      Floating
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 4.3 Simulasi Ringkasan */}
            <View style={styles.card}>
              <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>3. Simulasi Ringkasan</Text>
                <TouchableOpacity
                  onPress={() => setStep(3)}
                  style={styles.btnUbah}
                >
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text style={styles.textUbah}>Ubah</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#F0F4FF",
                    borderRadius: 8,
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  }}
                >
                  <Text
                    style={{ fontSize: 10, color: "#757575", marginBottom: 4 }}
                  >
                    Simulasi Angsuran per Bulan
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#0047D3",
                    }}
                  >
                    Rp106.021.667
                  </Text>
                </View>
                <View style={{ flex: 1.5, justifyContent: "center" }}>
                  <DetailRow
                    label="Pokok Kredit"
                    value="Rp5.000.000.000"
                    boldValue
                  />
                  <DetailRow label="Provisi" value="Rp50.000.000" />
                  <DetailRow label="Biaya Administrasi" value="Rp2.500.000" />
                  <DetailRow
                    label="Asuransi Jiwa (Opsional)"
                    value="Rp1.250.000"
                  />
                  <View
                    style={{
                      marginTop: 4,
                      paddingTop: 6,
                      borderTopWidth: 1,
                      borderTopColor: "#EEEEEE",
                    }}
                  >
                    <DetailRow
                      label="Total Biaya Awal"
                      value="Rp53.750.000"
                      boldValue
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.warningBox, { marginTop: 15 }]}>
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color="#1976D2"
                />
                <Text style={styles.warningText}>
                  Angsuran dan biaya dapat berubah sesuai kebijakan bank.
                </Text>
              </View>
            </View>

            {/* 4.4 Catatan Penawaran */}
            <View style={styles.card}>
              <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>4. Catatan Penawaran</Text>
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={styles.btnUbah}
                >
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text style={styles.textUbah}>Ubah</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: "#FFF8E1",
                  padding: 12,
                  borderRadius: 8,
                  flexDirection: "row",
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color="#FF9800"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 10, color: "#F57C00", flex: 1 }}>
                  {catatan}
                </Text>
              </View>
            </View>

            {/* 4.5 Dokumen Lampiran */}
            <View style={styles.card}>
              <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>5. Dokumen Lampiran</Text>
                <TouchableOpacity style={styles.btnUbah} onPress={pickDocument}>
                  <Ionicons name="pencil" size={12} color="#0047D3" />
                  <Text style={styles.textUbah}>Ubah</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FAFAFA",
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#EEEEEE",
                }}
              >
                <Ionicons name="document-text" size={24} color="#F44336" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 10, fontWeight: "bold", color: "#333" }}
                  >
                    {fileName}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#9E9E9E" }}>512 KB</Text>
                </View>
                <Ionicons name="download-outline" size={20} color="#0047D3" />
              </View>
            </View>

            {/* Switch Siap Dikirim */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F0F4FF",
                padding: 15,
                borderRadius: 10,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "#D6E4FF",
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#0047D3"
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", color: "#0047D3" }}
                >
                  Siap Dikirim ke Nasabah
                </Text>
                <Text style={{ fontSize: 10, color: "#757575" }}>
                  Setelah dikirim, penawaran akan masuk ke daftar penawaran
                  dengan status "Dikirim".
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM ACTION BAR WIZARD */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 16 },
        ]}
      >
        {step > 1 ? (
          <TouchableOpacity
            style={styles.btnBatal}
            onPress={() => setStep(step - 1)}
          >
            <Ionicons
              name="arrow-back"
              size={16}
              color="#0047D3"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.btnBatalText}>Kembali</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1, marginRight: 8 }} />
        )}

        {step < 4 ? (
          <TouchableOpacity
            style={styles.btnSimpan}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.btnSimpanText}>Lanjutkan</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.btnSimpan,
              !isReadyKirim && { backgroundColor: "#9E9E9E" },
            ]}
            onPress={() => handleSimpan("Dikirim")}
            disabled={!isReadyKirim}
          >
            <Text style={styles.btnSimpanText}>Kirim</Text>
            <Ionicons
              name="paper-plane-outline"
              size={16}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
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

      {showDatePicker && (
        <DateTimePicker
          value={activeDateTarget === "penawaran" ? tglPenawaran : tglBerlaku}
          mode="date"
          display="default"
          onChange={onChangeDate}
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
    paddingBottom: 10,
  },
  headerTitle: { color: "#111", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#757575", fontSize: 12, marginTop: 2 },
  btnDraftHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnDraftText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    marginLeft: 4,
  },

  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  stepLineBg: {
    position: "absolute",
    top: 12,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: "#EEEEEE",
    zIndex: 0,
  },
  stepItem: { alignItems: "center", width: 70, zIndex: 1 },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
  },
  stepCircleActive: { borderColor: "#0047D3", backgroundColor: "#0047D3" },
  stepCircleInactive: { borderColor: "#E0E0E0" },
  stepNum: { fontSize: 10, fontWeight: "bold" },
  stepTitle: {
    fontSize: 9,
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 6,
  },

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
  rowTop: { flexDirection: "row", alignItems: "flex-start" },

  inputWrap: { marginBottom: 16 },
  label: { fontSize: 10, fontWeight: "600", color: "#333", marginBottom: 8 },
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
  inputText: { fontSize: 13, padding: 0 },
  prefixText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "bold",
    marginRight: 4,
  },
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

  // --- STYLES BARU UNTUK STEP 3 & 4 ---
  simTabContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  simTabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  simTabBtnActive: { backgroundColor: "#F0F4FF" },
  simTabText: { fontSize: 10, color: "#757575", fontWeight: "500" },
  simTabTextActive: { color: "#0047D3", fontWeight: "bold" },

  blueResultBox: {
    backgroundColor: "#F0F4FF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E4FF",
    borderStyle: "dashed",
  },

  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  calcLabel: { fontSize: 10, color: "#757575", flex: 1 },
  calcVal: { fontSize: 10, color: "#333", fontWeight: "500" },

  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFE082",
  },
  warningText: { fontSize: 10, color: "#F57C00", marginLeft: 6 },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  btnUbah: { flexDirection: "row", alignItems: "center" },
  textUbah: {
    fontSize: 10,
    color: "#0047D3",
    fontWeight: "bold",
    marginLeft: 4,
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
    flexDirection: "row",
    justifyContent: "center",
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
