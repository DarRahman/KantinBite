import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Linking, Alert } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';

export const PartnerDirectoryScreen = ({ navigation }) => {
  const [partners, setPartners] = useState([
    {
      id: 'p1',
      name: 'Kantin Fakultas Teknik (FT)',
      pic: 'Pak Joko Sutrisno',
      phone: '081298765432',
      address: 'Lantai 1 Gedung Sayap Barat STIKOM',
      dropSchedule: '06:30 Pagi',
      fee: 'Rp 500 / pcs',
      avgSold: '25-30 pcs / hari',
      favoriteMenu: 'Risoles Rogout Mayo',
      isActive: true,
    },
    {
      id: 'p2',
      name: 'Koperasi Mahasiswa STIKOM',
      pic: 'Mas Arif Hidayat',
      phone: '085711223344',
      address: 'Lobi Utama Gedung Rektorat',
      dropSchedule: '07:00 Pagi',
      fee: 'Rp 500 / pcs',
      avgSold: '20-25 pcs / hari',
      favoriteMenu: 'Pastel Telur Sayur',
      isActive: true,
    },
    {
      id: 'p3',
      name: 'Kantin SMP Negeri 1 Cirebon',
      pic: 'Ibu Hj. Siti Khodijah',
      phone: '081322334455',
      address: 'Pujasera Belakang Lapangan Olahraga',
      dropSchedule: '06:15 Pagi',
      fee: 'Rp 400 / pcs',
      avgSold: '40-50 pcs / hari',
      favoriteMenu: 'Dadar Gulung & Lemper Ayam',
      isActive: true,
    },
    {
      id: 'p4',
      name: 'Lapak Subuh Pasar Kanoman',
      pic: 'Bang Ujang',
      phone: '087811992233',
      address: 'Blok Kue Basah No. 14 Pasar Kanoman',
      dropSchedule: '04:30 Subuh',
      fee: 'Grosir Putus',
      avgSold: '60 pcs / hari',
      favoriteMenu: 'Aneka Gorengan Campur',
      isActive: true,
    },
  ]);

  const handleCallOrWhatsApp = (p) => {
    const text = `Halo ${p.pic} (${p.name}), salam dari KantinBite. Mau konfirmasi jadwal titip kue besok pagi apakah tetap sama?`;
    Linking.openURL(`whatsapp://send?phone=62${p.phone.slice(1)}&text=${encodeURIComponent(text)}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="canteen_shop" size={16} />
            <Text style={styles.headerTagText}>JARINGAN DISTRIBUSI KULINER</Text>
          </View>
          <Text style={styles.headerTitle}>Direktori Mitra Kantin</Text>
        </View>

        <TouchableOpacity 
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Tambah Mitra', 'Form pendaftaran mitra kantin baru siap dibuka.')}
        >
          <Text style={styles.addBtnText}>+ Mitra Baru</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO TOTAL MITRA */}
        <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.heroBento}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubLabel}>JARINGAN TITIP KONSINYASI AKTIF</Text>
              <Text style={styles.heroCountText}>{partners.length} Gerai Mitra</Text>
            </View>
            <View style={styles.canteenVisualWrap}>
              <AssetVisual name="canteen_shop" size={52} />
            </View>
          </View>

          <Text style={styles.heroDesc}>
            Menjangkau 4 titik distribusi sekolah, kampus, dan pasar dengan potensi serapan 150+ kue basah setiap pagi.
          </Text>
        </BentoCard>

        {/* LIST KARTU MITRA */}
        <Text style={styles.sectionTitle}>Daftar Titik Penjualan & Kontak PIC</Text>
        {partners.map((p) => (
          <BentoCard key={p.id} bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.partnerCard}>
            
            <View style={styles.cardHeaderRow}>
              <View style={styles.iconBox}>
                <AssetVisual name="canteen_shop" size={40} />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.statusBadgeRow}>
                  <View style={styles.activePill}>
                    <Text style={styles.activePillText}>● AKTIF BEROPERASI</Text>
                  </View>
                  <Text style={styles.scheduleText}>⏰ {p.dropSchedule}</Text>
                </View>

                <Text style={styles.partnerNameText}>{p.name}</Text>
                <Text style={styles.picText}>PIC: {p.pic} • {p.phone}</Text>
              </View>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.addressText}>📍 {p.address}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Komisi: <Text style={{ color: '#EA580C', fontWeight: '800' }}>{p.fee}</Text></Text>
                <Text style={styles.metaLabel}>Rata-rata: <Text style={{ color: '#15803D', fontWeight: '800' }}>{p.avgSold}</Text></Text>
              </View>
              <Text style={styles.favText}>⭐ Menu Favorit: {p.favoriteMenu}</Text>
            </View>

            <View style={styles.actionBtnRow}>
              <TactileButton
                size="sm"
                variant="secondary"
                style={{ flex: 1 }}
                icon={<AssetVisual name="receipt_bill" size={16} />}
                onPress={() => navigation.navigate('Consignment')}
              >
                Titip Kue Pagi
              </TactileButton>

              <TactileButton
                size="sm"
                variant="accent"
                style={{ flex: 1 }}
                icon={<AssetVisual name="chef_mascot" size={16} />}
                onPress={() => handleCallOrWhatsApp(p)}
              >
                Chat WhatsApp
              </TactileButton>
            </View>

          </BentoCard>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Consignment" navigation={navigation} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 0.6,
  },
  heroCountText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: -0.8,
    marginTop: 2,
  },
  canteenVisualWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  heroDesc: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  partnerCard: {
    padding: 16,
    marginBottom: 14,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  activePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#15803D',
  },
  scheduleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  partnerNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  picText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  detailBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  addressText: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  metaLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  favText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '700',
    marginTop: 3,
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
});
