import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Linking, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { getConsignment, getCanteens, addCanteen, saveConsignment, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const ConsignmentScreen = ({ route, navigation }) => {
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteenId, setSelectedCanteenId] = useState('c1');
  const [activeMode, setActiveMode] = useState('sore'); // 'pagi' (nitip) atau 'sore' (rekap)
  
  const [sessionData, setSessionData] = useState({
    c1: { initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles' },
    c2: { initialQty: 25, returnQty: 0, unitPrice: 1500, isPaid: false, itemName: 'Pastel Telur', itemType: 'pastel' },
    c3: { initialQty: 20, returnQty: 3, unitPrice: 1000, isPaid: true, itemName: 'Dadar Gulung', itemType: 'dadar' }
  });

  const [returInput, setReturInput] = useState('5');
  const [titipInput, setTitipInput] = useState('30');

  // Modal Tambah Kantin Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCanteenName, setNewCanteenName] = useState('');
  const [newPic, setNewPic] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    loadData();
    const unsub = navigation.addListener('focus', loadData);
    return unsub;
  }, [navigation]);

  const loadData = async () => {
    const cList = await getCanteens();
    if (cList && cList.length > 0) {
      setCanteens(cList);
    } else {
      setCanteens([
        { id: 'c1', name: 'Kantin Fakultas Teknik', pic: 'Pak Joko', phone: '081298765432', debt: 0 },
        { id: 'c2', name: 'Kantin Gedung Utama', pic: 'Bu Siti', phone: '081345678901', debt: 35000 },
        { id: 'c3', name: 'Warung Kopi Kampus', pic: 'Bang Hendra', phone: '085712345678', debt: 15000 }
      ]);
    }
  };

  const currentCanteen = canteens.find(c => c.id === selectedCanteenId) || canteens[0] || {
    id: 'c1', name: 'Kantin Fakultas Teknik', pic: 'Pak Joko', phone: '081298765432', debt: 0
  };

  const currentSession = sessionData[selectedCanteenId] || {
    initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles'
  };

  const initialQty = Number(titipInput) || currentSession.initialQty;
  const returnQty = Number(returInput) || 0;
  const soldQty = Math.max(0, initialQty - returnQty);
  const totalDue = Math.round(soldQty * currentSession.unitPrice);

  const handleSelectCanteen = (cId) => {
    setSelectedCanteenId(cId);
    const sess = sessionData[cId] || { initialQty: 20, returnQty: 0, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles' };
    setTitipInput(sess.initialQty.toString());
    setReturInput(sess.returnQty.toString());
  };

  const handleChatWA = () => {
    const phone = currentCanteen.phone || '08123456789';
    const text = `Halo ${currentCanteen.pic}, saya dari Dapur Berkah Bunda ingin konfirmasi titip konsinyasi kue hari ini di ${currentCanteen.name}.`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`).catch(() => {
      Alert.alert('Perhatian', 'Aplikasi WhatsApp tidak ditemukan di perangkat ini.');
    });
  };

  const handleSaveSession = () => {
    const updated = {
      ...sessionData,
      [selectedCanteenId]: {
        ...currentSession,
        initialQty,
        returnQty,
        soldQty,
        totalDue,
        isPaid: currentSession.isPaid
      }
    };
    setSessionData(updated);

    Alert.alert(
      'Sesi Rekap Berhasil Disimpan',
      `Setoran ${formatRupiah(totalDue)} dari ${currentCanteen.name} (${currentSession.isPaid ? 'LUNAS' : 'PIUTANG'}) tercatat di buku kas.`,
      [
        { text: 'Kirim Nota WhatsApp', onPress: () => navigation.navigate('Receipt', {
          canteenName: currentCanteen.name,
          pic: currentCanteen.pic,
          total: totalDue,
          sold: soldQty,
          retur: returnQty,
          titip: initialQty,
          item: currentSession.itemName
        })},
        { text: 'Selesai', onPress: () => navigation.navigate('Dashboard') }
      ]
    );
  };

  const handleAddNewCanteen = async () => {
    if (!newCanteenName.trim() || !newPic.trim()) {
      Alert.alert('Peringatan', 'Lengkapi nama kantin dan nama PIC.');
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
    setIsModalOpen(false);
    await loadData();
    Alert.alert('Sukses', 'Mitra kantin baru berhasil ditambahkan.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 1. TOP HEADER TERSTANDARISASI 1:1 */}
      <ScreenHeader
        title="Titip Kantin"
        subtitle="Pagi Nitip, Sore Ambil Uang"
        actionLabel="+ Kantin Baru"
        onActionPress={() => setIsModalOpen(true)}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* 2. DATE STRIP PILL */}
        <View style={styles.dateStrip}>
          <View style={styles.datePill}>
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.5}>
              <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <Line x1="16" y1="2" x2="16" y2="6" />
              <Line x1="8" y1="2" x2="8" y2="6" />
              <Line x1="3" y1="10" x2="21" y2="10" />
            </Svg>
            <Text style={styles.datePillText}>
              HARI INI: <Text style={styles.datePillBold}>Kamis, 8 Okt 2026</Text>
            </Text>
          </View>
        </View>

        {/* SHORTCUT BUKU PIUTANG KANTIN */}
        <TouchableOpacity
          style={styles.debtAlertBanner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('DebtLedger')}
          accessibilityLabel="Buka Buku Piutang Mitra"
          accessibilityRole="button"
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DC2626' }} />
            <Text style={{ fontSize: 11.5, fontWeight: '800', color: '#991B1B' }}>Buku Piutang: Rp 50.000 Tertunda</Text>
          </View>
          <Text style={{ fontSize: 11, fontWeight: '800', color: '#DC2626' }}>Buka Buku ›</Text>
        </TouchableOpacity>

        {/* 3. PILIH KANTIN REKANAN HORIZONTAL CAROUSEL */}
        <Text style={styles.sectionLbl}>PILIH KANTIN REKANAN</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.canteenCarousel}>
          {canteens.map((c) => {
            const isAct = c.id === selectedCanteenId;
            const hasDebt = (c.debt || 0) > 0;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.canteenCard, isAct && styles.canteenCardActive]}
                activeOpacity={0.8}
                onPress={() => handleSelectCanteen(c.id)}
              >
                <View style={styles.canteenCardTop}>
                  <AssetVisual name="canteen_shop" size={22} />
                  {hasDebt ? (
                    <View style={styles.statusTextDebtWrap}>
                      <Text style={styles.statusTextDebt}>Piutang {formatRupiah(c.debt)}</Text>
                    </View>
                  ) : (
                    <View style={styles.statusTextPaidWrap}>
                      <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                        <Path d="M20 6L9 17L4 12" />
                      </Svg>
                      <Text style={styles.statusTextPaid}>Lunas</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.canteenName} numberOfLines={1}>{c.name}</Text>
                <Text style={styles.canteenPic}>PIC: {c.pic}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. ACTIVE CANTEEN BAR WITH WA BUTTON */}
        <View style={styles.activeCanteenBar}>
          <View style={styles.activeCanteenInfo}>
            <Text style={styles.activeCanteenTitle}>{currentCanteen.name}</Text>
            <Text style={styles.activeCanteenContact}>PIC: {currentCanteen.pic} • {currentCanteen.phone}</Text>
          </View>

          <TouchableOpacity style={styles.chatWaBtn} activeOpacity={0.8} onPress={handleChatWA}>
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5}>
              <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </Svg>
            <Text style={styles.chatWaBtnText}>Chat WA</Text>
          </TouchableOpacity>
        </View>

        {/* 5. SEGMENTED TAB SESI WAKTU */}
        <View style={styles.sessionTabBar}>
          <TouchableOpacity 
            style={[styles.sessionTab, activeMode === 'pagi' && styles.sessionTabActive]}
            onPress={() => setActiveMode('pagi')}
            activeOpacity={0.8}
          >
            <Text style={[styles.sessionTabText, activeMode === 'pagi' && styles.sessionTabTextActive]}>
              Sesi Pagi (Nitip)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.sessionTab, activeMode === 'sore' && styles.sessionTabActive]}
            onPress={() => setActiveMode('sore')}
            activeOpacity={0.8}
          >
            <Text style={[styles.sessionTabText, activeMode === 'sore' && styles.sessionTabTextActive]}>
              Sesi Sore (Rekap)
            </Text>
          </TouchableOpacity>
        </View>

        {/* 6. KARTU REKAP PRODUK (RECEIPT LEDGER ASLI HP) */}
        <View style={styles.recapProductCard}>
          <View style={styles.recapCardHeader}>
            <View style={styles.foodThumbBox}>
              <AssetVisual name={currentSession.itemType || 'risoles_rogout'} size={48} />
            </View>
            <View style={styles.recapHeaderInfo}>
              <Text style={styles.recapFoodName}>{currentSession.itemName}</Text>
              <Text style={styles.recapUnitPrice}>
                Harga Titip: <Text style={styles.recapUnitPriceBold}>{formatRupiah(currentSession.unitPrice)} / pcs</Text>
              </Text>
            </View>
          </View>

          {/* RINCIAN MATEMATIS REKONSILIASI */}
          <View style={styles.recapCalcBox}>
            <View style={styles.recapRow}>
              <Text style={styles.recapRowLbl}>Titip Pagi:</Text>
              <Text style={styles.recapValDark}>{initialQty} pcs</Text>
            </View>

            <View style={styles.recapRow}>
              <Text style={styles.recapRowLbl}>Sisa Retur Fisik:</Text>
              <View style={styles.returInputWrap}>
                <TextInput
                  style={styles.returInputBox}
                  keyboardType="number-pad"
                  value={returInput}
                  onChangeText={setReturInput}
                />
                <Text style={styles.returPcsLbl}>pcs</Text>
              </View>
            </View>

            <View style={styles.recapRow}>
              <Text style={styles.recapRowLbl}>Kue Terjual Laku:</Text>
              <Text style={styles.recapValGreen}>{soldQty} pcs</Text>
            </View>

            <View style={styles.recapDivider} />

            <View style={styles.dueTotalRow}>
              <Text style={styles.dueTotalLbl}>Wajib Setor Tunai:</Text>
              <Text style={styles.dueTotalVal}>{formatRupiah(totalDue)}</Text>
            </View>
          </View>

          {/* CTA SIMPAN REKAP ORANYE SOLID */}
          <TouchableOpacity style={styles.saveRecapBtn} activeOpacity={0.85} onPress={handleSaveSession}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <Path d="M17 21v-8H7v8" />
              <Path d="M7 3v5h8" />
            </Svg>
            <Text style={styles.saveRecapBtnText}>Simpan Rekap ke Buku Kas</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* 5. MODERN BOTTOM DOCK */}
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
    paddingHorizontal: 18,
    paddingBottom: 110,
  },
  dateStrip: {
    marginVertical: 10,
  },
  debtAlertBanner: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  datePillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '700',
  },
  datePillBold: {
    color: '#0F172A',
    fontWeight: '900',
  },
  sectionLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 4,
  },
  canteenCarousel: {
    gap: 10,
    paddingBottom: 4,
    marginBottom: 14,
  },
  canteenCard: {
    width: 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 6,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  canteenCardActive: {
    borderColor: '#EA580C',
    borderWidth: 2,
    backgroundColor: '#FFFDF9',
  },
  canteenCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canteenName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  canteenPic: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  statusTextPaidWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusTextPaid: {
    color: '#059669',
    fontSize: 10.5,
    fontWeight: '800',
  },
  statusTextDebtWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextDebt: {
    color: '#DC2626',
    fontSize: 10.5,
    fontWeight: '800',
  },
  activeCanteenBar: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  activeCanteenInfo: {
    flex: 1,
    gap: 2,
  },
  activeCanteenTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  activeCanteenContact: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  chatWaBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    elevation: 2,
  },
  chatWaBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  sessionTabBar: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  sessionTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  sessionTabActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sessionTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  sessionTabTextActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  recapProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    gap: 14,
    marginBottom: 16,
  },
  recapCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodThumbBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recapHeaderInfo: {
    flex: 1,
    gap: 2,
  },
  recapFoodName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  recapUnitPrice: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  recapUnitPriceBold: {
    color: '#EA580C',
    fontWeight: '800',
  },
  recapCalcBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 9,
  },
  recapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recapRowLbl: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '600',
  },
  recapValDark: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  returInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  returInputBox: {
    width: 38,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    color: '#DC2626',
    fontSize: 12.5,
    fontWeight: '800',
    textAlign: 'center',
    padding: 0,
  },
  returPcsLbl: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#64748B',
  },
  recapValGreen: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#059669',
  },
  recapDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  dueTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  dueTotalLbl: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  dueTotalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#059669',
  },
  saveRecapBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveRecapBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
  },
});

