import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Dimensions } from 'react-native';
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
    <View style={styles.container}>
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
    </View>
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
    borderRadius: 20,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  posCardSelected: {
    borderColor: '#EA580C',
    borderWidth: 2,
    backgroundColor: '#FFFDF9',
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
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 18,
    gap: 10,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
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
    borderRadius: 16,
    paddingVertical: 12,
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
  payBtnDisabled: {
    backgroundColor: '#E2E8F0',
    elevation: 0,
    shadowOpacity: 0,
  },
  payBtnTextDisabled: {
    color: '#94A3B8',
  },
});


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="receipt_bill" size={16} />
            <Text style={styles.headerTagText}>KASIR POS KILAT</Text>
          </View>
          <Text style={styles.headerTitle}>Penjualan Langsung</Text>
        </View>

        <TactileButton size="sm" variant="accent" onPress={() => setIsModalOpen(true)}>
          + Menu Baru
        </TactileButton>
      </View>

      <View style={styles.bodyWrap}>
        
        {/* PENCARIAN & FILTER KATEGORI EMPUK */}
        <View style={styles.filterSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari risoles, pastel, lemper..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((cat) => (
              <TactilePill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollView>
        </View>

        {/* CATALOG GRID WITH 72PX VOLUMETRIC FOOD ICONS & PLUS/MINUS COUNTERS */}
        <ScrollView contentContainerStyle={styles.gridScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.catalogGrid}>
            {filteredProducts.map((item) => {
              const qty = cart[item.id] || 0;
              const isSelected = qty > 0;
              return (
                <BentoCard
                  key={item.id}
                  bg={isSelected ? '#FFFBEB' : '#FFFFFF'}
                  accentBorder={isSelected ? '#F59E0B' : '#E2E8F0'}
                  style={[styles.catalogCard, isSelected && styles.catalogCardActive]}
                >
                  <View style={styles.foodVisualBox}>
                    <AssetVisual name={item.type || 'risoles'} size={60} />
                    {isSelected && (
                      <View style={styles.qtyBadge}>
                        <Text style={styles.qtyBadgeText}>{qty}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>

                  {/* COUNTER EMPUK +/- */}
                  <View style={styles.counterRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.counterBtn, qty === 0 && styles.counterBtnDisabled]}
                      onPress={() => updateQuantity(item.id, -1)}
                      disabled={qty === 0}
                    >
                      <Text style={styles.counterBtnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.counterQtyText}>{qty}</Text>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.counterBtn, styles.counterBtnAdd]}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Text style={[styles.counterBtnText, styles.counterBtnAddText]}>+</Text>
                    </TouchableOpacity>
                  </View>
                </BentoCard>
              );
            })}
          </View>
          <View style={{ height: 260 }} />
        </ScrollView>

        {/* CART DOCK BOTTOM PLAYFUL ALA MOBBIN & UIVERSE.IO */}
        <View style={styles.cartBottomDock}>
          
          {/* CHIPS CEPAT PECAHAN UANG DENGAN KOIN EMAS */}
          <View style={styles.quickCashBar}>
            <View style={styles.quickCashIcon}>
              <AssetVisual name="coin_gold" size={20} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickCashScroll}>
              <TouchableOpacity style={styles.cashChip} onPress={() => handleQuickCash(total)}>
                <Text style={styles.cashChipText}>Uang Pas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cashChip} onPress={() => handleQuickCash(10000)}>
                <Text style={styles.cashChipText}>10rb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cashChip} onPress={() => handleQuickCash(20000)}>
                <Text style={styles.cashChipText}>20rb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cashChip} onPress={() => handleQuickCash(50000)}>
                <Text style={styles.cashChipText}>50rb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cashChip} onPress={() => handleQuickCash(100000)}>
                <Text style={styles.cashChipText}>100rb</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* TOTAL & KEMBALIAN ROW */}
          <View style={styles.totalSummaryRow}>
            <View>
              <Text style={styles.totalCountLabel}>Total Belanja ({count} pcs):</Text>
              <Text style={styles.totalValueText}>{formatRupiah(total)}</Text>
            </View>

            <View style={styles.changeBox}>
              <View style={styles.cashInputWrap}>
                <Text style={styles.cashInputLabel}>Bayar:</Text>
                <TextInput
                  style={styles.cashInput}
                  value={cashReceived}
                  onChangeText={setCashReceived}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <Text style={styles.changeText}>
                Kembali: <Text style={styles.changeValHighlight}>{formatRupiah(changeNum)}</Text>
              </Text>
            </View>
          </View>

          {/* TOMBOL BAYAR BESAR JEMPOL BAWAH */}
          <TactileButton
            size="lg"
            variant="primary"
            onPress={handleCheckout}
            icon={<AssetVisual name="receipt_bill" size={24} />}
          >
            Bayar & Cetak Struk
          </TactileButton>

        </View>

        <BottomNav activeTab="Pos" navigation={navigation} />
      </View>

      {/* MODAL TAMBAH MENU JAJANAN BARU */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Tambah Menu Jajanan Baru</Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>Pilih Ikon Kue</Text>
            <View style={styles.modalTypeRow}>
              {['risoles', 'pastel', 'dadar', 'lemper'].map((t) => (
                <TouchableOpacity
                  key={t}
                  activeOpacity={0.8}
                  onPress={() => setNewType(t)}
                  style={[styles.modalTypeTile, newType === t && styles.modalTypeTileActive]}
                >
                  <AssetVisual name={t} size={36} />
                  <Text style={[styles.modalTypeText, newType === t && styles.modalTypeTextActive]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.formLabel}>Nama Jajanan</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Kue Lapis Rainbow"
              placeholderTextColor="#94A3B8"
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.formLabel}>Harga Jual Satuan (Rp)</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: 1500"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              value={newPrice}
              onChangeText={setNewPrice}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TactileButton variant="secondary" style={{ flex: 1 }} onPress={() => setIsModalOpen(false)}>
                Batal
              </TactileButton>
              <TactileButton variant="primary" style={{ flex: 2 }} onPress={handleAddNewProduct}>
                Simpan Menu
              </TactileButton>
            </View>

          </View>
        </View>
      </Modal>

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
  bodyWrap: {
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FAF8F5',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1E293B',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryScroll: {
    gap: 8,
  },
  gridScroll: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  catalogCard: {
    width: (width - 36 - 12) / 2,
    padding: 14,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  catalogCardActive: {
    borderBottomColor: '#F59E0B',
  },
  foodVisualBox: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 6,
  },
  qtyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EA580C',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  qtyBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
    marginBottom: 10,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 3,
    gap: 10,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  counterBtnDisabled: {
    opacity: 0.4,
  },
  counterBtnAdd: {
    backgroundColor: '#EA580C',
    borderColor: '#C2410C',
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#475569',
  },
  counterBtnAddText: {
    color: '#FFFFFF',
  },
  counterQtyText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
    minWidth: 16,
    textAlign: 'center',
  },
  cartBottomDock: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderTopWidth: 2,
    borderTopColor: '#F1EFEA',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 8,
  },
  quickCashBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickCashIcon: {
    marginRight: 8,
  },
  quickCashScroll: {
    gap: 6,
  },
  cashChip: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  cashChipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  totalSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalCountLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  totalValueText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  changeBox: {
    alignItems: 'flex-end',
  },
  cashInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cashInputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  cashInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    minWidth: 70,
    textAlign: 'right',
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  changeValHighlight: {
    color: '#15803D',
    fontWeight: '900',
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
  modalTypeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  modalTypeTile: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAF8F5',
  },
  modalTypeTileActive: {
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  modalTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
  modalTypeTextActive: {
    color: '#EA580C',
    fontWeight: '800',
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
