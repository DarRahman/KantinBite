import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal } from 'react-native';
import { ScreenHeader, PrimaryActionBadge } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { FoodVisual } from '../components/FoodVisual';
import { EmptyState } from '../components/EmptyState';
import { getProducts, addProduct } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { colors, radius, spacing } from '../theme/tokens';

export const HppScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Form State Tambah Resep Baru
  const [name, setName] = useState('');
  const [yieldQty, setYieldQty] = useState('50');
  const [price, setPrice] = useState('2000');
  const [canteenCut, setCanteenCut] = useState('500');
  const [selectedCategory, setSelectedCategory] = useState('Asin');
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 g', cost: '6000' },
    { id: '2', name: 'Telur Ayam & Minyak', qty: '2 Butir', cost: '8000' }
  ]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  const addIngredientRow = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: '', qty: '', cost: '' }
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
      type: selectedCategory === 'Manis' ? 'dadar' : 'risoles'
    });

    setShowModal(false);
    setName('');
    setYieldQty('50');
    setPrice('2000');
    setCanteenCut('500');
    setIngredients([
      { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 g', cost: '6000' }
    ]);
    await loadProducts();
    Alert.alert('Sukses', 'Resep dan kalkulasi HPP jajanan berhasil disimpan.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Katalog Jajanan & HPP"
        subtitle="Hitung Modal & Untung Bersih per Pcs"
        rightElement={
          <PrimaryActionBadge label="+ Resep Baru" onPress={() => setShowModal(true)} />
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {products.length === 0 ? (
          <EmptyState
            title="Belum Ada Resep Jajanan"
            message="Ketuk tombol + Resep Baru di atas untuk mulai menghitung HPP jajanan Anda."
            iconType="recipe"
          />
        ) : (
          products.map((item) => {
            const hpp = item.cost || 600;
            const cut = item.canteenCut || 500;
            const profit = item.profit || Math.max(0, item.price - cut - hpp);
            return (
              <View key={item.id} style={styles.recipeCard}>
                
                {/* HEADER KARTU JAJANAN DENGAN FOOD VISUAL VEKTOR ASLI */}
                <View style={styles.cardHeader}>
                  <View style={styles.visualContainer}>
                    <FoodVisual type={item.type || 'risoles'} size={52} />
                  </View>
                  <View style={styles.headerTextWrap}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardPrice}>Harga Jual: <Text style={{ color: '#EA580C' }}>{formatRupiah(item.price)}</Text></Text>
                  </View>
                  <View style={styles.batchPill}>
                    <Text style={styles.batchPillText}>{item.yieldQty || 50} Porsi</Text>
                  </View>
                </View>

                {/* RINCIAN BAHAN DENGAN BARIS BERSIH */}
                <View style={styles.ingredientsSummary}>
                  <Text style={styles.summaryLabel}>Bahan yang Dipakai:</Text>
                  {(item.ingredients || [
                    { name: 'Tepung Segitiga 500g', cost: 6000 },
                    { name: 'Telur & Sayuran', cost: 10000 }
                  ]).map((ing, iIdx) => (
                    <View key={iIdx} style={styles.ingSummaryRow}>
                      <Text style={styles.ingSummaryName}>• {ing.name} {ing.qty ? `(${ing.qty})` : ''}</Text>
                      <Text style={styles.ingSummaryCost}>{formatRupiah(ing.cost)}</Text>
                    </View>
                  ))}
                  <View style={styles.ingTotalRow}>
                    <Text style={styles.ingTotalLabel}>Total Modal {item.yieldQty || 50} Porsi:</Text>
                    <Text style={styles.ingTotalCost}>{formatRupiah(item.cost * (item.yieldQty || 50) || 30000)}</Text>
                  </View>
                </View>

                {/* STRIP HASIL METRIK SEPERTI DAPUR-RN */}
                <View style={styles.metricStrip}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Jatah Kantin:</Text>
                    <Text style={styles.metricValRed}>{formatRupiah(cut)}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Modal/Pcs:</Text>
                    <Text style={styles.metricValMuted}>{formatRupiah(hpp)}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Untung Bersih/Pcs:</Text>
                    <Text style={styles.metricValGreen}>{formatRupiah(profit)}</Text>
                  </View>
                </View>

              </View>
            );
          })
        )}

      </ScrollView>

      {/* MODAL INPUT RESEP DINAMIS */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Tambah Resep & Hitung HPP</Text>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 460 }}>
              
              <Text style={styles.fLabel}>Nama Jajanan</Text>
              <TextInput
                style={styles.fInput}
                placeholder="Contoh: Risol Goreng Mayo"
                value={name}
                onChangeText={setName}
              />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fLabel}>Jumlah Porsi Jadi</Text>
                  <TextInput
                    style={styles.fInput}
                    placeholder="50"
                    keyboardType="number-pad"
                    value={yieldQty}
                    onChangeText={setYieldQty}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fLabel}>Harga Jual Satuan (Rp)</Text>
                  <TextInput
                    style={styles.fInput}
                    placeholder="2000"
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
                keyboardType="number-pad"
                value={canteenCut}
                onChangeText={setCanteenCut}
              />

              {/* LIST BAHAN DINAMIS */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#18181B' }}>Bahan yang Dipakai</Text>
                <TouchableOpacity onPress={addIngredientRow}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#EA580C' }}>+ Tambah Bahan Lain</Text>
                </TouchableOpacity>
              </View>

              {ingredients.map((ing, idx) => (
                <View key={ing.id} style={styles.ingFormRow}>
                  <TextInput
                    style={[styles.fInput, { flex: 2, marginBottom: 0 }]}
                    placeholder={`Bahan #${idx + 1}`}
                    value={ing.name}
                    onChangeText={(val) => updateIngredient(ing.id, 'name', val)}
                  />
                  <TextInput
                    style={[styles.fInput, { flex: 1, marginBottom: 0 }]}
                    placeholder="Harga"
                    keyboardType="number-pad"
                    value={ing.cost}
                    onChangeText={(val) => updateIngredient(ing.id, 'cost', val)}
                  />
                  {ingredients.length > 1 && (
                    <TouchableOpacity onPress={() => removeIngredientRow(ing.id)} style={styles.delBtn}>
                      <Text style={{ color: '#DC2626', fontWeight: '800' }}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {/* RINGKASAN LIVE KALKULASI DI MODAL */}
              <View style={styles.liveCalcSurface}>
                <View style={styles.liveCalcRow}>
                  <Text style={styles.liveCalcLabel}>Total Modal {porsi} Porsi:</Text>
                  <Text style={styles.liveCalcVal}>{formatRupiah(totalModalResep)}</Text>
                </View>
                <View style={styles.liveCalcRow}>
                  <Text style={styles.liveCalcLabel}>Modal/Pcs:</Text>
                  <Text style={styles.liveCalcVal}>{formatRupiah(modalPerPcs)}</Text>
                </View>
                <View style={[styles.liveCalcRow, { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 6, marginTop: 4 }]}>
                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#18181B' }}>Untung Bersih/Pcs:</Text>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: '#059669' }}>{formatRupiah(untungBersihPerPcs)}</Text>
                </View>
              </View>

            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setShowModal(false)}>
                <Text style={styles.btnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={handleSaveRecipe}>
                <Text style={styles.btnSaveText}>Simpan Jajanan</Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFFFFF'
  },
  addBtn: {
    backgroundColor: '#FFF7ED',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7AA'
  },
  addBtnText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '700'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24
  },
  recipeCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F4F4F5'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  visualContainer: {
    width: 52,
    height: 52,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextWrap: {
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717A',
    marginTop: 2
  },
  batchPill: {
    backgroundColor: '#FFF7ED',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  batchPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EA580C'
  },
  ingredientsSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    marginBottom: 4
  },
  ingSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2
  },
  ingSummaryName: {
    fontSize: 12,
    color: '#52525B'
  },
  ingSummaryCost: {
    fontSize: 12,
    fontWeight: '600',
    color: '#18181B'
  },
  ingTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingTop: 6,
    marginTop: 4
  },
  ingTotalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B'
  },
  ingTotalCost: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C'
  },
  metricStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  metricItem: {
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: 10,
    color: '#71717A',
    fontWeight: '600'
  },
  metricValRed: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
    marginTop: 2
  },
  metricValMuted: {
    fontSize: 12,
    fontWeight: '800',
    color: '#18181B',
    marginTop: 2
  },
  metricValGreen: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
    marginTop: 2
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  closeText: {
    fontSize: 16,
    color: '#71717A',
    fontWeight: '800',
    padding: 4
  },
  fLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 4
  },
  fInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#18181B',
    marginBottom: 10
  },
  ingFormRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8
  },
  delBtn: {
    padding: 6
  },
  liveCalcSurface: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 10,
    marginTop: 8
  },
  liveCalcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2
  },
  liveCalcLabel: {
    fontSize: 11,
    color: '#71717A'
  },
  liveCalcVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B'
  },
  btnCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F4F4F5',
    alignItems: 'center'
  },
  btnCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A'
  },
  btnSave: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center'
  },
  btnSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
