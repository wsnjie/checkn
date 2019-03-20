import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: "50%",
    height: '50%%'
};

const key = process.env.REACT_APP_GOOGLE_KEY

export class MapContainer extends Component {


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.props.user.lat,
                    lng: this.props.user.lon
                }}
            >
                {this.props.users.map((user, i) => {
                    return <Marker
                        key={i}
                        title={user.name}
                        name={user.name}
                        position={{ lat: user.lat, lng: user.lon }}
                    />
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: key
})(MapContainer);