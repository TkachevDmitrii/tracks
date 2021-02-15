import React, { useState, useEffect } from 'react';
import { Image, Platform, View, TouchableOpacity, StyleSheet, Touchable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Spacer from './Spacer';
import { AsyncStorage } from 'react-native';


const ImageP = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState();

  AsyncStorage.getItem('uri').then((value) => {
    setData(JSON.parse(value));
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    AsyncStorage.setItem('uri', JSON.stringify(result.uri))

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }; 
  
  return (
    <View style={styles.img}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: data }} style={{ width: 450, height: 300, marginTop: -30 }} />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  img: { 
    alignSelf: 'center'
  }
});

export default ImageP;