import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Linking, Dimensions } from 'react-native';
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
    <View style={styles.container}>
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

      {/* 7. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Activity" navigation={navigation} />
    </View>
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

            <AssetVisual name="canteen_shop" size={16} />
            <Text style={styles.headerTagText}>REKONSILIASI KONSINYASI</Text>
          </View>
          <Text style={styles.headerTitle}>Titip & Rekap Kantin</Text>
        </View>

        <TactileButton size="sm" variant="accent" onPress={() => setIsModalOpen(true)}>
          + Kantin Baru
        </TactileButton>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BANNER TANGGAL OPERASIONAL BER-JAM SUBUH */}
        <View style={styles.dateBar}>
          <AssetVisual name="clock_time" size={18} />
          <Text style={styles.dateBarText}>HARI INI (Kamis, 8 Okt 2026) • Drop 06:30 • Rekap 15:00</Text>
        </View>

        {/* DAFTAR KANTIN HORIZONTAL BENTO CARDS */}
        <Text style={styles.sectionTitle}>Pilih Mitra Kantin Rekanan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.canteenScroll}>
          {canteens.map((c) => {
            const isSelected = c.id === selectedCanteenId;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.canteenCard, isSelected && styles.canteenCardActive]}
                activeOpacity={0.85}
                onPress={() => handleSelectCanteen(c.id)}
              >
                <View style={styles.canteenTopRow}>
                  <AssetVisual name="canteen_shop" size={28} />
                  <View style={[styles.debtChip, c.debt > 0 ? styles.debtChipRed : styles.debtChipGreen]}>
                    <Text style={[styles.debtChipText, { color: c.debt > 0 ? '#B91C1C' : '#15803D' }]}>
                      {c.debt > 0 ? `Piutang ${formatRupiah(c.debt)}` : 'Lunas'}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.canteenCardName, isSelected && styles.textOrange]} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={styles.canteenCardPic} numberOfLines={1}>
                  PIC: {c.pic}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SESI LAPAK KANTIN TERPILIH PLAYFUL BENTO */}
        <BentoCard bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.lapakBento}>
          
          <View style={styles.lapakHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lapakTitle}>{currentCanteen.name}</Text>
              <Text style={styles.lapakSubtitle}>PIC: {currentCanteen.pic} • {currentCanteen.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.waBtn}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`whatsapp://send?phone=62${currentCanteen.phone.slice(1)}&text=Halo%20${currentCanteen.pic}`)}
            >
              <Text style={styles.waBtnText}>Chat WA</Text>
            </TouchableOpacity>
          </View>

          {/* TOGGLE SESI PAGI / SORE TACTILE */}
          <View style={styles.sessionToggleBar}>
            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'pagi' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('pagi')}
            >
              <AssetVisual name="clock_time" size={16} />
              <Text style={[styles.toggleBtnText, activeMode === 'pagi' && styles.toggleBtnTextActive]}>
                Sesi Pagi (Nitip)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'sore' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('sore')}
            >
              <AssetVisual name="check_badge" size={16} />
              <Text style={[styles.toggleBtnText, activeMode === 'sore' && styles.toggleBtnTextActive]}>
                Sesi Sore (Rekap)
              </Text>
            </TouchableOpacity>
          </View>

          {/* ITEM PENITIPAN KANTIN DENGAN THUMBNAIL BESAR */}
          <View style={styles.itemPenitipanRow}>
            <View style={styles.itemVisualBox}>
              <AssetVisual name={currentSession.itemType || 'risoles'} size={52} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemPenitipanTitle}>{currentSession.itemName}</Text>
              <Text style={styles.itemPenitipanPrice}>Harga Titip Bersih: <Text style={{ color: '#EA580C', fontWeight: '900' }}>{formatRupiah(currentSession.unitPrice)}/pcs</Text></Text>
            </View>
          </View>

          {/* FORM SESI PAGI / SORE */}
          {activeMode === 'pagi' ? (
            <View style={styles.lapakFormArea}>
              <Text style={styles.fLabel}>Jumlah Kue Dititipkan Pagi Ini:</Text>
              <TextInput
                style={styles.fInputLarge}
                value={titipInput}
                onChangeText={setTitipInput}
                keyboardType="number-pad"
              />
              <Text style={styles.helpText}>Kue didrop di etalase kantin jam 06:30. Rekonsiliasi fisik dilakukan sore nanti.</Text>
            </View>
          ) : (
            <View style={styles.lapakFormArea}>
              
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Titip Pagi:</Text>
                <Text style={styles.calcVal}>{initialQty} pcs</Text>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Sisa Retur Fisik (Tidak Laku):</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <TextInput
                    style={styles.returInput}
                    value={returInput}
                    onChangeText={setReturInput}
                    keyboardType="number-pad"
                  />
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#64748B' }}>pcs</Text>
                </View>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Kue Terjual Bersih:</Text>
                <Text style={[styles.calcVal, { color: '#15803D', fontWeight: '900', fontSize: 16 }]}>{soldQty} pcs</Text>
              </View>

              {/* TOTAL WAJIB SETOR DENGAN STAMP LUNAS */}
              <View style={styles.totalSetoranBox}>
                <View>
                  <Text style={styles.totalSetoranLabel}>Uang Wajib Setor:</Text>
                  <Text style={styles.totalSetoranVal}>{formatRupiah(totalDue)}</Text>
                </View>
                <View style={styles.stampBadge}>
                  <AssetVisual name="check_badge" size={20} />
                  <Text style={styles.stampBadgeText}>SIAP SETOR</Text>
                </View>
              </View>

            </View>
          )}

          {/* TOMBOL AKSI SIMPAN EMPUK */}
          <TactileButton
            size="lg"
            variant="primary"
            onPress={handleSaveSession}
            icon={<AssetVisual name={activeMode === 'pagi' ? 'canteen_shop' : 'check_badge'} size={22} />}
          >
            {activeMode === 'pagi' ? 'Terbitkan Nota Titip Pagi' : 'Simpan Rekap ke Buku Kas'}
          </TactileButton>

        </BentoCard>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL TAMBAH KANTIN BARU */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Tambah Mitra Kantin Baru</Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>Nama Kantin</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Kantin Gedung Kuliah B"
              placeholderTextColor="#94A3B8"
              value={newCanteenName}
              onChangeText={setNewCanteenName}
            />

            <Text style={styles.formLabel}>Nama PIC / Penjaga Lapak</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Bu Ratna"
              placeholderTextColor="#94A3B8"
              value={newPic}
              onChangeText={setNewPic}
            />

            <Text style={styles.formLabel}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: 08123456789"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TactileButton variant="secondary" style={{ flex: 1 }} onPress={() => setIsModalOpen(false)}>
                Batal
              </TactileButton>
              <TactileButton variant="primary" style={{ flex: 2 }} onPress={handleAddNewCanteen}>
                Simpan Kantin
              </TactileButton>
            </View>

          </View>
        </View>
      </Modal>

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
  scrollContent: {
    padding: 18,
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  dateBarText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  canteenScroll: {
    gap: 10,
    marginBottom: 18,
  },
  canteenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: 154,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  canteenCardActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
    borderBottomColor: '#D97706',
  },
  canteenTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  debtChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  debtChipRed: {
    backgroundColor: '#FEE2E2',
  },
  debtChipGreen: {
    backgroundColor: '#DCFCE7',
  },
  debtChipText: {
    fontSize: 9,
    fontWeight: '900',
  },
  canteenCardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  canteenCardPic: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  textOrange: {
    color: '#EA580C',
  },
  lapakBento: {
    padding: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  lapakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lapakTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E293B',
  },
  lapakSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  waBtn: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  waBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  sessionToggleBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    gap: 6,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  toggleBtnTextActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  itemPenitipanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  itemVisualBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  itemPenitipanTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemPenitipanPrice: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  lapakFormArea: {
    marginBottom: 16,
  },
  fLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  fInputLarge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  helpText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  calcLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  calcVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  returInput: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    fontWeight: '900',
    fontSize: 14,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 46,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  totalSetoranBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  totalSetoranLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 2,
  },
  totalSetoranVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#15803D',
  },
  stampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stampBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#15803D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 28,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1E293B',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});
