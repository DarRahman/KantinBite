import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';
import { formatRupiah } from '../utils/formatters';

export const RecipeEditorScreen = ({ navigation, route }) => {
  const [recipeName, setRecipeName] = useState('Risoles Mayo Spesial');
  const [batchPortions, setBatchPortions] = useState('50');
  const [suggestedSellingPrice, setSuggestedSellingPrice] = useState('2000');
  const [canteenShare, setCanteenShare] = useState('500');

  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Tepung Terigu Segitiga', qty: '1', unit: 'Kg', cost: 12000, icon: 'wheat_flour' },
    { id: '2', name: 'Telur Ayam Negeri', qty: '12', unit: 'Butir', cost: 24000, icon: 'egg_raw' },
    { id: '3', name: 'Mayonaise & Susu Kental', qty: '1', unit: 'Pouch', cost: 18000, icon: 'oil_butter' },
    { id: '4', name: 'Sosis Sapi & Smoked Beef', qty: '1', unit: 'Pack', cost: 28000, icon: 'meat_chicken' },
    { id: '5', name: 'Minyak Goreng Sawit', qty: '1.5', unit: 'Liter', cost: 24000, icon: 'oil_butter' },
    { id: '6', name: 'Gas LPG & Wadah Mika', qty: '1', unit: 'Paket', cost: 10000, icon: 'gas_cylinder' },
  ]);

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
      { id: newId, name: newIngName.trim(), qty: '1', unit: 'Porsi', cost: Number(newIngCost) || 0, icon: 'package_box' }
    ]);
    setNewIngName('');
    setNewIngCost('');
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveRecipe = () => {
    Alert.alert('Sukses Disimpan', `Resep ${recipeName} (${batchPortions} porsi) berhasil disimpan ke katalog lokal!`, [
      { text: 'Buka Katalog HPP', onPress: () => navigation.navigate('Hpp') }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="cooking_pan" size={16} />
            <Text style={styles.headerTagText}>SIMULATOR & KALKULATOR MODAL</Text>
          </View>
          <Text style={styles.headerTitle}>Racik Resep Baru</Text>
        </View>

        <TouchableOpacity 
          style={styles.cancelBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>Batal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* IDENTITAS RESEP */}
        <BentoCard bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.bentoSection}>
          <Text style={styles.labelTitle}>Nama Menu Jajanan</Text>
          <TextInput
            style={styles.textInput}
            value={recipeName}
            onChangeText={setRecipeName}
            placeholder="Contoh: Pastel Rogout Ayam"
            placeholderTextColor="#94A3B8"
          />

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.labelTitle}>Target Porsi (Batch):</Text>
              <TextInput
                style={styles.textInput}
                value={batchPortions}
                onChangeText={setBatchPortions}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.labelTitle}>Harga Jual Eceran:</Text>
              <TextInput
                style={styles.textInput}
                value={suggestedSellingPrice}
                onChangeText={setSuggestedSellingPrice}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.labelTitle}>Jatah Komisi Kantin / Pcs:</Text>
            <TextInput
              style={styles.textInput}
              value={canteenShare}
              onChangeText={setCanteenShare}
              keyboardType="numeric"
            />
          </View>
        </BentoCard>

        {/* HERO SIMULASI LABA DINAMIS */}
        <BentoCard bg="#DCFCE7" accentBorder="#BBF7D0" style={styles.profitHeroBento}>
          <View style={styles.profitHeroTop}>
            <View>
              <Text style={styles.profitSubLabel}>ESTIMASI UNTUNG BERSIH / PCS</Text>
              <Text style={styles.profitValueText}>{formatRupiah(netProfitPerPiece)}</Text>
            </View>
            <View style={styles.profitVisualWrap}>
              <AssetVisual name="chart_up" size={44} />
            </View>
          </View>

          <View style={styles.profitDivider} />

          <View style={styles.profitMetricsRow}>
            <View>
              <Text style={styles.metricLabel}>Total Modal Resep</Text>
              <Text style={styles.metricVal}>{formatRupiah(totalRawCost)}</Text>
            </View>
            <View>
              <Text style={styles.metricLabel}>Modal / Pcs</Text>
              <Text style={styles.metricVal}>{formatRupiah(costPerPiece)}</Text>
            </View>
            <View>
              <Text style={styles.metricLabel}>Potensi Laba ({portions} pcs)</Text>
              <Text style={[styles.metricVal, { color: '#15803D' }]}>{formatRupiah(totalBatchProfit)}</Text>
            </View>
          </View>
        </BentoCard>

        {/* DAFTAR BAHAN BAKU */}
        <Text style={styles.sectionTitle}>Daftar Bahan & Komponen Biaya ({ingredients.length})</Text>
        {ingredients.map((item) => (
          <BentoCard key={item.id} bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.ingCard}>
            <View style={styles.ingRow}>
              <View style={styles.ingVisualWrap}>
                <AssetVisual name={item.icon} size={32} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.ingNameText}>{item.name}</Text>
                <Text style={styles.ingQtyText}>Takaran: {item.qty} {item.unit}</Text>
              </View>
              <Text style={styles.ingCostText}>{formatRupiah(item.cost)}</Text>
              <TouchableOpacity onPress={() => handleRemoveIngredient(item.id)} style={styles.delBtn}>
                <Text style={styles.delText}>✕</Text>
              </TouchableOpacity>
            </View>
          </BentoCard>
        ))}

        {/* INPUT TAMBAH BAHAN CEPAT */}
        <BentoCard bg="#F8FAFC" accentBorder="#CBD5E1" style={styles.addIngCard}>
          <Text style={styles.addIngTitle}>+ Tambah Bahan / Biaya Energi</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <TextInput
              style={[styles.textInput, { flex: 2 }]}
              placeholder="Nama bahan / kemasan"
              placeholderTextColor="#94A3B8"
              value={newIngName}
              onChangeText={setNewIngName}
            />
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="Biaya (Rp)"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={newIngCost}
              onChangeText={setNewIngCost}
            />
          </View>
          <TactileButton 
            size="sm" 
            variant="secondary" 
            style={{ marginTop: 10 }}
            onPress={handleAddIngredient}
          >
            Tambahkan ke Resep
          </TactileButton>
        </BentoCard>

        <View style={{ marginTop: 14 }}>
          <TactileButton
            size="lg"
            variant="primary"
            icon={<AssetVisual name="check_badge" size={22} />}
            onPress={handleSaveRecipe}
          >
            Simpan Resep ke Katalog
          </TactileButton>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

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
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  scrollContent: {
    padding: 18,
  },
  bentoSection: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  labelTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  profitHeroBento: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#86EFAC',
  },
  profitHeroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: 0.6,
  },
  profitValueText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#166534',
    letterSpacing: -0.8,
    marginTop: 2,
  },
  profitVisualWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profitDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#BBF7D0',
    marginVertical: 12,
  },
  profitMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
    marginTop: 4,
  },
  ingCard: {
    padding: 12,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingVisualWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  ingQtyText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  ingCostText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
    marginRight: 10,
  },
  delBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#DC2626',
  },
  addIngCard: {
    padding: 14,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  addIngTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
  },
});
