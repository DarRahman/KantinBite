import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Mascot } from '../components/Mascot';
import AssetVisual from '../components/AssetVisual';
import { AnimatedPressable } from '../components/PlayfulComponents';
import { saveProfile } from '../db/storage';

export const AuthScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('Dapur Berkah Bunda');
  const [pin, setPin] = useState('123456');

  const handleDigitPress = (digit) => {
    if (pin.length < 6) {
      setPin((prev) => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleLogin = async () => {
    await saveProfile({ businessName: businessName.trim() || 'Dapur Berkah Bunda', pin });
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />
      <ScrollView contentContainerStyle={styles.scrollWrap} showsVerticalScrollIndicator={false}>
        {/* ILUSTRASI KANVAS KAFE PAGI GAYA JUJULY CAFE */}
        <View style={styles.scenicHero}>
          <Svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="authSky" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#FFF7ED" />
                <Stop offset="100%" stopColor="#FDE68A" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="400" height="220" fill="url(#authSky)" />
            <Circle cx="330" cy="52" r="32" fill="#FACC15" opacity="0.45" />
            <Path d="M0 170 Q110 140 230 168 T400 155 L400 220 L0 220 Z" fill="#FCD34D" opacity="0.6" />
          </Svg>

          <View style={styles.heroContent}>
            <Mascot size={112} pose="baker_box" animated />
            <Text style={styles.appTitle}>KantinBite</Text>
            <Text style={styles.appTagline}>
              Sahabat Dapur Produksi, HPP & Konsinyasi Jajanan Kantin
            </Text>

            <View style={styles.snackPreviewRow}>
              <AssetVisual name="risoles_rogout" size={40} />
              <AssetVisual name="pastel_telur" size={40} />
              <AssetVisual name="dadar_gulung" size={40} />
              <AssetVisual name="lemper_ayam" size={40} />
            </View>
          </View>
        </View>

        {/* FORM NAMA USAHA & KEYPAD PIN TAKTIL */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>NAMA PROFIL DAPUR USAHA</Text>
          <TextInput
            style={styles.nativeInput}
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Contoh: Dapur Berkah Bunda"
            placeholderTextColor="#A1A1AA"
          />

          <Text style={styles.inputLabel}>PIN KEAMANAN KASIR (6 ANGKA)</Text>
          <View style={styles.pinDotsRow}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const filled = i < pin.length;
              return (
                <View
                  key={i}
                  style={[styles.pinDotBox, filled && styles.pinDotBoxFilled]}
                >
                  <View style={[styles.pinDot, filled && styles.pinDotActive]} />
                </View>
              );
            })}
          </View>

          {/* Keypad Angka Taktil */}
          <View style={styles.numpadGrid}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
              <AnimatedPressable
                key={num}
                scaleTo={0.92}
                style={styles.numpadKey}
                onPress={() => handleDigitPress(num)}
              >
                <Text style={styles.numpadKeyText}>{num}</Text>
              </AnimatedPressable>
            ))}
            <AnimatedPressable
              scaleTo={0.92}
              style={[styles.numpadKey, styles.numpadClearKey]}
              onPress={handleBackspace}
            >
              <Text style={styles.numpadClearText}>Hapus</Text>
            </AnimatedPressable>
          </View>

          <AnimatedPressable
            scaleTo={0.97}
            style={styles.btnPrimary}
            onPress={handleLogin}
          >
            <Text style={styles.btnPrimaryText}>Masuk ke Dapur Produksi</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollWrap: {
    paddingBottom: 28,
  },
  scenicHero: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderBottomColor: '#FDE68A',
  },
  heroContent: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#18181B',
    letterSpacing: -0.6,
    marginTop: 6,
  },
  appTagline: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#78350F',
    textAlign: 'center',
    marginTop: 3,
  },
  snackPreviewRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  formContainer: {
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  inputLabel: {
    fontSize: 10.5,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  nativeInput: {
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    fontSize: 14,
    color: '#18181B',
    fontWeight: '800',
    marginBottom: 14,
  },
  pinDotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  pinDotBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDotBoxFilled: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CBD5E1',
  },
  pinDotActive: {
    backgroundColor: '#EA580C',
  },
  numpadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    marginBottom: 16,
  },
  numpadKey: {
    width: '31%',
    height: 44,
    borderRadius: 13,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numpadKeyText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
  },
  numpadClearKey: {
    width: '65%',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderBottomColor: '#F87171',
  },
  numpadClearText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#DC2626',
  },
  btnPrimary: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#9A3412',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
});
