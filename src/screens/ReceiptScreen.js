import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert, Dimensions, Share } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const ReceiptScreen = ({ route, navigation }) => {
  const params = route?.params || {};
  
  // Data nota POS atau Konsinyasi
  const isConsignment = Boolean(params.canteenName);
  const totalAmount = params.total || 25000;
  const cashReceived = params.received || 30000;
  const cashChange = params.change || 5000;
  
  const receiptNo = `KB-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = 'Kamis, 8 Okt 2026 • 15:30 WIB';

  const items = isConsignment ? [
    { name: params.item || 'Risoles Rogout', qty: params.sold || 25, price: 1000, subtotal: params.total || 25000 }
  ] : [
    { name: 'Risoles Rogout', qty: 10, price: 1200, subtotal: 12000 },
    { name: 'Dadar Gulung Unti', qty: 8, price: 1000, subtotal: 8000 },
    { name: 'Pastel Telur Sayur', qty: 5, price: 1500, subtotal: 7500 }
  ];

  const handleShareWhatsApp = async () => {
    let msg = `*BUKTI NOTA TRANSAKSI - KANTINBITE*\n`;
    msg += `No. Nota: #${receiptNo}\n`;
    msg += `Waktu: ${dateStr}\n`;
    if (isConsignment) {
      msg += `Mitra: ${params.canteenName} (PIC: ${params.pic})\n`;
      msg += `Titip Pagi: ${params.titip} pcs | Retur Fisik: ${params.retur} pcs\n`;
    }
    msg += `--------------------------------\n`;
    items.forEach(i => {
      msg += `${i.name} x${i.qty} = ${formatRupiah(i.subtotal)}\n`;
    });
    msg += `--------------------------------\n`;
    msg += `*TOTAL: ${formatRupiah(totalAmount)}*\n`;
    if (!isConsignment) {
      msg += `Tunai: ${formatRupiah(cashReceived)}\n`;
      msg += `Kembalian: ${formatRupiah(cashChange)}\n`;
    }
    msg += `\n_Terima kasih atas kerja samanya!_`;

    try {
      await Share.share({ message: msg });
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
            <AssetVisual name="receipt_bill" size={16} />
            <Text style={styles.headerTagText}>BUKTI TRANSAKSI RESMI</Text>
          </View>
          <Text style={styles.headerTitle}>Nota Digital WhatsApp</Text>
        </View>

        <TouchableOpacity
          style={styles.closeHeaderBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.closeHeaderText}>✕ Selesai</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* KERTAS STRUK DIGITAL DENGAN GERIGI ATAS & BAWAH */}
        <View style={styles.receiptPaper}>
          
          {/* HEADER STRUK DENGAN MASKOT BITEY */}
          <View style={styles.receiptBrandBox}>
            <AssetVisual name="chef_mascot" size={54} />
            <Text style={styles.receiptBrandTitle}>KANTINBITE SAAS</Text>
            <Text style={styles.receiptBrandSubtitle}>Sistem Operasional & Konsinyasi Mikro</Text>
            <Text style={styles.receiptNoText}>No. #{receiptNo}</Text>
            <Text style={styles.receiptDateText}>{dateStr}</Text>
          </View>

          <View style={styles.dashedDivider} />

          {/* INFORMASI MITRA / TRANSAKSI */}
          {isConsignment && (
            <View style={styles.canteenMetaBox}>
              <Text style={styles.metaLabel}>Mitra Kantin:</Text>
              <Text style={styles.metaVal}>{params.canteenName}</Text>
              <Text style={styles.metaSub}>PIC: {params.pic} • Titip: {params.titip} | Retur: {params.retur}</Text>
            </View>
          )}

          {/* ITEM TRANSAKSI */}
          <Text style={styles.itemsHeaderLabel}>RINCIAN PESANAN</Text>
          {items.map((it, idx) => (
            <View key={idx} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemRowName}>{it.name}</Text>
                <Text style={styles.itemRowSub}>{it.qty} pcs x {formatRupiah(it.price)}</Text>
              </View>
              <Text style={styles.itemRowSubtotal}>{formatRupiah(it.subtotal)}</Text>
            </View>
          ))}

          <View style={styles.dashedDivider} />

          {/* TOTAL & KEMBALIAN */}
          <View style={styles.calcSummaryRow}>
            <Text style={styles.calcSummaryLabel}>TOTAL TAGIHAN:</Text>
            <Text style={styles.calcSummaryTotal}>{formatRupiah(totalAmount)}</Text>
          </View>

          {!isConsignment && (
            <>
              <View style={styles.calcSubRow}>
                <Text style={styles.calcSubLabel}>Uang Diterima:</Text>
                <Text style={styles.calcSubVal}>{formatRupiah(cashReceived)}</Text>
              </View>
              <View style={styles.calcSubRow}>
                <Text style={styles.calcSubLabel}>Kembalian Tunai:</Text>
                <Text style={[styles.calcSubVal, { color: '#15803D', fontWeight: '900' }]}>{formatRupiah(cashChange)}</Text>
              </View>
            </>
          )}

          {/* STEMPEL LUNAS BESAR DARI OPENMOJI */}
          <View style={styles.stampCenterBox}>
            <AssetVisual name="check_badge" size={44} />
            <Text style={styles.stampCenterText}>PEMBAYARAN LUNAS</Text>
            <Text style={styles.stampCenterSub}>Tercatat otomatis di Buku Kas SQLite</Text>
          </View>

        </View>

        {/* DUA TOMBOL AKSI: KIRIM WA & CETAK */}
        <View style={styles.actionBtnRow}>
          <TactileButton
            size="lg"
            variant="success"
            style={{ width: '100%' }}
            icon={<AssetVisual name="receipt_bill" size={22} />}
            onPress={handleShareWhatsApp}
          >
            Kirim Nota ke WhatsApp
          </TactileButton>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

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
  closeHeaderBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  closeHeaderText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  receiptPaper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  receiptBrandBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  receiptBrandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: 1,
    marginTop: 6,
  },
  receiptBrandSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  receiptNoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C',
    marginTop: 8,
  },
  receiptDateText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  dashedDivider: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginVertical: 14,
  },
  canteenMetaBox: {
    backgroundColor: '#FAF8F5',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  metaVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  metaSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  itemsHeaderLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemRowName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemRowSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  itemRowSubtotal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  calcSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  calcSummaryLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
  },
  calcSummaryTotal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#EA580C',
  },
  calcSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  calcSubLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  calcSubVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  stampCenterBox: {
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  stampCenterText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  stampCenterSub: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
    marginTop: 2,
  },
  actionBtnRow: {
    width: '100%',
  },
});
