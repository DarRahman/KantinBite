import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export const EmptyState = ({ title, message, iconType = 'canteen' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        {iconType === 'canteen' ? (
          <Svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.8">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Path d="M9 22V12h6v10" />
          </Svg>
        ) : (
          <Svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.8">
            <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </Svg>
        )}
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 4
  },
  messageText: {
    fontSize: 12,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 18
  }
});
