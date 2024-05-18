import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList.jsx';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar.jsx';
import SignIn from './SignIn.jsx';
const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = ()=>{
    return(
        <View style={styles.container}>
            {/* <Text>Rate Repository App</Text> */}
            <AppBar />
            <Routes>
              <Route path='/' element={<RepositoryList />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='*' element={<Navigate to='/' replace />} />

            </Routes>
            {/* <RepositoryList /> */}

        </View>
    )
}
export default Main;
