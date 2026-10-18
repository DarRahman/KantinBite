import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { formatRupiah } from '../utils/formatters';

export const DonutIncomeRatio = ({ posAmount = 145000, consignmentAmount = 175000 }) => {
  const [focusChannel, setFocusChannel] = useState('all'); // 'all' | 'pos' | 'canteen'
  const total = Math.max(1, posAmount + consignmentAmount);
  const posRatio = Math.round((posAmount / total) * 100);
  const csnRatio = 100 - posRatio;

  const size = 86;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const posStrokeDashoffset = circumference - (circumference * posRatio) / 100;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        setFocusChannel((prev) =>
          prev === 'all' ? 'canteen' : prev === 'canteen' ? 'pos' : 'all'
        )
      }
      style={styles.container}
    >
      <View style={styles.donutWrap}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EA580C"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={posStrokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.centerTextWrap}>
          <Text style={styles.centerNumber}>
            {focusChannel === 'canteen' ? `${csnRatio}%` : `${posRatio}%`}
          </Text>
          <Text style={styles.centerLabel}>
            {focusChannel === 'canteen' ? 'Kantin' : 'Kasir'}
          </Text>
        </View>
      </View>

      <View style={styles.legendWrap}>
        <Text style={styles.cardHeaderTitle}>Porsi Sumber Pemasukan</Text>
        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendTitle}>Kasir Eceran</Text>
          <Text style={styles.legendAmount}>{formatRupiah(posAmount)} ({posRatio}%)</Text>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: '#EA580C' }]} />
          <Text style={styles.legendTitle}>Setoran Kantin</Text>
          <Text style={styles.legendAmount}>{formatRupiah(consignmentAmount)} ({csnRatio}%)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  donutWrap: {
    width: 86,
    height: 86,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  centerTextWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  centerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#71717A',
  },
  legendWrap: {
    flex: 1,
  },
  cardHeaderTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginRight: 7,
  },
  legendTitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#52525B',
    flex: 1,
  },
  legendAmount: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#18181B',
  },
});
