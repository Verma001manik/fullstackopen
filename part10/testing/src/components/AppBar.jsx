import { View, StyleSheet , Pressable, ScrollView} from 'react-native';
import Constants from 'expo-constants';
// import theme from './theme';
import Text from './Text';
import { Link } from "react-router-native";
import theme from './theme';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    padding: 26

    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal st>
    <View>
    <Pressable>
      <Link to='/'>
      <Text color="textSecondary" fontSize={theme.fontSizes.subheading} fontWeight='bold' >Repositories</Text>
      </Link>
            
            
        </Pressable>
    </View>
    <View>
    <Pressable>
      <Link to='/signin'>
      <Text color="textSecondary" fontSize={theme.fontSizes.subheading} fontWeight='bold' >Sign in </Text>

      </Link>
            
            
        </Pressable>
    </View>
        
    </ScrollView>
    
    {/* ... */}</View>;
};

export default AppBar;