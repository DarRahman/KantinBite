import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Mascot } from '../components/Mascot';
import { colors } from '../theme/tokens';

export const AuthScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('Dapur Berkah Bu Sumi');
  const [pin, setPin] = useState('123456');

  const handleLogin = () => {
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        
        {/* HERO BRAND & MASCOT BITEY */}
        <View style={styles.heroWrap}>
          <Mascot size={104} />
          <Text style={styles.appTitle}>KantinBite</Text>
          <Text style={styles.appTagline}>Catat Resep, Titip Kantin & Kasir</Text>
        </View>

        {/* INPUT FIELDS */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nama Profil Usaha</Text>
            <TextInput
              style={styles.nativeInput}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Contoh: Dapur Berkah"
              placeholderTextColor={colors.textPlaceholder}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PIN Masuk (6 Angka)</Text>
            <TextInput
              style={styles.nativeInput}
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="number-pad"
              maxLength={6}
              placeholder="••••••"
              placeholderTextColor={colors.textPlaceholder}
            />
          </View>

          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleLogin}>
            <Text style={styles.btnPrimaryText}>Buka Dashboard</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.6} style={styles.footerLink}>
          <Text style={styles.footerText}>
            Usaha baru? <Text style={styles.footerLinkText}>Daftar Akun</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  heroWrap: {
    alignItems: 'center',
    marginBottom: 28
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#18181B',
    letterSpacing: -0.5,
    marginTop: 12
  },
  appTagline: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 2
  },
  formContainer: {
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 14
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 6
  },
  nativeInput: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    fontSize: 14,
    color: '#18181B',
    fontWeight: '500'
  },
  btnPrimary: {
    backgroundColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  },
  footerLink: {
    alignItems: 'center',
    paddingVertical: 8
  },
  footerText: {
    fontSize: 13,
    color: '#71717A'
  },
  footerLinkText: {
    color: '#EA580C',
    fontWeight: '700'
  }
});
