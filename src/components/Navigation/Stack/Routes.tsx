import React , { useEffect } from 'react';
import { RouteProp, NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Button, StyleSheet } from 'react-native';
import { Container, Title } from '../../../../style'
import Icon from 'react-native-vector-icons/FontAwesome';

import Repository from '../../../pages/Repository';
import Geolocation from '../../../pages/Geolocalizacao';

interface RoutesProps {}

export type StackParams = {
    Home: undefined;
    GithubAPI: undefined;
    Geolocation: undefined;
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
              title="Github API"
              onPress= { () => navigation.navigate('GithubAPI')}
          />
  
          <Button
              title="Geolocation"
              onPress= { () => navigation.navigate('Geolocation')}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;