import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable, AnimatedProgressBar, TactilePill } from '../components/PlayfulComponents';
import { getStockItems, saveStockItems } from '../db/storage';

export const StockScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [stockItems, setStockItems] = useState([
    { id: '1', name: 'Tepung Terigu', qty: '4.5 kg', numQty: 4.5, unit: 'kg', min: '2 kg', cap: 75, status: 'safe', icon: 'wheat_flour', category: 'Bahan Kering' },
    { id: '2', name: 'Telur Ayam', qty: '38 Butir', numQty: 38, unit: 'Butir', min: '15 butir', cap: 65, status: 'safe', icon: 'egg_raw', category: 'Bahan Basah' },
    { id: '3', name: 'Minyak Goreng', qty: '0.8 Liter', numQty: 0.8, unit: 'Liter', min: '2 Liter', cap: 20, status: 'critical', icon: 'oil_butter', category: 'Bahan Basah' },
    { id: '4', name: 'Gas LPG 3kg', qty: '1 Tabung', numQty: 1, unit: 'Tabung', min: '2 Tabung', cap: 25, status: 'critical', icon: 'gas_cylinder', category: 'Operasional' },
    { id: '5', name: 'Gula Pasir & Aren', qty: '3.0 kg', numQty: 3.0, unit: 'kg', min: '1 kg', cap: 80, status: 'safe', icon: 'sugar_cane', category: 'Bahan Kering' },
    { id: '6', name: 'Daging Ayam', qty: '2.5 kg', numQty: 2.5, unit: 'kg', min: '1 kg', cap: 70, status: 'safe', icon: 'meat_chicken', category: 'Bahan Basah' },
    { id: '7', name: 'Wortel & Kentang', qty: '1.8 kg', numQty: 1.8, unit: 'kg', min: '1 kg', cap: 60, status: 'safe', icon: 'carrot_veg', category: 'Bahan Basah' },
    { id: '8', name: 'Mika Plastik Kue', qty: '80 Pcs', numQty: 80, unit: 'Pcs', min: '30 pcs', cap: 85, status: 'safe', icon: 'package_box', category: 'Operasional' },
  ]);

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {
    const saved = await getStockItems();
    if (saved && saved.length > 0) {
      setStockItems(saved);
    }
  };

  const handleQuickRestock = async (id) => {
    const updated = stockItems.map((item) => {
      if (item.id !== id) return item;
      const nextCap = Math.min(100, (item.cap || 30) + 35);
      const baseNum = item.numQty || parseFloat(item.qty) || 1;
      const step = item.unit === 'Butir' || item.unit === 'Pcs' ? 15 : 2;
      const nextNum = Math.round((baseNum + step) * 10) / 10;
      const unitStr = item.unit || item.qty.split(' ').slice(1).join(' ') || 'kg';
      return {
        ...item,
        numQty: nextNum,
        qty: `${nextNum} ${unitStr}`,
        cap: nextCap,
        status: nextCap >= 40 ? 'safe' : 'critical',
      };
    });
    setStockItems(updated);
    await saveStockItems(updated);
  };

  const criticalCount = stockItems.filter((i) => i.status === 'critical').length;
  const filters = ['Semua', `Perlu Restok (${criticalCount})`, 'Bahan Kering', 'Bahan Basah', 'Operasional'];

  const filteredItems = stockItems.filter((item) => {
    if (activeFilter === 'Semua') return true;
    if (activeFilter.startsWith('Perlu Restok')) return item.status === 'critical';
    return item.category === activeFilter;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3E8FF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC PANTRY HEADER DENGAN CHEF BITEY MEMERIKSA STOK */}
        <ScenicBanner
          scene="stock_pantry"
          badgeText="INVENTARIS DAPUR"
          title="Gudang Bahan Baku"
          subtitle="Pantau ketersediaan tepung, telur, minyak & gas produksi"
          onBackPress={() => navigation.goBack()}
          actionLabel="Belanja Subuh"
          onActionPress={() => navigation.navigate('MarketShopping')}
        />

        <View style={styles.bodyPadding}>
          {/* 2. BANNER PERINGATAN BAHAN MENIPIS */}
          {criticalCount > 0 && (
            <AnimatedPressable
              scaleTo={0.98}
              onPress={() => navigation.navigate('MarketShopping')}
              style={styles.restockAlertCard}
            >
              <View style={styles.restockLeft}>
                <AssetVisual name="warning_badge" size={36} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.restockTitle}>
                    {criticalCount} Bahan Dapur Hampir Habis
                  </Text>
                  <Text style={styles.restockDesc}>
                    Segera masukkan ke daftar belanja pasar subuh esok pagi
                  </Text>
                </View>
              </View>
              <View style={styles.restockCtaPill}>
                <Text style={styles.restockCtaText}>Beli ›</Text>
              </View>
            </AnimatedPressable>
          )}

          {/* 3. FILTER KATEGORI BAHAN */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((cat) => (
              <TactilePill
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onPress={() => setActiveFilter(cat)}
              />
            ))}
          </ScrollView>

          {/* 4. GRID 2 KOLOM BAHAN BAKU DENGAN BAR KAPASITAS BERANIMASI */}
          <View style={styles.stockGrid}>
            {filteredItems.map((item) => {
              const isCrit = item.status === 'critical';
              return (
                <View
                  key={item.id}
                  style={[styles.stockCard, isCrit && styles.stockCardCritical]}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.iconWrap,
                        { backgroundColor: isCrit ? '#FEE2E2' : '#FFFBEB' },
                      ]}
                    >
                      <AssetVisual name={item.icon} size={38} />
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        isCrit ? styles.statusBadgeCrit : styles.statusBadgeSafe,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          isCrit ? styles.statusTextCrit : styles.statusTextSafe,
                        ]}
                      >
                        {isCrit ? 'Menipis' : 'Aman'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>

                  <View style={styles.qtyRow}>
                    <Text style={[styles.qtyValue, isCrit && { color: '#DC2626' }]}>
                      {item.qty}
                    </Text>
                    <Text style={styles.minText}>Min {item.min}</Text>
                  </View>

                  <View style={{ marginVertical: 8 }}>
                    <AnimatedProgressBar
                      percent={item.cap}
                      color={isCrit ? '#DC2626' : '#10B981'}
                      trackColor={isCrit ? '#FEE2E2' : '#E2E8F0'}
                      height={7}
                    />
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.quickAddBtn,
                      isCrit && styles.quickAddBtnCritical,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleQuickRestock(item.id)}
                  >
                    <Text
                      style={[
                        styles.quickAddText,
                        isCrit && styles.quickAddTextCritical,
                      ]}
                    >
                      + Tambah Stok
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

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
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  restockAlertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    borderBottomWidth: 4,
    borderBottomColor: '#FCA5A5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  restockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  restockTitle: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#991B1B',
  },
  restockDesc: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B91C1C',
    marginTop: 2,
  },
  restockCtaPill: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  restockCtaText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  filterRow: {
    paddingBottom: 14,
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  stockCard: {
    width: '48.2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  stockCardCritical: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FECACA',
    borderBottomColor: '#F87171',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeSafe: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeCrit: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusTextSafe: {
    color: '#047857',
  },
  statusTextCrit: {
    color: '#B91C1C',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  itemCategory: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 1,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 8,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
  },
  minText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#71717A',
  },
  quickAddBtn: {
    marginTop: 4,
    backgroundColor: '#F8FAFC',
    borderRadius: 11,
    paddingVertical: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickAddBtnCritical: {
    backgroundColor: '#DC2626',
    borderColor: '#991B1B',
  },
  quickAddText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  quickAddTextCritical: {
    color: '#FFFFFF',
  },
});
