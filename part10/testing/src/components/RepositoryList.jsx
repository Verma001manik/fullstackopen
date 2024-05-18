import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem'; // Importing RepositoryItem component

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryList = () => {
  const [repositories, setRepositories] = useState(null); // Initialize with null
  const fetchRepositories = async () => {
    try {
      const response = await fetch('http://192.168.29.215:5000/api/repositories');
      // console.log("reponse: ", response);
      const json = await response.json();

      // console.log("RETURNED:::::", json);
      setRepositories(json);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />} // Render RepositoryItem component
      keyExtractor={item => item.id} // Assuming each item has an 'id' property
      ItemSeparatorComponent={() => <View style={styles.separator} />} // Add a separator
    />
  );
};

export default RepositoryList;
