import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert, Dimensions, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Rect, Circle, Polyline } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const MarketShoppingScreen = ({ navigation }) => {
  const [shoppingItems, setShoppingItems] = useState([
    { id: 'b1', name: 'Telur Ayam Negeri', qtyNeeded: '3 Kg (48 butir)', estCost: 78000, icon: 'egg_raw', checked: false, note: 'Pilih cangkang cokelat tebal' },
    { id: 'b2', name: 'Minyak Goreng Sawit', qtyNeeded: '4 Liter', estCost: 64000, icon: 'oil_butter', checked: true, note: 'Untuk gorengan risoles pagi' },
    { id: 'b3', name: 'Daging Dada Ayam Fillet', qtyNeeded: '1.5 Kg', estCost: 54000, icon: 'meat_chicken', checked: false, note: 'Rebus suwir isian kue' },
    { id: 'b4', name: 'Wortel Segar Manis', qtyNeeded: '2 Kg', estCost: 28000, icon: 'carrot_veg', checked: false, note: 'Potong dadu kecil rogout' },
    { id: 'b5', name: 'Plastik Mika Snack 7C', qtyNeeded: '2 Pack (100 pcs)', estCost: 24000, icon: 'package_box', checked: true, note: 'Wadah eceran lapak' },
    { id: 'b6', name: 'Gula Pasir & Daun Pisang', qtyNeeded: '1 Kg + 2 Ikat', estCost: 23000, icon: 'sugar_cane', checked: false, note: 'Pembungkus lemper harum' },
  ]);

  const toggleCheck = (id) => {
    setShoppingItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const checkedCount = shoppingItems.filter(i => i.checked).length;
  const totalCost = shoppingItems.reduce((sum, i) => sum + i.estCost, 0);
  const remainingCost = shoppingItems.filter(i => !i.checked).reduce((sum, i) => sum + i.estCost, 0);
  const boughtCost = totalCost - remainingCost;

  const handleShareToWhatsApp = async () => {
    let text = `*DAFTAR BELANJA PASAR SUBUH - KANTINBITE*\n`;
    text += `Jadwal: 04:00 Subuh di Pasar Tradisional\n\n`;
    shoppingItems.forEach((i, idx) => {
      const mark = i.checked ? '✓ [Sudah Dibeli]' : '◻ [Belum]';
      text += `${idx + 1}. ${mark} *${i.name}* - ${i.qtyNeeded} (~${formatRupiah(i.estCost)})\n   _Catatan: ${i.note}_\n`;
    });
    text += `\n*Total Estimasi Anggaran: ${formatRupiah(totalCost)}*`;
    
    try {
      await Share.share({ message: text });
    } catch (e) {
      Alert.alert('Gagal membagikan', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 1. TOP HEADER SUB-LAYAR (DENGAN TOMBOL BACK) */}
      <View style={styles.subpageHeader}>
        <View style={styles.backBtnRow}>
          <TouchableOpacity 
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Line x1="19" y1="12" x2="5" y2="12" />
              <Path d="M12 19L5 12L12 5" />
            </Svg>
          </TouchableOpacity>

          <View style={styles.headerTextCol}>
            <Text style={styles.pageTitle}>Belanja Pasar Subuh</Text>
            <Text style={styles.pageSub}>Operasional 04:00 • Pasar Tradisional</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.shareWaBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert('Simpan Belanja', 'Daftar belanjaan subuh tersimpan aman.')}
        >
          <Text style={styles.shareWaBtnText}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. HERO ESTIMASI ANGGARAN PASAR (KARTU PUTIH BERSIH) */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetTopRow}>
            <Text style={styles.budgetLabelText}>ESTIMASI ANGGARAN BELANJA PASAR</Text>
            <View style={styles.cartBadge}>
              <AssetVisual name="market_cart" size={20} />
            </View>
          </View>

          <View style={styles.budgetMainRow}>
            <Text style={styles.budgetBigNum}>{formatRupiah(totalCost)}</Text>
            <Text style={styles.budgetStatusText}>{checkedCount} dari {shoppingItems.length} Terbeli</Text>
          </View>

          <View style={styles.budgetSummaryStrip}>
            <View style={styles.summaryDoneWrap}>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                <Polyline points="20 6 9 17 4 12" />
              </Svg>
              <Text style={styles.summaryDoneText}>Terbeli: {formatRupiah(boughtCost)}</Text>
            </View>
            <Text style={styles.summaryRemainingText}>Sisa Belanja: {formatRupiah(remainingCost)}</Text>
          </View>
        </View>

        {/* 3. CHECKLIST ITEM BELANJAAN SUBUH */}
        <Text style={styles.sectionLbl}>DAFTAR BAHAN YANG HARUS DIBELI ({shoppingItems.length} ITEM)</Text>

        {shoppingItems.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => toggleCheck(item.id)}
              style={[styles.itemCard, item.checked && styles.itemCardChecked]}
            >
              {/* ROUND CHECKBOX */}
              <View style={[styles.checkboxRound, item.checked && styles.checkboxRoundChecked]}>
                {item.checked && <Text style={styles.checkMark}>✓</Text>}
              </View>

              <View style={[
                styles.itemThumbBox,
                item.icon === 'package_box' && { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' },
                item.icon === 'sugar_cane' && { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }
              ]}>
                <AssetVisual name={item.icon || 'wheat_flour'} size={34} />
              </View>

              <View style={styles.itemInfoCol}>
                <Text style={[styles.itemNameText, item.checked && styles.textStrike]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemQtyText, item.checked && styles.textStrikeMuted]}>
                  Kebutuhan: <Text style={styles.itemQtyHighlight}>{item.qtyNeeded}</Text>
                </Text>
                <Text style={styles.itemNoteText} numberOfLines={1}>
                  {item.note}
                </Text>
              </View>

              <Text style={[styles.itemCostText, item.checked && styles.textStrikeMuted]}>
                {formatRupiah(item.estCost)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 5. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subpageHeader: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  backBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    flex-shrink: 0,
  },
  headerTextCol: {
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  pageSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    whiteSpace: 'nowrap',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
    whiteSpace: 'nowrap',
  },
  shareWaBtn: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1.8,
    borderColor: '#1E293B',
    borderBottomWidth: 3,
    borderBottomColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shareWaBtnText: {
    color: '#0F172A',
    fontSize: 11.5,
    fontWeight: '900',
    whiteSpace: 'nowrap',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 110, // Ruang lega di atas ModernBottomNav
  },
  budgetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    gap: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  budgetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLabelText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  cartBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  budgetBigNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  budgetStatusText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#059669',
  },
  budgetSummaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  summaryDoneWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryDoneText: {
    fontSize: 11.5,
    color: '#059669',
    fontWeight: '800',
  },
  summaryRemainingText: {
    fontSize: 11.5,
    color: '#DC2626',
    fontWeight: '800',
  },
  sectionLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  itemCardChecked: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  checkboxRound: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxRoundChecked: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  itemThumbBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF08A',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemInfoCol: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemQtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  itemQtyHighlight: {
    color: '#EA580C',
    fontWeight: '800',
  },
  itemNoteText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  itemCostText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    flexShrink: 0,
  },
  textStrike: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  textStrikeMuted: {
    textDecorationLine: 'line-through',
    color: '#CBD5E1',
  },
});


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
  heroCard: {
    padding: 18,
    marginBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroBalanceText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: -0.8,
  },
  cartVisualBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  statusPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  itemCard: {
    padding: 14,
    marginBottom: 12,
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  itemCardChecked: {
    borderBottomColor: '#E2E8F0',
    opacity: 0.75,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxRound: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  checkboxRoundChecked: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  itemVisualWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemQtyText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '600',
  },
  itemNoteText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  costBox: {
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
  },
  doneBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: 3,
  },
  doneBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#15803D',
  },
  textStrike: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  textStrikeMuted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#F1EFEA',
  },
});
