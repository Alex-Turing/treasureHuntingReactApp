{/*StAuth10244: 
I Alexander Hernandez, 000896328 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.*/}
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import TreasureMapComponent from './components/TreasureMapComponent';

export default function App() {
  const [mapActive, setMapActive] = useState(false);

  const handleActivateMap = () => {
    setMapActive(true);
  };

  const handleDeactivateMap = () => {
    setMapActive(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/gradient-background.jpeg')}
        style={styles.bgImage}
      >
        {mapActive ? (
          <TreasureMapComponent onDeactivateMap={handleDeactivateMap} />
        ) : (
          <View style={styles.glassmorphicContainer}>
            <Image
              source={require('/assets/mystery-quest-title.png')}
              style={styles.imageTitle}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.button} onPress={handleActivateMap}>
              <ImageBackground source={require('./assets/map.png')} style={styles.scanButton}/>
              <Text style={styles.buttonText}>View Map</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  glassmorphicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.2)', 
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  imageTitle: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'inherit',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center',   
  },
  buttonText: {
    color: '#720e9e',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
