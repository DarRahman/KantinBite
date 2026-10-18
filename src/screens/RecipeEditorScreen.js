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
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual, { SNACK_GALLERY_CATALOG } from '../components/AssetVisual';
import { AnimatedPressable, TactilePill } from '../components/PlayfulComponents';
import { addProduct, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const RecipeEditorScreen = ({ navigation, route }) => {
  const recipeId = route?.params?.recipeId;

  const [selectedIcon, setSelectedIcon] = useState('risoles_rogout');
  const [recipeName, setRecipeName] = useState('Risoles Rogout Ayam');
  const [batchPortions, setBatchPortions] = useState('50');
  const [suggestedSellingPrice, setSuggestedSellingPrice] = useState('1200');
  const [canteenShare, setCanteenShare] = useState('400');

  // State Modal Pop-Up Katalog Galeri Jajanan Penuh
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState('Semua');
  const [gallerySearch, setGallerySearch] = useState('');

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

  // Cari info nama gambar yang sedang dipilih
  const isCustomPhoto =
    typeof selectedIcon === 'string' &&
    (selectedIcon.startsWith('data:image') ||
      selectedIcon.startsWith('file://') ||
      selectedIcon.startsWith('http') ||
      selectedIcon.startsWith('blob:'));

  const currentCatalogItem = SNACK_GALLERY_CATALOG.find((x) => x.key === selectedIcon) || {
    key: selectedIcon,
    label: isCustomPhoto ? 'Foto Unggahan Sendiri' : 'Risoles Rogout',
    category: isCustomPhoto ? 'Foto Kustom' : 'Gorengan',
  };

  // Fungsi Unggah Foto Sendiri dari Galeri HP / Perangkat
  const handlePickCustomPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) {
          setSelectedIcon(asset.uri);
          setIsGalleryOpen(false);
        }
      }
    } catch (e) {
      Alert.alert('Gagal Memuat Foto', 'Pastikan memilih file gambar yang valid dari perangkat.');
    }
  };

  const galleryCategories = [
    'Semua',
    'Universal Netral',
    'Gorengan',
    'Kue Basah',
    'Roti & Bolu',
    'Minuman & Puding',
  ];

  const filteredGallery = SNACK_GALLERY_CATALOG.filter((item) => {
    const matchCat =
      galleryCategory === 'Semua' || item.category === galleryCategory;
    const matchSearch =
      item.label.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(gallerySearch.toLowerCase());
    return matchCat && matchSearch;
  });

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
      category:
        currentCatalogItem.category === 'Kue Basah'
          ? 'Kue Basah Manis'
          : currentCatalogItem.category === 'Gorengan'
            ? 'Gorengan Gurih'
            : 'Jajanan Pasar',
      ingredients,
    });
    Alert.alert(
      'Resep & HPP Tersimpan',
      `${recipeName} (Modal ${formatRupiah(costPerPiece)}/pcs • Untung Bersih +${formatRupiah(netProfitPerPiece)}/pcs) telah disimpan ke katalog.`,
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
        {/* 1. SCENIC HEADER RACIK RESEP (TANPA DOT / JARGON SIMULATOR) */}
        <ScenicBanner
          scene="hpp_kitchen"
          title="Racik Resep & HPP"
          subtitle="Hitung otomatis modal per kue & proyeksi laba bersih"
          onBackPress={() => navigation.goBack()}
          actionLabel="Simpan"
          onActionPress={handleSaveRecipe}
        />

        <View style={styles.bodyPadding}>
          {/* 2. KARTU PEMILIH GAMBAR JAJANAN (TOMBOL BUKA POP-UP GALERI 26+ ITEM & UPLOAD FOTO) */}
          <Text style={styles.sectionLabel}>GAMBAR MENU JAJANAN</Text>
          <View style={styles.visualSelectorCard}>
            <View style={styles.visualPreviewRow}>
              <View style={styles.activeVisualFrame}>
                <AssetVisual name={selectedIcon} size={74} />
              </View>

              <View style={styles.visualInfoCol}>
                <View style={styles.categorySmallPill}>
                  <Text style={styles.categorySmallText}>{currentCatalogItem.category}</Text>
                </View>
                <Text style={styles.activeVisualTitle}>{currentCatalogItem.label}</Text>
                <Text style={styles.activeVisualHint}>
                  Tersedia 26+ ilustrasi jajanan kantin, gambar netral & upload foto sendiri
                </Text>
              </View>
            </View>

            <View style={styles.visualActionBtnsRow}>
              <AnimatedPressable
                scaleTo={0.96}
                style={styles.openGalleryBtn}
                onPress={() => setIsGalleryOpen(true)}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4}>
                  <Rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <Rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <Rect x="14" y="14" width="7" height="7" rx="1.5" />
                </Svg>
                <Text style={styles.openGalleryBtnText}>
                  Pilih dari Galeri (26+ Kue)
                </Text>
              </AnimatedPressable>

              <AnimatedPressable
                scaleTo={0.96}
                style={styles.uploadPhotoBtn}
                onPress={handlePickCustomPhoto}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth={2.4}>
                  <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <Path d="M17 8l-5-5-5 5" />
                  <Path d="M12 3v12" />
                </Svg>
                <Text style={styles.uploadPhotoBtnText}>Upload Foto</Text>
              </AnimatedPressable>
            </View>
          </View>

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
            <Text style={styles.sectionLabel}>TAKARAN BAHAN 1 ADONAN ({portions} KUE)</Text>
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

          {/* 5. RINGKASAN HASIL HITUNG HPP & LABA BERSIH */}
          <View style={styles.simulatorCard}>
            <View style={styles.simTopRow}>
              <AssetVisual name={selectedIcon} size={62} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.simOverline}>RINGKASAN LABA & HPP PER KUE</Text>
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

      {/* MODAL POP-UP KATALOG GALERI 26+ JAJANAN & UPLOAD FOTO SENDIRI */}
      <Modal visible={isGalleryOpen} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.galleryModalSheet}>
            {/* Header Modal */}
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Katalog Galeri Jajanan Kantin</Text>
                <Text style={styles.modalSubtitle}>
                  Pilih dari 26 gambar jajanan, gambar netral, atau unggah foto sendiri
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => setIsGalleryOpen(false)}
              >
                <Text style={styles.closeModalText}>Tutup</Text>
              </TouchableOpacity>
            </View>

            {/* Banner Unggah Foto Sendiri & Pilihan Universal Netral */}
            <TouchableOpacity
              style={styles.customUploadBanner}
              activeOpacity={0.85}
              onPress={handlePickCustomPhoto}
            >
              <View style={styles.uploadBannerIconWrap}>
                <AssetVisual name="universal_plate" size={42} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.uploadBannerTitle}>
                  Punya Foto Jajanan Unik Sendiri?
                </Text>
                <Text style={styles.uploadBannerSub}>
                  Klik di sini untuk memilih foto langsung dari galeri HP Anda
                </Text>
              </View>
              <View style={styles.uploadBannerCta}>
                <Text style={styles.uploadBannerCtaText}>Pilih Foto ›</Text>
              </View>
            </TouchableOpacity>

            {/* Pencarian Jajanan di Galeri */}
            <View style={styles.gallerySearchBox}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth={2.2}>
                <Circle cx="11" cy="11" r="8" />
                <Path d="M21 21l-4.35-4.35" />
              </Svg>
              <TextInput
                placeholder="Cari jajanan (misal: risoles, donat, mendoan, netral)..."
                placeholderTextColor="#A1A1AA"
                style={styles.gallerySearchInput}
                value={gallerySearch}
                onChangeText={setGallerySearch}
              />
            </View>

            {/* Filter Kategori Galeri */}
            <View style={{ marginBottom: 10 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 2 }}
              >
                {galleryCategories.map((cat) => (
                  <TactilePill
                    key={cat}
                    label={cat}
                    active={galleryCategory === cat}
                    onPress={() => setGalleryCategory(cat)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Grid 3 Kolom 26+ Gambar Jajanan */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.galleryGridScroll}
            >
              <View style={styles.galleryGrid}>
                {filteredGallery.map((item) => {
                  const isSel = selectedIcon === item.key;
                  const isNeutral = item.category === 'Universal Netral';
                  return (
                    <AnimatedPressable
                      key={item.key}
                      scaleTo={0.94}
                      onPress={() => {
                        setSelectedIcon(item.key);
                        setIsGalleryOpen(false);
                      }}
                      style={[
                        styles.galleryItemCard,
                        isNeutral && styles.galleryItemNeutral,
                        isSel && styles.galleryItemSelected,
                      ]}
                    >
                      <AssetVisual name={item.key} size={56} />
                      <Text
                        style={[
                          styles.galleryItemLabel,
                          isSel && { color: '#EA580C', fontWeight: '900' },
                        ]}
                        numberOfLines={2}
                      >
                        {item.label}
                      </Text>
                      <Text style={styles.galleryItemCatText}>{item.category}</Text>
                    </AnimatedPressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
  visualSelectorCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
    marginBottom: 14,
  },
  visualPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeVisualFrame: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  visualInfoCol: {
    flex: 1,
  },
  categorySmallPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 4,
  },
  categorySmallText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  activeVisualTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#431407',
  },
  activeVisualHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
    lineHeight: 15,
  },
  visualActionBtnsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  openGalleryBtn: {
    flex: 1.5,
    backgroundColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderBottomWidth: 3.5,
    borderBottomColor: '#9A3412',
  },
  openGalleryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  uploadPhotoBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderBottomWidth: 3.5,
    borderBottomColor: '#EA580C',
  },
  uploadPhotoBtnText: {
    color: '#9A3412',
    fontSize: 12,
    fontWeight: '900',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 3.5,
    borderBottomColor: '#FDBA74',
    marginBottom: 14,
  },
  inputLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#78350F',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13.5,
    fontWeight: '800',
    color: '#431407',
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
    borderBottomColor: '#FFF7ED',
  },
  ingItemName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#431407',
  },
  ingItemCost: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
    marginRight: 10,
  },
  removeBtn: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  removeBtnText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#C2410C',
  },
  addIngRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  addIngBtn: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addIngBtnText: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  simulatorCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
  },
  simTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  simOverline: {
    fontSize: 10,
    fontWeight: '900',
    color: '#92400E',
  },
  simMainProfit: {
    fontSize: 16.5,
    fontWeight: '900',
    color: '#15803D',
    marginTop: 2,
  },
  simBatchSub: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#78350F',
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
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  simBoxLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350F',
  },
  simBoxVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#431407',
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
  // MODAL GALERI POP-UP
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(67, 20, 7, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  galleryModalSheet: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '88%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    borderTopWidth: 3,
    borderColor: '#FDBA74',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#431407',
  },
  modalSubtitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
  },
  closeModalBtn: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  closeModalText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#9A3412',
  },
  customUploadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    padding: 11,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3.5,
    borderBottomColor: '#F59E0B',
    marginBottom: 12,
  },
  uploadBannerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBannerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#431407',
  },
  uploadBannerSub: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 1,
  },
  uploadBannerCta: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  uploadBannerCtaText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  gallerySearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: 10,
  },
  gallerySearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#431407',
    paddingVertical: 2,
  },
  galleryGridScroll: {
    paddingBottom: 24,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  galleryItemCard: {
    width: '31.5%',
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3.5,
    borderBottomColor: '#F59E0B',
  },
  galleryItemNeutral: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  galleryItemSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EA580C',
    borderBottomColor: '#9A3412',
    borderWidth: 2,
  },
  galleryItemLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#431407',
    textAlign: 'center',
    marginTop: 5,
  },
  galleryItemCatText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 2,
  },
});
