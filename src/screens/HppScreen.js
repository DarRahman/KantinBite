import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Dimensions } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton, TactilePill } from '../components/PlayfulComponents';
import { getProducts, addProduct } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const HppScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterCat, setFilterCat] = useState('Semua');

  // Form State Tambah Resep Baru
  const [name, setName] = useState('');
  const [yieldQty, setYieldQty] = useState('50');
  const [price, setPrice] = useState('2000');
  const [canteenCut, setCanteenCut] = useState('500');
  const [selectedCategory, setSelectedCategory] = useState('Gorengan');
  const [selectedType, setSelectedType] = useState('risoles');
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 g', cost: '6000', icon: 'wheat_flour' },
    { id: '2', name: 'Telur Ayam & Minyak', qty: '2 Butir', cost: '8000', icon: 'egg_raw' },
    { id: '3', name: 'Gas LPG & Wadah Mika', qty: 'Operasional', cost: '2500', icon: 'gas_cylinder' }
  ]);

  useEffect(() => {
    loadProducts();
    const unsub = navigation.addListener('focus', loadProducts);
    return unsub;
  }, [navigation]);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  const addIngredientRow = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: '', qty: '', cost: '', icon: 'wheat_flour' }
    ]);
  };

  const removeIngredientRow = (id) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map(ing => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const totalModalResep = ingredients.reduce((sum, ing) => {
    const c = parseInt(ing.cost.toString().replace(/[^0-9]/g, '')) || 0;
    return sum + c;
  }, 0);

  const porsi = parseInt(yieldQty.toString().replace(/[^0-9]/g, '')) || 1;
  const hargaJual = parseInt(price.toString().replace(/[^0-9]/g, '')) || 0;
  const jatahKantin = parseInt(canteenCut.toString().replace(/[^0-9]/g, '')) || 0;
  const modalPerPcs = Math.round(totalModalResep / porsi);
  const untungBersihPerPcs = Math.max(0, hargaJual - jatahKantin - modalPerPcs);

  const handleSaveRecipe = async () => {
    if (!name.trim()) {
      Alert.alert('Perhatian', 'Nama jajanan wajib diisi.');
      return;
    }
    const validIngredients = ingredients.filter(i => i.name.trim() && i.cost);
    if (validIngredients.length === 0) {
      Alert.alert('Perhatian', 'Minimal isi satu bahan baku beserta harganya.');
      return;
    }

    await addProduct({
      name: name.trim(),
      price: hargaJual,
      cost: modalPerPcs,
      canteenCut: jatahKantin,
      yieldQty: porsi,
      profit: untungBersihPerPcs,
      ingredients: validIngredients,
      category: selectedCategory,
      type: selectedType
    });

    setShowModal(false);
    setName('');
    setYieldQty('50');
    setPrice('2000');
    setCanteenCut('500');
    setIngredients([
      { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 g', cost: '6000', icon: 'wheat_flour' },
      { id: '2', name: 'Telur Ayam & Minyak', qty: '2 Butir', cost: '8000', icon: 'egg_raw' },
      { id: '3', name: 'Gas LPG & Wadah Mika', qty: 'Operasional', cost: '2500', icon: 'gas_cylinder' }
    ]);
    await loadProducts();
    Alert.alert('Sukses', 'Resep dan kalkulasi modal HPP berhasil disimpan.');
  };

  const filteredProducts = filterCat === 'Semua' 
    ? products 
    : products.filter(p => p.category === filterCat || (filterCat === 'Gorengan' && (p.type === 'risoles' || p.type === 'pastel')));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="cooking_pan" size={16} />
            <Text style={styles.headerTagText}>KALKULATOR RESEP HPP</Text>
          </View>
          <Text style={styles.headerTitle}>Katalog & Modal Resep</Text>
        </View>

        <TactileButton 
          size="sm" 
          variant="primary"
          onPress={() => setShowModal(true)}
        >
          + Resep Baru
        </TactileButton>
      </View>

      {/* CELEBRATION BANNER ALA LINGKARAN HIJAU 12 */}
      <BentoCard bg="#DCFCE7" accentBorder="#BBF7D0" style={{ marginHorizontal: 20, marginTop: 10, padding: 12, borderBottomWidth: 3.5, borderBottomColor: '#10B981' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AssetVisual name="mascot_celebrate" size={40} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: '#15803D' }}>Pencapaian Omzet Hari Ini!</Text>
            <Text style={{ fontSize: 11, color: '#166534', marginTop: 1 }}>93 pcs aneka kue laku di kantin mitra & kasir lapak.</Text>
          </View>
        </View>
      </BentoCard>

      {/* HORIZONTAL CATEGORY PILLS ALA UIVERSE.IO */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TactilePill label="Semua" active={filterCat === 'Semua'} onPress={() => setFilterCat('Semua')} count={products.length} />
          <TactilePill label="Gorengan" icon={<AssetVisual name="mascot_fire" size={14} />} active={filterCat === 'Gorengan'} onPress={() => setFilterCat('Gorengan')} />
          <TactilePill label="Kue Basah" icon={<AssetVisual name="dadar_gulung" size={14} />} active={filterCat === 'Kue Basah'} onPress={() => setFilterCat('Kue Basah')} />
          <TactilePill label="Asin" active={filterCat === 'Asin'} onPress={() => setFilterCat('Asin')} />
          <TactilePill label="Manis" active={filterCat === 'Manis'} onPress={() => setFilterCat('Manis')} />
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyCard}>
            <AssetVisual name="chef_mascot" size={64} />
            <Text style={styles.emptyTitle}>Belum Ada Resep Jajanan</Text>
            <Text style={styles.emptySubtitle}>Sentuh tombol + Resep Baru untuk mulai menghitung rincian HPP jajananmu.</Text>
          </View>
        ) : (
          filteredProducts.map((item) => {
            const hpp = item.cost || 600;
            const cut = item.canteenCut || 500;
            const profit = item.profit || Math.max(0, item.price - cut - hpp);
            const isHot = item.type === 'risoles' || item.type === 'pastel';

            return (
              <BentoCard key={item.id} bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.productBento}>
                
                {/* TOP ROW: THUMBNAIL BESAR 72PX + INFO NAMA + BADGE STATUS */}
                <View style={styles.bentoTopRow}>
                  <View style={styles.foodThumbBox}>
                    <AssetVisual name={item.type || 'risoles'} size={68} />
                  </View>

                  <View style={styles.foodInfoWrap}>
                    <View style={styles.badgeRow}>
                      {isHot ? (
                        <View style={[styles.miniBadge, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
                          <AssetVisual name="mascot_fire" size={12} />
                          <Text style={[styles.miniBadgeText, { color: '#B91C1C' }]}>Gorengan Hangat</Text>
                        </View>
                      ) : (
                        <View style={[styles.miniBadge, { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' }]}>
                          <AssetVisual name="mascot_star" size={12} />
                          <Text style={[styles.miniBadgeText, { color: '#15803D' }]}>Kue Basah Favorit</Text>
                        </View>
                      )}
                      <View style={styles.batchChip}>
                        <Text style={styles.batchChipText}>{item.yieldQty || 50} Pcs/Batch</Text>
                      </View>
                    </View>

                    <Text style={styles.foodNameText}>{item.name}</Text>
                    <Text style={styles.foodPriceText}>Harga Jual: <Text style={{ color: '#EA580C', fontWeight: '900' }}>{formatRupiah(item.price)}</Text></Text>
                  </View>
                </View>

                {/* MIDDLE: BAHAN BAKU BER-IKON MIKRO NYATA */}
                <View style={styles.ingredientsPillBox}>
                  <Text style={styles.ingBoxLabel}>Bahan Utama & Biaya:</Text>
                  <View style={styles.ingChipsFlow}>
                    {(item.ingredients || [
                      { name: 'Terigu 500g', cost: 6000, icon: 'wheat_flour' },
                      { name: 'Telur & Sayur', cost: 10000, icon: 'egg_raw' },
                      { name: 'Gas & Mika', cost: 2500, icon: 'gas_cylinder' }
                    ]).map((ing, iIdx) => (
                      <View key={iIdx} style={styles.ingChipItem}>
                        <AssetVisual name={ing.icon || 'wheat_flour'} size={14} />
                        <Text style={styles.ingChipText}>{ing.name} ({formatRupiah(ing.cost)})</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* BOTTOM METRIC STRIP PLAYFUL */}
                <View style={styles.metricBottomStrip}>
                  
                  <View style={styles.metricBlock}>
                    <Text style={styles.metricBlockLabel}>Modal/Pcs</Text>
                    <Text style={styles.metricBlockValMuted}>{formatRupiah(hpp)}</Text>
                  </View>

                  <View style={styles.metricBlock}>
                    <Text style={styles.metricBlockLabel}>Jatah Kantin</Text>
                    <Text style={styles.metricBlockValRed}>{formatRupiah(cut)}</Text>
                  </View>

                  <View style={[styles.metricBlock, styles.metricBlockGreen]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                      <AssetVisual name="chart_up" size={14} />
                      <Text style={styles.metricBlockLabelGreen}>Laba Bersih/Pcs</Text>
                    </View>
                    <Text style={styles.metricBlockValGreen}>{formatRupiah(profit)}</Text>
                  </View>

                </View>

              </BentoCard>
            );
          })
        )}

        {/* BOTTON ACTION: RACIK RESEP BARU */}
        <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
          <TactileButton
            size="md"
            variant="accent"
            icon={<AssetVisual name="cooking_pan" size={20} />}
            onPress={() => navigation.navigate('RecipeEditor')}
          >
            + Racik & Simulasi Resep Baru
          </TactileButton>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL INPUT RESEP PLAYFUL BOTTOM SHEET */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalSubtitle}>OPERASIONAL DAPUR UMKM</Text>
                <Text style={styles.modalTitle}>Racik Resep & Hitung HPP</Text>
              </View>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 460 }}>
              
              <Text style={styles.fLabel}>Pilih Ikon Kue Bervolume</Text>
              <View style={styles.typeSelectorRow}>
                {['risoles', 'pastel', 'dadar', 'lemper'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    activeOpacity={0.8}
                    onPress={() => setSelectedType(t)}
                    style={[styles.typeTile, selectedType === t && styles.typeTileActive]}
                  >
                    <AssetVisual name={t} size={42} />
                    <Text style={[styles.typeTileText, selectedType === t && styles.typeTileTextActive]}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.fLabel}>Nama Jajanan</Text>
              <TextInput
                style={styles.fInput}
                placeholder="Contoh: Risol Rogout Ayam Crispy"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
              />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fLabel}>Porsi per Batch</Text>
                  <TextInput
                    style={styles.fInput}
                    placeholder="50"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    value={yieldQty}
                    onChangeText={setYieldQty}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fLabel}>Harga Jual (Rp)</Text>
                  <TextInput
                    style={styles.fInput}
                    placeholder="2000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </View>

              <Text style={styles.fLabel}>Jatah Komisi Kantin per Pcs (Rp)</Text>
              <TextInput
                style={styles.fInput}
                placeholder="500"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                value={canteenCut}
                onChangeText={setCanteenCut}
              />

              {/* LIST BAHAN DINAMIS DENGAN CHIP IKON */}
              <View style={styles.ingHeaderRow}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#1E293B' }}>Bahan Baku & Biaya Gas</Text>
                <TouchableOpacity onPress={addIngredientRow}>
                  <Text style={{ fontSize: 12, fontWeight: '800', color: '#EA580C' }}>+ Tambah Bahan</Text>
                </TouchableOpacity>
              </View>

              {ingredients.map((ing, idx) => (
                <View key={ing.id} style={styles.ingFormRow}>
                  <TextInput
                    style={[styles.fInput, { flex: 2, marginBottom: 0 }]}
                    placeholder={`Bahan #${idx + 1}`}
                    placeholderTextColor="#94A3B8"
                    value={ing.name}
                    onChangeText={(val) => updateIngredient(ing.id, 'name', val)}
                  />
                  <TextInput
                    style={[styles.fInput, { flex: 1, marginBottom: 0 }]}
                    placeholder="Rp Biaya"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    value={ing.cost}
                    onChangeText={(val) => updateIngredient(ing.id, 'cost', val)}
                  />
                  {ingredients.length > 1 && (
                    <TouchableOpacity onPress={() => removeIngredientRow(ing.id)} style={styles.delBtn}>
                      <Text style={{ color: '#EF4444', fontWeight: '900', fontSize: 16 }}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {/* RINGKASAN LIVE KALKULASI DI MODAL */}
              <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.liveCalcSurface}>
                <View style={styles.liveCalcRow}>
                  <Text style={styles.liveCalcLabel}>Total Biaya {porsi} Porsi:</Text>
                  <Text style={styles.liveCalcVal}>{formatRupiah(totalModalResep)}</Text>
                </View>
                <View style={styles.liveCalcRow}>
                  <Text style={styles.liveCalcLabel}>Modal Pokok/Pcs (HPP):</Text>
                  <Text style={styles.liveCalcVal}>{formatRupiah(modalPerPcs)}</Text>
                </View>
                <View style={[styles.liveCalcRow, { borderTopWidth: 1.5, borderTopColor: '#FDE68A', paddingTop: 8, marginTop: 4 }]}>
                  <Text style={{ fontSize: 14, fontWeight: '800', color: '#1E293B' }}>Untung Bersih per Pcs:</Text>
                  <Text style={{ fontSize: 17, fontWeight: '900', color: '#15803D' }}>{formatRupiah(untungBersihPerPcs)}</Text>
                </View>
              </BentoCard>

            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TactileButton variant="secondary" style={{ flex: 1 }} onPress={() => setShowModal(false)}>
                Batal
              </TactileButton>
              <TactileButton variant="primary" style={{ flex: 2 }} onPress={handleSaveRecipe}>
                Simpan Resep
              </TactileButton>
            </View>

          </View>
        </View>
      </Modal>

      <BottomNav activeTab="Hpp" navigation={navigation} />
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
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 14,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  productBento: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  bentoTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodThumbBox: {
    width: 78,
    height: 78,
    borderRadius: 22,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  foodInfoWrap: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  batchChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  batchChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  foodNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.2,
  },
  foodPriceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  ingredientsPillBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  ingBoxLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  ingChipsFlow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ingChipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ingChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  metricBottomStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8F5',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  metricBlock: {
    alignItems: 'center',
  },
  metricBlockLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  metricBlockValMuted: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  metricBlockValRed: {
    fontSize: 13,
    fontWeight: '800',
    color: '#DC2626',
    marginTop: 2,
  },
  metricBlockGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  metricBlockLabelGreen: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  metricBlockValGreen: {
    fontSize: 14,
    fontWeight: '900',
    color: '#15803D',
    marginTop: 1,
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
  typeSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  typeTile: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAF8F5',
  },
  typeTileActive: {
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  typeTileText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
  typeTileTextActive: {
    color: '#EA580C',
    fontWeight: '800',
  },
  fLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 5,
  },
  fInput: {
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
  ingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  ingFormRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  delBtn: {
    padding: 8,
  },
  liveCalcSurface: {
    padding: 14,
    marginTop: 8,
    borderRadius: 16,
  },
  liveCalcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  liveCalcLabel: {
    fontSize: 12,
    color: '#78350F',
    fontWeight: '600',
  },
  liveCalcVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#78350F',
  },
});
