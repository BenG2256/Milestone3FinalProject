import React, { useState, useEffect } from 'react';
import L from 'leaflet';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const buildMap = async () => {
            const coordinates = await getCoords();
            const leafletMap = L.map('map', {
                center: coordinates,
                zoom: 13,
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: '8',
            }).addTo(leafletMap);
            setMap(leafletMap);
            const marker = L.marker(coordinates);
            marker.addTo(leafletMap).bindPopup('<p1><b>Hello, You are right here!</b><br></p1>').openPopup();
        };
        buildMap();
    }, []);

    useEffect(() => {
        if (map && userLocation) {
            map.setView(userLocation, map.getZoom());
            const marker = L.marker(userLocation);
            marker.addTo(map).bindPopup('<p1><b>Your current location!</b><br></p1>').openPopup();
        }
    }, [map, userLocation]);

    const addMarkers = async () => {
        const business = document.getElementById('business').value;
        const data = await getFoursquare(business);
        const businesses = processBusinesses(data);
        businesses.forEach(business => {
            const marker = L.marker([business.lat, business.long]).bindPopup(`<p1>${business.name}</p1>`).addTo(map);
        });
    };

    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const coordinates = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coordinates);
        return coordinates;
    };

    const getFoursquare = async (business) => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq39nJkgK5siDaOrBajgtDkHuABZwU9Z2u2y5FfidMDeEQ='
            }
        };
        const coordinates = await getCoords();
        const lat = coordinates[0];
        const lon = coordinates[1];
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${lat}%2C${lon}`, options);
        const data = await response.json();
        const businesses = data.results;
        return businesses;
    };

    const processBusinesses = (data) => {
        const businesses = data.map((element) => {
            const location = {
                name: element.name,
                lat: element.geocodes.main.latitude,
                long: element.geocodes.main.longitude
            };
            return location;
        });
        return businesses;
    };

    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
            <form onSubmit={addMarkers}>
                <input type="text" id="business" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MapComponent;
