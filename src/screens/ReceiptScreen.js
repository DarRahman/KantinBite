import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { ScenicBanner } from '../components/ScenicBanner';
import { Mascot } from '../components/Mascot';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable } from '../components/PlayfulComponents';
import { formatRupiah } from '../utils/formatters';

export const ReceiptScreen = ({ route, navigation }) => {
  const params = route?.params || {};

  const isConsignment = Boolean(params.canteenName);
  const totalAmount = Math.round(Number(params.total) || 25000);
  const cashReceived = Math.round(Number(params.received) || 30000);
  const cashChange = Math.max(0, Math.round(Number(params.change) || cashReceived - totalAmount));

  const receiptNo = `KB-${Math.floor(100000 + (totalAmount % 899999))}`;
  const dateStr = 'Hari Ini • 15:30 WIB';

  // Susun daftar item dari keranjang POS atau Konsinyasi
  let items = [];
  if (isConsignment) {
    const sold = Number(params.sold) || 25;
    const unitPrice = Math.round(totalAmount / Math.max(1, sold));
    items = [
      {
        name: params.item || 'Risoles Rogout Ayam',
        qty: sold,
        price: unitPrice,
        subtotal: totalAmount,
        icon: 'risoles_rogout',
      },
    ];
  } else if (params.cart && params.products) {
    Object.keys(params.cart).forEach((prodId) => {
      const qty = params.cart[prodId];
      const prod = params.products.find((p) => p.id === prodId);
      if (prod && qty > 0) {
        items.push({
          name: prod.name,
          qty,
          price: prod.price,
          subtotal: Math.round(prod.price * qty),
          icon: prod.icon || 'risoles_rogout',
        });
      }
    });
  }

  if (items.length === 0) {
    items = [
      { name: 'Risoles Rogout Ayam', qty: 10, price: 1200, subtotal: 12000, icon: 'risoles_rogout' },
      { name: 'Dadar Gulung Pandan', qty: 8, price: 1000, subtotal: 8000, icon: 'dadar_gulung' },
      { name: 'Pastel Sayur Telur', qty: 5, price: 1500, subtotal: 7500, icon: 'pastel_telur' },
    ];
  }

  const buildMessage = () => {
    let msg = `*BUKTI NOTA DAPUR BERKAH BUNDA*\n`;
    msg += `No. Nota: #${receiptNo}\n`;
    msg += `Waktu: ${dateStr}\n`;
    if (isConsignment) {
      msg += `Mitra Kantin: ${params.canteenName} (PIC: ${params.pic})\n`;
      msg += `Titip Pagi: ${params.titip} pcs | Sisa Retur: ${params.retur} pcs\n`;
    }
    msg += `--------------------------------\n`;
    items.forEach((i) => {
      msg += `• ${i.name} (${i.qty}x) = ${formatRupiah(i.subtotal)}\n`;
    });
    msg += `--------------------------------\n`;
    msg += `*TOTAL SETOR / BAYAR: ${formatRupiah(totalAmount)}*\n`;
    if (!isConsignment) {
      msg += `Uang Tunai: ${formatRupiah(cashReceived)}\n`;
      msg += `Kembalian: ${formatRupiah(cashChange)}\n`;
    }
    msg += `\n_Terima kasih, semoga laris & berkah selalu!_`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const msg = buildMessage();
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(msg)}`).catch(async () => {
      try {
        await Share.share({ message: msg });
      } catch (e) {
        Alert.alert('Info Nota', e.message);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScenicBanner
          scene="pos_bakery"
          badgeText="BUKTI TRANSAKSI RESMI"
          title="Nota Digital Siap Kirim"
          subtitle="Kirim struk rincian kue langsung ke WhatsApp pelanggan atau kantin"
          onBackPress={() => navigation.goBack()}
          actionLabel="Beranda"
          onActionPress={() => navigation.navigate('Dashboard')}
        />

        <View style={styles.bodyPadding}>
          {/* KERTAS STRUK DIGITAL DENGAN GERIGI ATAS & BAWAH */}
          <View style={styles.receiptPaper}>
            {/* Gerigi Kertas Atas SVG */}
            <Svg width="100%" height={12} viewBox="0 0 320 12" preserveAspectRatio="none">
              <Path
                d="M0 12 L10 0 L20 12 L30 0 L40 12 L50 0 L60 12 L70 0 L80 12 L90 0 L100 12 L110 0 L120 12 L130 0 L140 12 L150 0 L160 12 L170 0 L180 12 L190 0 L200 12 L210 0 L220 12 L230 0 L240 12 L250 0 L260 12 L270 0 L280 12 L290 0 L300 12 L310 0 L320 12 Z"
                fill="#FFFBEB"
              />
            </Svg>

            <View style={styles.paperInner}>
              {/* Header Toko & Maskot Merayakan */}
              <View style={styles.receiptBrandBox}>
                <Mascot size={74} pose="celebrate" animated />
                <Text style={styles.receiptBrandTitle}>DAPUR BERKAH BUNDA</Text>
                <Text style={styles.receiptBrandSubtitle}>
                  Jajanan Pasar Segar & Titip Kantin Harian
                </Text>
                <View style={styles.metaBadgeRow}>
                  <Text style={styles.receiptNoText}>Nota #{receiptNo}</Text>
                  <Text style={styles.receiptDateText}>{dateStr}</Text>
                </View>
              </View>

              <View style={styles.dashedDivider} />

              {isConsignment && (
                <View style={styles.canteenMetaBox}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.metaLabel}>MITRA KANTIN REKANAN</Text>
                    <Text style={styles.metaVal}>{params.canteenName}</Text>
                    <Text style={styles.metaSub}>
                      PIC: {params.pic} • Titip {params.titip} pcs | Retur {params.retur} pcs
                    </Text>
                  </View>
                  <AssetVisual name="canteen_shop" size={38} />
                </View>
              )}

              <Text style={styles.itemsHeaderLabel}>RINCIAN JAJANAN</Text>
              {items.map((it, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <AssetVisual name={it.icon || 'risoles_rogout'} size={36} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.itemRowName}>{it.name}</Text>
                    <Text style={styles.itemRowSub}>
                      {it.qty} pcs × {formatRupiah(it.price)}
                    </Text>
                  </View>
                  <Text style={styles.itemRowSubtotal}>{formatRupiah(it.subtotal)}</Text>
                </View>
              ))}

              <View style={styles.dashedDivider} />

              {/* Ringkasan Total & Cap Lunas */}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL PEMBAYARAN</Text>
                <Text style={styles.totalAmount}>{formatRupiah(totalAmount)}</Text>
              </View>

              {!isConsignment && (
                <>
                  <View style={styles.subTotalRow}>
                    <Text style={styles.subTotalLabel}>Uang Tunai Diterima</Text>
                    <Text style={styles.subTotalVal}>{formatRupiah(cashReceived)}</Text>
                  </View>
                  <View style={styles.subTotalRow}>
                    <Text style={styles.subTotalLabel}>Uang Kembalian</Text>
                    <Text style={[styles.subTotalVal, { color: '#059669' }]}>
                      {formatRupiah(cashChange)}
                    </Text>
                  </View>
                </>
              )}

              <View style={styles.stampRow}>
                <View style={styles.lunasStampBox}>
                  <AssetVisual name="check_badge" size={20} />
                  <Text style={styles.lunasStampText}>TERCATAT & SAH</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tombol Kirim ke WhatsApp */}
          <AnimatedPressable
            scaleTo={0.97}
            style={styles.waShareBtn}
            onPress={handleSendWhatsApp}
          >
            <Text style={styles.waShareBtnText}>Kirim Nota ke WhatsApp</Text>
          </AnimatedPressable>

          <AnimatedPressable
            scaleTo={0.97}
            style={styles.backHomeBtn}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.backHomeBtnText}>Selesai & Kembali ke Beranda</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  bodyPadding: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  receiptPaper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    marginBottom: 16,
  },
  paperInner: {
    padding: 18,
  },
  receiptBrandBox: {
    alignItems: 'center',
  },
  receiptBrandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 4,
    letterSpacing: 0.4,
  },
  receiptBrandSubtitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  receiptNoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9A3412',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  receiptDateText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    paddingVertical: 3,
  },
  dashedDivider: {
    height: 1.5,
    backgroundColor: '#FDE68A',
    marginVertical: 14,
  },
  canteenMetaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  metaLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#92400E',
  },
  metaVal: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 1,
  },
  metaSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52525B',
    marginTop: 2,
  },
  itemsHeaderLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
  },
  itemRowName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#18181B',
  },
  itemRowSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 1,
  },
  itemRowSubtotal: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#18181B',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18181B',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#EA580C',
  },
  subTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  subTotalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
  },
  subTotalVal: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#18181B',
  },
  stampRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  lunasStampBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  lunasStampText: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 0.6,
  },
  waShareBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#065F46',
    marginBottom: 10,
  },
  waShareBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '900',
  },
  backHomeBtn: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  backHomeBtnText: {
    color: '#EA580C',
    fontSize: 13.5,
    fontWeight: '900',
  },
});
