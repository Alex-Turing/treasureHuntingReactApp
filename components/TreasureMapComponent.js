{/*StAuth10244: 
I Alexander Hernandez, 000896328 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.*/}

// Documentation used: https://github.com/react-native-maps/react-native-maps

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BarCodeComponent from './BarCodeComponent';
import * as Location from 'expo-location';

import {clues} from './clues.js';

const TreasureMapComponent = ({ onDeactivateMap }: any) => {
  const [cameraActive, setCameraActive] = React.useState(false);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  

  useEffect(() => {
    // Fetch user's current location
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    fetchLocation();

    const markersArray = clues.map((clue) => ({
      coordinate: {
        latitude: parseFloat(clue.LATITUDE),
        longitude: parseFloat(clue.LONGITUDE),
      },
      title: clue.name,
      description: clue.description || '',
      pinColor: clue.color,
    }));
    setMarkers(markersArray);
  }, []);

  const initialRegion = {
    latitude: 43.24307,
    longitude: -79.82835,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const handleActivateCamera = () => {
    setCameraActive(true);
  };

  const handleDeactivateCamera = () => {
    setCameraActive(false);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            pinColor="blue"
          />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={ marker.coordinate }
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>
      {markers.length === 0 && <Text>No markers available yet!</Text>}
      {cameraActive ? (
        <BarCodeComponent style={styles.cameraContainer}/>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleActivateCamera}>
            <ImageBackground source={require('../assets/scan-button.png')} style={styles.scanButton}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDeactivateMap}>
            <ImageBackground source={require('../assets/home.png')} style={styles.scanButton}/>
          </TouchableOpacity>
        </View>
      )}

      {cameraActive && (
        <TouchableOpacity style={styles.button} onPress={handleDeactivateCamera}>
          <Text style={styles.buttonText}>Close Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    height: height * 0.65, 
    width: '100%',
  },
  cameraContainer: {
    height: height * 0.35, 
    maxWidth: '80%',
  },
  scanButton: {
    width: 50,
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'inherit',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TreasureMapComponent;