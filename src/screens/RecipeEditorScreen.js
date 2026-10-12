import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { formatRupiah } from '../utils/formatters';

export const RecipeEditorScreen = ({ navigation, route }) => {
  const recipeId = route?.params?.recipeId;
  const isEditMode = Boolean(recipeId);

  const [selectedIcon, setSelectedIcon] = useState('risoles_rogout');
  const availableIcons = ['risoles_rogout', 'pastel_telur', 'dadar_gulung', 'lemper_ayam'];
  const [recipeName, setRecipeName] = useState('Risoles Rogout Ayam');
  const [batchPortions, setBatchPortions] = useState('50');
  const [suggestedSellingPrice, setSuggestedSellingPrice] = useState('1200');
  const [canteenShare, setCanteenShare] = useState('400');

  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 gram', cost: 6000, icon: 'wheat_flour' },
    { id: '2', name: 'Telur Ayam & Minyak Goreng', qty: '2 Butir & Minyak', cost: 8000, icon: 'egg_raw' },
    { id: '3', name: 'Ayam Suwir & Sayuran Isian', qty: 'Isian Rogout Gurih', cost: 10000, icon: 'meat_chicken' },
    { id: '4', name: 'Gas LPG & Kemasan Mika', qty: 'Alokasi Operasional', cost: 6000, icon: 'gas_cylinder' },
  ]);

  useEffect(() => {
    if (recipeId === 'r2' || recipeId === 'p2') {
      setSelectedIcon('pastel_telur');
      setRecipeName('Pastel Sayur Telur');
      setBatchPortions('50');
      setSuggestedSellingPrice('1500');
      setCanteenShare('500');
      setIngredients([
        { id: '1', name: 'Tepung Terigu Cakra 500g', qty: 'Kulit Renyah', cost: 7000, icon: 'wheat_flour' },
        { id: '2', name: 'Telur Rebus & Sayur Wortel', qty: 'Isian Sayur Telur', cost: 12000, icon: 'egg_raw' },
        { id: '3', name: 'Daging Ayam Cincang', qty: 'Daging Isian', cost: 10000, icon: 'meat_chicken' },
        { id: '4', name: 'Minyak Goreng & Gas LPG', qty: 'Alokasi Goreng', cost: 8500, icon: 'gas_cylinder' },
      ]);
    } else if (recipeId === 'r3' || recipeId === 'p3') {
      setSelectedIcon('dadar_gulung');
      setRecipeName('Dadar Gulung Pandan');
      setBatchPortions('50');
      setSuggestedSellingPrice('1000');
      setCanteenShare('300');
      setIngredients([
        { id: '1', name: 'Tepung Terigu & Daun Suji', qty: 'Adonan Kulit Hijau', cost: 5000, icon: 'wheat_flour' },
        { id: '2', name: 'Kelapa Parut & Gula Jawa', qty: 'Unti Kelapa Manis', cost: 9000, icon: 'sugar_cane' },
        { id: '3', name: 'Santan Kelapa Gurih', qty: 'Santan Kental', cost: 6000, icon: 'oil_butter' },
        { id: '4', name: 'Gas LPG & Plastik Kemasan', qty: 'Biaya Pengolahan', cost: 5000, icon: 'gas_cylinder' },
      ]);
    } else if (recipeId === 'r4' || recipeId === 'p4') {
      setSelectedIcon('lemper_ayam');
      setRecipeName('Lemper Ayam Ketan');
      setBatchPortions('40');
      setSuggestedSellingPrice('1500');
      setCanteenShare('500');
      setIngredients([
        { id: '1', name: 'Beras Ketan Putih Pulen', qty: 'Ketan Gurih', cost: 8000, icon: 'wheat_flour' },
        { id: '2', name: 'Daging Dada Ayam Suwir', qty: 'Isian Ayam Bumbu', cost: 12000, icon: 'meat_chicken' },
        { id: '3', name: 'Santan Kental Gurih', qty: 'Santan Masak', cost: 5000, icon: 'oil_butter' },
        { id: '4', name: 'Daun Pisang & Lidi Semat', qty: 'Pembungkus Tradisional', cost: 3000, icon: 'package_box' },
      ]);
    } else if (recipeId === 'r1' || recipeId === 'p1') {
      setSelectedIcon('risoles_rogout');
      setRecipeName('Risoles Rogout Ayam');
      setBatchPortions('50');
      setSuggestedSellingPrice('1200');
      setCanteenShare('400');
      setIngredients([
        { id: '1', name: 'Tepung Terigu Segitiga', qty: '500 gram', cost: 6000, icon: 'wheat_flour' },
        { id: '2', name: 'Telur Ayam & Minyak Goreng', qty: '2 Butir & Minyak', cost: 8000, icon: 'egg_raw' },
        { id: '3', name: 'Ayam Suwir & Sayuran Isian', qty: 'Isian Rogout Gurih', cost: 10000, icon: 'meat_chicken' },
        { id: '4', name: 'Gas LPG & Kemasan Mika', qty: 'Alokasi Operasional', cost: 6000, icon: 'gas_cylinder' },
      ]);
    } else if (!recipeId) {
      setSelectedIcon('risoles_rogout');
      setRecipeName('');
      setBatchPortions('50');
      setSuggestedSellingPrice('');
      setCanteenShare('');
      setIngredients([
        { id: '1', name: 'Tepung / Bahan Pokok', qty: 'Takaran Adonan', cost: 8000, icon: 'wheat_flour' },
        { id: '2', name: 'Bahan Isian Jajanan', qty: 'Bahan Utama', cost: 12000, icon: 'meat_chicken' },
        { id: '3', name: 'Minyak / Gas Operasional', qty: 'Biaya Masak', cost: 6000, icon: 'gas_cylinder' },
      ]);
    }
  }, [recipeId]);

  const [newIngName, setNewIngName] = useState('');
  const [newIngCost, setNewIngCost] = useState('');

  const totalRawCost = ingredients.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
  const portions = Number(batchPortions) || 1;
  const costPerPiece = Math.round(totalRawCost / portions);
  const sellPrice = Number(suggestedSellingPrice) || 0;
  const shareCanteen = Number(canteenShare) || 0;
  const netProfitPerPiece = sellPrice - costPerPiece - shareCanteen;
  const totalBatchProfit = netProfitPerPiece * portions;

  const handleAddIngredient = () => {
    if (!newIngName.trim() || !newIngCost) {
      Alert.alert('Perhatian', 'Nama bahan dan estimasi biaya harus diisi.');
      return;
    }
    const newId = String(Date.now());
    setIngredients(prev => [
      ...prev,
      { id: newId, name: newIngName.trim(), qty: 'Bahan Tambahan', cost: Number(newIngCost) || 0, icon: 'package_box' }
    ]);
    setNewIngName('');
    setNewIngCost('');
  };

  const handleRemoveIngredient = (id) => {
    if (ingredients.length <= 1) {
      Alert.alert('Perhatian', 'Minimal resep harus memiliki 1 bahan baku.');
      return;
    }
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveRecipe = () => {
    Alert.alert('Sukses Disimpan', `Resep ${recipeName} (${batchPortions} porsi) berhasil diperbarui di katalog!`, [
      { text: 'Buka Katalog HPP', onPress: () => navigation.navigate('Hpp') }
    ]);
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
            <Text style={styles.pageTitle}>{isEditMode ? 'Ubah Resep Jajanan' : 'Tambah Resep Baru'}</Text>
            <Text style={styles.pageSub}>{isEditMode ? `Formulasi: ${recipeName}` : 'Formulasi Menu Jajanan Baru'}</Text>
          </View>
        </View>

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => {
            setRecipeName('');
            setBatchPortions('50');
            setSuggestedSellingPrice('1200');
            setCanteenShare('400');
          }}
        >
          <Text style={styles.resetBtn}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. LIVE SIMULATION RESULT CARD (DETERMINISTIK NYATA, ZERO PILL CLUTTER) */}
        <View style={styles.simResultCard}>
          <Text style={styles.simHeadlineLbl}>PROYEKSI LABA BERSIH PER BUTIR</Text>

          <View style={styles.simBigProfitRow}>
            <View>
              <Text style={styles.simBigNum}>{formatRupiah(netProfitPerPiece)}</Text>
              <Text style={styles.simUnitLbl}>Untung bersih dari modal HPP {formatRupiah(costPerPiece)}</Text>
            </View>
            <View style={styles.panIconBox}>
              <AssetVisual name="cooking_pan" size={28} />
            </View>
          </View>

          {/* 3 METRIK STRIP */}
          <View style={styles.simMetricsStrip}>
            <View style={styles.simMetricCol}>
              <Text style={styles.simMLbl}>Modal Pokok (HPP)</Text>
              <Text style={styles.simMVal}>{formatRupiah(costPerPiece)} / pcs</Text>
            </View>
            <View style={styles.simMetricCol}>
              <Text style={styles.simMLbl}>Jatah Kantin</Text>
              <Text style={[styles.simMVal, styles.valRed]}>-{formatRupiah(shareCanteen)}</Text>
            </View>
            <View style={styles.simMetricCol}>
              <Text style={styles.simMLbl}>Harga Jual Rekomendasi</Text>
              <Text style={[styles.simMVal, styles.valOrange]}>{formatRupiah(sellPrice)}</Text>
            </View>
          </View>
        </View>

        {/* 3. IDENTITAS RESEP & BATCH */}
        <Text style={styles.sectionLbl}>IDENTITAS JAJANAN & TARGET BATCH</Text>
        <View style={styles.formCard}>
          {/* PILIH IKON ATAU FOTO JAJANAN */}
          <View style={styles.formFieldGroup}>
            <Text style={styles.fieldLabel}>Pilihan Ikon atau Foto Jajanan</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iconSelectorScroll}>
              {availableIcons.map((ic) => {
                const isSelected = selectedIcon === ic;
                return (
                  <TouchableOpacity
                    key={ic}
                    activeOpacity={0.8}
                    onPress={() => setSelectedIcon(ic)}
                    style={[styles.iconTileCard, isSelected && styles.iconTileCardSelected]}
                    accessibilityLabel={`Pilih ikon ${ic}`}
                    accessibilityRole="button"
                  >
                    <AssetVisual name={ic} size={42} />
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert('Ambil Foto / Galeri', 'Opsi unggah foto dari kamera atau galeri HP akan aktif pada pembaruan mendatang.')}
                style={styles.photoUploadTile}
                accessibilityLabel="Ambil foto atau pilih dari galeri"
                accessibilityRole="button"
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2}>
                  <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <Circle cx="12" cy="13" r="4" />
                </Svg>
                <Text style={styles.photoUploadText}>+ Foto</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.formFieldGroup}>
            <Text style={styles.fieldLabel}>Nama Menu Jajanan</Text>
            <TextInput
              style={styles.fieldInput}
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder="Contoh: Risoles Rogout Ayam"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.formRow2}>
            <View style={styles.formCol}>
              <Text style={styles.fieldLabel}>Target Batch (Porsi)</Text>
              <TextInput
                style={styles.fieldInput}
                value={batchPortions}
                onChangeText={setBatchPortions}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formCol}>
              <Text style={styles.fieldLabel}>Harga Jual Eceran</Text>
              <TextInput
                style={styles.fieldInput}
                value={suggestedSellingPrice}
                onChangeText={setSuggestedSellingPrice}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formFieldGroup}>
            <Text style={styles.fieldLabel}>Jatah Komisi Titip Kantin per Pcs</Text>
            <TextInput
              style={styles.fieldInput}
              value={canteenShare}
              onChangeText={setCanteenShare}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* 4. DAFTAR BAHAN BAKU & ENERGI */}
        <Text style={styles.sectionLbl}>BAHAN BAKU & BIAYA ENERGI ({ingredients.length} BAHAN)</Text>
        <View style={styles.ingredientsListCard}>
          {ingredients.map((item) => (
            <View key={item.id} style={styles.ingRowItem}>
              <View style={styles.ingLeftWrap}>
                <View style={styles.ingIconBox}>
                  <AssetVisual name={item.icon || 'wheat_flour'} size={20} />
                </View>
                <View>
                  <Text style={styles.ingTitleText}>{item.name}</Text>
                  <Text style={styles.ingSubText}>Takaran: {item.qty}</Text>
                </View>
              </View>

              <Text style={styles.ingCostNum}>{formatRupiah(item.cost)}</Text>
              <TouchableOpacity onPress={() => handleRemoveIngredient(item.id)} style={styles.delBtn}>
                <Text style={styles.delText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* INPUT TAMBAH BAHAN CEPAT */}
          <View style={styles.addIngBox}>
            <View style={styles.addIngInputs}>
              <TextInput
                style={[styles.fieldInput, styles.inputIngName]}
                placeholder="Bahan baru..."
                placeholderTextColor="#94A3B8"
                value={newIngName}
                onChangeText={setNewIngName}
              />
              <TextInput
                style={[styles.fieldInput, styles.inputIngCost]}
                placeholder="Rp Biaya"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={newIngCost}
                onChangeText={setNewIngCost}
              />
            </View>
            <TouchableOpacity style={styles.addIngSubmitBtn} activeOpacity={0.8} onPress={handleAddIngredient}>
              <Text style={styles.addIngSubmitBtnText}>+ Tambahkan ke Resep</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. CTA SIMPAN RESEP */}
        <TouchableOpacity style={styles.saveRecipeBtn} activeOpacity={0.85} onPress={handleSaveRecipe}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <Path d="M17 21v-8H7v8" />
            <Path d="M7 3v5h8" />
          </Svg>
          <Text style={styles.saveRecipeBtnText}>
            {isEditMode ? 'Simpan Perubahan Resep' : 'Tambahkan Resep ke Katalog HPP'}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* 5. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Wallet" navigation={navigation} />
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
    paddingBottom: 12,
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
  },
  headerTextCol: {
    gap: 1,
  },
  pageSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  resetBtn: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 110, // Ruang lega di atas ModernBottomNav
  },
  simResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#10B981',
    gap: 12,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  simTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  simHeadlineLbl: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  simProfitBadge: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  simProfitBadgeText: {
    color: '#15803D',
    fontSize: 12.5,
    fontWeight: '900',
  },
  simBigProfitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  simBigNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#059669',
    letterSpacing: -0.5,
  },
  simUnitLbl: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  panIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simMetricsStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  simMetricCol: {
    gap: 2,
  },
  simMLbl: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  simMVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  valRed: {
    color: '#DC2626',
  },
  valOrange: {
    color: '#EA580C',
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
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
    marginBottom: 18,
  },
  formFieldGroup: {
    gap: 5,
  },
  iconSelectorScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  iconTileCard: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FAF8F5',
    borderWidth: 1.8,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileCardSelected: {
    borderColor: '#EA580C',
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderBottomWidth: 3.5,
    borderBottomColor: '#C2410C',
  },
  photoUploadTile: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  photoUploadText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
  },
  fieldLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },
  fieldInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  formRow2: {
    flexDirection: 'row',
    gap: 10,
  },
  formCol: {
    flex: 1,
    gap: 5,
  },
  ingredientsListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 18,
  },
  ingRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  ingLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  ingIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingTitleText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  ingSubText: {
    fontSize: 10.5,
    color: '#64748B',
  },
  ingCostNum: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginRight: 12,
  },
  delBtn: {
    padding: 4,
  },
  delText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
  },
  addIngBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 4,
  },
  addIngInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  inputIngName: {
    flex: 2,
  },
  inputIngCost: {
    flex: 1,
  },
  addIngSubmitBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIngSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  saveRecipeBtn: {
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
  saveRecipeBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
  },
});
