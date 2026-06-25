import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LeadContext } from "../context/LeadContext";

const CustomInput = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  required = false,
}: any) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <View style={styles.inputContainer}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#206DF9" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9E9E9E"
      />
    </View>
  </View>
);

export default function AddLeadScreen({ navigation }: any) {
  const { addLead } = useContext(LeadContext);

  // State untuk form input yang diwajibkan
  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [namaPIC, setNamaPIC] = useState("");
  const [phone, setPhone] = useState("");
  const [plafond, setPlafond] = useState("");

  const handleSimpan = () => {
    if (!namaPerusahaan || !namaPIC) {
      alert("Mohon isi Nama Perusahaan dan PIC");
      return;
    }
    // Kirim data ke Context
    addLead({
      name: namaPIC,
      phone: phone || "08XX XXXX XXXX",
      company: namaPerusahaan,
      amount: plafond ? `Rp ${plafond}` : "Rp -",
      location: "Jakarta, Indonesia",
      source: "Sumber: Input Manual",
      priority: "Prioritas Sedang",
    });
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.saveButtonHeader}
          onPress={handleSimpan}
        >
          <Ionicons
            name="save-outline"
            size={16}
            color="#FFF"
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "bold" }}>
            Simpan
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, namaPerusahaan, namaPIC, phone, plafond]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerExtension}>
        <Text style={styles.headerSubtitle}>Input data lead baru</Text>
      </View> */}
      {/* Header Khusus Form */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Card Informasi Utama */}
        <Text style={styles.sectionTitle}>Informasi Utama</Text>
        <View style={styles.card}>
          <CustomInput
            label="Sumber Lead"
            icon="people"
            placeholder="Pilih Sumber"
            required
          />
          <CustomInput
            label="Nama Lead / Perusahaan"
            icon="business"
            placeholder="Ketik Nama Perusahaan"
            value={namaPerusahaan}
            onChangeText={setNamaPerusahaan}
            required
          />
          <CustomInput
            label="Nama PIC"
            icon="person"
            placeholder="Ketik Nama PIC"
            value={namaPIC}
            onChangeText={setNamaPIC}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <CustomInput
                label="Jabatan PIC"
                icon="briefcase"
                placeholder="Direktur"
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomInput
                label="No. Handphone"
                icon="call"
                placeholder="0812..."
                value={phone}
                onChangeText={setPhone}
                required
              />
            </View>
          </View>
        </View>

        {/* Card Informasi Lead */}
        <Text style={styles.sectionTitle}>Informasi Lead</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <CustomInput
                label="Produk yang Diminati"
                icon="cube"
                placeholder="Pilih Produk"
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomInput
                label="Plafond Diajukan"
                icon="cash"
                placeholder="Nominal"
                value={plafond}
                onChangeText={setPlafond}
                required
              />
            </View>
          </View>
          <CustomInput
            label="Tujuan Pengajuan"
            icon="locate"
            placeholder="Pilih Tujuan"
          />
        </View>

        {/* Card Upload Dokumen */}
        <Text style={styles.sectionTitle}>Dokumen (Opsional)</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={24} color="#0047D3" />
            <Text style={styles.uploadTitle}>Upload Dokumen Pendukung</Text>
            <Text style={styles.uploadSub}>PDF, JPG, PNG (Maks. 10 MB)</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  headerExtension: {
    backgroundColor: "#0047D3",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerSubtitle: { color: "#E3F2FD", fontSize: 12 },
  saveButtonHeader: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 12,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  row: { flexDirection: "row" },
  inputWrapper: { marginBottom: 16 },
  inputLabel: {
    fontSize: 11,
    color: "#757575",
    marginBottom: 6,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 4,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: "#F4F8FF",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  input: { flex: 1, marginLeft: 10, fontSize: 13, color: "#333" },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#0047D3",
    marginTop: 8,
  },
  uploadSub: { fontSize: 10, color: "#9E9E9E", marginTop: 4 },
});
