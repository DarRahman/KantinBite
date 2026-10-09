import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * ScreenHeader Terstandarisasi untuk Seluruh Halaman KantinBite
 * Menjamin konsistensi tipografi, padding, tombol aksi oranye, dan keselarasan UI
 */
export const ScreenHeader = ({ 
  title, 
  subtitle, 
  actionLabel, 
  onActionPress,
  rightElement 
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textWrap}>
        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {actionLabel ? (
        <TouchableOpacity 
          style={styles.actionBtn} 
          activeOpacity={0.85} 
          onPress={onActionPress}
        >
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : rightElement ? (
        <View style={styles.rightWrap}>{rightElement}</View>
      ) : null}
    </View>
  );
};

export const PrimaryActionBadge = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85} onPress={onPress}>
      <Text style={styles.actionBtnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  textWrap: {
    flex: 1,
  },
  subtitleText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  rightWrap: {
    marginLeft: 12,
  },
  actionBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    elevation: 2,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginLeft: 12,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    whiteSpace: 'nowrap',
  },
});
