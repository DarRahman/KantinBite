import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert, Dimensions, Share } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton, TactilePill } from '../components/PlayfulComponents';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const MarketShoppingScreen = ({ navigation }) => {
  const [shoppingItems, setShoppingItems] = useState([
    { id: 'b1', name: 'Telur Ayam Negeri', qtyNeeded: '3 Kg (48 butir)', estCost: 78000, icon: 'egg_raw', checked: false, note: 'Pilih cangkang cokelat tebal' },
    { id: 'b2', name: 'Minyak Goreng Curah/Kemasan', qtyNeeded: '4 Liter', estCost: 64000, icon: 'oil_butter', checked: true, note: 'Untuk gorengan risoles pagi' },
    { id: 'b3', name: 'Wortel Segar Berastagi', qtyNeeded: '2 Kg', estCost: 28000, icon: 'carrot_veg', checked: false, note: 'Isian rogout lembut' },
    { id: 'b4', name: 'Daging Dada Ayam Fillet', qtyNeeded: '1.5 Kg', estCost: 54000, icon: 'meat_chicken', checked: false, note: 'Rebus suwir lemper' },
    { id: 'b5', name: 'Plastik Mika Snack 7C', qtyNeeded: '2 Pack (100 pcs)', estCost: 24000, icon: 'package_box', checked: true, note: 'Wadah eceran lapak' },
    { id: 'b6', name: 'Gula Pasir & Daun Pisang', qtyNeeded: '1 Kg + 2 Ikat', estCost: 25000, icon: 'sugar_cane', checked: false, note: 'Pembungkus lemper harum' },
  ]);

  const toggleCheck = (id) => {
    setShoppingItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const checkedCount = shoppingItems.filter(i => i.checked).length;
  const totalCost = shoppingItems.reduce((sum, i) => sum + i.estCost, 0);
  const remainingCost = shoppingItems.filter(i => !i.checked).reduce((sum, i) => sum + i.estCost, 0);

  const handleShareToWhatsApp = async () => {
    let text = `*DAFTAR BELANJA PASAR SUBUH - KANTINBITE*\n`;
    text += `Jadwal: 04:00 Subuh di Pasar Kanoman\n\n`;
    shoppingItems.forEach((i, idx) => {
      const mark = i.checked ? '✓ [Sudah Dibeli]' : '◻ [Belum]';
      text += `${idx + 1}. ${mark} *${i.name}* - ${i.qtyNeeded} (~${formatRupiah(i.estCost)})\n   _Catatan: ${i.note}_\n`;
    });
    text += `\n*Total Estimasi Anggaran: ${formatRupiah(totalCost)}*`;
    
    try {
      await Share.share({ message: text });
    } catch (e) {
      Alert.alert('Gagal membagikan', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="clock_time" size={16} />
            <Text style={styles.headerTagText}>OPERASIONAL SUBUH 04:00</Text>
          </View>
          <Text style={styles.headerTitle}>Daftar Belanja Pasar</Text>
        </View>

        <TactileButton 
          size="sm" 
          variant="accent" 
          onPress={handleShareToWhatsApp}
          icon={<AssetVisual name="receipt_bill" size={16} />}
        >
          Kirim WA
        </TactileButton>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO ESTIMASI ANGGARAN PASAR ALA BENTO */}
        <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.heroBento}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubLabel}>ESTIMASI BELANJA PASAR KANOMAN</Text>
              <Text style={styles.heroBalanceText}>{formatRupiah(totalCost)}</Text>
            </View>
            <View style={styles.cartVisualBox}>
              <AssetVisual name="market_cart" size={54} />
            </View>
          </View>

          {/* DUA KAPSUL STATUS: TERBELI & SISA */}
          <View style={styles.statusPillsRow}>
            <View style={[styles.statusPill, { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' }]}>
              <AssetVisual name="check_badge" size={18} />
              <Text style={[styles.statusPillText, { color: '#15803D' }]}>
                {checkedCount} dari {shoppingItems.length} Bahan Terbeli
              </Text>
            </View>

            <View style={[styles.statusPill, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
              <AssetVisual name="warning_badge" size={18} />
              <Text style={[styles.statusPillText, { color: '#B91C1C' }]}>
                Sisa: {formatRupiah(remainingCost)}
              </Text>
            </View>
          </View>
        </BentoCard>

        {/* SATISFYING CHECKLIST BERVOLUME DARI UIVERSE.IO */}
        <Text style={styles.sectionTitle}>Item Belanjaan Subuh (Ketuk untuk Coret)</Text>
        {shoppingItems.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => toggleCheck(item.id)}
            >
              <BentoCard
                bg={item.checked ? '#F8FAFC' : '#FFFFFF'}
                accentBorder={item.checked ? '#CBD5E1' : '#E2E8F0'}
                style={[styles.itemCard, item.checked && styles.itemCardChecked]}
              >
                <View style={styles.itemRow}>
                  
                  {/* ROUND SATISFYING CHECKBOX DARI UIVERSE.IO */}
                  <View style={[styles.checkboxRound, item.checked && styles.checkboxRoundChecked]}>
                    {item.checked && <Text style={styles.checkMark}>✓</Text>}
                  </View>

                  <View style={styles.itemVisualWrap}>
                    <AssetVisual name={item.icon || 'wheat_flour'} size={44} />
                  </View>

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.itemNameText, item.checked && styles.textStrike]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.itemQtyText, item.checked && styles.textStrikeMuted]}>
                      Kebutuhan: <Text style={{ color: '#EA580C', fontWeight: '800' }}>{item.qtyNeeded}</Text>
                    </Text>
                    <Text style={styles.itemNoteText} numberOfLines={1}>
                      💡 {item.note}
                    </Text>
                  </View>

                  <View style={styles.costBox}>
                    <Text style={[styles.costText, item.checked && styles.textStrikeMuted]}>
                      {formatRupiah(item.estCost)}
                    </Text>
                    {item.checked && (
                      <View style={styles.doneBadge}>
                        <Text style={styles.doneBadgeText}>SELESAI</Text>
                      </View>
                    )}
                  </View>

                </View>
              </BentoCard>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FLOATING ACTION BOTTOM DOCK */}
      <View style={styles.bottomDock}>
        <TactileButton
          size="lg"
          variant="primary"
          onPress={() => {
            Alert.alert('Belanja Selesai', `Seluruh sisa belanjaan ${formatRupiah(totalCost - remainingCost)} berhasil dipindahkan ke stok dapur!`, [
              { text: 'Buka Gudang Stok', onPress: () => navigation.navigate('Stock') }
            ]);
          }}
          icon={<AssetVisual name="check_badge" size={24} />}
        >
          Selesai Belanja ({checkedCount}/{shoppingItems.length})
        </TactileButton>
      </View>

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
  scrollContent: {
    padding: 18,
  },
  heroBento: {
    padding: 18,
    marginBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroBalanceText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: -0.8,
  },
  cartVisualBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  statusPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  itemCard: {
    padding: 14,
    marginBottom: 12,
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  itemCardChecked: {
    borderBottomColor: '#E2E8F0',
    opacity: 0.75,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxRound: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  checkboxRoundChecked: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  itemVisualWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemQtyText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '600',
  },
  itemNoteText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  costBox: {
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
  },
  doneBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: 3,
  },
  doneBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#15803D',
  },
  textStrike: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  textStrikeMuted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#F1EFEA',
  },
});
