import React, { useState, useEffect } from 'react';
import MapView, {  LatLng, Polyline as MPolyline } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

const Map = () => {

    const GOOGLE_MAPS_API_KEY: string = 'AIzaSyAYNauIpdpsYQ9S_fBz1O_QWtR3bn_d_VI';

    const [coords, setCoords] = useState<LatLng[]>([]);

    const getDirections = async (startLoc: any, destinationLoc: any) => {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${GOOGLE_MAPS_API_KEY}`);
            let respJson = await resp.json();
            
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point: any) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            });

            setCoords(coords);

            return coords;
        } catch(error) {
            return error;
        }
    }

    useEffect(() => {
        getDirections("40.1884979, 29.061018", "41.0082, 28.9784");
    }, [null])

    return(
        <MapView
            initialRegion={{
                latitude:41.0082, 
                longitude:28.9784, 
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            style={{ flex: 1 }}>
            <MPolyline
                coordinates={coords}
                strokeWidth={3}
                strokeColor="red"/>
        </MapView>
    )

}

export default Map;