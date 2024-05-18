import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 5,
    flexShrink: 1, // Allow text to shrink if needed
  },
  languageContainer: {
    borderRadius: 10,
    backgroundColor: '#4e86e4',
    alignSelf: 'flex-start', // Align to start (left) of the parent container
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
    marginBottom: 12,
    marginRight: 10, // Add margin to the right side
  },
  languageText: {
    fontStyle: 'italic',
    color: '#fff',
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Ratings: {item.ratingAverage}</Text>
    </View>
  </View>
);

export default RepositoryItem;
