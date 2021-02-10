import React from 'react';
import { View, Text } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

export default function CustomDrawer({...props}) {
    return(
        <DrawerContentScrollView {...props}>
            <Text>Olá mundo!</Text>
                <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}