import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../components/Card';
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
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation<ListScreenNavigationProp>();

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchDisneyCharacters(1);
      setCharacters(data);
      setLoading(false);
    };
    loadCharacters();
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});