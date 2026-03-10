import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { fetchDisneyCharacters } from '../services/api';
import { DisneyCharacter } from '../types';

type RootStackParamList = {
  Home: undefined;
  Disneys: { character: DisneyCharacter };
};

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ListScreen() {
  const navigation = useNavigation<NavProp>();

  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation<ListScreenNavigationProp>();

  const filteredCharacters = useMemo(() => {
    if (!searchText.trim()) return characters;
    return characters.filter((char) =>
      char.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [characters, searchText]);

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchDisneyCharacters(1);
      setCharacters(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleLoadMore = async () => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = page + 1;
    const data = await fetchDisneyCharacters(nextPage);

    if (data.length > 0) {
      setCharacters((prev) => [...prev, ...data]);
      setPage(nextPage);
    }
    setIsFetchingMore(false);
  };

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
      <Text style={styles.title}>Disney Characters</Text>
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={characters}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <Card character={item} onPress={() => handleCardPress(item)} />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : null
        }
      />
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
