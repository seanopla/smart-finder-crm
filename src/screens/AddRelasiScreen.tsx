import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { RelationContext } from "../context/RelationContext";

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  icon,
  multiline,
}: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <View
      style={[
        styles.inputBox,
        multiline && { height: 80, alignItems: "flex-start" },
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color="#757575"
          style={{ marginRight: 8, marginTop: multiline ? 2 : 0 }}
        />
      )}
      <TextInput
        style={[
          styles.inputText,
          { flex: 1 },
          multiline && { textAlignVertical: "top" },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  </View>
);

const SelectInput = ({ label, placeholder, value, onPress, required }: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
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

export default function AddRelasiScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { addRelation } = useContext(RelationContext);

  // Form States
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [jenisRelasi, setJenisRelasi] = useState("");

  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [notelp, setNotelp] = useState("");
  const [alamat, setAlamat] = useState("");

  const [sektor, setSektor] = useState("");
  const [sumber, setSumber] = useState("");
  const [catatan, setCatatan] = useState("");

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Modal States untuk Select Input
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Maaf, kami butuh izin akses galeri untuk mengupload foto!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSimpan = () => {
    if (!nama || !perusahaan || !jenisRelasi || !nohp) {
      alert("Mohon isi semua field yang bertanda bintang merah (*)");
      return;
    }

    addRelation({
      name: nama,
      position: jabatan || "-",
      company: perusahaan,
      type: jenisRelasi as "Nasabah" | "Prospek" | "Mitra",
    });
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Tambah Relasi</Text>
          <Text style={styles.headerSubtitle}>
            Lengkapi informasi relasi Anda
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Utama</Text>

          <View style={styles.rowTop}>
            <View style={{ flex: 1, marginRight: 15 }}>
              <CustomInput
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChangeText={setNama}
                required
              />
            </View>

            <TouchableOpacity style={styles.photoUploadBtn} onPress={pickImage}>
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  style={styles.photoUploaded}
                />
              ) : (
                <>
                  <Ionicons name="camera" size={24} color="#0047D3" />
                  <Text style={styles.photoText}>Tambah Foto</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <CustomInput
            label="Jabatan"
            placeholder="Masukkan jabatan"
            value={jabatan}
            onChangeText={setJabatan}
          />
          <CustomInput
            label="Perusahaan"
            placeholder="Masukkan nama perusahaan"
            value={perusahaan}
            onChangeText={setPerusahaan}
            required
          />
          <SelectInput
            label="Jenis Relasi"
            placeholder="Pilih jenis relasi"
            value={jenisRelasi}
            required
            onPress={() =>
              openModal(
                "Jenis Relasi",
                ["Nasabah", "Prospek", "Mitra"],
                setJenisRelasi,
              )
            }
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Kontak</Text>
          <CustomInput
            label="Nomor Handphone"
            placeholder="08xxxxxxxxxx"
            value={nohp}
            onChangeText={setNohp}
            icon="call-outline"
            required
          />
          <CustomInput
            label="Email"
            placeholder="nama@email.com"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
          />
          <CustomInput
            label="Nomor Telepon Kantor"
            placeholder="021-xxxxxxxx"
            value={notelp}
            onChangeText={setNotelp}
            icon="business-outline"
          />
          <CustomInput
            label="Alamat"
            placeholder="Masukkan alamat perusahaan atau domisili"
            value={alamat}
            onChangeText={setAlamat}
            icon="location-outline"
            multiline
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Tambahan</Text>
          <SelectInput
            label="Sektor Usaha"
            placeholder="Pilih sektor usaha"
            value={sektor}
            onPress={() =>
              openModal(
                "Sektor Usaha",
                ["Perdagangan", "Manufaktur", "Jasa", "Pertanian", "Lainnya"],
                setSektor,
              )
            }
          />
          <SelectInput
            label="Sumber Relasi"
            placeholder="Pilih sumber relasi"
            value={sumber}
            onPress={() =>
              openModal(
                "Sumber Relasi",
                ["Referal", "Event", "Website", "Walk-in"],
                setSumber,
              )
            }
          />
          <CustomInput
            label="Catatan"
            placeholder="Tulis catatan tentang relasi (opsional)"
            value={catatan}
            onChangeText={setCatatan}
            icon="document-text-outline"
            multiline
          />
        </View>
      </ScrollView>

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
          <Text style={styles.btnSimpanText}>Simpan Relasi</Text>
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

  rowTop: { flexDirection: "row", alignItems: "flex-start" },

  photoUploadBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E4FF",
    borderStyle: "dashed",
  },
  photoText: {
    fontSize: 10,
    color: "#0047D3",
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  photoUploaded: { width: 80, height: 80, borderRadius: 40 },

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
  inputText: { fontSize: 13, padding: 0 },

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
