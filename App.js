import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

import { initStorage } from './src/db/storage';
import { AuthScreen } from './src/screens/AuthScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { HppScreen } from './src/screens/HppScreen';
import { PosScreen } from './src/screens/PosScreen';
import { ConsignmentScreen } from './src/screens/ConsignmentScreen';
import { StockScreen } from './src/screens/StockScreen';
import { MarketShoppingScreen } from './src/screens/MarketShoppingScreen';
import { DebtLedgerScreen } from './src/screens/DebtLedgerScreen';
import { RecipeEditorScreen } from './src/screens/RecipeEditorScreen';
import { PartnerDirectoryScreen } from './src/screens/PartnerDirectoryScreen';
import { ReceiptScreen } from './src/screens/ReceiptScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { FinanceReportScreen } from './src/screens/FinanceReportScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const { width, height } = useWindowDimensions();
  const isWideViewport = width > 500;

  useEffect(() => {
    initStorage();
  }, []);

  const navigatorContent = (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Hpp" component={HppScreen} />
        <Stack.Screen name="Pos" component={PosScreen} />
        <Stack.Screen name="Consignment" component={ConsignmentScreen} />
        <Stack.Screen name="Stock" component={StockScreen} />
        <Stack.Screen name="MarketShopping" component={MarketShoppingScreen} />
        <Stack.Screen name="DebtLedger" component={DebtLedgerScreen} />
        <Stack.Screen name="RecipeEditor" component={RecipeEditorScreen} />
        <Stack.Screen name="PartnerDirectory" component={PartnerDirectoryScreen} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="FinanceReport" component={FinanceReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  if (!isWideViewport) {
    return <SafeAreaProvider>{navigatorContent}</SafeAreaProvider>;
  }

  const phoneHeight = Math.min(Math.max(height - 28, 680), 868);

  return (
    <SafeAreaProvider>
      <View style={styles.ambientStage}>
        {/* Dekorasi Latar Belakang Hangat ala Showcase Mobile */}
        <View style={styles.bgCircleLeft} />
        <View style={styles.bgCircleRight} />

        {/* BINGKAI SIMULASI MOBILE APK PROPORSIONAL */}
        <View style={[styles.phoneChassis, { height: phoneHeight }]}>
          {/* Status Bar Mobile Simulasi */}
          <View style={styles.statusBarRow}>
            <Text style={styles.statusTime}>09:41</Text>
            <View style={styles.dynamicIsland}>
              <View style={styles.speakerSlot} />
              <View style={styles.cameraLens} />
            </View>
            <View style={styles.statusIconsRow}>
              <Svg width={14} height={12} viewBox="0 0 16 12" fill="none">
                <Rect x="1" y="8" width="2.5" height="4" rx="1" fill="#18181B" />
                <Rect x="5" y="6" width="2.5" height="6" rx="1" fill="#18181B" />
                <Rect x="9" y="3" width="2.5" height="9" rx="1" fill="#18181B" />
                <Rect x="13" y="1" width="2.5" height="11" rx="1" fill="#18181B" />
              </Svg>
              <Svg width={18} height={12} viewBox="0 0 22 12" fill="none">
                <Rect x="1" y="1" width="17" height="10" rx="2.5" stroke="#18181B" strokeWidth="1.5" />
                <Rect x="3" y="3" width="13" height="6" rx="1" fill="#10B981" />
                <Rect x="19.5" y="4" width="1.8" height="4" rx="0.9" fill="#18181B" />
              </Svg>
            </View>
          </View>

          {/* Layar Aplikasi Utama */}
          <View style={styles.phoneScreenViewport}>{navigatorContent}</View>

          {/* Home Gesture Indicator */}
          <View style={styles.homeIndicatorBar}>
            <View style={styles.homePill} />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  ambientStage: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  bgCircleLeft: {
    position: 'absolute',
    top: -120,
    left: -100,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#FED7AA',
    opacity: 0.45,
  },
  bgCircleRight: {
    position: 'absolute',
    bottom: -140,
    right: -100,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: '#FDE68A',
    opacity: 0.45,
  },
  phoneChassis: {
    width: 420,
    maxWidth: '96%',
    backgroundColor: '#FFFFFF',
    borderRadius: 42,
    borderWidth: 8,
    borderColor: '#1E293B',
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
  },
  statusBarRow: {
    height: 34,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '800',
    color: '#18181B',
    width: 48,
  },
  dynamicIsland: {
    width: 88,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speakerSlot: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  cameraLens: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#0EA5E9',
    opacity: 0.7,
  },
  statusIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    width: 48,
  },
  phoneScreenViewport: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  homeIndicatorBar: {
    height: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePill: {
    width: 118,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
});
