import React , { useEffect } from 'react';
import { RouteProp, NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Button, StyleSheet } from 'react-native';
import { Container, Title } from '../../../../style'
import Icon from 'react-native-vector-icons/FontAwesome';

import Repository from '../../../pages/Repository';
import Geolocation from '../../../pages/Geolocalizacao';
import AtracoesTatu from '../../../pages/AtracoesTatu';
import ConteudosTatu from '../../../pages/ConteudosTatu';
import MusicPlayer from '../../../pages/MusicPlayer';

import infoTatuConteudos from '../../MusicPlayer/infoTatuConteudos';

interface RoutesProps { }

export type StackParams = {
    Home: undefined;
    GithubAPI: undefined;
    Geolocation: undefined;
    AtracoesTatu: undefined;
    ConteudosTatu: {
        idAtracao: number,
    };
    MusicPlayer: {
        data: infoTatuConteudos,
    };
};

export type StackNavProps<T extends keyof StackParams> = {
    navigation: StackNavigationProp<StackParams, T>;
    route: RouteProp<StackParams, T>;
}

const Stack = createStackNavigator<StackParams>();
const Drawer = createDrawerNavigator<StackParams>();
 
export const HomeScreen = ({navigation, route} : StackNavProps<"Home">) => {
    return (
      <Container>
          <Button
            //accessibilityRole = "button" 
            accessibilityTraits = "button"
            accessibilityLabel="Github API"
            title="Github API"
            onPress= { () => navigation.navigate('GithubAPI')}
          /> 
  
          <Button
            //accessibilityRole = "button"
            accessibilityTraits = "button"
            accessibilityLabel="Geolocation"
            title="Geolocation"
            onPress= { () => navigation.navigate('Geolocation')}
          />

        <Button
            //accessibilityRole = "button"
            accessibilityTraits = "button"
            accessibilityLabel="Atrações Tatu"
            title="Atrações Tatu"
            onPress= { () => navigation.navigate('AtracoesTatu')}
          />

      </Container>
  )
}

const AppDrawer = () =>{
    return(
        <Drawer.Navigator>  
            <Drawer.Screen name="Home" component = {HomeScreen} />
            <Drawer.Screen name="GithubAPI" component ={Repository} />
            <Drawer.Screen name="Geolocation" component = {Geolocation} />
            <Drawer.Screen name="AtracoesTatu" component = {AtracoesTatu} />
            <Drawer.Screen name="ConteudosTatu" component = {ConteudosTatu} />
        </Drawer.Navigator>
    )
}

export const Routes = ({} : RoutesProps) => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={({ navigation, route}) =>({
                headerLeft: () =>{
                    return (
                        <Icon
                            accessible={true}
                            accessibilityLabel="Botão do menu lateral"
                            accessibilityHint="Ao clicar abrirá o menu lateral."
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            name="bars"
                            size={25} 
                            style={{marginLeft: 20}}
                        />
                    )
                }
            })}
            >  
                <Stack.Screen name="Home" component={AppDrawer} />
                <Stack.Screen name="MusicPlayer" component = {MusicPlayer} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;