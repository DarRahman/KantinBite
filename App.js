import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        {/* Bingkai Kanvas Mobile Bersih Tanpa Dynamic Island / Titik Tech */}
        <View style={[styles.phoneChassis, { height: phoneHeight }]}>
          <View style={styles.phoneScreenViewport}>{navigatorContent}</View>
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
  },
  phoneChassis: {
    width: 420,
    maxWidth: '96%',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    borderWidth: 6,
    borderColor: '#431407',
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
  },
  phoneScreenViewport: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
});
