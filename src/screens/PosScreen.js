import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScreenHeader } from '../components/ScreenHeader';
import AssetVisual from '../components/AssetVisual';
import { getProducts, addPosTransaction } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const PosScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // Default murni kosong (0 item, Rp 0) saat pertama dibuka
  const [cashReceived, setCashReceived] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultProducts = [
    { id: 'p1', name: 'Risoles Rogout', price: 1200, icon: 'risoles_rogout', category: 'Gorengan' },
    { id: 'p2', name: 'Pastel Telur', price: 1500, icon: 'pastel_telur', category: 'Gorengan' },
    { id: 'p3', name: 'Dadar Gulung', price: 1000, icon: 'dadar_gulung', category: 'Kue Basah' },
    { id: 'p4', name: 'Lemper Ayam', price: 1500, icon: 'lemper_ayam', category: 'Kue Basah' }
  ];

  useEffect(() => {
    loadProducts();
    const unsub = navigation.addListener('focus', loadProducts);
    return unsub;
  }, [navigation]);

  const loadProducts = async () => {
    const p = await getProducts();
    if (p && p.length > 0) {
      setProducts(p);
    } else {
      setProducts(defaultProducts);
    }
  };

  const categories = ['Semua', 'Gorengan', 'Kue Basah', 'Asin', 'Manis'];

  const productList = products.length > 0 ? products : defaultProducts;

  const filteredProducts = productList.filter((item) => {
    const matchCat = activeCategory === 'Semua' 
      || item.category === activeCategory 
      || (activeCategory === 'Gorengan' && (item.type === 'risoles' || item.type === 'pastel' || item.name.toLowerCase().includes('risoles') || item.name.toLowerCase().includes('pastel')));
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const nextQty = Math.max(0, current + delta);
      const next = { ...prev };
      if (nextQty === 0) {
        delete next[id];
      } else {
        next[id] = nextQty;
      }
      return next;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    let count = 0;
    productList.forEach((prod) => {
      const qty = cart[prod.id] || 0;
      if (qty > 0) {
        total += prod.price * qty;
        count += qty;
      }
    });
    return { total, count };
  };

  const { total, count } = calculateTotal();
  const receivedNum = Number(cashReceived) || 0;
  const changeNum = Math.max(0, receivedNum - total);

  const handleCheckout = async () => {
    if (total <= 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu menu jajanan.');
      return;
    }
    if (receivedNum < total) {
      Alert.alert('Perhatian', 'Uang yang diterima kurang dari total belanja.');
      return;
    }
    await addPosTransaction(total, count);
    navigation.navigate('Receipt', {
      total,
      count,
      received: receivedNum,
      change: changeNum,
      cart,
      products: productList
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. GLOBAL SCREEN HEADER (KONSISTEN 1:1 DENGAN HALAMAN LAIN) */}
      <ScreenHeader
        title="Kasir Kilat"
        subtitle="Penjualan Langsung di Tempat"
        actionLabel="+ Menu Baru"
        onActionPress={() => navigation.navigate('RecipeEditor')}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* 2. SEARCH & FILTER CATEGORY */}
        <View style={styles.searchInputBox}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2}>
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </Svg>
          <TextInput
            placeholder="Cari jajanan eceran..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(cat)}
                style={[styles.catPill, isActive && styles.catPillActive]}
              >
                <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3. PRODUCT GRID 2-KOLOM DENGAN STEPPER RAMAH JEMPOL */}
        <View style={styles.posGrid}>
          {filteredProducts.map((item) => {
            const qty = cart[item.id] || 0;
            const isSelected = qty > 0;

            return (
              <View key={item.id} style={[styles.posCard, isSelected && styles.posCardSelected]}>
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>{qty}</Text>
                  </View>
                )}

                <View style={styles.posThumbWrap}>
                  <AssetVisual name={item.icon || item.type || 'risoles_rogout'} size={58} />
                </View>

                <Text style={styles.posItemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.posItemPrice}>{formatRupiah(item.price)}</Text>

                {/* STEPPER TOMBOL +/- EMPUK RAMAH JEMPOL */}
                <View style={styles.stepperRow}>
                  <TouchableOpacity 
                    style={[styles.stepBtn, qty === 0 && styles.stepBtnDisabled]}
                    onPress={() => updateQuantity(item.id, -1)}
                    activeOpacity={0.7}
                    disabled={qty === 0}
                  >
                    <Text style={[styles.stepBtnText, qty === 0 && styles.stepBtnTextDisabled]}>-</Text>
                  </TouchableOpacity>

                  <Text style={[styles.stepQtyVal, qty === 0 && styles.stepQtyValZero]}>{qty}</Text>

                  <TouchableOpacity 
                    style={[styles.stepBtn, styles.stepBtnAdd]}
                    onPress={() => updateQuantity(item.id, 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.stepBtnAddText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 4. FLOATING CHECKOUT DOCK (MELAYANG DI ATAS BOTTOM NAV DOCK) */}
      <View style={styles.floatingCheckoutDock}>
        {/* QUICK CASH CHIPS ROW */}
        <View style={styles.quickCashRow}>
          <TouchableOpacity 
            style={[styles.cashChip, receivedNum === total && styles.cashChipExact]}
            onPress={() => setCashReceived(total.toString())}
            activeOpacity={0.8}
          >
            <Text style={[styles.cashChipText, receivedNum === total && styles.cashChipTextExact]}>Uang Pas</Text>
          </TouchableOpacity>

          {[10000, 20000, 50000, 100000].map((nominal) => {
            const isAct = receivedNum === nominal;
            return (
              <TouchableOpacity
                key={nominal}
                style={[styles.cashChip, isAct && styles.cashChipActive]}
                onPress={() => setCashReceived(nominal.toString())}
                activeOpacity={0.8}
              >
                <Text style={[styles.cashChipText, isAct && styles.cashChipTextActive]}>
                  Rp {nominal / 1000}k
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RINGKASAN TAGIHAN & KEMBALIAN */}
        <View style={styles.billSummaryRow}>
          <View style={styles.billLeft}>
            <Text style={styles.billTotalLbl}>Total Belanja ({count} pcs)</Text>
            <Text style={styles.billTotalAmt}>{formatRupiah(total)}</Text>
          </View>
          <View style={styles.billRight}>
            <Text style={styles.billChangeLbl}>
              {receivedNum > 0 ? `Kembalian (Uang ${formatRupiah(receivedNum)})` : 'Kembalian (Uang Belum Diisi)'}
            </Text>
            <Text style={[styles.billChangeAmt, receivedNum === 0 && styles.billChangeAmtZero]}>
              {receivedNum >= total ? formatRupiah(changeNum) : 'Rp 0'}
            </Text>
          </View>
        </View>

        {/* CTA BAYAR & STRUK */}
        <TouchableOpacity 
          style={[styles.payBtnMain, total === 0 && styles.payBtnDisabled]}
          activeOpacity={total > 0 ? 0.85 : 1}
          onPress={handleCheckout}
          disabled={total === 0}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={total > 0 ? '#FFFFFF' : '#94A3B8'} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="7" width="20" height="14" rx="2" />
            <Path d="M6 3h12v4H6z" />
            <Path d="M6 12h4 M14 12h4 M6 16h4 M14 16h4" />
          </Svg>
          <Text style={[styles.payBtnMainText, total === 0 && styles.payBtnTextDisabled]}>
            {total > 0 ? 'Bayar & Cetak Struk WA' : 'Pilih Jajanan Dahulu'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 5. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Kasir" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  pageTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  addMenuBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  addMenuBtnText: {
    color: '#EA580C',
    fontSize: 11.5,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 230, // space for floating checkout dock
  },
  searchInputBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    padding: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  catPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  catPillActive: {
    backgroundColor: '#EA580C',
  },
  catPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  catPillTextActive: {
    color: '#FFFFFF',
  },
  posGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  posCard: {
    width: (width - 36 - 12) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4,
    borderBottomColor: '#1E293B',
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
  },
  posCardSelected: {
    borderColor: '#EA580C',
    borderWidth: 2.2,
    borderBottomWidth: 4.5,
    borderBottomColor: '#C2410C',
    backgroundColor: '#FFFBEB',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EA580C',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  selectedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  posThumbWrap: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  posItemName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
    width: '100%',
  },
  posItemPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
    marginBottom: 10,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: {
    opacity: 0.4,
  },
  stepBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#334155',
  },
  stepBtnTextDisabled: {
    color: '#94A3B8',
  },
  stepQtyVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  stepQtyValZero: {
    color: '#94A3B8',
  },
  stepBtnAdd: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  stepBtnAddText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  floatingCheckoutDock: {
    position: 'absolute',
    bottom: 84, // dinaikkan agar tombol bayar lega dan tidak tertutup FAB kasir
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#1E293B',
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 10,
    elevation: 10,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  quickCashRow: {
    flexDirection: 'row',
    gap: 6,
  },
  cashChip: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 4,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    alignItems: 'center',
  },
  cashChipExact: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  cashChipTextExact: {
    color: '#0F172A',
    fontWeight: '900',
  },
  cashChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  cashChipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  cashChipTextExact: {
    color: '#15803D',
  },
  cashChipTextActive: {
    color: '#FFFFFF',
  },
  billSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLeft: {
    gap: 2,
  },
  billTotalLbl: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  billTotalAmt: {
    fontSize: 17,
    fontWeight: '900',
    color: '#EA580C',
  },
  billRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  billChangeLbl: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  billChangeAmt: {
    fontSize: 15,
    fontWeight: '900',
    color: '#059669',
  },
  billChangeAmtZero: {
    color: '#64748B',
  },
  payBtnMain: {
    backgroundColor: '#EA580C',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1E293B',
    borderBottomWidth: 4.5,
    borderBottomColor: '#C2410C',
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  payBtnDisabled: {
    backgroundColor: '#E2E8F0',
    elevation: 0,
    shadowOpacity: 0,
  },
  payBtnTextDisabled: {
    color: '#94A3B8',
  },
});

