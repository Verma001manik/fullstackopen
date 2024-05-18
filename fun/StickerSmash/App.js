import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

 import ImageViewer from './components/ImageViewer'; 
 import Button from './components/Button';
 import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton'
import EmojiList from './components/EmojiList';
import EmojiPicker from './components/EmojiPicker';
const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [selectedImage , setSelectedImage] = useState(null);
  const [showAppOptions , setShowAppOptions] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onReset = ()=>{
    setShowAppOptions(false);

  }
  const onAddsticker =()=>{
    setIsModalVisible(true);


  }
  const onSaveImageAsync  =()=>{

  }
  const onModalClose = ()=>{
    setIsModalVisible(false);

  }

  const pickImageaSync =  async ()=>{
    let result  = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, 
      quality: 1 , 

    });
    if (!result.canceled){
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);


    }else{
      console.log("You did not select any image")
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <EmojiPicker>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="reset" onPress={onReset} />
            <CircleButton onPress={onAddsticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync} />
          </View>



        </View>
      ): 
      <View style={styles.footerContainer}> 
      <Button theme="primary" label="Choose a photo"  onPress={pickImageaSync}/>
      <Button label="Use this photo" onPress={()=>setShowAppOptions(true)}/>

    </View>
      }
      
      
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

