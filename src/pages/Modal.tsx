import React, { useState, useEffect } from 'react';
import { Container, Title } from '../components/Repository/RepositoryStyle' //'./style';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from 'react-native';
import { StackNavProps, StackParams } from '../components/Navigation/Stack/Routes';
import infoTatuConteudos from '../components/MusicPlayer/infoTatuConteudos';

import {useTrackPlayerEvents, useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import TrackPlayer, {TrackPlayerEvents,STATE_PLAYING} from 'react-native-track-player';
import stylesPlayer from '../components/MusicPlayer/stylesPlayer';
import Slider from '@react-native-community/slider';

import {AppRegistry} from 'react-native';
import {name as appName} from '../../app.json';
AppRegistry.registerComponent(appName, () => ModalScreen);
TrackPlayer.registerPlaybackService(() => require('../services/mscplayer'));

function Modal({navigation, route} : StackNavProps<"Modal">){
    //console.log(route.params.data.nome)
    //console.log("natasha")

    return(
        <Container>
            <ModalScreen data ={route.params.data} />
        </Container>
    )
}

export function HomeScreenDois({ route } : StackNavProps<"Natasha">) {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Natasha</Text>
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Open Modal"
        />
      </View>
    );
  }
  
export function ModalScreen({ data } : {data: infoTatuConteudos}, {route} : StackNavProps<"MyModal">) {
    const navigation = useNavigation();
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const {position, duration} = useTrackPlayerProgress(250);
    const trackPlayerInit = async () => {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_JUMP_FORWARD, 
            TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          ],
        });
        await TrackPlayer.add({
          id: "1",
          url: data.audio_desc,
          type: 'default',
          title: data.nome,
          album: "tatu",
          artist: data.autor,
          artwork: data.imagem_conteudo[0].thumb,
        });
        return true;
    };
    // MDS SOU LOUCO
    useEffect(() => {

      const startPlayer = async () => {
         let isInit =  await trackPlayerInit();
         setIsTrackPlayerInit(isInit);
      }
      startPlayer();
    }, []);
    
    useEffect(() => {
      if (!isSeeking && position && duration) {
        setSliderValue(position / duration);
      }
    }, [position, duration]);
    
    const onButtonPressed = () => {
      if (!isPlaying) {
        TrackPlayer.play();
        setIsPlaying(true);
      } else {
        TrackPlayer.pause();
        setIsPlaying(false);
      }
    };
    const slidingStarted = () => {
      setIsSeeking(true);
    };
    const slidingCompleted = async (value) => {
      await TrackPlayer.seekTo(value * duration);
      setSliderValue(value);
      setIsSeeking(false);
    };

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
        setIsPlaying(true);
    } else {
        setIsPlaying(false);
    }
    });
    
    return (
        <View style={stylesPlayer.mainContainer}>
        <View style={stylesPlayer.imageContainer}>
          <Image
            source={{
              uri: data.imagem_conteudo[0].thumb,
            }}
            resizeMode="contain"
            style={stylesPlayer.albumImage}
          />
        </View>
        <View style={stylesPlayer.detailsContainer}>
          <Text style={stylesPlayer.songTitle}>{data.nome}</Text>
          <Text style={stylesPlayer.artist}>{data.autor}</Text>
        </View>
        <View style={stylesPlayer.controlsContainer}>
          <Slider
            style={stylesPlayer.progressBar}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            minimumTrackTintColor="#111000"
            maximumTrackTintColor="#000000"
            onSlidingStart={slidingStarted}
            onSlidingComplete={slidingCompleted}
            thumbTintColor="#000"
          />
          <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={onButtonPressed}
            style={stylesPlayer.playButton}
            disabled={!isTrackPlayerInit}
            color="#000000"
          />
            <Button onPress={() => {
                TrackPlayer.remove("1");
                navigation.goBack();
                }} title="Back" /> 
        </View>
      </View>
    )
  }
  
export default Modal;