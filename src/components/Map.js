import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const Map = () => {
    let points = [];
    for (let i = 0; i < 20; i++ ) {
        points.push({
            latitude: 55.1598408 + i * 0.001,
            longitude: 61.4025547 + i * 0.001
        });
    }

    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 55.1598408,
                longitude: 61.4025547,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            }}
        >
            <Polyline coordinates={points}/>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;