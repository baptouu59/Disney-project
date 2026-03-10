// screens/ListScreen.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../components/Card';
import HeroBanner from '../components/HeroBanner';
import Filters from '../components/Filters';
import { DisneyCharacter, fetchDisneyCharacters } from '../services/api';

type RootStackParamList = {
  Home: undefined;
  Disneys: { character: DisneyCharacter };
};

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ListScreen() {
  const navigation = useNavigation<NavProp>();

  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDisneyCharacters();
        setCharacters(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  const handleCardPress = (character: DisneyCharacter) => {
    navigation.navigate('Disneys', { character });
  };

  const scrollToMovies = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 700, animated: true });
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#00AEEF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView ref={scrollViewRef}>
        <HeroBanner onSeeCharacters={scrollToMovies} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catalogue Disney</Text>

          <Filters
            search={search}
            year={yearFilter}
            onSearchChange={setSearch}
            onYearChange={setYearFilter}
          />

          {/* GRILLE 6 PAR LIGNE */}
          <FlatList
            data={filtered}
            numColumns={6} // <<< 6 PAR LIGNE
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Card character={item} onPress={() => handleCardPress(item)} />
            )}
            scrollEnabled={false} // important pour ScrollView parent
            contentContainerStyle={styles.grid}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040714',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040714',
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9F9F9',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 60,
  },
});
