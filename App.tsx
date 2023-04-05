import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,Alert, TouchableOpacity
} from 'react-native';
// import CameraScreen
import {CameraScreen} from 'react-native-camera-kit';
import jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import { launchImageLibrary } from 'react-native-image-picker';
import jsQR from 'jsqr';
const PNG = require('pngjs/browser').PNG;
import RNQRGenerator from 'rn-qr-generator';

const options :any= {
  title: 'photoUpload',
  takePhotoButtonTitle: 'photoTake',
  chooseFromLibraryButtonTitle: 'photoLibrary',
  cancelButtonTitle: 'cancel',
  quality: 0.7,
  base64: true,
  maxWidth: 728,
};
function App(): JSX.Element {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [qrdata, setQrdata] = useState('');
  const [barcodeValue, setBarcodeValue] = useState([""]);
const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue:any) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };
  const readQRFromGallery = () => {
  console.log("----called------")
  launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
    ({ didCancel, assets, errorCode }) => {
        if (didCancel || errorCode || !assets || assets.length === 0) {
         // Handle errors here, or separately
          return;
        }
        else {
          // Get the image and its base64 data into a buffer
        const image:any = assets[0];
        const base64Buffer = Buffer.from(image.base64!, 'base64');
        let pixelData;
        let imageBuffer;
        
        // Handle decoding based on different mimetypes
          if (image.type == 'image/jpeg'|| image.type == 'image/jpg') {
          console.log('if called')
          pixelData = jpeg.decode(base64Buffer, { useTArray: true }); // --> useTArray makes jpeg-js work on react-native without needing to nodeify it
            imageBuffer = pixelData.data;
            // console.log("imagebuffer-------",imageBuffer)
          } else if (image.type == 'image/png') {
           console.log("else called")
            pixelData = PNG.sync.read(base64Buffer);
            imageBuffer = pixelData.data;
            // console.log("imagebuffer---------",imageBuffer)
        } else {
          // you can alert the user here that the format is not supported
          Alert.alert("Format not supported")
          return;
        }
        console.log("after else---------")
        // Convert the buffer into a clamped array that jsqr uses
        const data = Uint8ClampedArray.from(imageBuffer);
        // Get the QR string from the image
          // console.log("data--------->",data)
        const code :any = jsQR(data, image.width, image.height);
          console.log('-----code------', code.data)
          setQrdata(code.data);
          // setQrdata(JSON.stringify(data))
          // console.log('------data------', qrdata)
        }
       

      }
    );
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
           
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            Alert.alert('CAMERA permission denied');
          }
        } catch (err:any) {
          Alert.alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };
 const onPick = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      }  else {
        RNQRGenerator.detect({uri: response.assets[0].uri})
          .then(res => {
            console.log('Detected value', res);
            if (res.values.length === 0) {
              console.log('Code not found');
            } else {
              console.log('value: ', res.values);
              setBarcodeValue(res.values)
            }
          })
          .catch(err => {
            console.log('Cannot detect', err);
          });
      }
    });
  };
  return (
      
       <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View style={{ flex: 1 }}>
          
          <CameraScreen 
            
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'white'}
            // Scanner Frame color
            onReadCode={(event:any) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Barcode and QR Code Scanner using Camera in React Native
            </Text>
          <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>
          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <TouchableHighlight onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {
                  qrvalue.includes('geo:') ?
                  'Open in Map' : 'Open Link'
                }
                  </Text>
            </TouchableHighlight>
          ) : null}
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Open QR Scanner
            </Text>
            </TouchableHighlight>
            
            <TouchableOpacity style={styles.buttonStyle} onPress={readQRFromGallery}>
              <Text style={styles.buttonTextStyle}>Scan QR from Gallary</Text>
            </TouchableOpacity>
            <Text>{qrdata}</Text>
             <TouchableOpacity style={styles.buttonStyle} onPress={onPick}>
              <Text style={styles.buttonTextStyle}>Scan barcode from Gallary</Text>
            </TouchableOpacity>
            <Text>{barcodeValue}</Text>

        </View>
      )}
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
    marginBottom:10
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});

export default App;
