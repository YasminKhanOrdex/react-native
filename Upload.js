import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const Upload = () => {
  const [images, setImages] = useState([]);
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        maxVideo: 11,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = value => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          width={IMAGE_WIDTH}
          source={{
            uri: item?.crop?.cropPath ?? item.path,
            //  item?.type === 'video'
            //    ? item?.thumbnail ?? ''
            //    : 'file://' + (item?.crop?.cropPath ?? item.path),
          }}
          style={styles.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>DEL</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={[
          styles.container,
          {
            paddingTop: 6,
          },
        ]}
        data={images}
        key={'#'}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}
        numColumns={2}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
          <Text style={styles.openText}>Choose Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const IMAGE_WIDTH = (width - 24) / 2;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  body: {flex: 1},
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
});

export default Upload;
