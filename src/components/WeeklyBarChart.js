import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { formatRupiah } from '../utils/formatters';

export const WeeklyBarChart = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  const maxAmount = Math.max(...data.map(d => d.amount), 500000);
  const chartHeight = 110;
  const barWidth = 24;
  const spacing = 18;
  const totalWidth = data.length * (barWidth + spacing);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.chartTitle}>Tren Penjualan 7 Hari</Text>
        <Text style={styles.chartLegend}>Rata-rata: Rp 330.000 / hari</Text>
      </View>

      <View style={styles.svgContainer}>
        <Svg width="100%" height={chartHeight + 28} viewBox={`0 0 ${totalWidth} ${chartHeight + 28}`}>
          {/* Baseline horizontal */}
          <Line x1="0" y1={chartHeight} x2={totalWidth} y2={chartHeight} stroke="#E4E4E7" strokeWidth="1" />

          {data.map((item, idx) => {
            const x = idx * (barWidth + spacing) + 4;
            const barH = Math.max(12, (item.amount / maxAmount) * (chartHeight - 16));
            const y = chartHeight - barH;
            const isToday = idx === data.length - 1;

            return (
              <React.Fragment key={idx}>
                {/* Bar */}
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx={6}
                  fill={isToday ? '#EA580C' : '#FED7AA'}
                />
                {/* Day Label */}
                <SvgText
                  x={x + barWidth / 2}
                  y={chartHeight + 18}
                  fontSize="10"
                  fontWeight={isToday ? '800' : '600'}
                  fill={isToday ? '#EA580C' : '#71717A'}
                  textAnchor="middle"
                >
                  {item.day}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 14,
    marginVertical: 12
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B'
  },
  chartLegend: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717A'
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
