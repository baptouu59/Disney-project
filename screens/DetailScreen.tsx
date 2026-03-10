
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type DetailRouteProp = RouteProp<RootStackParamList, 'Disneys'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { character } = route.params || {};

  const goBack = () => navigation.goBack();

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Personnage introuvable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Bouton retour */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        {/* IMAGE RONDE */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: character.imageUrl }} style={styles.image} />
        </View>

        {/* NOM */}
        <Text style={styles.name}>{character.name}</Text>

        {/* DESCRIPTION GLOBALE */}
        <Text style={styles.description}>
          Voici les différentes apparitions de {character.name} dans les films,
          séries, jeux vidéo et attractions. Explore son univers à travers les
          œuvres où il ou elle apparaît.
        </Text>

        {/* SECTIONS MODERNES */}
        {Array.isArray(character.films) && character.films.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎬 Films</Text>
            <Text style={styles.sectionContent}>
              {character.films.join(', ')}
            </Text>
          </View>
        )}

        {Array.isArray(character.tvShows) && character.tvShows.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📺 Séries</Text>
            <Text style={styles.sectionContent}>
              {character.tvShows.join(', ')}
            </Text>
          </View>
        )}

        {Array.isArray(character.videoGames) &&
          character.videoGames.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎮 Jeux vidéo</Text>
              <Text style={styles.sectionContent}>
                {character.videoGames.join(', ')}
              </Text>
            </View>
          )}

        {Array.isArray(character.parkAttractions) &&
          character.parkAttractions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎢 Attractions</Text>
              <Text style={styles.sectionContent}>
                {character.parkAttractions.join(', ')}
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#F9F9F9',
    fontSize: 16,
    fontWeight: '600',
  },

  imageWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: '#1A1D29',
  },

  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 15,
  },

  description: {
    color: '#D0D6F9',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },

  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#F9F9F9',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#D0D6F9',
    fontSize: 15,
    lineHeight: 22,
  },

  error: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});
