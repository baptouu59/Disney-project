// components/Card.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DisneyCharacter } from '../types';

export default function Card({
  character,
  onPress,
}: {
  character: DisneyCharacter;
  onPress: () => void;
}) {
  return (
    <View style={styles.card}>
      {/* Image */}
      <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
        <Image source={{ uri: character.imageUrl }} style={styles.image} />
      </TouchableOpacity>

      {/* Nom */}
      <Text numberOfLines={1} style={styles.name}>
        {character.name}
      </Text>

      {/* Bouton Voir+ */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Voir +</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '15.5%', // 6 par ligne
    margin: '1%',
    alignItems: 'center',
  },

  imageWrapper: {
    width: '100%',
    aspectRatio: 0.7,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1A1D29',

    shadowColor: '#00AEEF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  name: {
    color: '#F9F9F9',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  button: {
    marginTop: 6,
    backgroundColor: '#00AEEF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  buttonText: {
    color: '#040714',
    fontWeight: '700',
    fontSize: 11,
  },
});
