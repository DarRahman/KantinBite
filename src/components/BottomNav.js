import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { colors } from '../theme/tokens';

export const BottomNav = ({ activeTab, navigation }) => {
  const tabs = [
    { key: 'Dashboard', label: 'Dashboard' },
    { key: 'Hpp', label: 'HPP' },
    { key: 'Pos', label: 'Kasir' },
    { key: 'Consignment', label: 'Kantin' },
    { key: 'Settings', label: 'Setting' }
  ];

  const renderIcon = (key, isActive) => {
    const stroke = isActive ? colors.primary : colors.textPlaceholder;
    switch (key) {
      case 'Dashboard':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </Svg>
        );
      case 'Hpp':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </Svg>
        );
      case 'Pos':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <Circle cx="9" cy="21" r="1" />
            <Circle cx="20" cy="21" r="1" />
            <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </Svg>
        );
      case 'Consignment':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <Circle cx="9" cy="7" r="4" />
          </Svg>
        );
      case 'Settings':
        return (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <Circle cx="12" cy="12" r="3" />
            <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabBtn}
            activeOpacity={0.7}
            onPress={() => {
              if (navigation && !isActive) {
                navigation.navigate(tab.key);
              }
            }}
          >
            {renderIcon(tab.key, isActive)}
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    minWidth: 54,
    minHeight: 48
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A1A1AA',
    marginTop: 3
  },
  tabLabelActive: {
    color: '#EA580C'
  }
});
