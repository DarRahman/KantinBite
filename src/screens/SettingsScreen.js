import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { getProfile, exportBackupJSON, restoreBackupJSON } from '../db/storage';

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
        'Data seluruh resep, transaksi kasir, dan konsinyasi kantin telah disalin ke clipboard.'
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* HEADER AMAN PLAYFUL */}
      <ScreenHeader
        title="Pengaturan & Akun"
        subtitle="Informasi Usaha & Pengamanan Data"
        actionLabel="Bantuan"
        onActionPress={() => Alert.alert('Pusat Bantuan', 'Hubungi tim layanan bantuan KantinBite di support@kantinbite.id')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO KARTU PROFIL USAHA PUBLIK */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarBox}>
            <AssetVisual name="chef_mascot" size={38} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileBizName}>{profile.businessName || 'Dapur Berkah Bunda'}</Text>
            <Text style={styles.profileOwner}>Pemilik: {profile.ownerName || 'Bunda Sumiati'}</Text>
            <Text style={styles.profileWa}>WhatsApp: {profile.phone || '0812-3456-7890'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editProfileBtn} 
            activeOpacity={0.8}
            onPress={() => Alert.alert('Ubah Profil', 'Fitur pembaruan profil usaha mandiri.')}
          >
            <Text style={styles.editProfileBtnText}>Ubah</Text>
          </TouchableOpacity>
        </View>

        {/* SEKSI KEAMANAN & AKSES KASIR */}
        <Text style={styles.sectionLbl}>KEAMANAN & AKSES KASIR</Text>
        <View style={styles.menuGroupCard}>
          <TouchableOpacity 
            style={styles.menuItemRow} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Kunci PIN', 'PIN keamanan kasir 6 digit aktif.')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconWrap}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </Svg>
              </View>
              <View>
                <Text style={styles.menuItemTitle}>Kunci PIN Transaksi (6 Digit)</Text>
                <Text style={styles.menuItemDesc}>Mencegah akses buka laporan tanpa izin</Text>
              </View>
            </View>
            <View style={styles.menuStatusActive}>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                <Path d="M20 6L9 17L4 12" />
              </Svg>
              <Text style={styles.menuStatusActiveText}>Aktif</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItemRow} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Hak Akses', 'Pengaturan akses staf/kasir.')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconWrap}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
              </View>
              <View>
                <Text style={styles.menuItemTitle}>Hak Akses Karyawan / Asisten</Text>
                <Text style={styles.menuItemDesc}>Batasi menu dapur hanya untuk kasir langsung</Text>
              </View>
            </View>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 18L15 12L9 6" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* SEKSI KEMITRAAN & REKAPITULASI */}
        <Text style={styles.sectionLbl}>KEMITRAAN & REKAPITULASI</Text>
        <View style={styles.menuGroupCard}>
          <TouchableOpacity 
            style={styles.menuItemRow} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PartnerDirectory')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconWrap}>
                <AssetVisual name="canteen_shop" size={18} />
              </View>
              <View>
                <Text style={styles.menuItemTitle}>Buku Direktori Mitra Kantin</Text>
                <Text style={styles.menuItemDesc}>Daftar PIC, kontak nomor WA, dan persentase komisi</Text>
              </View>
            </View>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 18L15 12L9 6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItemRow} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FinanceReport')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconWrap}>
                <AssetVisual name="chart_up" size={18} />
              </View>
              <View>
                <Text style={styles.menuItemTitle}>Laporan Analitik & Pembukuan</Text>
                <Text style={styles.menuItemDesc}>Rekap omzet mingguan, modal bahan, dan laba bersih</Text>
              </View>
            </View>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 18L15 12L9 6" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* PENCADANGAN BASIS DATA MANDIRI */}
        <Text style={styles.sectionLbl}>PENCADANGAN BASIS DATA MANDIRI</Text>
        <View style={styles.backupCard}>
          <Text style={styles.backupDescText}>
            Simpan salinan data resep kue, piutang kantin, dan riwayat kas harian Anda agar aman saat berganti perangkat baru.
          </Text>

          <View style={styles.backupButtonsRow}>
            <TouchableOpacity 
              style={styles.btnExport} 
              activeOpacity={0.8}
              onPress={handleExportClipboard}
            >
              <Text style={styles.btnExportText}>Cadangkan Data (Salin)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.btnRestore} 
              activeOpacity={0.8}
              onPress={handleRestoreClipboard}
            >
              <Text style={styles.btnRestoreText}>Pulihkan Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. TOMBOL KUNCI KASIR (MASUK LAYAR PIN) */}
        <TouchableOpacity 
          style={styles.lockAppBtn} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Auth')}
          accessibilityLabel="Kunci Kasir dan Keluar ke Layar PIN"
          accessibilityRole="button"
        >
          <Text style={styles.lockAppBtnText}>Kunci Kasir (Buka Layar PIN)</Text>
        </TouchableOpacity>

        {/* 7. FOOTER PUBLIK BERSIH (TANPA KATA TECH / UNIVERSAL JARGON) */}
        <View style={styles.publicFooter}>
          <Text style={styles.footerAppName}>KantinBite v1.0.0</Text>
          <Text style={styles.footerCopyright}>Aplikasi Pembukuan & Operasional Kuliner Harian</Text>
          <Text style={styles.footerCopyright}>© 2026 KantinBite. Seluruh hak cipta dilindungi.</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <ModernBottomNav activeTab="Me" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FAF8F5',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  headerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  headerTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EA580C',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -0.4,
  },
  scrollContent: {
    padding: 18,
  },
  heroCard: {
    padding: 18,
    marginBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefVisualBox: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  tagUniversal: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  tagUniversalText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
  },
  businessNameText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E293B',
  },
  ownerNameText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 1,
  },
  phoneText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
    marginTop: 4,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  shortcutBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    gap: 6,
  },
  shortcutLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  descText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  teamCard: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  teamHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 10,
  },
  memberList: {
    gap: 6,
  },
  memberText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '700',
    paddingVertical: 2,
  },
  lockAppBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DC2626',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lockAppBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
  },
});
