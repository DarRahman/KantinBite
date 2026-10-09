import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Dimensions } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton, TactilePill } from '../components/PlayfulComponents';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const StockScreen = ({ navigation }) => {
  const [stockList, setStockList] = useState([
    { id: 's1', name: 'Tepung Terigu Segitiga', current: 3.5, min: 2.0, max: 10, unit: 'Kg', cost: 12000, icon: 'wheat_flour', category: 'Bahan Utama' },
    { id: 's2', name: 'Telur Ayam Negeri', current: 12, min: 15, max: 50, unit: 'Butir', cost: 2000, icon: 'egg_raw', category: 'Bahan Utama' },
    { id: 's3', name: 'Minyak Goreng Sawit', current: 1.2, min: 2.0, max: 5, unit: 'Liter', cost: 16000, icon: 'oil_butter', category: 'Bahan Utama' },
    { id: 's4', name: 'Wortel & Daun Bawang', current: 0.8, min: 1.0, max: 3, unit: 'Kg', cost: 14000, icon: 'carrot_veg', category: 'Sayuran' },
    { id: 's5', name: 'Daging Dada Ayam', current: 1.5, min: 1.0, max: 4, unit: 'Kg', cost: 36000, icon: 'meat_chicken', category: 'Isian' },
    { id: 's6', name: 'Gula Pasir Kristal', current: 2.0, min: 1.0, max: 5, unit: 'Kg', cost: 17500, icon: 'sugar_cane', category: 'Pemanis' },
    { id: 's7', name: 'Gas Melon LPG 3Kg', current: 1, min: 1, max: 3, unit: 'Tabung', cost: 22000, icon: 'gas_cylinder', category: 'Energi' },
    { id: 's8', name: 'Plastik Mika Snack 7C', current: 35, min: 50, max: 200, unit: 'Pcs', cost: 250, icon: 'package_box', category: 'Kemasan' },
  ]);

  const [filterCat, setFilterCat] = useState('Semua');
  const [restockModal, setRestockModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [addQty, setAddQty] = useState('5');

  const categories = ['Semua', 'Kritis', 'Bahan Utama', 'Sayuran', 'Kemasan'];

  const criticalItems = stockList.filter(s => s.current <= s.min);

  const filteredItems = stockList.filter(s => {
    if (filterCat === 'Semua') return true;
    if (filterCat === 'Kritis') return s.current <= s.min;
    return s.category === filterCat;
  });

  const handleOpenRestock = (item) => {
    setSelectedStock(item);
    setAddQty('5');
    setRestockModal(true);
  };

  const handleSaveRestock = () => {
    if (!selectedStock) return;
    const qty = Number(addQty) || 0;
    if (qty <= 0) {
      Alert.alert('Perhatian', 'Masukkan jumlah tambah stok yang valid.');
      return;
    }

    setStockList(prev => prev.map(s => {
      if (s.id === selectedStock.id) {
        return { ...s, current: Number((s.current + qty).toFixed(1)) };
      }
      return s;
    }));

    setRestockModal(false);
    Alert.alert('Sukses', `Stok ${selectedStock.name} bertambah +${qty} ${selectedStock.unit}.`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="wheat_flour" size={16} />
            <Text style={styles.headerTagText}>INVENTARIS GUDANG DAPUR</Text>
          </View>
          <Text style={styles.headerTitle}>Sisa Stok & Peringatan</Text>
        </View>

        <TouchableOpacity 
          style={styles.shoppingNavBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MarketShopping')}
        >
          <AssetVisual name="market_cart" size={22} />
          <Text style={styles.shoppingNavText}>Ke Pasar</Text>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL CATEGORY PILLS */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categories.map((cat) => (
            <TactilePill
              key={cat}
              label={cat}
              active={filterCat === cat}
              onPress={() => setFilterCat(cat)}
              count={cat === 'Kritis' ? criticalItems.length : undefined}
              icon={cat === 'Kritis' ? <AssetVisual name="warning_badge" size={14} /> : undefined}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BANNER PERINGATAN STOK KRITIS ALA MOBBIN */}
        {criticalItems.length > 0 && (
          <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.alertBento}>
            <View style={styles.alertTopRow}>
              <View style={styles.alertIconBox}>
                <AssetVisual name="warning_badge" size={26} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{criticalItems.length} Bahan Mendekati Batas Kritis!</Text>
                <Text style={styles.alertSubtitle}>
                  {criticalItems.map(c => c.name.split(' ')[0]).join(', ')} harus segera dibelanjakan ke pasar Kanoman subuh nanti.
                </Text>
              </View>
            </View>

            <TactileButton 
              size="sm" 
              variant="accent" 
              style={{ marginTop: 10 }}
              icon={<AssetVisual name="market_cart" size={18} />}
              onPress={() => navigation.navigate('MarketShopping')}
            >
              Buat Daftar Belanja Subuh Otomatis
            </TactileButton>
          </BentoCard>
        )}

        {/* LIST KARTU STOK BERVOLUME */}
        <Text style={styles.sectionTitle}>Status Bahan Baku & Kemasan</Text>
        {filteredItems.map((item) => {
          const isLow = item.current <= item.min;
          const pct = Math.min(100, Math.round((item.current / item.max) * 100));

          return (
            <BentoCard 
              key={item.id} 
              bg="#FFFFFF" 
              accentBorder={isLow ? '#FECACA' : '#E2E8F0'} 
              style={[styles.stockCard, isLow && styles.stockCardLow]}
            >
              <View style={styles.stockCardTop}>
                
                <View style={styles.stockVisualBox}>
                  <AssetVisual name={item.icon || 'wheat_flour'} size={48} />
                </View>

                <View style={styles.stockInfoWrap}>
                  <View style={styles.stockBadgeRow}>
                    <View style={[styles.stockStatusBadge, isLow ? styles.statusBadgeLow : styles.statusBadgeSafe]}>
                      <AssetVisual name={isLow ? 'warning_badge' : 'check_badge'} size={12} />
                      <Text style={[styles.statusBadgeText, { color: isLow ? '#B91C1C' : '#15803D' }]}>
                        {isLow ? 'Stok Kritis' : 'Stok Aman'}
                      </Text>
                    </View>
                    <Text style={styles.stockCategoryText}>{item.category}</Text>
                  </View>

                  <Text style={styles.stockNameText}>{item.name}</Text>
                  <Text style={styles.stockCostText}>Harga Pasar: {formatRupiah(item.cost)}/{item.unit}</Text>
                </View>

                {/* SISA STOK BESAR */}
                <View style={styles.qtyBox}>
                  <Text style={[styles.qtyNum, isLow && styles.qtyNumLow]}>{item.current}</Text>
                  <Text style={styles.qtyUnit}>{item.unit}</Text>
                </View>

              </View>

              {/* PROGRESS BAR KAPASITAS TEBAL ALA UIVERSE.IO */}
              <View style={styles.progressBarWrap}>
                <View style={styles.progressBarBg}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${pct}%`, backgroundColor: isLow ? '#EF4444' : '#10B981' }
                    ]} 
                  />
                </View>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressMinLabel}>Min: {item.min} {item.unit}</Text>
                  <Text style={styles.progressPctLabel}>{pct}% Kapasitas</Text>
                </View>
              </View>

              {/* TOMBOL CEPAT RESTOK */}
              <View style={styles.cardActionRow}>
                <TouchableOpacity 
                  style={styles.restockChipBtn}
                  activeOpacity={0.8}
                  onPress={() => handleOpenRestock(item)}
                >
                  <Text style={styles.restockChipText}>+ Tambah Sisa Stok</Text>
                </TouchableOpacity>
              </View>

            </BentoCard>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL TAMBAH STOK EMPUK */}
      <Modal visible={restockModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalSubtitle}>UPDATE GUDANG BAHAN</Text>
                <Text style={styles.modalTitle}>Tambah Sisa Stok Dapur</Text>
              </View>
              <TouchableOpacity onPress={() => setRestockModal(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedStock && (
              <View style={styles.modalStockPreview}>
                <AssetVisual name={selectedStock.icon || 'wheat_flour'} size={56} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.modalStockName}>{selectedStock.name}</Text>
                  <Text style={styles.modalStockCurrent}>
                    Sisa Saat Ini: <Text style={{ color: '#EA580C', fontWeight: '900' }}>{selectedStock.current} {selectedStock.unit}</Text>
                  </Text>
                </View>
              </View>
            )}

            <Text style={styles.fLabel}>Jumlah Masuk ({selectedStock?.unit || 'Kg'}):</Text>
            <TextInput
              style={styles.fInput}
              value={addQty}
              onChangeText={setAddQty}
              keyboardType="numeric"
              placeholder="Contoh: 5"
              placeholderTextColor="#94A3B8"
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TactileButton variant="secondary" style={{ flex: 1 }} onPress={() => setRestockModal(false)}>
                Batal
              </TactileButton>
              <TactileButton variant="primary" style={{ flex: 2 }} onPress={handleSaveRestock}>
                Simpan Penambahan
              </TactileButton>
            </View>

          </View>
        </View>
      </Modal>

      <BottomNav activeTab="Dashboard" navigation={navigation} />
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
  shoppingNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
  },
  shoppingNavText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#B45309',
  },
  filterBar: {
    backgroundColor: '#FAF8F5',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    padding: 18,
  },
  alertBento: {
    padding: 16,
    marginBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  alertTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#B45309',
    marginBottom: 2,
  },
  alertSubtitle: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  stockCard: {
    padding: 16,
    marginBottom: 14,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  stockCardLow: {
    borderBottomColor: '#F87171',
    backgroundColor: '#FFFDFD',
  },
  stockCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockVisualBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
    marginRight: 12,
  },
  stockInfoWrap: {
    flex: 1,
  },
  stockBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  stockStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeLow: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeSafe: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '900',
  },
  stockCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
  },
  stockNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  stockCostText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
  },
  qtyBox: {
    alignItems: 'flex-end',
    minWidth: 50,
  },
  qtyNum: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
  },
  qtyNumLow: {
    color: '#DC2626',
  },
  qtyUnit: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  progressBarWrap: {
    marginBottom: 10,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressMinLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  progressPctLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  cardActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
    paddingTop: 8,
  },
  restockChipBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  restockChipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
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
  modalSubtitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EA580C',
    letterSpacing: 0.6,
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
  modalStockPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  modalStockName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  modalStockCurrent: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  fLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  fInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
});
