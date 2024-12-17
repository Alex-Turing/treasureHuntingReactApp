{/*StAuth10244: 
I Alexander Hernandez, 000896328 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.*/}
import React, { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TriviaComponent from './TriviaComponent';
import {trivia} from './triviaData.js';

const BarCodeComponent = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [counter, setCounter] = useState(0);
  const [triviaData, setTriviaData] = useState<any>(null);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => 
  {
    setScanned(true);

    const triviaObject = trivia.find((item: { [x: string]: any; }) => item[data.toString().trim()]);

    if(triviaObject)
    {
      const triviakey = Object.keys(triviaObject)[0];
      const expectedKey = `treasureHunter${counter + 1}`;

      if(triviakey === expectedKey )
      {
        const {markerColor, name, question, multipleChoices, correctAnswer} = triviaObject[triviakey];
        setTriviaData({markerColor, name, question, choices: multipleChoices, correctAnswer});
      }
      else 
      {
        Alert.alert('Incorrect Clue', `This is not the expected clue. Please find ${expectedKey} next.`);
      }
    }
    else 
    {
      Alert.alert('Invalid Barcode!', `The scanned clue (${data}) is not part of this treasure hunt.`);
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {triviaData ? (
        <TriviaComponent
          markerColor={triviaData.markerColor}
          name={triviaData.name}
          question={triviaData.question}
          choices={triviaData.choices}
          correctAnswer={triviaData.correctAnswer}
          onAnswer={(isCorrect: boolean) => {
            setTriviaData(null);
            if(isCorrect)
            {
              setCounter((prevCounter) => prevCounter + 1);
            }
            setTriviaData(null);
            setScanned(false);
          }}
        />
      ) : (
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], 
        }}
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.text}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    maxHeight: 45,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#720e9e',
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BarCodeComponent;