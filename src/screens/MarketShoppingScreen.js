import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable, AnimatedProgressBar } from '../components/PlayfulComponents';
import { getMarketItems, saveMarketItems, addExpenseTransaction } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const MarketShoppingScreen = ({ navigation }) => {
  const [shoppingItems, setShoppingItems] = useState([
    { id: 'b1', name: 'Telur Ayam Negeri', qtyNeeded: '3 Kg (48 butir)', estCost: 78000, icon: 'egg_raw', checked: false, note: 'Pilih cangkang cokelat tebal' },
    { id: 'b2', name: 'Minyak Goreng Sawit', qtyNeeded: '4 Liter', estCost: 64000, icon: 'oil_butter', checked: true, note: 'Untuk gorengan risoles pagi' },
    { id: 'b3', name: 'Daging Dada Ayam Fillet', qtyNeeded: '1.5 Kg', estCost: 54000, icon: 'meat_chicken', checked: false, note: 'Rebus suwir isian kue' },
    { id: 'b4', name: 'Wortel Segar Manis', qtyNeeded: '2 Kg', estCost: 28000, icon: 'carrot_veg', checked: false, note: 'Potong dadu kecil rogout' },
    { id: 'b5', name: 'Plastik Mika Snack 7C', qtyNeeded: '2 Pack (100 pcs)', estCost: 24000, icon: 'package_box', checked: true, note: 'Wadah eceran lapak' },
    { id: 'b6', name: 'Gula Pasir & Daun Pisang', qtyNeeded: '1 Kg + 2 Ikat', estCost: 23000, icon: 'sugar_cane', checked: false, note: 'Pembungkus lemper harum' },
  ]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const saved = await getMarketItems();
    if (saved && saved.length > 0) {
      setShoppingItems(saved);
    }
  };

  const toggleCheck = async (id) => {
    const updated = shoppingItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingItems(updated);
    await saveMarketItems(updated);
  };

  const checkedCount = shoppingItems.filter((i) => i.checked).length;
  const totalCost = shoppingItems.reduce((sum, i) => sum + (Number(i.estCost) || 0), 0);
  const remainingCost = shoppingItems
    .filter((i) => !i.checked)
    .reduce((sum, i) => sum + (Number(i.estCost) || 0), 0);
  const boughtCost = Math.max(0, totalCost - remainingCost);
  const progressPct = Math.round((checkedCount / Math.max(1, shoppingItems.length)) * 100);

  const handleRecordExpense = async () => {
    if (boughtCost <= 0) {
      Alert.alert('Pilih Bahan Terbeli', 'Centang minimal 1 bahan yang sudah dibeli di pasar.');
      return;
    }
    await addExpenseTransaction(
      'Belanja Pasar Subuh',
      boughtCost,
      `${checkedCount} Komoditas Dapur`
    );
    Alert.alert(
      'Tercatat di Buku Kas',
      `Pengeluaran pasar sebesar ${formatRupiah(boughtCost)} telah memotong saldo kas laci secara otomatis.`
    );
  };

  const handleShareToWhatsApp = async () => {
    let text = `*DAFTAR BELANJA PASAR SUBUH - KANTINBITE*\n`;
    text += `Jadwal: 04:00 Subuh di Pasar Tradisional\n\n`;
    shoppingItems.forEach((i, idx) => {
      const mark = i.checked ? '[Sudah]' : '[Belum]';
      text += `${idx + 1}. ${mark} *${i.name}* - ${i.qtyNeeded} (${formatRupiah(i.estCost)})\n`;
    });
    text += `\n*Total Estimasi Anggaran: ${formatRupiah(totalCost)}*`;

    try {
      await Share.share({ message: text });
    } catch (e) {
      Alert.alert('Info', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECFDF5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC DAWN MARKET HEADER */}
        <ScenicBanner
          scene="market_dawn"
          badgeText="PASAR TRADISIONAL 04:00"
          title="Belanja Pasar Subuh"
          subtitle="Ceklis bahan baku segar untuk adonan pagi ini"
          onBackPress={() => navigation.goBack()}
          actionLabel="Kirim WA"
          onActionPress={handleShareToWhatsApp}
        />

        <View style={styles.bodyPadding}>
          {/* 2. KARTU RINGKASAN ANGGARAN & PROGRESS BELANJA */}
          <View style={styles.budgetCard}>
            <View style={styles.budgetTopRow}>
              <View>
                <Text style={styles.budgetLabelText}>ANGGARAN BELANJA SUBUH</Text>
                <Text style={styles.budgetBigNum}>{formatRupiah(totalCost)}</Text>
              </View>
              <AssetVisual name="market_cart" size={48} />
            </View>

            <View style={{ marginVertical: 10 }}>
              <AnimatedProgressBar
                percent={progressPct}
                color="#10B981"
                trackColor="#E2E8F0"
                height={9}
              />
            </View>

            <View style={styles.budgetSummaryStrip}>
              <View style={styles.summaryPillGreen}>
                <Text style={styles.summaryDoneText}>
                  Terbeli ({checkedCount}/{shoppingItems.length}): {formatRupiah(boughtCost)}
                </Text>
              </View>
              <Text style={styles.summaryRemainingText}>
                Sisa: {formatRupiah(remainingCost)}
              </Text>
            </View>
          </View>

          {/* 3. DAFTAR CEKLIS KOMODITAS PASAR */}
          <Text style={styles.sectionTitle}>Daftar Belanjaan Dapur</Text>

          {shoppingItems.map((item) => (
            <AnimatedPressable
              key={item.id}
              scaleTo={0.98}
              onPress={() => toggleCheck(item.id)}
              style={[styles.itemCard, item.checked && styles.itemCardChecked]}
            >
              <View style={styles.itemIconBox}>
                <AssetVisual name={item.icon} size={38} />
              </View>

              <View style={styles.itemInfoCol}>
                <Text
                  style={[styles.itemName, item.checked && styles.itemNameChecked]}
                >
                  {item.name}
                </Text>
                <Text style={styles.itemSub}>
                  {item.qtyNeeded} • {item.note}
                </Text>
              </View>

              <View style={styles.itemRightCol}>
                <Text
                  style={[styles.itemPrice, item.checked && styles.itemPriceChecked]}
                >
                  {formatRupiah(item.estCost)}
                </Text>
                <View
                  style={[
                    styles.checkBox,
                    item.checked ? styles.checkBoxActive : styles.checkBoxIdle,
                  ]}
                >
                  {item.checked && (
                    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3}>
                      <Polyline points="20 6 9 17 4 12" />
                    </Svg>
                  )}
                </View>
              </View>
            </AnimatedPressable>
          ))}

          {/* 4. TOMBOL CATAT PENGELUARAN KE BUKU KAS */}
          <AnimatedPressable
            scaleTo={0.97}
            style={styles.recordExpenseBtn}
            onPress={handleRecordExpense}
          >
            <AssetVisual name="wallet_purse" size={22} />
            <Text style={styles.recordExpenseText}>
              Catat Belanja Terbeli ({formatRupiah(boughtCost)}) ke Kas
            </Text>
          </AnimatedPressable>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Home" navigation={navigation} />
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
  budgetCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
    marginBottom: 18,
  },
  budgetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLabelText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.4,
  },
  budgetBigNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 2,
  },
  budgetSummaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryPillGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  summaryDoneText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#047857',
  },
  summaryRemainingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    marginBottom: 10,
  },
  itemCardChecked: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderBottomColor: '#22C55E',
  },
  itemIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfoCol: {
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#15803D',
  },
  itemSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  itemRightCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
  },
  itemPriceChecked: {
    color: '#059669',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxIdle: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  checkBoxActive: {
    backgroundColor: '#10B981',
  },
  recordExpenseBtn: {
    marginTop: 8,
    backgroundColor: '#EA580C',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 4,
    borderBottomColor: '#9A3412',
  },
  recordExpenseText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
  },
});
