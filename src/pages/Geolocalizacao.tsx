import React , { useState, useEffect } from 'react';
import { Container, Title } from '../../style'
import Local from '@react-native-community/geolocation';
import Tts from 'react-native-tts';

interface IDistanceProps {
    distance: number;
    distance_unit: string;
}

interface IAttractionLocationProps {
    latitude: number;
    longitude: number;
    distance_untreated: number;
    distance: number;
    distance_unit: string;
}

interface IUserLocationProps {
    latitude: number;
    longitude: number;
}

function computeDistanceBtwTwoPoints(attraction: IAttractionLocationProps, myLocation: IUserLocationProps) {
    let R = 6371e3; // metros
    let a1 = myLocation.latitude * 0.01745;
    let a2 = attraction.latitude * 0.01745;
    let dt = (attraction.latitude - myLocation.latitude) * 0.01745;
    let dk = (attraction.longitude - myLocation.longitude) * 0.01745;

    let a =
        Math.sin(dt / 2) * Math.sin(dt / 2) +
        Math.cos(a1) * Math.cos(a2) * Math.sin(dk / 2) * Math.sin(dk / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    attraction.distance_untreated = R * c;

    //Converting to kilometers
    if (attraction.distance_untreated > 1000) {
        attraction.distance = attraction.distance_untreated / 1000;
        attraction.distance = parseFloat(attraction.distance.toFixed(1));
        attraction.distance_unit = "km";
    } else {
        attraction.distance = parseFloat(
        attraction.distance_untreated.toFixed(0)
        );
        attraction.distance_unit = "m";
    }

    return attraction;
}

const Geolocation = () => { 
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const theobrandao: IAttractionLocationProps = {
        latitude: -9.669292,
        longitude: -35.732594,
        distance_untreated: 0,
        distance: 0,
        distance_unit: ''
    } 
    
    const [userDistance, setUserDistance] = useState<IDistanceProps>({ distance: 0, distance_unit: '' })

    function sayDistance() {
        type tUnities = {
            [key: string]: string;
        };

        const unities: tUnities = {
            km: 'quilômetros',
            m: 'metros'
        };

        const unity = unities[userDistance.distance_unit];
        Tts.setDefaultLanguage('pt-BR');
        Tts.speak(`Museu Theo Brandão à ${userDistance.distance} ${unity}`);
    }

    useEffect(() =>{
        Local.getCurrentPosition(
            (position) =>{
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                
                const attraction = computeDistanceBtwTwoPoints(theobrandao, userLocation);
                const distance = {
                    distance: attraction.distance,
                    distance_unit: attraction.distance_unit
                };
                setUserDistance(distance);    
            },
            (error) =>{
                console.log("ERROR! " + error.message) // só pra testar
            },
            { // options
                enableHighAccuracy: true,
                timeout: 100000,
                maximumAge: 1000
            }
        )       
    }, [])

    useEffect(() => {
        if (userDistance.distance_unit) {
           sayDistance();
       }
    }, [userDistance.distance]);

    return (
        <Container>
            {
                userDistance.distance_unit
                ?
               <Title accessible>
                   Você está a {userDistance.distance}{userDistance.distance_unit} de distância do Museu Theo Brandão.
               </Title>
               :
               <Title accessible>Carregando...</Title>
            }
            <Title>Latitude: {latitude}</Title>
            <Title>Longitude: {longitude}</Title>
        </Container>
    )
}

export default Geolocation;