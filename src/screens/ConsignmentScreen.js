import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ScreenHeader, PrimaryActionBadge } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { FoodVisual } from '../components/FoodVisual';
import { getConsignment, getCanteens, addCanteen, saveConsignment, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { calculateConsignmentSettlement } from '../utils/calculations';
import { colors } from '../theme/tokens';

export const ConsignmentScreen = ({ navigation }) => {
  const [canteens, setCanteens] = useState([]);
  const [products, setProducts] = useState([]);

  // Modal Lapak State
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [showLapakModal, setShowLapakModal] = useState(false);
  const [lapakMode, setLapakMode] = useState('BUKA'); // 'BUKA' atau 'REKAP'

  // Simpan status sesi lapak harian per kantin di memori
  const [sessions, setSessions] = useState({
    c1: {
      status: 'ONGOING',
      items: [{ name: 'Risoles Rogout', price: 1200, unitPrice: 1000, titip: 30, retur: 5, laku: 25 }]
    }
  });

  // State Input Form Titip Pagi di Modal
  const [titipQtyInput, setTitipQtyInput] = useState('30');
  const [returQtyInput, setReturQtyInput] = useState('5');

  // Modal Tambah Kantin Baru
  const [isAddCanteenOpen, setIsAddCanteenOpen] = useState(false);
  const [newCanteenName, setNewCanteenName] = useState('');
  const [newPic, setNewPic] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cList = await getCanteens();
    const pList = await getProducts();
    setCanteens(cList);
    setProducts(pList);
  };

  const handleOpenLapakModal = (canteen) => {
    setSelectedCanteen(canteen);
    const existingSession = sessions[canteen.id];
    if (existingSession && existingSession.status === 'ONGOING') {
      setLapakMode('REKAP');
      const item = existingSession.items[0] || { titip: 30, retur: 0 };
      setTitipQtyInput(item.titip.toString());
      setReturQtyInput(item.retur.toString());
    } else {
      setLapakMode('BUKA');
      setTitipQtyInput('30');
      setReturQtyInput('0');
    }
    setShowLapakModal(true);
  };

  const handleBukaLapak = () => {
    const qty = Number(titipQtyInput) || 0;
    if (qty <= 0) {
      Alert.alert('Perhatian', 'Masukkan jumlah kue yang dititipkan pagi ini.');
      return;
    }
    setSessions({
      ...sessions,
      [selectedCanteen.id]: {
        status: 'ONGOING',
        items: [{ name: 'Risoles Rogout', price: 1200, unitPrice: 1000, titip: qty, retur: 0, laku: qty }]
      }
    });
    setShowLapakModal(false);
    Alert.alert('Lapak Dibuka', `Penitipan ${qty} pcs di ${selectedCanteen.name} berhasil dicatat.`);
  };

  const handleTutupLapak = () => {
    const titip = Number(titipQtyInput) || 30;
    const retur = Number(returQtyInput) || 0;
    if (retur > titip) {
      Alert.alert('Perhatian', 'Sisa retur tidak boleh lebih besar dari kue yang dititipkan.');
      return;
    }
    const laku = titip - retur;
    const totalSetoran = laku * 1000;

    setSessions({
      ...sessions,
      [selectedCanteen.id]: {
        status: 'COMPLETED',
        items: [{ name: 'Risoles Rogout', price: 1200, unitPrice: 1000, titip, retur, laku, totalSetoran }]
      }
    });
    setShowLapakModal(false);
    Alert.alert(
      'Rekap Sore Selesai',
      `Kue laku: ${laku} pcs. Total setoran ${formatRupiah(totalSetoran)} tercatat di kas.`,
      [
        { text: 'Kirim Nota WA', onPress: () => navigation.navigate('Receipt') },
        { text: 'Selesai', onPress: () => navigation.navigate('Dashboard') }
      ]
    );
  };

  const handleSaveNewCanteen = async () => {
    if (!newCanteenName.trim() || !newPic.trim()) {
      Alert.alert('Perhatian', 'Nama kantin dan PIC wajib diisi.');
      return;
    }
    await addCanteen({
      name: newCanteenName.trim(),
      pic: newPic.trim(),
      phone: newPhone.trim() || '08123456789'
    });
    setNewCanteenName('');
    setNewPic('');
    setNewPhone('');
    setIsAddCanteenOpen(false);
    await loadData();
    Alert.alert('Sukses', 'Kantin baru berhasil ditambahkan.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Titip Kantin"
        subtitle="Pagi Nitip, Sore Ambil Uang"
        rightElement={
          <PrimaryActionBadge label="+ Kantin Baru" onPress={() => setIsAddCanteenOpen(true)} />
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BANNER TANGGAL OPERASIONAL PERSIS DAPUR-RN */}
        <View style={styles.dateBar}>
          <Text style={styles.dateBarText}>HARI INI (Kamis, 8 Okt 2026)</Text>
        </View>

        {/* DAFTAR KANTIN VERTIKAL UTUH PERSIS DAPUR-RN */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Daftar Kantin Mitra</Text>
          <Text style={styles.sectionSubtitle}>{canteens.length} Kantin Terdaftar</Text>
        </View>

        {canteens.length === 0 ? (
          <EmptyState
            title="Belum Ada Kantin"
            message="Ketuk tombol + Kantin Baru di pojok kanan atas untuk menambahkan mitra kantin."
            iconType="canteen"
          />
        ) : (
          canteens.map((canteen) => {
            const session = sessions[canteen.id];
            const isOngoing = session?.status === 'ONGOING';
            const isCompleted = session?.status === 'COMPLETED';

            let statusBg = '#FAFAFA';
            let statusText = '• Belum Nitip Hari Ini';
            let statusColor = '#71717A';

            if (isOngoing) {
              statusBg = '#FFFBEB';
              statusText = '• Lapak Sedang Berjalan (Nitip Pagi)';
              statusColor = '#D97706';
            } else if (isCompleted) {
              statusBg = '#F0FDF4';
              statusText = '• Selesai (Rekap Sore Disetor)';
              statusColor = '#059669';
            }

            return (
              <View key={canteen.id} style={[styles.canteenCardFull, { backgroundColor: statusBg }]}>
                
                {/* BARIS ATAS: ASET TOKO SVG + NAMA + PIC */}
                <View style={styles.canteenCardHeader}>
                  <View style={styles.canteenIconBox}>
                    <FoodVisual type="canteen_shop" size={44} />
                  </View>
                  <View style={styles.canteenInfoText}>
                    <Text style={styles.canteenName}>{canteen.name}</Text>
                    <Text style={styles.canteenPic}>PIC: {canteen.pic} • {canteen.phone || '-'}</Text>
                    <Text style={[styles.canteenStatusText, { color: statusColor }]}>{statusText}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.waIconBtn}
                    onPress={() => Linking.openURL(`whatsapp://send?phone=62${(canteen.phone || '').slice(1)}`)}
                  >
                    <Text style={styles.waIconText}>WA</Text>
                  </TouchableOpacity>
                </View>

                {/* TOMBOL AKSI SESI LAPAK */}
                <TouchableOpacity
                  style={[styles.btnOpenLapak, isOngoing ? styles.btnOngoing : styles.btnStart]}
                  activeOpacity={0.8}
                  onPress={() => handleOpenLapakModal(canteen)}
                >
                  <Text style={[styles.btnOpenLapakText, isOngoing ? styles.textOngoing : styles.textStart]}>
                    {isOngoing ? 'Rekap Sore (Ambil Uang)' : isCompleted ? 'Buka Data Lapak' : 'Mulai Titip Pagi (Buka Lapak)'}
                  </Text>
                </TouchableOpacity>

              </View>
            );
          })
        )}

      </ScrollView>

      {/* MODAL LAPAK KANTIN PERSIS SEPERTI DAPUR-RN */}
      <Modal visible={showLapakModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalCanteenTitle}>{selectedCanteen?.name}</Text>
                <Text style={styles.modalCanteenSubtitle}>PIC: {selectedCanteen?.pic} • Sesi {lapakMode === 'BUKA' ? 'Pagi (Nitip)' : 'Sore (Rekap)'}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowLapakModal(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              
              {/* ITEM JAJANAN YANG DITITIP */}
              <View style={styles.modalItemRow}>
                <FoodVisual type="risoles" size={48} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.modalItemName}>Risoles Rogout Ayam</Text>
                  <Text style={styles.modalItemPrice}>Harga Titip Satuan: Rp 1.000 / pcs</Text>
                </View>
              </View>

              {lapakMode === 'BUKA' ? (
                <View style={styles.lapakInputSection}>
                  <Text style={styles.fLabel}>Jumlah Kue Dititipkan (Pagi):</Text>
                  <TextInput
                    style={styles.fInputBig}
                    placeholder="30"
                    keyboardType="number-pad"
                    value={titipQtyInput}
                    onChangeText={setTitipQtyInput}
                  />
                  <Text style={styles.helpDesc}>Kue akan dicatat sebagai barang aktif di lapak kantin.</Text>
                </View>
              ) : (
                <View style={styles.rekapSection}>
                  <View style={styles.rekapRow}>
                    <Text style={styles.rekapLabel}>Total Kue Dititip Pagi:</Text>
                    <Text style={styles.rekapVal}>{titipQtyInput} pcs</Text>
                  </View>
                  <View style={styles.rekapRow}>
                    <Text style={styles.rekapLabel}>Sisa Retur Fisik Sore:</Text>
                    <TextInput
                      style={styles.returInputBox}
                      value={returQtyInput}
                      onChangeText={setReturQtyInput}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={styles.rekapRow}>
                    <Text style={styles.rekapLabel}>Kue Terjual Laku:</Text>
                    <Text style={[styles.rekapVal, { color: '#059669', fontWeight: '800' }]}>
                      {Math.max(0, Number(titipQtyInput) - Number(returQtyInput))} pcs
                    </Text>
                  </View>
                  <View style={styles.rekapTotalRow}>
                    <Text style={styles.rekapTotalLabel}>Wajib Setor (@Rp 1.000):</Text>
                    <Text style={styles.rekapTotalVal}>
                      {formatRupiah(Math.max(0, Number(titipQtyInput) - Number(returQtyInput)) * 1000)}
                    </Text>
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={styles.btnPrimaryLapak}
                activeOpacity={0.8}
                onPress={lapakMode === 'BUKA' ? handleBukaLapak : handleTutupLapak}
              >
                <Text style={styles.btnPrimaryLapakText}>
                  {lapakMode === 'BUKA' ? 'Terbitkan Nota Titip Pagi' : 'Simpan Rekap & Ambil Uang'}
                </Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>

      {/* MODAL TAMBAH KANTIN BARU */}
      <Modal visible={isAddCanteenOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Tambah Kantin Baru</Text>
              <TouchableOpacity onPress={() => setIsAddCanteenOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.fLabel}>Nama Kantin</Text>
            <TextInput
              style={styles.fInput}
              placeholder="Contoh: Kantin Gedung Kuliah B"
              value={newCanteenName}
              onChangeText={setNewCanteenName}
            />

            <Text style={styles.fLabel}>Nama PIC / Penjaga Kantin</Text>
            <TextInput
              style={styles.fInput}
              placeholder="Contoh: Bu Ratna"
              value={newPic}
              onChangeText={setNewPic}
            />

            <Text style={styles.fLabel}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.fInput}
              placeholder="Contoh: 08123456789"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setIsAddCanteenOpen(false)}>
                <Text style={styles.btnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={handleSaveNewCanteen}>
                <Text style={styles.btnSaveText}>Simpan Kantin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav activeTab="Consignment" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1
  },
  dateBar: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  dateBarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
    textAlign: 'center'
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '600'
  },
  canteenCardFull: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  canteenCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  canteenIconBox: {
    width: 48,
    height: 48,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  canteenInfoText: {
    flex: 1
  },
  canteenName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  canteenPic: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2
  },
  canteenStatusText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4
  },
  waIconBtn: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  waIconText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669'
  },
  btnOpenLapak: {
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center'
  },
  btnStart: {
    backgroundColor: '#F4F4F5'
  },
  textStart: {
    color: '#18181B',
    fontWeight: '700',
    fontSize: 13
  },
  btnOngoing: {
    backgroundColor: '#EA580C'
  },
  textOngoing: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    paddingBottom: 10
  },
  modalCanteenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#18181B'
  },
  modalCanteenSubtitle: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2
  },
  closeBtn: {
    padding: 6
  },
  closeText: {
    fontSize: 18,
    color: '#71717A',
    fontWeight: '800'
  },
  modalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14
  },
  modalItemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18181B'
  },
  modalItemPrice: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2
  },
  lapakInputSection: {
    marginBottom: 16
  },
  fLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 6
  },
  fInputBig: {
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 6
  },
  helpDesc: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 6
  },
  rekapSection: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16
  },
  rekapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  rekapLabel: {
    fontSize: 12,
    color: '#52525B'
  },
  rekapVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B'
  },
  returInputBox: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    fontWeight: '800',
    fontSize: 14,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 44,
    textAlign: 'center'
  },
  rekapTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 10,
    marginTop: 4
  },
  rekapTotalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B'
  },
  rekapTotalVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#059669'
  },
  btnPrimaryLapak: {
    backgroundColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3
  },
  btnPrimaryLapakText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  fInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#18181B',
    marginBottom: 12
  },
  btnCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F4F4F5',
    alignItems: 'center'
  },
  btnCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A'
  },
  btnSave: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center'
  },
  btnSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
