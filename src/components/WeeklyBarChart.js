import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { formatRupiah } from '../utils/formatters';
import AssetVisual from './AssetVisual';

/**
 * WeeklyBarChart — Grafik Batang Interaktif 7 Hari
 * Pengguna dapat menyentuh hari tertentu untuk melihat nominal penjualan hari tersebut.
 */
export const WeeklyBarChart = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  const [selectedIdx, setSelectedIdx] = useState(data.length - 1);
  const selectedItem = data[selectedIdx] || data[data.length - 1];

  const maxAmount = Math.max(...data.map((d) => d.amount), 450000);
  const avgAmount = Math.round(
    data.reduce((sum, d) => sum + d.amount, 0) / Math.max(1, data.length)
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <AssetVisual name="chart_up" size={26} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.chartTitle}>Tren Omzet 7 Hari</Text>
            <Text style={styles.chartLegend}>Rata-rata {formatRupiah(avgAmount)} / hari</Text>
          </View>
        </View>

        <View style={styles.activeCallout}>
          <Text style={styles.activeDayText}>Hari {selectedItem.day}</Text>
          <Text style={styles.activeAmountText}>{formatRupiah(selectedItem.amount)}</Text>
        </View>
      </View>

      {/* Bar Interaktif */}
      <View style={styles.barsRow}>
        {data.map((item, idx) => {
          const isSelected = idx === selectedIdx;
          const heightRatio = Math.max(0.18, item.amount / maxAmount);
          const barHeight = Math.round(heightRatio * 96);

          return (
            <TouchableOpacity
              key={idx}
              style={styles.barColumn}
              activeOpacity={0.75}
              onPress={() => setSelectedIdx(idx)}
            >
              <Text style={[styles.barTopLabel, isSelected && styles.barTopLabelActive]}>
                {Math.round(item.amount / 1000)}rb
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: barHeight,
                      backgroundColor: isSelected ? '#EA580C' : '#FED7AA',
                      borderColor: isSelected ? '#9A3412' : '#FDBA74',
                    },
                  ]}
                />
              </View>
              <View style={[styles.dayChip, isSelected && styles.dayChipActive]}>
                <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                  {item.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 4,
    borderBottomColor: '#FDBA74',
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  chartLegend: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 1,
  },
  activeCallout: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  activeDayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9A3412',
  },
  activeAmountText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#EA580C',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 6,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barTopLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#A1A1AA',
    marginBottom: 4,
  },
  barTopLabelActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  barTrack: {
    height: 98,
    width: 24,
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  dayChip: {
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dayChipActive: {
    backgroundColor: '#EA580C',
  },
  dayText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#52525B',
  },
  dayTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
