import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { Mascot } from '../components/Mascot';
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
        
        {/* 2. HERO PROFIL TOKO CHUNKY (KREM MADU & MASCOT BITEY) */}
        <View style={styles.heroProfileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatarCircleWrap}>
              <Mascot size={52} />
            </View>

            <View style={styles.profileTextCol}>
              <View style={styles.statusPillLive}>
                <Text style={styles.statusPillText}>TOKO BUKA</Text>
              </View>
              <Text style={styles.profileBizTitle}>{profile.businessName || 'Dapur Berkah Bunda'}</Text>
              <Text style={styles.profileOwnerSub}>{profile.ownerName || 'Bunda Sumiati'} • {profile.phone || '0812-3456-7890'}</Text>
            </View>

            <TouchableOpacity 
              style={styles.editBtnChunky}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Ubah Profil Usaha', 'Form pengubahan nama usaha dan kontak operasional.')}
              accessibilityLabel="Ubah Profil Usaha"
              accessibilityRole="button"
            >
              <Text style={styles.editBtnText}>Ubah</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. DUA KARTU BENTO OPERASIONAL UTAMA (KEMITRAAN & LAPORAN KEUANGAN) */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeadingText}>Pusat Rekapitulasi</Text>
          <Text style={styles.sectionSubtitleBadge}>Akses Cepat</Text>
        </View>

        <View style={styles.dualBentoRow}>
          {/* KARTU 1: DIREKTORI REKANAN KANTIN */}
          <TouchableOpacity
            style={styles.bentoCardPartner}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('PartnerDirectory')}
            accessibilityLabel="Buka Direktori Rekanan Kantin"
            accessibilityRole="button"
          >
            <View style={styles.bentoIconBoxPartner}>
              <AssetVisual name="canteen_shop" size={26} />
            </View>
            <Text style={styles.bentoCardTitle}>Direktori Rekanan</Text>
            <Text style={styles.bentoCardSub}>4 Mitra Kantin Aktif</Text>
            <View style={styles.bentoCardActionPill}>
              <Text style={styles.bentoActionText}>Buka Mitra ›</Text>
            </View>
          </TouchableOpacity>

          {/* KARTU 2: LAPORAN ANALITIK KEUANGAN */}
          <TouchableOpacity
            style={styles.bentoCardFinance}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('FinanceReport')}
            accessibilityLabel="Buka Laporan Analitik Keuangan"
            accessibilityRole="button"
          >
            <View style={styles.bentoIconBoxFinance}>
              <AssetVisual name="chart_up" size={26} />
            </View>
            <Text style={styles.bentoCardTitle}>Laporan Keuangan</Text>
            <Text style={styles.bentoCardSub}>Analisis Laba & PDF</Text>
            <View style={styles.bentoCardActionPillGreen}>
              <Text style={styles.bentoActionTextGreen}>Lihat Laporan ›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 4. SEKSI KEAMANAN KASIR & AKSES PIN */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeadingText}>Keamanan & Akses Kasir</Text>
        </View>

        <View style={styles.chunkyCardGroup}>
          <TouchableOpacity 
            style={styles.chunkyRowItem} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Kunci PIN Kasir', 'Kunci PIN transaksi 6 digit aktif untuk melindungi kas toko.')}
            accessibilityLabel="Kunci PIN Transaksi"
            accessibilityRole="button"
          >
            <View style={styles.rowIconWrap}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.4}>
                <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </Svg>
            </View>
            <View style={styles.rowTextCol}>
              <Text style={styles.rowTitleText}>Kunci PIN Kasir (6 Digit)</Text>
              <Text style={styles.rowDescText}>Proteksi buka buku kas & laporan keuangan</Text>
            </View>
            <View style={styles.pinActiveBadge}>
              <Text style={styles.pinActiveBadgeText}>PIN AKTIF</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity 
            style={styles.chunkyRowItem} 
            activeOpacity={0.7}
            onPress={() => Alert.alert('Hak Akses Karyawan', 'Pengaturan pembatasan akses untuk kasir dan asisten dapur.')}
            accessibilityLabel="Hak Akses Karyawan"
            accessibilityRole="button"
          >
            <View style={styles.rowIconWrap}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2.2}>
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx="12" cy="7" r="4" />
              </Svg>
            </View>
            <View style={styles.rowTextCol}>
              <Text style={styles.rowTitleText}>Hak Akses Staf Kasir</Text>
              <Text style={styles.rowDescText}>Akses penjualan kilat tanpa melihat data modal</Text>
            </View>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2.5}>
              <Path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* 5. SEKSI PENCADANGAN PEMBUKUAN (CHUNKY BACKUP CARD) */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeadingText}>Salinan Data Pembukuan</Text>
        </View>

        <View style={styles.backupCardChunky}>
          <View style={styles.backupHeadRow}>
            <View style={styles.backupIconBox}>
              <AssetVisual name="package_box" size={24} />
            </View>
            <View style={styles.backupHeadTextCol}>
              <Text style={styles.backupTitleText}>Cadangan Mandiri di Perangkat</Text>
              <Text style={styles.backupDescText}>
                Simpan salinan resep kue, catatan piutang kantin, dan kas harian agar aman di HP Anda.
              </Text>
            </View>
          </View>

          <View style={styles.backupBtnRow}>
            <TouchableOpacity 
              style={styles.btnBackupExport} 
              activeOpacity={0.85}
              onPress={handleExportClipboard}
              accessibilityLabel="Salin Cadangan Pembukuan"
              accessibilityRole="button"
            >
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5}>
                <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </Svg>
              <Text style={styles.btnBackupExportText}>Salin Cadangan</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.btnBackupRestore} 
              activeOpacity={0.85}
              onPress={handleRestoreClipboard}
              accessibilityLabel="Pulihkan Data Pembukuan"
              accessibilityRole="button"
            >
              <Text style={styles.btnBackupRestoreText}>Pulihkan Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. TOMBOL KUNCI KASIR (MASUK LAYAR PIN) */}
        <TouchableOpacity 
          style={styles.lockAppBtn} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Auth')}
          accessibilityLabel="Kunci Kasir dan Keluar ke Layar PIN"
          accessibilityRole="button"
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2.4}>
            <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </Svg>
          <Text style={styles.lockAppBtnText}>Kunci Kasir (Buka Layar Masuk PIN)</Text>
        </TouchableOpacity>

        {/* 7. FOOTER RESMI PUBLIK BERSIH */}
        <View style={styles.publicFooter}>
          <Text style={styles.footerAppName}>KantinBite v1.0.0</Text>
          <Text style={styles.footerCopyright}>Sistem Operasional Kuliner & Pembukuan Mandiri</Text>
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
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  // HERO PROFILE CARD CHUNKY
  heroProfileCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 5,
    borderBottomColor: '#1E293B',
    padding: 16,
    marginBottom: 16,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircleWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTextCol: {
    flex: 1,
  },
  statusPillLive: {
    backgroundColor: '#1E293B',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  statusPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  profileBizTitle: {
    fontSize: 16.5,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  profileOwnerSub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 1,
  },
  editBtnChunky: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.8,
    borderColor: '#1E293B',
    borderBottomWidth: 3,
    borderBottomColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  editBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1E293B',
  },
  // SECTION HEADINGS
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  sectionHeadingText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  sectionSubtitleBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EA580C',
  },
  // DUAL BENTO CARDS
  dualBentoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  bentoCardPartner: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4,
    borderBottomColor: '#1E293B',
    padding: 14,
  },
  bentoCardFinance: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4,
    borderBottomColor: '#1E293B',
    padding: 14,
  },
  bentoIconBoxPartner: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bentoIconBoxFinance: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bentoCardTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2,
  },
  bentoCardSub: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  bentoCardActionPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#1E293B',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  bentoActionText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#065F46',
  },
  bentoCardActionPillGreen: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#1E293B',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  bentoActionTextGreen: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  // CHUNKY CARD GROUP (KEAMANAN)
  chunkyCardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4,
    borderBottomColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  chunkyRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FAF8F5',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rowTextCol: {
    flex: 1,
  },
  rowTitleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  rowDescText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  pinActiveBadge: {
    backgroundColor: '#059669',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pinActiveBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F1EFEA',
  },
  // BACKUP CARD CHUNKY
  backupCardChunky: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4,
    borderBottomColor: '#1E293B',
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  backupHeadRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  backupIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backupHeadTextCol: {
    flex: 1,
  },
  backupTitleText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2,
  },
  backupDescText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    lineHeight: 15,
  },
  backupBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnBackupExport: {
    flex: 1,
    backgroundColor: '#EA580C',
    borderRadius: 14,
    borderWidth: 1.8,
    borderColor: '#1E293B',
    borderBottomWidth: 3.5,
    borderBottomColor: '#C2410C',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnBackupExportText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  btnBackupRestore: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.8,
    borderColor: '#1E293B',
    borderBottomWidth: 3.5,
    borderBottomColor: '#1E293B',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBackupRestoreText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '900',
  },
  // LOCK APP BTN
  lockAppBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DC2626',
    borderBottomWidth: 4,
    borderBottomColor: '#DC2626',
    borderRadius: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  lockAppBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '900',
  },
  // FOOTER
  publicFooter: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: 8,
  },
  footerAppName: {
    fontSize: 12,
    fontWeight: '900',
    color: '#475569',
  },
  footerCopyright: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
