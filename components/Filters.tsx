// components/Filters.tsx
import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  search: string;
  year: string;
  onSearchChange: (v: string) => void;
  onYearChange: (v: '2020+' | '2010-2019' | 'avant-2010' | '') => void;
};

export default function Filters({ search, year, onSearchChange, onYearChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Rechercher un personnage"
        placeholderTextColor="#8F98C2"
        style={styles.input}
        value={search}
        onChangeText={onSearchChange}
      />

      <View style={styles.chipsRow}>
        {['', '2020+', '2010-2019', 'avant-2010'].map((value) => (
          <TouchableOpacity
            key={value || 'all'}
            style={[styles.chip, year === value && styles.chipActive]}
            onPress={() => onYearChange(value as any)}
          >
            <Text style={styles.chipText}>
              {value === '' ? 'Tous' : value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1B2141',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F9F9F9',
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1B2141',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#00AEEF',
  },
  chipText: {
    color: '#F9F9F9',
    fontSize: 12,
  },
});
