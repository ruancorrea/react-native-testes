import React from 'react';
import { Button } from 'react-native';

import { Container, Title} from './style';
import { Routes } from './src/components/Navigation/Stack/Routes';
 
// <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawer}>

export default function App() {
  return (
    <Routes />
  )
}