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

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ListScreen() {
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<ListScreenNavigationProp>();

  const filteredCharacters = useMemo(() => {
    if (!searchText.trim()) return characters;
    return characters.filter((char) =>
      char.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [characters, searchText]);

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchDisneyCharacters();
      setCharacters(data);
      setLoading(false);
    };
    loadCharacters();
  }, []);

  const handleCardPress = (character: DisneyCharacter) => {
    navigation.navigate('Disneys', { character });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disney Characters</Text>
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Card character={item} onPress={() => handleCardPress(item)} />
        )}
        ListEmptyComponent={
          searchText.trim() ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucun personnage trouvé</Text>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});