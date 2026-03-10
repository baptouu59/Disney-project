import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DisneyCharacter } from '../services/api';

type RootStackParamList = {
  Home: undefined;
  Disneys: { character: DisneyCharacter };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Disneys'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { character } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        {character.films && character.films.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Films:</Text>
            {character.films.map((film, index) => (
              <Text key={index} style={styles.item}>{film}</Text>
            ))}
          </View>
        )}
        {character.tvShows && character.tvShows.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TV Shows:</Text>
            {character.tvShows.map((show, index) => (
              <Text key={index} style={styles.item}>{show}</Text>
            ))}
          </View>
        )}
        {character.videoGames && character.videoGames.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Games:</Text>
            {character.videoGames.map((game, index) => (
              <Text key={index} style={styles.item}>{game}</Text>
            ))}
          </View>
        )}
        {character.parkAttractions && character.parkAttractions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Park Attractions:</Text>
            {character.parkAttractions.map((attraction, index) => (
              <Text key={index} style={styles.item}>{attraction}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});