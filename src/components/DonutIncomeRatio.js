import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { formatRupiah } from '../utils/formatters';

export const DonutIncomeRatio = ({ posAmount = 145000, consignmentAmount = 175000 }) => {
  const total = Math.max(1, posAmount + consignmentAmount);
  const posRatio = Math.round((posAmount / total) * 100);
  const csnRatio = 100 - posRatio;

  // SVG Donut calculation
  const size = 80;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const posStrokeDashoffset = circumference - (circumference * posRatio) / 100;

  return (
    <View style={styles.container}>
      <View style={styles.donutWrap}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle (Konsinyasi - Orange) */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EA580C"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Foreground circle (Kasir - Hijau) */}
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
          <Text style={styles.centerNumber}>{posRatio}%</Text>
          <Text style={styles.centerLabel}>Kasir</Text>
        </View>
      </View>

      <View style={styles.legendWrap}>
        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendTitle}>Kasir Langsung:</Text>
          <Text style={styles.legendAmount}>{formatRupiah(posAmount)} ({posRatio}%)</Text>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: '#EA580C' }]} />
          <Text style={styles.legendTitle}>Setoran Kantin:</Text>
          <Text style={styles.legendAmount}>{formatRupiah(consignmentAmount)} ({csnRatio}%)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  donutWrap: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  centerTextWrap: {
    position: 'absolute',
    alignItems: 'center'
  },
  centerNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B'
  },
  centerLabel: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#71717A'
  },
  legendWrap: {
    flex: 1
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  legendTitle: {
    fontSize: 11,
    color: '#71717A',
    marginRight: 4
  },
  legendAmount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#18181B'
  }
});
