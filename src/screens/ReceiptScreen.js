import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Linking, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { getConsignment, getProfile } from '../db/storage';
import { formatRupiah, formatDateIndo } from '../utils/formatters';
import { colors } from '../theme/tokens';

export const ReceiptScreen = ({ navigation }) => {
  const [consignment, setConsignment] = useState({
    partnerName: 'Kantin Fakultas Teknik',
    picName: 'Pak Joko',
    itemName: 'Risoles Rogout',
    initialQty: 30,
    returnQty: 5,
    soldQty: 25,
    totalDue: 25000,
    isPaid: true,
    noteCode: '#KB-20261007'
  });

  const [profile, setProfile] = useState({ businessName: 'DAPUR BERKAH' });

  useEffect(() => {
    const load = async () => {
      const c = await getConsignment();
      const p = await getProfile();
      setConsignment(c);
      setProfile(p);
    };
    load();
  }, []);

  const handleSendWhatsApp = () => {
    const textMsg = 
`*BUKTI REKONSILIASI KONSINYASI*
*${profile.businessName.toUpperCase()}*
Nota: ${consignment.noteCode}
Tanggal: ${formatDateIndo()}

Kepada: ${consignment.partnerName} (${consignment.picName})
-----------------------------------------
Menu: ${consignment.itemName}
• Titip Pagi: ${consignment.initialQty} pcs
• Sisa Retur: ${consignment.returnQty} pcs
• Laku Terjual: ${consignment.soldQty} pcs
-----------------------------------------
*TOTAL SETORAN: ${formatRupiah(consignment.totalDue)}*
Status: ${consignment.isPaid ? 'LUNAS TUNAI' : 'BELUM DISETOR (PIUTANG)'}

Terima kasih atas kerja samanya. 🙏`;

    const encoded = encodeURI(textMsg);
    const url = `whatsapp://send?text=${encoded}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Catatan', 'Aplikasi WhatsApp tidak terpasang di perangkat. Teks nota siap disalin secara manual.');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Gagal membuka aplikasi WhatsApp.');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Nota Digital"
        subtitle="Bukti Rekonsiliasi Konsinyasi Sore"
      />
      <View style={styles.contentWrap}>

          {/* RECEIPT PAPER SURFACE */}
          <View style={styles.receiptSheet}>
            <View style={styles.receiptHeader}>
              <Text style={styles.businessTitle}>{profile.businessName.toUpperCase()}</Text>
              <Text style={styles.noteCodeText}>{consignment.noteCode} • {formatDateIndo()}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.labelCol}>Tujuan:</Text>
              <Text style={styles.valColBold}>{consignment.partnerName}</Text>
            </View>

            <View style={[styles.receiptRow, { marginBottom: 10 }]}>
              <Text style={styles.labelCol}>Penerima:</Text>
              <Text style={styles.valColBold}>{consignment.picName}</Text>
            </View>

            <View style={styles.dividerDashed}>
              <Text style={styles.itemTitle}>{consignment.itemName}</Text>
              <View style={styles.receiptRow}>
                <Text style={styles.qtyText}>Titip {consignment.initialQty} | Sisa {consignment.returnQty}</Text>
                <Text style={styles.qtySoldText}>Laku {consignment.soldQty} pcs</Text>
              </View>
              <View style={[styles.receiptRow, { marginTop: 6 }]}>
                <Text style={styles.totalDueLabel}>Setoran (@1.000):</Text>
                <Text style={styles.totalDueValue}>{formatRupiah(consignment.totalDue)}</Text>
              </View>
            </View>
          </View>

          {/* WHATSAPP CTA BUTTON */}
          <TouchableOpacity style={styles.btnWhatsApp} activeOpacity={0.8} onPress={handleSendWhatsApp}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="#FFFFFF" style={{ marginRight: 8 }}>
              <Path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 2.052.814 3.19.814 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm9.969 5.766c0 5.503-4.469 9.969-9.969 9.969-1.745 0-3.385-.45-4.819-1.241l-7.212 1.89 1.933-7.051c-.886-1.488-1.39-3.232-1.39-5.083 0-5.504 4.469-9.969 9.969-9.969 5.503 0 9.969 4.465 9.969 9.969z" />
            </Svg>
            <Text style={styles.btnWhatsAppText}>Kirim ke WhatsApp</Text>
          </TouchableOpacity>

        </View>
        <BottomNav activeTab="Consignment" navigation={navigation} />
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
  contentWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  headerTitle: {
    display: 'none'
  },
  receiptSheet: {
    backgroundColor: '#F4F4F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 'auto'
  },
  receiptHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D8',
    borderStyle: 'dashed',
    paddingBottom: 10,
    marginBottom: 10
  },
  businessTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18181B'
  },
  noteCodeText: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 2
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  labelCol: {
    fontSize: 12,
    color: '#52525B'
  },
  valColBold: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B'
  },
  dividerDashed: {
    borderTopWidth: 1,
    borderTopColor: '#D4D4D8',
    borderStyle: 'dashed',
    paddingTop: 8,
    marginTop: 4
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B',
    marginBottom: 2
  },
  qtyText: {
    fontSize: 11,
    color: '#71717A'
  },
  qtySoldText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#18181B'
  },
  totalDueLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B'
  },
  totalDueValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669'
  },
  btnWhatsApp: {
    backgroundColor: '#22C55E',
    borderRadius: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 16
  },
  btnWhatsAppText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  }
});
