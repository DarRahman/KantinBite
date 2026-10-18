import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { PastelReferenceIcon } from '../components/PastelReferenceIcon';
import { AnimatedPressable } from '../components/PlayfulComponents';
import {
  getProfile,
  saveProfile,
  exportBackupJSON,
  restoreBackupJSON,
} from '../db/storage';

export const SettingsScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    businessName: 'Dapur Berkah Bunda',
    ownerName: 'Bunda Sumiati',
    phone: '081234567890',
    address: 'Jl. Kartini No. 18, Kejaksan',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBusiness, setEditBusiness] = useState('');
  const [editOwner, setEditOwner] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [restoreJsonText, setRestoreJsonText] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const p = await getProfile();
    if (p) {
      setProfile(p);
      setEditBusiness(p.businessName || 'Dapur Berkah Bunda');
      setEditOwner(p.ownerName || 'Bunda Sumiati');
      setEditPhone(p.phone || '081234567890');
      setEditAddress(p.address || 'Jl. Kartini No. 18, Kejaksan');
    }
  };

  const handleSaveProfile = async () => {
    const updated = await saveProfile({
      businessName: editBusiness.trim() || 'Dapur Berkah Bunda',
      ownerName: editOwner.trim() || 'Bunda Sumiati',
      phone: editPhone.trim() || '081234567890',
      address: editAddress.trim() || 'Jl. Kartini No. 18',
    });
    setProfile(updated);
    setIsEditOpen(false);
    Alert.alert('Profil Toko Diperbarui', 'Identitas dapur produksi telah disimpan.');
  };

  const handleExportBackup = async () => {
    try {
      const jsonStr = await exportBackupJSON();
      await Share.share({
        title: 'Cadangan Data Pembukuan KantinBite',
        message: jsonStr,
      });
    } catch (e) {
      Alert.alert('Gagal Mencadangkan', e.message);
    }
  };

  const handleRestoreData = async () => {
    if (!restoreJsonText.trim()) {
      Alert.alert('Data Kosong', 'Tempelkan teks JSON cadangan terlebih dahulu.');
      return;
    }
    try {
      await restoreBackupJSON(restoreJsonText.trim());
      setIsRestoreOpen(false);
      setRestoreJsonText('');
      await loadProfile();
      Alert.alert('Berhasil Dipulihkan', 'Seluruh resep, stok, dan kas telah dikembalikan.');
    } catch (e) {
      Alert.alert('Format Tidak Valid', 'Pastikan teks salinan cadangan lengkap dan benar.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC PROFILE & KITCHEN HEADER */}
        <ScenicBanner
          scene="kitchen_morning"
          badgeText="PROFIL & PENGATURAN TOKO"
          title={profile.businessName}
          subtitle={`Pemilik: ${profile.ownerName} • ${profile.phone}`}
          actionLabel="Ubah Profil"
          onActionPress={() => setIsEditOpen(true)}
        />

        <View style={styles.bodyPadding}>
          {/* 2. KARTU IDENTITAS DAPUR PRODUKSI */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.storeBadgeWrap}>
                <AssetVisual name="canteen_shop" size={42} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.storeNameText}>{profile.businessName}</Text>
                <Text style={styles.storeSubText}>
                  {profile.ownerName} • {profile.address}
                </Text>
                <Text style={styles.storePhoneText}>WhatsApp Nota: {profile.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.editPillBtn}
                onPress={() => setIsEditOpen(true)}
              >
                <Text style={styles.editPillText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. PUSAT MANAJEMEN & LAPORAN USAHA */}
          <Text style={styles.sectionTitle}>Pusat Rekapitulasi & Jaringan Mitra</Text>
          <View style={styles.bentoGrid}>
            <AnimatedPressable
              scaleTo={0.96}
              style={styles.bentoTile}
              onPress={() => navigation.navigate('PartnerDirectory')}
            >
              <PastelReferenceIcon type="partner" size={56} />
              <Text style={styles.bentoTileTitle}>Direktori Mitra</Text>
              <Text style={styles.bentoTileSub}>Podium & Kontak PIC</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.96}
              style={styles.bentoTile}
              onPress={() => navigation.navigate('FinanceReport')}
            >
              <PastelReferenceIcon type="report" size={56} />
              <Text style={styles.bentoTileTitle}>Laporan Laba</Text>
              <Text style={styles.bentoTileSub}>Analisis Untung Bersih</Text>
            </AnimatedPressable>
          </View>

          <View style={[styles.bentoGrid, { marginTop: 10 }]}>
            <AnimatedPressable
              scaleTo={0.96}
              style={styles.bentoTile}
              onPress={() => navigation.navigate('DebtLedger')}
            >
              <PastelReferenceIcon type="debt" size={56} />
              <Text style={styles.bentoTileTitle}>Buku Piutang</Text>
              <Text style={styles.bentoTileSub}>Tagihan Kantin</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.96}
              style={styles.bentoTile}
              onPress={() => navigation.navigate('Stock')}
            >
              <PastelReferenceIcon type="stock" size={56} />
              <Text style={styles.bentoTileTitle}>Gudang Bahan</Text>
              <Text style={styles.bentoTileSub}>Cek Stok Tepung & Gas</Text>
            </AnimatedPressable>
          </View>

          {/* 4. CADANGAN DATA PEMBUKUAN MANDIRI */}
          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
            Cadangan Data Pembukuan
          </Text>
          <View style={styles.backupCard}>
            <View style={styles.backupTopRow}>
              <AssetVisual name="package_box" size={44} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.backupTitle}>Simpan Salinan Buku Kas & Resep</Text>
                <Text style={styles.backupSub}>
                  Seluruh data tersimpan aman di perangkat Anda tanpa perlu kuota internet.
                </Text>
              </View>
            </View>

            <View style={styles.backupBtnRow}>
              <AnimatedPressable
                scaleTo={0.96}
                style={styles.exportBtn}
                onPress={handleExportBackup}
              >
                <Text style={styles.exportBtnText}>Bagikan Salinan Data</Text>
              </AnimatedPressable>

              <AnimatedPressable
                scaleTo={0.96}
                style={styles.restoreBtn}
                onPress={() => setIsRestoreOpen(true)}
              >
                <Text style={styles.restoreBtnText}>Pulihkan Data</Text>
              </AnimatedPressable>
            </View>
          </View>

          {/* 5. KUNCI LAYAR KASIR (PIN 6 ANGKA) */}
          <AnimatedPressable
            scaleTo={0.98}
            style={styles.lockPinCard}
            onPress={() => navigation.navigate('Auth')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <AssetVisual name="check_badge" size={32} />
              <View>
                <Text style={styles.lockPinTitle}>Buka Layar Kunci PIN Kasir</Text>
                <Text style={styles.lockPinSub}>
                  Kunci buku kas saat HP dipinjam asisten lapak
                </Text>
              </View>
            </View>
            <Text style={styles.lockPinAction}>Kunci ›</Text>
          </AnimatedPressable>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* MODAL EDIT PROFIL TOKO */}
      <Modal visible={isEditOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Ubah Profil Dapur Usaha</Text>

            <Text style={styles.inputLbl}>Nama Usaha / Toko</Text>
            <TextInput
              style={styles.modalInput}
              value={editBusiness}
              onChangeText={setEditBusiness}
            />

            <Text style={styles.inputLbl}>Nama Pemilik</Text>
            <TextInput
              style={styles.modalInput}
              value={editOwner}
              onChangeText={setEditOwner}
            />

            <Text style={styles.inputLbl}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="phone-pad"
              value={editPhone}
              onChangeText={setEditPhone}
            />

            <Text style={styles.inputLbl}>Alamat Dapur</Text>
            <TextInput
              style={styles.modalInput}
              value={editAddress}
              onChangeText={setEditAddress}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsEditOpen(false)}
              >
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalSaveText}>Simpan Profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL PULIHKAN DATA JSON */}
      <Modal visible={isRestoreOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Pulihkan Salinan Pembukuan</Text>
            <TextInput
              style={[styles.modalInput, { height: 100, textAlignVertical: 'top', marginTop: 10 }]}
              multiline
              placeholder="Tempelkan teks JSON cadangan KantinBite di sini..."
              value={restoreJsonText}
              onChangeText={setRestoreJsonText}
            />
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsRestoreOpen(false)}
              >
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleRestoreData}
              >
                <Text style={styles.modalSaveText}>Pulihkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ModernBottomNav activeTab="Me" navigation={navigation} />
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
  profileCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
    marginBottom: 18,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeBadgeWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  storeNameText: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#18181B',
  },
  storeSubText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
  },
  storePhoneText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
    marginTop: 2,
  },
  editPillBtn: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 11,
  },
  editPillText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 10,
  },
  bentoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
  },
  bentoTileTitle: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 8,
  },
  bentoTileSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  backupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 4,
    borderBottomColor: '#FDBA74',
    marginBottom: 14,
  },
  backupTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backupTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  backupSub: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  backupBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  exportBtn: {
    flex: 1.2,
    backgroundColor: '#EA580C',
    paddingVertical: 11,
    borderRadius: 13,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#9A3412',
  },
  exportBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  restoreBtn: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    paddingVertical: 11,
    borderRadius: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  restoreBtnText: {
    color: '#EA580C',
    fontSize: 12,
    fontWeight: '900',
  },
  lockPinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  lockPinTitle: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#18181B',
  },
  lockPinSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 1,
  },
  lockPinAction: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 24, 27, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 8,
  },
  inputLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#52525B',
    marginTop: 8,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#18181B',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },
  modalSaveBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
