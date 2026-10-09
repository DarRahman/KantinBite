import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="chef_mascot" size={16} />
            <Text style={styles.headerTagText}>PENGATURAN & IDENTITAS SISTEM</Text>
          </View>
          <Text style={styles.headerTitle}>Profil Usaha & Cadangan</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO KARTU PROFIL USAHA UNIVERSAL */}
        <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.heroBento}>
          <View style={styles.heroTopRow}>
            <View style={styles.chefVisualBox}>
              <AssetVisual name="chef_mascot" size={54} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={styles.tagUniversal}>
                <Text style={styles.tagUniversalText}>UNIVERSAL SAAS UMKM</Text>
              </View>
              <Text style={styles.businessNameText}>{profile.businessName}</Text>
              <Text style={styles.ownerNameText}>Pemilik: {profile.ownerName}</Text>
              <Text style={styles.phoneText}>WA: {profile.phone}</Text>
            </View>
          </View>
        </BentoCard>

        {/* SHORTCUT MENU BARU */}
        <Text style={styles.sectionTitle}>Fitur Tambahan Operasional</Text>
        <View style={styles.shortcutRow}>
          <TouchableOpacity 
            style={styles.shortcutBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Stock')}
          >
            <AssetVisual name="wheat_flour" size={28} />
            <Text style={styles.shortcutLabel}>Gudang Stok</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shortcutBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MarketShopping')}
          >
            <AssetVisual name="market_cart" size={28} />
            <Text style={styles.shortcutLabel}>Belanja Subuh</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shortcutBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DebtLedger')}
          >
            <AssetVisual name="money_cash" size={28} />
            <Text style={styles.shortcutLabel}>Buku Piutang</Text>
          </TouchableOpacity>
        </View>

        {/* CADANGAN DATA OFFLINE DENGAN CLIPBOARD */}
        <Text style={styles.sectionTitle}>Pencadangan & Pemulihan (SQLite Lokal)</Text>
        <BentoCard bg="#FFFFFF" accentBorder="#E2E8F0" style={{ padding: 16, marginBottom: 16 }}>
          <Text style={styles.descText}>
            Simpan data resep kue, piutang kantin, dan riwayat kas harian agar tidak hilang saat berganti ponsel.
          </Text>

          <View style={{ gap: 10, marginTop: 10 }}>
            <TactileButton
              variant="secondary"
              icon={<AssetVisual name="package_box" size={20} />}
              onPress={handleExportClipboard}
            >
              Salin Cadangan Data (Backup JSON)
            </TactileButton>

            <TactileButton
              variant="accent"
              icon={<AssetVisual name="check_badge" size={20} />}
              onPress={handleRestoreClipboard}
            >
              Pulihkan Data dari Clipboard
            </TactileButton>
          </View>
        </BentoCard>

        {/* ANGGOTA KELOMPOK C (BADAR RAHMAN #1) */}
        <Text style={styles.sectionTitle}>Tim Pengembang Kelompok C</Text>
        <BentoCard bg="#F8FAFC" accentBorder="#CBD5E1" style={styles.teamCard}>
          <Text style={styles.teamHeaderTitle}>STIKOM Poltek Cirebon • Teknik Informatika</Text>
          
          <View style={styles.memberList}>
            <View style={styles.leaderRow}>
              <AssetVisual name="chef_mascot" size={20} />
              <Text style={styles.leaderText}>1. Badar Rahman (14524303) - Ketua Kelompok</Text>
            </View>
            <Text style={styles.memberText}>2. Avivah (14524013)</Text>
            <Text style={styles.memberText}>3. Cindy Septiani (24525404)</Text>
            <Text style={styles.memberText}>4. Nezla Veronika Putri (14524214)</Text>
            <Text style={styles.memberText}>5. Raehan Pramudia Nugraha (14524304)</Text>
            <Text style={styles.memberText}>6. Raihan Al Farizi (14524302)</Text>
            <Text style={styles.memberText}>7. Wisnu Hadi Pradana (14524309)</Text>
          </View>
        </BentoCard>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Settings" navigation={navigation} />
    </View>
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
  heroBento: {
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
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  leaderText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#B45309',
  },
  memberText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 6,
  },
});
