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
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable } from '../components/PlayfulComponents';
import { addProduct, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const RecipeEditorScreen = ({ navigation, route }) => {
  const recipeId = route?.params?.recipeId;

  const availableIcons = [
    { key: 'risoles_rogout', label: 'Risoles' },
    { key: 'pastel_telur', label: 'Pastel' },
    { key: 'dadar_gulung', label: 'Dadar' },
    { key: 'lemper_ayam', label: 'Lemper' },
    { key: 'kue_lumpur', label: 'Lumpur' },
    { key: 'tahu_isi', label: 'Tahu Isi' },
    { key: 'klepon_pandan', label: 'Klepon' },
    { key: 'onde_onde', label: 'Onde' },
  ];

  const [selectedIcon, setSelectedIcon] = useState('risoles_rogout');
  const [recipeName, setRecipeName] = useState('Risoles Rogout Ayam');
  const [batchPortions, setBatchPortions] = useState('50');
  const [suggestedSellingPrice, setSuggestedSellingPrice] = useState('1200');
  const [canteenShare, setCanteenShare] = useState('400');

  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Tepung Terigu Segitiga 500g', cost: 6000, icon: 'wheat_flour' },
    { id: '2', name: 'Telur Ayam & Minyak Goreng', cost: 8000, icon: 'egg_raw' },
    { id: '3', name: 'Ayam Suwir & Wortel Rogout', cost: 10000, icon: 'meat_chicken' },
    { id: '4', name: 'Gas LPG & Kemasan Mika', cost: 6000, icon: 'gas_cylinder' },
  ]);

  const [newIngName, setNewIngName] = useState('');
  const [newIngCost, setNewIngCost] = useState('');

  useEffect(() => {
    const loadExisting = async () => {
      if (!recipeId) return;
      const list = await getProducts();
      const found = list.find((p) => p.id === recipeId);
      if (found) {
        setSelectedIcon(found.icon || 'risoles_rogout');
        setRecipeName(found.name || 'Risoles Rogout Ayam');
        setBatchPortions(String(found.batchPortions || 50));
        setSuggestedSellingPrice(String(found.price || found.retailPrice || 1200));
        setCanteenShare(String(found.canteenCut || 400));
        if (found.ingredients && found.ingredients.length > 0) {
          setIngredients(found.ingredients);
        }
      }
    };
    loadExisting();
  }, [recipeId]);

  const totalRawCost = Math.round(
    ingredients.reduce((sum, item) => sum + (Number(item.cost) || 0), 0)
  );
  const portions = Math.max(1, Math.round(Number(batchPortions) || 1));
  const costPerPiece = Math.round(totalRawCost / portions);
  const sellPrice = Math.round(Number(suggestedSellingPrice) || 0);
  const shareCanteen = Math.round(Number(canteenShare) || 0);
  const netProfitPerPiece = Math.round(sellPrice - costPerPiece - shareCanteen);
  const totalBatchProfit = Math.round(netProfitPerPiece * portions);

  const handleAddIngredient = () => {
    if (!newIngName.trim() || !newIngCost) {
      Alert.alert('Bahan Belum Lengkap', 'Isi nama bahan dan biaya takarannya.');
      return;
    }
    setIngredients((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newIngName.trim(),
        cost: Math.round(Number(newIngCost) || 0),
        icon: 'wheat_flour',
      },
    ]);
    setNewIngName('');
    setNewIngCost('');
  };

  const handleRemoveIngredient = (id) => {
    if (ingredients.length <= 1) {
      Alert.alert('Minimal 1 Bahan', 'Resep wajib memiliki minimal satu komponen bahan.');
      return;
    }
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveRecipe = async () => {
    if (!recipeName.trim()) {
      Alert.alert('Nama Kue Kosong', 'Mohon isi nama jajanan terlebih dahulu.');
      return;
    }
    await addProduct({
      id: recipeId || 'p_' + Date.now(),
      name: recipeName.trim(),
      icon: selectedIcon,
      batchPortions: portions,
      totalBatchCost: totalRawCost,
      unitHpp: costPerPiece,
      cost: costPerPiece,
      price: sellPrice,
      retailPrice: sellPrice,
      canteenCut: shareCanteen,
      netProfit: netProfitPerPiece,
      category: 'Gorengan Gurih',
      ingredients,
    });
    Alert.alert(
      'Resep & HPP Tersimpan',
      `${recipeName} (HPP ${formatRupiah(costPerPiece)}/pcs • Untung Bersih +${formatRupiah(netProfitPerPiece)}/pcs) telah diperbarui di katalog.`,
      [{ text: 'Lihat Katalog', onPress: () => navigation.navigate('Hpp') }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC HEADER RACIK RESEP */}
        <ScenicBanner
          scene="hpp_kitchen"
          badgeText="SIMULATOR MODAL & MARGIN"
          title="Racik Resep & HPP"
          subtitle="Hitung otomatis modal per kue & proyeksi laba bersih"
          onBackPress={() => navigation.goBack()}
          actionLabel="Simpan"
          onActionPress={handleSaveRecipe}
        />

        <View style={styles.bodyPadding}>
          {/* 2. PILIH ILUSTRASI JAJANAN NUSANTARA */}
          <Text style={styles.sectionLabel}>PILIH GAMBAR JAJANAN</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.iconPickerRow}
          >
            {availableIcons.map((it) => {
              const isSel = selectedIcon === it.key;
              return (
                <AnimatedPressable
                  key={it.key}
                  scaleTo={0.93}
                  onPress={() => setSelectedIcon(it.key)}
                  style={[styles.iconOptionCard, isSel && styles.iconOptionSelected]}
                >
                  <AssetVisual name={it.key} size={52} />
                  <Text style={[styles.iconOptionLabel, isSel && { color: '#EA580C' }]}>
                    {it.label}
                  </Text>
                </AnimatedPressable>
              );
            })}
          </ScrollView>

          {/* 3. FORM IDENTITAS & TARGET PORSI ADONAN */}
          <View style={styles.formCard}>
            <Text style={styles.inputLbl}>Nama Jajanan / Kue</Text>
            <TextInput
              style={styles.textInput}
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder="Contoh: Risoles Rogout Ayam"
            />

            <View style={styles.tripleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLbl}>Hasil (Pcs)</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={batchPortions}
                  onChangeText={setBatchPortions}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLbl}>Harga Jual</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={suggestedSellingPrice}
                  onChangeText={setSuggestedSellingPrice}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLbl}>Komisi Kantin</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={canteenShare}
                  onChangeText={setCanteenShare}
                />
              </View>
            </View>
          </View>

          {/* 4. RINCIAN BAHAN BAKU 1 ADONAN */}
          <View style={styles.formCard}>
            <Text style={styles.sectionLabel}>TAKaran BAHAN 1 ADONAN ({portions} KUE)</Text>
            {ingredients.map((ing) => (
              <View key={ing.id} style={styles.ingItemRow}>
                <AssetVisual name={ing.icon || 'wheat_flour'} size={28} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.ingItemName}>{ing.name}</Text>
                </View>
                <Text style={styles.ingItemCost}>{formatRupiah(ing.cost)}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveIngredient(ing.id)}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeBtnText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Tambah Bahan Baru */}
            <View style={styles.addIngRow}>
              <TextInput
                style={[styles.textInput, { flex: 1.5, marginBottom: 0 }]}
                placeholder="Nama bahan..."
                value={newIngName}
                onChangeText={setNewIngName}
              />
              <TextInput
                style={[styles.textInput, { flex: 1, marginBottom: 0 }]}
                placeholder="Biaya Rp"
                keyboardType="numeric"
                value={newIngCost}
                onChangeText={setNewIngCost}
              />
              <TouchableOpacity style={styles.addIngBtn} onPress={handleAddIngredient}>
                <Text style={styles.addIngBtnText}>+ Bahan</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 5. SIMULATOR HASIL HPP & LABA BERSIH REAL-TIME */}
          <View style={styles.simulatorCard}>
            <View style={styles.simTopRow}>
              <AssetVisual name={selectedIcon} size={62} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.simOverline}>HASIL HITUNG HPP OTOMATIS</Text>
                <Text style={styles.simMainProfit}>
                  Untung Bersih: +{formatRupiah(netProfitPerPiece)} / pcs
                </Text>
                <Text style={styles.simBatchSub}>
                  Total Laba 1 Adonan ({portions} kue): {formatRupiah(totalBatchProfit)}
                </Text>
              </View>
            </View>

            <View style={styles.simGrid}>
              <View style={styles.simBox}>
                <Text style={styles.simBoxLbl}>Modal Bahan</Text>
                <Text style={styles.simBoxVal}>{formatRupiah(totalRawCost)}</Text>
              </View>
              <View style={styles.simBox}>
                <Text style={styles.simBoxLbl}>Modal / Kue</Text>
                <Text style={styles.simBoxVal}>{formatRupiah(costPerPiece)}</Text>
              </View>
              <View style={styles.simBox}>
                <Text style={styles.simBoxLbl}>Setor Kantin</Text>
                <Text style={styles.simBoxVal}>
                  {formatRupiah(Math.max(0, sellPrice - shareCanteen))}
                </Text>
              </View>
            </View>

            <AnimatedPressable
              scaleTo={0.97}
              style={styles.saveFullBtn}
              onPress={handleSaveRecipe}
            >
              <Text style={styles.saveFullBtnText}>Simpan Resep & Terapkan HPP</Text>
            </AnimatedPressable>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Wallet" navigation={navigation} />
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
  sectionLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  iconPickerRow: {
    paddingBottom: 14,
    gap: 10,
  },
  iconOptionCard: {
    width: 82,
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  iconOptionSelected: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
    borderBottomWidth: 3.5,
    borderBottomColor: '#9A3412',
  },
  iconOptionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#52525B',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    marginBottom: 14,
  },
  inputLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#52525B',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13.5,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 10,
  },
  tripleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  ingItemName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
  },
  ingItemCost: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
    marginRight: 10,
  },
  removeBtn: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  removeBtnText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  addIngRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  addIngBtn: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addIngBtnText: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  simulatorCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#6EE7B7',
    borderBottomWidth: 4.5,
    borderBottomColor: '#10B981',
  },
  simTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  simOverline: {
    fontSize: 10,
    fontWeight: '900',
    color: '#047857',
  },
  simMainProfit: {
    fontSize: 16.5,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 2,
  },
  simBatchSub: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#047857',
    marginTop: 2,
  },
  simGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  simBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 10,
    alignItems: 'center',
  },
  simBoxLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: '#71717A',
  },
  simBoxVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 2,
  },
  saveFullBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#9A3412',
  },
  saveFullBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
