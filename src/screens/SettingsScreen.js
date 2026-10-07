import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Svg, { Path, Rect } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { getProfile, saveProfile, exportBackupJSON, restoreBackupJSON } from '../db/storage';
import { colors } from '../theme/tokens';

export const SettingsScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    businessName: 'Dapur Berkah Bu Sumi',
    ownerName: 'Ibu Sumiati',
    pin: '123456',
    phone: '081234567890'
  });

  useEffect(() => {
    const load = async () => {
      const p = await getProfile();
      setProfile(p);
    };
    load();
  }, []);

  const handleExportClipboard = async () => {
    try {
      const json = await exportBackupJSON();
      await Clipboard.setStringAsync(json);
      Alert.alert(
        'Cadangan Berhasil Disalin',
        'Data seluruh resep, transaksi kasir, dan konsinyasi kantin telah disalin ke papan klip (clipboard). Simpan teks ini di catatan aman.'
      );
    } catch {
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengekspor data cadangan.');
    }
  };

  const handleRestoreClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (!text || text.trim() === '') {
        Alert.alert('Papan Klip Kosong', 'Salin teks cadangan JSON terlebih dahulu sebelum menekan tombol pemulihan.');
        return;
      }
      Alert.alert(
        'Konfirmasi Pemulihan Data',
        'Apakah Anda yakin ingin memulihkan data dari papan klip? Data saat ini akan diperbarui.',
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Pulihkan',
            onPress: async () => {
              try {
                await restoreBackupJSON(text);
                Alert.alert('Sukses', 'Data berhasil dipulihkan secara penuh.', [
                  { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
                ]);
              } catch (err) {
                Alert.alert('Format Salah', 'Teks pada papan klip bukan format cadangan data KantinBite yang valid.');
              }
            }
          }
        ]
      );
    } catch {
      Alert.alert('Gagal', 'Gagal membaca data dari papan klip.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Pengaturan & Data"
        subtitle="Manajemen Profil & Arsip Cadangan"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SEKSI PROFIL USAHA */}
        <Text style={styles.sectionTitle}>Profil Usaha</Text>
        <View style={styles.cardSurface}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama Gerai / Usaha</Text>
            <Text style={styles.infoValue}>{profile.businessName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nama Pemilik</Text>
            <Text style={styles.infoValue}>{profile.ownerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nomor WhatsApp</Text>
            <Text style={styles.infoValue}>{profile.phone || '-'}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>PIN Masuk</Text>
            <Text style={styles.infoValue}>••••••</Text>
          </View>
        </View>

        {/* SEKSI CADANGAN DATA (BACKUP / RESTORE) */}
        <Text style={styles.sectionTitle}>Pencadangan & Pemulihan (Arsip Mandiri)</Text>
        <View style={styles.cardSurface}>
          <Text style={styles.descText}>
            Simpan data resep kue, piutang kantin, dan riwayat kas harian agar tidak hilang saat berganti ponsel.
          </Text>

          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={handleExportClipboard}>
            <View style={styles.actionIconWrap}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
                <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </Svg>
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Salin Cadangan Data (Backup)</Text>
              <Text style={styles.actionSubtitle}>Salin seluruh data aplikasi ke Clipboard</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionRow, { borderBottomWidth: 0 }]} activeOpacity={0.7} onPress={handleRestoreClipboard}>
            <View style={[styles.actionIconWrap, { backgroundColor: '#ECFDF5' }]}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <Path d="M7 10l5 5 5-5" />
                <Path d="M12 15V3" />
              </Svg>
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Pulihkan Data (Restore)</Text>
              <Text style={styles.actionSubtitle}>Terapkan data cadangan dari Clipboard</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* INFORMASI VERSI APLIKASI */}
        <View style={styles.appMetaCard}>
          <Text style={styles.appMetaTitle}>KantinBite v1.0.0 (Tugas Akhir Pemvis)</Text>
          <Text style={styles.appMetaDesc}>STIKOM Poltek Cirebon • Kelompok C • React Native</Text>
        </View>

      </ScrollView>
      <BottomNav activeTab="Settings" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 8,
    marginTop: 6
  },
  cardSurface: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  infoLabel: {
    fontSize: 13,
    color: '#71717A'
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B'
  },
  descText: {
    fontSize: 12,
    color: '#71717A',
    lineHeight: 18,
    marginBottom: 12
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  actionTextWrap: {
    flex: 1
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B'
  },
  actionSubtitle: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 1
  },
  appMetaCard: {
    alignItems: 'center',
    paddingVertical: 20
  },
  appMetaTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A1A1AA'
  },
  appMetaDesc: {
    fontSize: 11,
    color: '#D4D4D8',
    marginTop: 2
  }
});
