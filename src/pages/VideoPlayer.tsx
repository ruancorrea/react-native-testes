import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Image, TouchableHighlight, Alert } from 'react-native';
import stylesPlayer from '../components/MusicPlayer/stylesPlayer';
import { StackNavProps } from '../components/Navigation/Stack/Routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoPlay({route, navigation} : StackNavProps<"VideoPlayer">) {
    const data = route.params.data;
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    function getLink(video: string) {
        const split = video.split("be/")
        return split[1];
    }

    return(
        <View>
            <TouchableHighlight
                onPress={() => {
                navigation.goBack();
                }}
                style = {{marginLeft: '2%', width: 25, marginTop: '1%'}}
          >
            <Icon name="angle-double-left" size={38} color="#333" />   
          </TouchableHighlight>
            <View style={stylesPlayer.detailsContainer}>
                <Text style={stylesPlayer.songTitle}>Video Libras</Text>
                <Text style={stylesPlayer.songTitle}>{data.nome}</Text>
                <Text style={stylesPlayer.artist}>{data.autor}</Text>
            </View>
            <View
                style= {{top: '50%'}}>
                <YoutubePlayer
                    height={300}
                    play={playing} 
                    videoId={getLink(data.video_libras)}
                    onChangeState={onStateChange}
                />
            </View>
        </View>
    )
}