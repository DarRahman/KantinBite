import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { seedInitialData } from './src/db/storage';
import { AuthScreen } from './src/screens/AuthScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { HppScreen } from './src/screens/HppScreen';
import { RecipeEditorScreen } from './src/screens/RecipeEditorScreen';
import { PosScreen } from './src/screens/PosScreen';
import { ConsignmentScreen } from './src/screens/ConsignmentScreen';
import { StockScreen } from './src/screens/StockScreen';
import { MarketShoppingScreen } from './src/screens/MarketShoppingScreen';
import { PartnerDirectoryScreen } from './src/screens/PartnerDirectoryScreen';
import { DebtLedgerScreen } from './src/screens/DebtLedgerScreen';
import { FinanceReportScreen } from './src/screens/FinanceReportScreen';
import { ReceiptScreen } from './src/screens/ReceiptScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    seedInitialData();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#FFFBEB" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            contentStyle: { backgroundColor: '#FFFBEB' },
          }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Hpp" component={HppScreen} />
          <Stack.Screen name="RecipeEditor" component={RecipeEditorScreen} />
          <Stack.Screen name="Pos" component={PosScreen} />
          <Stack.Screen name="Consignment" component={ConsignmentScreen} />
          <Stack.Screen name="Stock" component={StockScreen} />
          <Stack.Screen name="MarketShopping" component={MarketShoppingScreen} />
          <Stack.Screen name="PartnerDirectory" component={PartnerDirectoryScreen} />
          <Stack.Screen name="DebtLedger" component={DebtLedgerScreen} />
          <Stack.Screen name="FinanceReport" component={FinanceReportScreen} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
