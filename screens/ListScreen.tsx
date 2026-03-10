import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../components/Card';
import { fetchDisneyCharacters, DisneyCharacter } from '../services/api';
import SearchBar from '../components/SearchBar';

type RootStackParamList = {
  Home: undefined;
  Disneys: { character: DisneyCharacter };
};

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ListScreen() {
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<ListScreenNavigationProp>();

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);

      const response = await fetchDisneyCharacters(page, search);

      if (page === 1) {
        setCharacters(response.data);
      } else {
        setCharacters((prev) => [...prev, ...response.data]);
      }

      setLoading(false);
    };

    loadCharacters();
  }, [page, search]);

  const handleSearch = (value: string) => {
    setPage(1);
    setCharacters([]);
    setSearch(value);
  };

  const handleCardPress = (character: DisneyCharacter) => {
    navigation.navigate('Disneys', { character });
  };

  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disney Characters</Text>

      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={characters}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Card character={item} onPress={() => handleCardPress(item)} />
        )}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" style={{ margin: 20 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
});