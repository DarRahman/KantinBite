import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../theme/tokens';

export const ScreenHeader = ({ title, subtitle, rightElement }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textWrap}>
        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {rightElement ? <View style={styles.rightWrap}>{rightElement}</View> : null}
    </View>
  );
};

export const PrimaryActionBadge = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.primaryBadge} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.primaryBadgeText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 16,
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  textWrap: {
    flex: 1
  },
  subtitleText: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
    marginBottom: 2
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#18181B',
    letterSpacing: -0.5
  },
  rightWrap: {
    marginLeft: 12
  },
  primaryBadge: {
    backgroundColor: '#18181B',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2
  },
  primaryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  }
});
