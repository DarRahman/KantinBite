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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable, TactilePill } from '../components/PlayfulComponents';
import { getProducts, addPosTransaction } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const PosScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cashReceived, setCashReceived] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultProducts = [
    { id: 'p1', name: 'Risoles Rogout Ayam', price: 1200, stock: 45, icon: 'risoles_rogout', category: 'Gorengan' },
    { id: 'p2', name: 'Pastel Sayur Telur', price: 1500, stock: 35, icon: 'pastel_telur', category: 'Gorengan' },
    { id: 'p3', name: 'Dadar Gulung Pandan', price: 1000, stock: 40, icon: 'dadar_gulung', category: 'Kue Basah' },
    { id: 'p4', name: 'Lemper Ayam Ketan', price: 1500, stock: 30, icon: 'lemper_ayam', category: 'Kue Basah' },
    { id: 'p5', name: 'Kue Lumpur Kentang', price: 1500, stock: 28, icon: 'kue_lumpur', category: 'Kue Basah' },
    { id: 'p6', name: 'Tahu Isi Pedas', price: 1000, stock: 50, icon: 'tahu_isi', category: 'Gorengan' },
    { id: 'p7', name: 'Klepon Gula Aren', price: 1000, stock: 32, icon: 'klepon_pandan', category: 'Jajanan Pasar' },
    { id: 'p8', name: 'Onde-Onde Wijen', price: 1200, stock: 36, icon: 'onde_onde', category: 'Jajanan Pasar' },
  ];

  useEffect(() => {
    loadProducts();
    const unsub = navigation.addListener('focus', loadProducts);
    return unsub;
  }, [navigation]);

  const loadProducts = async () => {
    const p = await getProducts();
    if (p && p.length > 0) {
      // Gabungkan produk tersimpan dengan variasi etalase tambahan agar etalase kaya visual
      const existingIds = new Set(p.map((x) => x.id));
      const extras = defaultProducts.filter((d) => !existingIds.has(d.id));
      setProducts([...p, ...extras]);
    } else {
      setProducts(defaultProducts);
    }
  };

  const categories = ['Semua', 'Gorengan', 'Kue Basah', 'Jajanan Pasar'];
  const productList = products.length > 0 ? products : defaultProducts;

  const filteredProducts = productList.filter((item) => {
    const cat = item.category || '';
    const matchCat =
      activeCategory === 'Semua' ||
      cat.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === 'Gorengan' &&
        (item.icon === 'risoles_rogout' || item.icon === 'pastel_telur' || item.icon === 'tahu_isi'));
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
        total += Math.round((prod.price || 1000) * qty);
        count += qty;
      }
    });
    return { total, count };
  };

  const { total, count } = calculateTotal();
  const receivedNum = Math.round(Number(cashReceived) || 0);
  const changeNum = Math.max(0, receivedNum - total);

  const handleCheckout = async () => {
    if (total <= 0) {
      Alert.alert('Pilih Kue Terlebih Dahulu', 'Sentuh tombol [+] pada kue yang dibeli pelanggan.');
      return;
    }
    const finalReceived = receivedNum >= total ? receivedNum : total;
    const finalChange = Math.max(0, finalReceived - total);

    await addPosTransaction(total, count);
    setCart({});
    setCashReceived('');
    navigation.navigate('Receipt', {
      total,
      count,
      received: finalReceived,
      change: finalChange,
      cart,
      products: productList,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEF3C7" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC BAKERY POS BANNER (TERINSPIRASI JUJULY CAFE) */}
        <ScenicBanner
          scene="pos_bakery"
          badgeText="ETALASE KASIR LAPAK"
          title="Kasir Kilat Jajanan"
          subtitle="Sentuh kue untuk tambah pesanan & hitung kembalian"
          actionLabel="+ Kue Baru"
          onActionPress={() => navigation.navigate('RecipeEditor')}
        >
          <View style={styles.searchBox}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth={2.2}>
              <Circle cx="11" cy="11" r="8" />
              <Path d="M21 21l-4.35-4.35" />
            </Svg>
            <TextInput
              placeholder="Cari nama jajanan di etalase..."
              placeholderTextColor="#A1A1AA"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {count > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setCart({});
                  setCashReceived('');
                }}
                style={styles.resetCartPill}
              >
                <Text style={styles.resetCartText}>Kosongkan ({count})</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScenicBanner>

        <View style={styles.bodyContent}>
          {/* 2. FILTER KATEGORI TAKTIL */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((cat) => (
              <TactilePill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollView>

          {/* 3. GRID 2 KOLOM ETALASE KUE BERGAMBAR PIRING SAJI */}
          <View style={styles.posGrid}>
            {filteredProducts.map((item) => {
              const qty = cart[item.id] || 0;
              const isSelected = qty > 0;

              return (
                <AnimatedPressable
                  key={item.id}
                  scaleTo={0.97}
                  onPress={() => updateQuantity(item.id, 1)}
                  style={[styles.posCard, isSelected && styles.posCardSelected]}
                >
                  {/* Header Kecil Kartu: Stok & Badge Jumlah */}
                  <View style={styles.cardTopMeta}>
                    <View style={styles.stockSoftBadge}>
                      <Text style={styles.stockSoftText}>Sisa {item.stock || 35}</Text>
                    </View>
                    {isSelected ? (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedBadgeText}>{qty}x</Text>
                      </View>
                    ) : null}
                  </View>

                  {/* Ilustrasi Jajanan di Atas Piring */}
                  <View style={styles.posThumbWrap}>
                    <AssetVisual
                      name={item.icon || item.type || 'risoles_rogout'}
                      size={76}
                    />
                  </View>

                  <Text style={styles.posItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.posItemPrice}>{formatRupiah(item.price)}</Text>

                  {/* Stepper Empuk Ramah Jempol */}
                  <View style={styles.stepperRow}>
                    <TouchableOpacity
                      style={[styles.stepBtn, qty === 0 && styles.stepBtnDisabled]}
                      onPress={() => updateQuantity(item.id, -1)}
                      activeOpacity={0.7}
                      disabled={qty === 0}
                    >
                      <Text style={[styles.stepBtnText, qty === 0 && styles.stepBtnTextDisabled]}>
                        −
                      </Text>
                    </TouchableOpacity>

                    <Text style={[styles.stepQtyVal, qty === 0 && styles.stepQtyValZero]}>
                      {qty}
                    </Text>

                    <TouchableOpacity
                      style={[styles.stepBtn, styles.stepBtnAdd]}
                      onPress={() => updateQuantity(item.id, 1)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.stepBtnAddText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </AnimatedPressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* 4. DOCK PEMBAYARAN & KEMBALIAN CEPAT */}
      <View style={styles.floatingCheckoutDock}>
        <View style={styles.quickCashRow}>
          <TouchableOpacity
            style={[
              styles.cashChip,
              total > 0 && receivedNum === total && styles.cashChipExact,
            ]}
            onPress={() => setCashReceived(String(total))}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.cashChipText,
                total > 0 && receivedNum === total && styles.cashChipTextExact,
              ]}
            >
              Uang Pas
            </Text>
          </TouchableOpacity>

          {[10000, 20000, 50000, 100000].map((nominal) => {
            const isAct = receivedNum === nominal;
            return (
              <TouchableOpacity
                key={nominal}
                style={[styles.cashChip, isAct && styles.cashChipActive]}
                onPress={() => setCashReceived(String(nominal))}
                activeOpacity={0.8}
              >
                <Text style={[styles.cashChipText, isAct && styles.cashChipTextActive]}>
                  {nominal / 1000}rb
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.billSummaryRow}>
          <View>
            <Text style={styles.billTotalLbl}>Total Pesanan ({count} kue)</Text>
            <Text style={styles.billTotalAmt}>{formatRupiah(total)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.billChangeLbl}>
              {receivedNum > 0
                ? `Kembalian (Tunai ${formatRupiah(receivedNum)})`
                : 'Kembalian Pelanggan'}
            </Text>
            <Text style={[styles.billChangeAmt, receivedNum === 0 && { color: '#71717A' }]}>
              {receivedNum >= total && total > 0 ? formatRupiah(changeNum) : 'Rp 0'}
            </Text>
          </View>
        </View>

        <AnimatedPressable
          scaleTo={0.97}
          style={[styles.payBtnMain, total === 0 && styles.payBtnDisabled]}
          onPress={handleCheckout}
          disabled={total === 0}
        >
          <AssetVisual name="receipt_bill" size={20} />
          <Text style={styles.payBtnText}>
            {total > 0
              ? `Terima Pembayaran • ${formatRupiah(total)}`
              : 'Pilih Kue untuk Mulai Kasir'}
          </Text>
        </AnimatedPressable>
      </View>

      <ModernBottomNav activeTab="Kasir" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 250,
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#18181B',
    paddingVertical: 2,
  },
  resetCartPill: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  resetCartText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  categoryRow: {
    paddingBottom: 12,
  },
  posGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  posCard: {
    width: '48.2%',
    backgroundColor: '#FFFBEB',
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
    alignItems: 'center',
  },
  posCardSelected: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
    borderBottomColor: '#9A3412',
  },
  cardTopMeta: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockSoftBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  stockSoftText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#78350F',
  },
  selectedBadge: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 9,
  },
  selectedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '900',
  },
  posThumbWrap: {
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posItemName: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#18181B',
    textAlign: 'center',
  },
  posItemPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
    marginTop: 2,
    marginBottom: 8,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  stepBtn: {
    width: 34,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: {
    opacity: 0.45,
  },
  stepBtnAdd: {
    backgroundColor: '#EA580C',
  },
  stepBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#18181B',
  },
  stepBtnTextDisabled: {
    color: '#A1A1AA',
  },
  stepBtnAddText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  stepQtyVal: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#18181B',
  },
  stepQtyValZero: {
    color: '#A1A1AA',
  },
  floatingCheckoutDock: {
    position: 'absolute',
    bottom: 82,
    left: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.8,
    borderColor: '#FED7AA',
    borderBottomWidth: 4.5,
    borderBottomColor: '#FDBA74',
    elevation: 10,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  quickCashRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 5,
  },
  cashChip: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
  },
  cashChipExact: {
    backgroundColor: '#DCFCE7',
    borderColor: '#10B981',
  },
  cashChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#9A3412',
  },
  cashChipText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#78350F',
  },
  cashChipTextExact: {
    color: '#047857',
  },
  cashChipTextActive: {
    color: '#FFFFFF',
  },
  billSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  billTotalLbl: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#71717A',
  },
  billTotalAmt: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18181B',
  },
  billChangeLbl: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#71717A',
  },
  billChangeAmt: {
    fontSize: 16,
    fontWeight: '900',
    color: '#059669',
  },
  payBtnMain: {
    backgroundColor: '#EA580C',
    borderRadius: 15,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 3.5,
    borderBottomColor: '#9A3412',
  },
  payBtnDisabled: {
    backgroundColor: '#E4E4E7',
    borderBottomColor: '#D4D4D8',
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
  },
});
