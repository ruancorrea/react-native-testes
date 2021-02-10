import React , { useState } from 'react';
import { Container, Title } from '../../../style';

import Video from 'react-native-video';

export default function VideoPlay() {
    //como utilizar o route.params no ts
    return(
        <Container>
            <Title>Video</Title>
            <Video
                controls
                paused
                source={require('./Olhos_De_Isis.mp4')}
                style={{flex: 1}}
            />
        </Container>
    )
}