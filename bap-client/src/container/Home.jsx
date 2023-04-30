import { useEffect, useState } from 'react';
import { HeaderResponsive } from '../components/Header';
import { UsersTable } from '../components/Table';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { API_KEY } from '../config/config';

import { Center, Loader } from '@mantine/core';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { socket } from '../socket';

const Home = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: ['places']
    });
    const [, setMap] = useState(/** @type google.maps.Map */(null));
    const [center, setCenter] = useState();
    const [res, setResponse] = useState([]);

    const getDrivers = async () => {
        await navigator.geolocation.getCurrentPosition(
           async function (position)  {
                const { latitude, longitude } = position.coords;
                console.log(position.coords);
                setCenter({ lat: latitude, lng: longitude });
                try {
                    const response = await axios.post(
                      'https://beckn.muhesh.studio/bap/search',
                      {
                        lat: latitude,
                        lng: longitude
                      },
                    );
                    ;
                    if (response.status === 200) {
                      setCenter({ lat: response.data.response.lat, lng: response.data.response.lon });
                      setResponse(response.data);
                    } else {
                      notifications.show({
                        color: 'red',
                        title: 'Error while fetching data',
                        message: response.data.message
                      });
                    }
                  } catch (error) {
                    notifications.show({
                      color: 'red',
                      title: 'Error while fetching data',
                      message: error.response.data
                        && error.response.data.message ? error.response.data.message : error.message
                    });
                  }
            },
        );


    };
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server');
        });
        socket.on('disconnect', () => {
            console.log('disconnected from server');
        });
         
        getDrivers();

        socket.on('onSelect', (data) => {
            console.log(data);
            setResponse((results) => [...results, data.response]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('custom event');
        };

    }, []);

    if (!isLoaded || center === undefined) return <Center h='100vh'><Loader /></Center>;

    return (
        <div className="App">
            <HeaderResponsive />
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '50vh' }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                onLoad={(mp) => setMap(mp)}
            >
                <MarkerF
                    position={center} />
                {res.map((item) => <MarkerF icon='auto.svg'
                    position={{ lat: item.lat, lng: item.lng }} />)}


            </GoogleMap>

            <UsersTable location={center} data={res} />
        </div>
    );
}

export default Home;