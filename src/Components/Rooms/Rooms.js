import React from 'react';
import "./Rooms.css";
import roomData from '../FakeData/RoomData';
import Room from '../Room/Room';
import Map from '../Map/Map';

const Rooms = () => {
    return (
        <div className="Rooms">
            <div className="rooms">
                <p>252 stays apr 13-17 3 guests</p>
                <h2>Stay in this place</h2>
                {
                    roomData.map(room => <Room key={room.id} room={room}></Room>)
                }
            </div>
            <div className="map">
                <h1>Google Map</h1>
                <Map></Map>
            </div>
        </div>
    );
};

export default Rooms;