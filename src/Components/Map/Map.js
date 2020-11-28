import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const Map = () => {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            <Marker
                position={{ lat: -34.397, lng: 150.644 }}
            />
        </GoogleMap>
    ));
    return (
        <div>
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiFIVm5dLav5erLKPKSeybZIRiuyCOcys&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};

export default Map;