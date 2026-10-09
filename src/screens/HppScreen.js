import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScreenHeader } from '../components/ScreenHeader';
import AssetVisual from '../components/AssetVisual';
import { getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const HppScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filterCat, setFilterCat] = useState('Semua (4)');

  const categories = ['Semua (4)', 'Gorengan Gurih', 'Kue Basah Manis', 'Jajanan Pasar'];

  const defaultRecipes = [
    {
      id: 'r1',
      name: 'Risoles Rogout Ayam',
      batchPortions: 50,
      totalBatchCost: 30000,
      unitHpp: 600,
      retailPrice: 1200,
      canteenCut: 400,
      canteenPercent: '25%',
      netProfit: 200,
      ingredientsSummary: 'Terigu Segitiga 500g, Daging Ayam & Sayur, Telur & Minyak, Gas LPG & Mika',
      icon: 'risoles_rogout',
      category: 'Gorengan Gurih',
    },
    {
      id: 'r2',
      name: 'Pastel Sayur Telur',
      batchPortions: 50,
      totalBatchCost: 37500,
      unitHpp: 750,
      retailPrice: 1500,
      canteenCut: 500,
      canteenPercent: '20%',
      netProfit: 250,
      ingredientsSummary: 'Terigu Cakra 500g, Telur Rebus & Wortel, Minyak Goreng, Gas & Kemasan',
      icon: 'pastel_telur',
      category: 'Gorengan Gurih',
    },
    {
      id: 'r3',
      name: 'Dadar Gulung Pandan',
      batchPortions: 50,
      totalBatchCost: 25000,
      unitHpp: 500,
      retailPrice: 1000,
      canteenCut: 300,
      canteenPercent: '20%',
      netProfit: 200,
      ingredientsSummary: 'Tepung & Daun Suji, Kelapa Parut & Gula Jawa, Santan Gurih, Gas & Plastik OPP',
      icon: 'dadar_gulung',
      category: 'Kue Basah Manis',
    },
    {
      id: 'r4',
      name: 'Lemper Ayam Harum',
      batchPortions: 40,
      totalBatchCost: 28000,
      unitHpp: 700,
      retailPrice: 1500,
      canteenCut: 500,
      canteenPercent: '20%',
      netProfit: 300,
      ingredientsSummary: 'Beras Ketan Putih, Daging Ayam Suwir, Santan Kental, Daun Pisang & Lidi',
      icon: 'lemper_ayam',
      category: 'Jajanan Pasar',
    },
  ];

  useEffect(() => {
    loadProducts();
    const unsub = navigation.addListener('focus', loadProducts);
    return unsub;
  }, [navigation]);

  const loadProducts = async () => {
    const list = await getProducts();
    if (list && list.length > 0) {
      setProducts(list);
    } else {
      setProducts(defaultRecipes);
    }
  };

  const filteredList = filterCat.startsWith('Semua')
    ? (products.length > 0 ? products : defaultRecipes)
    : (products.length > 0 ? products : defaultRecipes).filter(p => p.category === filterCat);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. GLOBAL SCREEN HEADER (TERSTANDARISASI & KONSISTEN) */}
      <ScreenHeader
        title="Katalog Jajanan & HPP"
        subtitle="Hitung Modal & Untung Bersih per Pcs"
        actionLabel="+ Resep Baru"
        onActionPress={() => navigation.navigate('RecipeEditor')}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* 2. CATEGORY PILLS HORIZONTAL */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((cat, idx) => {
            const isActive = filterCat === cat;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => setFilterCat(cat)}
                style={[styles.catPill, isActive && styles.catPillActive]}
              >
                <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3. DAFTAR KARTU RESEP ASLI HP USER (FORMAT RECEIPT LEDGER RATA KANAN) */}
        {filteredList.map((item) => {
          const portions = item.portions || item.batchPortions || 50;
          const batchCost = item.totalBatchCost || 30000;
          const hpp = item.cost || item.unitHpp || 600;
          const price = item.price || item.retailPrice || 1200;
          const cut = item.canteenCut || 500;
          const profit = item.profit || (price - cut - hpp);
          const ingList = item.ingredients || [
            { name: 'Tepung Segitiga 500g', cost: 6000 },
            { name: 'Minyak Goreng & Telur', cost: 8000 },
            { name: 'Ayam Suwir & Sayuran', cost: 10000 },
            { name: 'Gas LPG & Mika Plastik', cost: 6000 },
          ];

          return (
            <View key={item.id} style={styles.recipeCardReal}>
              {/* HEADER KARTU: THUMBNAIL + TITLE + TOMBOL EDIT */}
              <View style={styles.cardHeaderRow}>
                <View style={styles.foodThumbBox}>
                  <AssetVisual name={item.icon || 'risoles_rogout'} size={48} />
                </View>

                <View style={styles.headerInfoCol}>
                  <View style={styles.foodTitleRow}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <TouchableOpacity 
                      style={styles.editBtn}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('RecipeEditor', { recipeId: item.id })}
                    >
                      <AssetVisual name="cooking_pan" size={14} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.priceSubRow}>
                    <Text style={styles.sellingPriceText}>
                      Harga Jual: <Text style={styles.sellingPriceBold}>{formatRupiah(price)}</Text>
                    </Text>
                    <View style={styles.portionBadge}>
                      <Text style={styles.portionBadgeText}>{portions} Porsi</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* SEKSI BAHAN BAKU 2 KOLOM RATA KANAN */}
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingSecTitle}>Bahan yang Dipakai</Text>
                {ingList.map((ing, iIdx) => (
                  <View key={iIdx} style={styles.ingRow}>
                    <View style={styles.ingNameWrap}>
                      <View style={styles.bullet} />
                      <Text style={styles.ingName}>{ing.name}</Text>
                    </View>
                    <Text style={styles.ingCost}>{formatRupiah(ing.cost)}</Text>
                  </View>
                ))}

                <View style={styles.batchTotalDivider} />

                <View style={styles.batchTotalRow}>
                  <Text style={styles.batchTotalLbl}>Total Modal {portions} Porsi:</Text>
                  <Text style={styles.batchTotalVal}>{formatRupiah(batchCost)}</Text>
                </View>
              </View>

              {/* STRIP 3 KOLOM FINANSIAL SEMANTIK LEGA */}
              <View style={styles.financialStrip3Col}>
                <View style={styles.finCol}>
                  <Text style={styles.finLabel}>Jatah Kantin:</Text>
                  <Text style={styles.valRed}>{formatRupiah(cut)}</Text>
                </View>
                <View style={[styles.finCol, styles.finColCenter]}>
                  <Text style={styles.finLabel}>Modal/Pcs:</Text>
                  <Text style={styles.valDark}>{formatRupiah(hpp)}</Text>
                </View>
                <View style={[styles.finCol, styles.finColRight]}>
                  <Text style={styles.finLabel}>Untung Bersih/Pcs:</Text>
                  <Text style={styles.valGreen}>{formatRupiah(profit)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 5. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Wallet" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageSub: {
    fontSize: 11.5,
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
  addRecipeBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    elevation: 2,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addRecipeBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    whiteSpace: 'nowrap',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  catPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catPillActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  catPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  catPillTextActive: {
    color: '#FFFFFF',
  },
  recipeCardReal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    marginBottom: 16,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodThumbBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfoCol: {
    flex: 1,
    gap: 2,
  },
  foodTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#0F172A',
  },
  editBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 1,
  },
  sellingPriceText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  sellingPriceBold: {
    color: '#EA580C',
    fontWeight: '900',
    fontSize: 13.5,
  },
  portionBadge: {
    paddingVertical: 1,
    paddingHorizontal: 0,
  },
  portionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  ingredientsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 6,
  },
  ingSecTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  ingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
  ingName: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  ingCost: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  batchTotalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  batchTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchTotalLbl: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
  },
  batchTotalVal: {
    fontSize: 13.5,
    color: '#EA580C',
    fontWeight: '900',
  },
  financialStrip3Col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  finCol: {
    flex: 1,
    gap: 3,
  },
  finColCenter: {
    alignItems: 'center',
  },
  finColRight: {
    alignItems: 'flex-end',
  },
  finLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  valRed: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#DC2626',
  },
  valDark: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
  },
  valGreen: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#059669',
  },
});
