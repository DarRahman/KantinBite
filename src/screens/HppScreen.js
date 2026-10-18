import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable, TactilePill } from '../components/PlayfulComponents';
import { getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const HppScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filterCat, setFilterCat] = useState('Semua');

  const categories = ['Semua', 'Gorengan Gurih', 'Kue Basah Manis', 'Jajanan Pasar'];

  const defaultRecipes = [
    {
      id: 'p1',
      name: 'Risoles Rogout Ayam',
      batchPortions: 50,
      totalBatchCost: 30000,
      unitHpp: 600,
      retailPrice: 1200,
      canteenCut: 400,
      netProfit: 200,
      icon: 'risoles_rogout',
      category: 'Gorengan Gurih',
      ingredients: [
        { name: 'Tepung Segitiga 500g', cost: 6000, icon: 'wheat_flour' },
        { name: 'Minyak Goreng & Telur', cost: 8000, icon: 'egg_raw' },
        { name: 'Ayam Suwir & Wortel', cost: 10000, icon: 'meat_chicken' },
        { name: 'Gas LPG & Mika Plastik', cost: 6000, icon: 'gas_cylinder' },
      ],
    },
    {
      id: 'p2',
      name: 'Pastel Sayur Telur',
      batchPortions: 50,
      totalBatchCost: 37500,
      unitHpp: 750,
      retailPrice: 1500,
      canteenCut: 500,
      netProfit: 250,
      icon: 'pastel_telur',
      category: 'Gorengan Gurih',
      ingredients: [
        { name: 'Tepung Cakra 500g', cost: 7000, icon: 'wheat_flour' },
        { name: 'Telur Rebus & Wortel', cost: 12000, icon: 'egg_raw' },
        { name: 'Daging Ayam Cincang', cost: 10000, icon: 'meat_chicken' },
        { name: 'Minyak Goreng & Gas', cost: 8500, icon: 'oil_butter' },
      ],
    },
    {
      id: 'p3',
      name: 'Dadar Gulung Pandan',
      batchPortions: 50,
      totalBatchCost: 25000,
      unitHpp: 500,
      retailPrice: 1000,
      canteenCut: 300,
      netProfit: 200,
      icon: 'dadar_gulung',
      category: 'Kue Basah Manis',
      ingredients: [
        { name: 'Tepung & Daun Suji', cost: 5000, icon: 'wheat_flour' },
        { name: 'Kelapa Parut & Gula Aren', cost: 9000, icon: 'sugar_cane' },
        { name: 'Santan Kelapa Gurih', cost: 6000, icon: 'oil_butter' },
        { name: 'Gas LPG & Plastik OPP', cost: 5000, icon: 'package_box' },
      ],
    },
    {
      id: 'p4',
      name: 'Lemper Ayam Ketan',
      batchPortions: 40,
      totalBatchCost: 28000,
      unitHpp: 700,
      retailPrice: 1500,
      canteenCut: 500,
      netProfit: 300,
      icon: 'lemper_ayam',
      category: 'Jajanan Pasar',
      ingredients: [
        { name: 'Beras Ketan Putih', cost: 8000, icon: 'wheat_flour' },
        { name: 'Daging Ayam Suwir', cost: 12000, icon: 'meat_chicken' },
        { name: 'Santan Kental Gurih', cost: 5000, icon: 'oil_butter' },
        { name: 'Daun Pisang & Lidi', cost: 3000, icon: 'package_box' },
      ],
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

  const sourceList = products.length > 0 ? products : defaultRecipes;
  const filteredList =
    filterCat === 'Semua'
      ? sourceList
      : sourceList.filter((p) => p.category === filterCat);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBEB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC HPP KITCHEN BANNER DENGAN CHEF BITEY MEMBAWA BUKU RESEP */}
        <ScenicBanner
          scene="hpp_kitchen"
          badgeText="KALKULATOR RESEP DAPUR"
          title="Katalog Resep & HPP"
          subtitle="Rincian modal adonan, komisi kantin & untung bersih per butir"
          actionLabel="+ Resep Baru"
          onActionPress={() => navigation.navigate('RecipeEditor')}
        />

        <View style={styles.bodyPadding}>
          {/* 2. FILTER KATEGORI RESEP */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((cat) => (
              <TactilePill
                key={cat}
                label={cat}
                active={filterCat === cat}
                onPress={() => setFilterCat(cat)}
              />
            ))}
          </ScrollView>

          {/* 3. KARTU RESEP JAJANAN DENGAN IKON BAHAN BAKU & VISUAL MARGIN BAR */}
          {filteredList.map((item) => {
            const portions = Math.max(1, Number(item.portions || item.batchPortions || 50));
            const batchCost = Math.round(Number(item.totalBatchCost || 30000));
            const hpp = Math.round(Number(item.cost || item.unitHpp || batchCost / portions));
            const price = Math.round(Number(item.price || item.retailPrice || 1200));
            const cut = Math.round(Number(item.canteenCut || 400));
            const profit = Math.round(price - cut - hpp);

            const hppPct = Math.max(15, Math.round((hpp / Math.max(1, price)) * 100));
            const cutPct = Math.max(15, Math.round((cut / Math.max(1, price)) * 100));
            const profitPct = Math.max(15, 100 - hppPct - cutPct);

            const ingList = item.ingredients || [
              { name: 'Tepung Segitiga 500g', cost: 6000, icon: 'wheat_flour' },
              { name: 'Minyak Goreng & Telur', cost: 8000, icon: 'egg_raw' },
              { name: 'Ayam Suwir & Sayuran', cost: 10000, icon: 'meat_chicken' },
              { name: 'Gas LPG & Mika Plastik', cost: 6000, icon: 'gas_cylinder' },
            ];

            return (
              <AnimatedPressable
                key={item.id}
                scaleTo={0.98}
                onPress={() => navigation.navigate('RecipeEditor', { recipeId: item.id })}
                style={styles.recipeCard}
              >
                {/* Header Kartu: Ilustrasi Piring Kue Besar + Harga Jual */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.foodThumbBox}>
                    <AssetVisual
                      name={item.icon || item.type || 'risoles_rogout'}
                      size={66}
                    />
                  </View>

                  <View style={styles.headerInfoCol}>
                    <View style={styles.titleEditRow}>
                      <Text style={styles.foodName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View style={styles.editPill}>
                        <AssetVisual name="cooking_pan" size={14} />
                        <Text style={styles.editPillText}>Racik</Text>
                      </View>
                    </View>

                    <View style={styles.pricePortionRow}>
                      <Text style={styles.sellingPriceText}>
                        Jual Eceran:{' '}
                        <Text style={styles.sellingPriceBold}>{formatRupiah(price)}</Text>
                      </Text>
                      <View style={styles.portionBadge}>
                        <Text style={styles.portionBadgeText}>1 Adonan = {portions} Kue</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Daftar Bahan Baku dengan Ikon Visual Masing-Masing Bahan */}
                <View style={styles.ingredientsBox}>
                  <Text style={styles.ingSecTitle}>KOMPOSISI BAHAN 1 ADONAN ({portions} PCS)</Text>
                  {ingList.map((ing, iIdx) => (
                    <View key={iIdx} style={styles.ingRow}>
                      <View style={styles.ingNameWrap}>
                        <AssetVisual
                          name={ing.icon || (iIdx === 0 ? 'wheat_flour' : iIdx === 1 ? 'egg_raw' : iIdx === 2 ? 'meat_chicken' : 'gas_cylinder')}
                          size={22}
                        />
                        <Text style={styles.ingName}>{ing.name}</Text>
                      </View>
                      <Text style={styles.ingCost}>{formatRupiah(ing.cost)}</Text>
                    </View>
                  ))}

                  <View style={styles.batchTotalDivider} />

                  <View style={styles.batchTotalRow}>
                    <Text style={styles.batchTotalLbl}>Total Belanja Bahan ({portions} Kue):</Text>
                    <Text style={styles.batchTotalVal}>{formatRupiah(batchCost)}</Text>
                  </View>
                </View>

                {/* Bar Proporsi Pembagian Harga per 1 Kue */}
                <View style={styles.marginBarTrack}>
                  <View style={{ flex: hppPct, backgroundColor: '#F59E0B', height: '100%' }} />
                  <View style={{ flex: cutPct, backgroundColor: '#FB7185', height: '100%' }} />
                  <View style={{ flex: profitPct, backgroundColor: '#10B981', height: '100%' }} />
                </View>

                {/* Strip 3 Kolom Finansial per Pcs */}
                <View style={styles.financialStrip3Col}>
                  <View style={styles.finCol}>
                    <Text style={styles.finLabel}>Modal HPP / Pcs</Text>
                    <Text style={styles.valAmber}>{formatRupiah(hpp)}</Text>
                  </View>
                  <View style={[styles.finCol, styles.finColCenter]}>
                    <Text style={styles.finLabel}>Komisi Kantin</Text>
                    <Text style={styles.valRed}>{formatRupiah(cut)}</Text>
                  </View>
                  <View style={[styles.finCol, styles.finColRight]}>
                    <Text style={styles.finLabel}>Untung Bersih</Text>
                    <Text style={styles.valGreen}>+{formatRupiah(profit)}</Text>
                  </View>
                </View>
              </AnimatedPressable>
            );
          })}

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
  categoryRow: {
    paddingBottom: 14,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FED7AA',
    borderBottomWidth: 4.5,
    borderBottomColor: '#FDBA74',
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodThumbBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfoCol: {
    flex: 1,
  },
  titleEditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    flex: 1,
    marginRight: 8,
  },
  editPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDBA74',
    gap: 4,
  },
  editPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#EA580C',
  },
  pricePortionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  sellingPriceText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#52525B',
  },
  sellingPriceBold: {
    fontWeight: '900',
    color: '#EA580C',
    fontSize: 13.5,
  },
  portionBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  portionBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#92400E',
  },
  ingredientsBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  ingSecTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  ingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ingNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ingName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#27272A',
  },
  ingCost: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#18181B',
  },
  batchTotalDivider: {
    height: 1,
    backgroundColor: '#FDE68A',
    marginVertical: 8,
  },
  batchTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchTotalLbl: {
    fontSize: 12,
    fontWeight: '800',
    color: '#78350F',
  },
  batchTotalVal: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  marginBarTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 10,
  },
  financialStrip3Col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  finCol: {
    flex: 1,
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
    color: '#71717A',
  },
  valAmber: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 2,
  },
  valRed: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#E11D48',
    marginTop: 2,
  },
  valGreen: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#059669',
    marginTop: 2,
  },
});
