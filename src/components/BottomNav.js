import React from 'react';
import { View } from 'react-native';
import { ModernBottomNav as SharedModernBottomNav } from './ModernBottomNav';

/**
 * BottomNav Standar Terpadu KantinBite
 * Mengarahkan seluruh pemanggilan BottomNav lama langsung ke ModernBottomNav (DANA-Style Elevated FAB)
 * Memastikan 100% konsistensi di SEMUA layar tanpa ada duplikasi kode
 */
export const BottomNav = ({ activeTab, navigation }) => {
  let mappedTab = 'Home';
  if (activeTab === 'Dashboard' || activeTab === 'Home') mappedTab = 'Home';
  else if (activeTab === 'Consignment' || activeTab === 'Activity') mappedTab = 'Activity';
  else if (activeTab === 'Pos' || activeTab === 'Kasir') mappedTab = 'Kasir';
  else if (activeTab === 'Hpp' || activeTab === 'Wallet' || activeTab === 'Katalog') mappedTab = 'Wallet';
  else if (activeTab === 'Settings' || activeTab === 'Me') mappedTab = 'Me';

  return <SharedModernBottomNav activeTab={mappedTab} navigation={navigation} />;
};

export default BottomNav;
