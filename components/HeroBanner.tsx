// components/HeroBanner.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

type Props = {
  onSeeCharacters?: () => void;
};

export default function HeroBanner({ onSeeCharacters }: Props) {
  return (
    <ImageBackground
      source={require('../assets/téléchargement.gif')}

      style={styles.hero}
    >
      <View style={styles.overlay} />

      {/* Top Menu */}
      <View style={styles.topBar}>
        <Text style={styles.brand}>Disney+</Text>

        <View style={styles.menu}>
          <Text style={styles.menuItem}>Accueil</Text>
          <TouchableOpacity onPress={onSeeCharacters}>
            <Text style={[styles.menuItem, styles.menuItemActive]}>
              Catalogue
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue dans l’univers Disney</Text>
        <Text style={styles.subtitle}>
          Retrouve tes personnages préférés de films et séries.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onSeeCharacters}>
          <Text style={styles.buttonText}>Voir les personnages</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  hero: {
    height: 700,   // <<< GIF TRÈS GRAND, STYLE DISNEY+
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 7, 20, 0.45)',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9F9F9',
  },
  menu: {
    flexDirection: 'row',
    gap: 20,
  },
  menuItem: {
    color: '#F9F9F9',
    fontSize: 16,
  },
  menuItemActive: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 50, // un peu plus d’espace
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9F9F9',
    marginBottom: 10,
  },
  subtitle: {
    color: '#D0D6F9',
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#00AEEF',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#040714',
    fontWeight: '700',
    fontSize: 15,
  },
});
