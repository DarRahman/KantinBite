import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal } from 'react-native';
import { FoodIcon } from '../components/FoodIcon';
import { ScreenHeader } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { getProducts, addPosTransaction, addProduct } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { colors } from '../theme/tokens';

export const PosScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ p1: 10, p3: 5 }); // Default terpilih sesuai mockup
  const [cashReceived, setCashReceived] = useState('20000');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Tambah Menu Jajanan Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Asin');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const p = await getProducts();
    setProducts(p);
  };

  const categories = ['Semua', 'Asin', 'Manis'];

  const filteredProducts = products.filter((item) => {
    const matchCat = activeCategory === 'Semua' || (item.category || 'Asin') === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleProduct = (id) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      } else {
        return { ...prev, [id]: 1 };
      }
    });
  };

  const calculateTotal = () => {
    let total = 0;
    let count = 0;
    products.forEach((prod) => {
      const qty = cart[prod.id] || 0;
      if (qty > 0) {
        total += prod.price * qty;
        count += qty;
      }
    });
    return { total, count };
  };

  const { total, count } = calculateTotal();
  const receivedNum = Number(cashReceived) || 0;
  const changeNum = Math.max(0, receivedNum - total);

  const handleQuickCash = (amount) => {
    setCashReceived(amount.toString());
  };

  const handleCheckout = async () => {
    if (total <= 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu menu jajanan.');
      return;
    }
    if (receivedNum < total) {
      Alert.alert('Perhatian', 'Uang yang diterima kurang dari total belanja.');
      return;
    }
    await addPosTransaction(total, count);
    Alert.alert('Sukses', `Transaksi ${formatRupiah(total)} selesai. Kembalian: ${formatRupiah(changeNum)}`, [
      { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
    ]);
  };

  const handleAddNewProduct = async () => {
    if (!newName.trim() || !newPrice) {
      Alert.alert('Peringatan', 'Lengkapi nama dan harga jajanan.');
      return;
    }
    await addProduct({
      name: newName.trim(),
      price: Number(newPrice) || 1000,
      cost: Math.round(Number(newPrice) * 0.5),
      category: newCategory,
      type: newCategory === 'Manis' ? 'dadar' : 'risoles'
    });
    setNewName('');
    setNewPrice('');
    setIsModalOpen(false);
    await loadProducts();
    Alert.alert('Sukses', 'Menu jajanan baru berhasil ditambahkan ke katalog.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Kasir Kilat"
        subtitle="Penjualan Langsung di Tempat"
        rightElement={
          <TouchableOpacity style={styles.addMenuBtn} activeOpacity={0.7} onPress={() => setIsModalOpen(true)}>
            <Text style={styles.addMenuText}>+ Menu Baru</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.bodyWrap}>
        
        {/* PENCARIAN & FILTER KATEGORI */}
        <View style={styles.filterSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari jajanan..."
            placeholderTextColor="#A1A1AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.categoryPills}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
                activeOpacity={0.7}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CATALOG GRID WITH FOOD ICONS */}
        <ScrollView contentContainerStyle={styles.gridScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.catalogGrid}>
            {filteredProducts.map((item) => {
              const qty = cart[item.id] || 0;
              const isSelected = qty > 0;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.catalogItem, isSelected && styles.catalogItemActive]}
                  activeOpacity={0.7}
                  onPress={() => toggleProduct(item.id)}
                >
                  {isSelected && <Text style={styles.itemBadge}>{qty}</Text>}
                  <FoodIcon type={item.type || 'risoles'} size={46} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={[styles.itemPrice, isSelected && styles.itemPriceActive]}>
                    {formatRupiah(item.price)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* CART DOCK BOTTOM WITH QUICK CASH BUTTONS */}
        <View style={styles.cartNativeDock}>
          
          {/* TOMBOL PECAHAN UANG CEPAT */}
          <View style={styles.quickCashRow}>
            <TouchableOpacity style={styles.quickCashBtn} onPress={() => handleQuickCash(total)}>
              <Text style={styles.quickCashText}>Uang Pas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCashBtn} onPress={() => handleQuickCash(10000)}>
              <Text style={styles.quickCashText}>10rb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCashBtn} onPress={() => handleQuickCash(20000)}>
              <Text style={styles.quickCashText}>20rb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCashBtn} onPress={() => handleQuickCash(50000)}>
              <Text style={styles.quickCashText}>50rb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCashBtn} onPress={() => handleQuickCash(100000)}>
              <Text style={styles.quickCashText}>100rb</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dockRow}>
            <Text style={styles.dockLabel}>Total Belanja ({count} pcs)</Text>
            <Text style={styles.dockTotal}>{formatRupiah(total)}</Text>
          </View>
          
          <View style={styles.dockSubRow}>
            <View style={styles.cashInputWrap}>
              <Text style={styles.cashInputLabel}>Diterima: Rp</Text>
              <TextInput
                style={styles.cashInput}
                value={cashReceived}
                onChangeText={setCashReceived}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={colors.textPlaceholder}
              />
            </View>
            <Text style={styles.changeLabel}>
              Kembalian: <Text style={styles.changeValue}>{formatRupiah(changeNum)}</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleCheckout}>
            <Text style={styles.btnPrimaryText}>Bayar & Simpan</Text>
          </TouchableOpacity>
        </View>

        <BottomNav activeTab="Pos" navigation={navigation} />
      </View>

      {/* MODAL TAMBAH MENU JAJANAN BARU */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Menu Jajanan Baru</Text>
            
            <Text style={styles.formLabel}>Nama Jajanan</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Kue Lapis Legit"
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.formLabel}>Harga Jual Satuan (Rp)</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: 1500"
              keyboardType="number-pad"
              value={newPrice}
              onChangeText={setNewPrice}
            />

            <Text style={styles.formLabel}>Kategori Rasa</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
              {['Asin', 'Manis'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.modalCatBtn, newCategory === cat && styles.modalCatBtnActive]}
                  onPress={() => setNewCategory(cat)}
                >
                  <Text style={[styles.modalCatText, newCategory === cat && styles.modalCatTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={handleAddNewProduct}>
                <Text style={styles.modalSaveText}>Simpan Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  bodyWrap: {
    flex: 1
  },
  addMenuBtn: {
    backgroundColor: '#FFF7ED',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7AA'
  },
  addMenuText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '700'
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 8
  },
  searchInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#18181B',
    marginBottom: 8
  },
  categoryPills: {
    flexDirection: 'row',
    gap: 8
  },
  categoryPill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F4F4F5'
  },
  categoryPillActive: {
    backgroundColor: '#EA580C'
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A'
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 8
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B'
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#EA580C',
    fontWeight: '700'
  },
  gridScroll: {
    paddingHorizontal: 20,
    paddingBottom: 16
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between'
  },
  catalogItem: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    position: 'relative'
  },
  catalogItemActive: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#EA580C'
  },
  itemBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  itemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B',
    marginTop: 4
  },
  itemPrice: {
    fontSize: 13,
    color: '#18181B',
    fontWeight: '800',
    marginTop: 2
  },
  itemPriceActive: {
    color: '#EA580C'
  },
  cartNativeDock: {
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF'
  },
  quickCashRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8
  },
  quickCashBtn: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center'
  },
  quickCashText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#52525B'
  },
  dockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4
  },
  dockLabel: {
    fontSize: 12,
    color: '#71717A'
  },
  dockTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EA580C'
  },
  dockSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  cashInputWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cashInputLabel: {
    fontSize: 12,
    color: '#71717A'
  },
  cashInput: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    minWidth: 50
  },
  changeLabel: {
    fontSize: 12,
    color: '#71717A'
  },
  changeValue: {
    color: '#059669',
    fontWeight: '700'
  },
  btnPrimary: {
    backgroundColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
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
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 14
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 4
  },
  formInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#18181B',
    marginBottom: 12
  },
  modalCatBtn: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalCatBtnActive: {
    backgroundColor: '#EA580C'
  },
  modalCatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A'
  },
  modalCatTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    borderRadius: 12
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A'
  },
  modalBtnSave: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#EA580C',
    borderRadius: 12
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
