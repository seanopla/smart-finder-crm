import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }: any) {
  const [isRemembered, setIsRemembered] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header & Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Selamat datang kembali!</Text>
        <Text style={styles.subtitle}>Silakan masuk untuk melanjutkan</Text>

        {/* Input Username */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#9E9E9E"
            style={styles.icon}
          />
          <TextInput
            placeholder="Masukkan username Anda"
            placeholderTextColor="#9E9E9E"
            style={styles.input}
          />
        </View>

        {/* Input Password */}
        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#9E9E9E"
            style={styles.icon}
          />
          <TextInput
            placeholder="Masukkan password Anda"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            style={styles.input}
          />
          <Ionicons
            name="eye-outline"
            size={20}
            color="#9E9E9E"
            style={styles.iconRight}
          />
        </View>

        {/* Remember Me */}
        <TouchableOpacity
          style={styles.rememberContainer}
          onPress={() => setIsRemembered(!isRemembered)}
        >
          <Ionicons
            name={isRemembered ? "checkbox" : "square-outline"}
            size={20}
            color="#0047D3"
          />
          <Text style={styles.rememberText}>Ingat saya</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>atau</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Login */}
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} />
          <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF"},
  content: { paddingHorizontal: 24, paddingTop: 0, flex: 1, justifyContent: "center" },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 300,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#757575",
    marginBottom: 30,
  },
  label: { fontSize: 13, fontWeight: "600", color: "#111", marginBottom: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
    backgroundColor: "#FAFAFA",
  },
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: "#333" },
  icon: { marginRight: 5 },
  iconRight: { marginLeft: 5 },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotText: { color: "#0047D3", fontSize: 13, fontWeight: "600" },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#0047D3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#EEEEEE" },
  dividerText: { marginHorizontal: 12, color: "#9E9E9E", fontSize: 13 },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  googleButtonText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#333",
    fontSize: 14,
  },
  footer: { alignItems: "center", paddingBottom: 20 },
  dummyIllustration: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: "100%",
    opacity: 0.5,
    marginBottom: 20,
  },
  versionText: { fontSize: 12, color: "#9E9E9E", fontWeight: "500" },
});
