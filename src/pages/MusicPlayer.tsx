import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavProps } from '../components/Navigation/Stack/Routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTrackPlayerEvents, useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import TrackPlayer, {TrackPlayerEvents,STATE_PLAYING} from 'react-native-track-player';
import stylesPlayer from '../components/MusicPlayer/stylesPlayer';
import Slider from '@react-native-community/slider';
import { Stats } from '../components/Repository/styles';
import { View, Text, AppRegistry, Image, TouchableHighlight } from 'react-native';

import {name as appName} from '../../app.json';
AppRegistry.registerComponent(appName, () => MusicPlayer);
TrackPlayer.registerPlaybackService(() => require('../services/mscplayer'));
  
function MusicPlayer({route} : StackNavProps<"MusicPlayer">) { 
    const navigation = useNavigation();
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const {position, duration} = useTrackPlayerProgress(250);
    const [velocidade, setVelocidade] = useState(1); // TrackPlayer.setRate()
    const data = route.params.data
    const data_url = route.params.url

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
          url: data_url,
          type: 'default',
          title: data.nome,
          album: route.params.type,
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

    function truncator(numToTruncate: number , intDecimalPlaces: number) {
      var numPower = Math.pow(10, intDecimalPlaces); // "numPowerConverter" might be better
      return ~~(numToTruncate * numPower)/numPower;
    }
    
    return (
        <View style={stylesPlayer.mainContainer} accessible={true}>
          <TouchableHighlight
            onPress={() => {
              TrackPlayer.stop();
              navigation.goBack();
              }}
              style = {{marginLeft: '2%', width: 25, marginTop: '1%'}}
          >
            <Icon name="angle-double-left" size={38} color="#333" />   
          </TouchableHighlight>
        <View style={stylesPlayer.detailsContainer}>
          <Text style={stylesPlayer.songTitle}>{route.params.type}</Text>
        </View>
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
          <Text style={stylesPlayer.artist}>{truncator(velocidade,1)}x</Text>
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
          <Stats
          style={{marginLeft:'33%'}}>
            <TouchableHighlight
              onPress={() => { 
                if(velocidade > 0.5){
                  setVelocidade(velocidade-0.1)
                  TrackPlayer.setRate(velocidade)
                }
              }}
              style={{marginRight:'10%'}}
              disabled={!isTrackPlayerInit}
              color="#000000"
              >
                <Icon name="fast-backward" size={30} color="#333" />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={onButtonPressed}
              disabled={!isTrackPlayerInit}
              color = "#000000"
              >
                {isPlaying
                    ?
                      <Icon name="pause" size={30} color="#333" />
                      :
                      <Icon name="play" size={30} color="#333" />
                  }
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  if(velocidade <2){
                    setVelocidade(velocidade+0.1)
                    TrackPlayer.setRate(velocidade)
                  }
                }}
                style={{marginLeft:'10%'}}
                disabled={!isTrackPlayerInit}
                color="#000000"
                >
                <Icon name="fast-forward" size={30} color="#333" />
              </TouchableHighlight>
          </Stats>
        </View>
      </View>
    )
  }

export default MusicPlayer;