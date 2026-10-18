import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { PartnerAvatar, CanteenPodiumScene } from '../components/Mascot';
import { AnimatedPressable, AnimatedProgressBar } from '../components/PlayfulComponents';
import { getCanteens } from '../db/storage';

export const PartnerDirectoryScreen = ({ navigation }) => {
  const [partners, setPartners] = useState([
    {
      id: 'c1',
      name: 'Kantin Fakultas Teknik',
      pic: 'Pak Joko Sutrisno',
      phone: '081298765432',
      address: 'Lantai 1 Gedung Sayap Barat',
      dropSchedule: '06:30 Pagi',
      fee: 'Rp 400 / pcs',
      avgSold: '420 pcs / mgg',
      favoriteMenu: 'Risoles Rogout Ayam',
      absorption: 92,
      recommendation: 'Serapan tertinggi: kuota aman ditambah +10 pcs',
    },
    {
      id: 'c2',
      name: 'Koperasi Mahasiswa',
      pic: 'Mas Arif Hidayat',
      phone: '085711223344',
      address: 'Lobi Utama Gedung Rektorat',
      dropSchedule: '07:00 Pagi',
      fee: 'Rp 500 / pcs',
      avgSold: '315 pcs / mgg',
      favoriteMenu: 'Pastel Sayur Telur',
      absorption: 85,
      recommendation: 'Penjualan stabil: pertahankan 25 pcs setiap pagi',
    },
    {
      id: 'c3',
      name: 'Kantin SMPN 1 Cirebon',
      pic: 'Bu Siti Khodijah',
      phone: '081322334455',
      address: 'Pujasera Lapangan Olahraga',
      dropSchedule: '06:15 Pagi',
      fee: 'Rp 400 / pcs',
      avgSold: '280 pcs / mgg',
      favoriteMenu: 'Dadar Gulung Pandan',
      absorption: 78,
      recommendation: 'Laris saat jam istirahat pertama pukul 09:30',
    },
    {
      id: 'c4',
      name: 'Warung Kopi Kampus',
      pic: 'Bang Hendra',
      phone: '087811992233',
      address: 'Area Parkir Timur Kampus',
      dropSchedule: '06:45 Pagi',
      fee: 'Rp 300 / pcs',
      avgSold: '210 pcs / mgg',
      favoriteMenu: 'Lemper Ayam Ketan',
      absorption: 88,
      recommendation: 'Cocok ditambah variasi gorengan pedas',
    },
  ]);

  useEffect(() => {
    loadCanteens();
  }, []);

  const loadCanteens = async () => {
    const list = await getCanteens();
    if (list && list.length > 0) {
      const merged = list.map((c, idx) => ({
        id: c.id || String(idx),
        name: c.name,
        pic: c.pic,
        phone: c.phone || '081298765432',
        address: c.address || 'Area Kampus & Sekolah',
        dropSchedule: c.dropSchedule || '06:30 Pagi',
        fee: typeof c.fee === 'number' ? `Rp ${c.fee} / pcs` : c.fee || 'Rp 400 / pcs',
        avgSold: c.avgSold || '30 pcs / hari',
        favoriteMenu: c.favoriteMenu || 'Risoles Rogout Ayam',
        absorption: Number(c.absorption) || 88,
        recommendation: 'Mitra konsinyasi aktif dengan setoran rutin sore hari',
      }));
      setPartners(merged);
    }
  };

  const handleCallOrWhatsApp = (p) => {
    const cleanPhone = (p.phone || '081298765432').replace(/^0/, '62');
    const text = `Halo ${p.pic} (${p.name}), salam dari Dapur Berkah Bunda. Ingin konfirmasi jadwal pengantaran kue besok pagi pukul ${p.dropSchedule}.`;
    Linking.openURL(`whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`).catch(
      () => Alert.alert('Hubungi Mitra', `Membuka kontak WhatsApp ${p.pic} (${p.phone})`)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDD5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC CANTEEN DIRECTORY HEADER */}
        <ScenicBanner
          scene="canteen_afternoon"
          badgeText="JARINGAN MITRA KONSINYASI"
          title="Direktori & Podium Kantin"
          subtitle="Peringkat serapan kue tertinggi & kontak pengurus kantin"
          onBackPress={() => navigation.goBack()}
          actionLabel="Titip Kue"
          onActionPress={() => navigation.navigate('Consignment')}
        />

        <View style={styles.bodyPadding}>
          {/* 2. PODIUM 3 MITRA KANTIN TERLARIS (TERINSPIRASI REFERENSI 2 & 5) */}
          <Text style={styles.sectionTitle}>Podium Mitra Serapan Tertinggi</Text>
          <CanteenPodiumScene
            topThree={[
              { name: partners[0]?.name || 'Kantin Teknik', sold: '420 laku', pic: partners[0]?.pic },
              { name: partners[1]?.name || 'Kopma STIKOM', sold: '315 laku', pic: partners[1]?.pic },
              { name: partners[2]?.name || 'Kantin SMPN 1', sold: '280 laku', pic: partners[2]?.pic },
            ]}
          />

          {/* 3. DAFTAR KARTU MITRA DENGAN AVATAR KARAKTER PIC */}
          <Text style={styles.sectionTitle}>Daftar Gerai & Pengurus Kantin</Text>

          {partners.map((p, idx) => (
            <View key={p.id} style={styles.partnerCard}>
              <View style={styles.cardHeaderRow}>
                <PartnerAvatar name={p.pic} variant={idx} size={52} />
                <View style={styles.partnerHeadInfo}>
                  <Text style={styles.partnerName}>{p.name}</Text>
                  <Text style={styles.partnerPic}>
                    PIC: {p.pic} • {p.address}
                  </Text>
                </View>
                <View style={styles.absorptionBadge}>
                  <Text style={styles.absorptionBadgeText}>{p.absorption}% Laku</Text>
                </View>
              </View>

              <View style={{ marginVertical: 10 }}>
                <AnimatedProgressBar
                  percent={p.absorption}
                  color="#059669"
                  trackColor="#ECFDF5"
                  height={8}
                />
              </View>

              <View style={styles.metaGridRow}>
                <View style={styles.metaCell}>
                  <Text style={styles.metaLabel}>Antar Pagi</Text>
                  <Text style={styles.metaVal}>{p.dropSchedule}</Text>
                </View>
                <View style={styles.metaCell}>
                  <Text style={styles.metaLabel}>Komisi Kantin</Text>
                  <Text style={styles.metaVal}>{p.fee}</Text>
                </View>
                <View style={styles.metaCell}>
                  <Text style={styles.metaLabel}>Menu Favorit</Text>
                  <Text style={styles.metaVal} numberOfLines={1}>
                    {p.favoriteMenu}
                  </Text>
                </View>
              </View>

              <View style={styles.cardActionRow}>
                <AnimatedPressable
                  scaleTo={0.96}
                  style={styles.waBtn}
                  onPress={() => handleCallOrWhatsApp(p)}
                >
                  <Text style={styles.waBtnText}>Chat WhatsApp PIC</Text>
                </AnimatedPressable>

                <AnimatedPressable
                  scaleTo={0.96}
                  style={styles.dropBtn}
                  onPress={() => navigation.navigate('Consignment')}
                >
                  <Text style={styles.dropBtnText}>Input Rekap ›</Text>
                </AnimatedPressable>
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Activity" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bodyPadding: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 10,
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerHeadInfo: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 6,
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#18181B',
  },
  partnerPic: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  absorptionBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
  },
  absorptionBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#047857',
  },
  metaGridRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaCell: {
    flex: 1,
    paddingRight: 4,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
  metaVal: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 2,
  },
  cardActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  waBtn: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 10,
    borderRadius: 13,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#065F46',
  },
  waBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  dropBtn: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    paddingVertical: 10,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  dropBtnText: {
    color: '#EA580C',
    fontSize: 12,
    fontWeight: '900',
  },
});
