import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FabButton extends Component {
    animation = new Animated.Value(0);

    toggleMenu = () =>{
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();

        this.open = !this.open;
    }

    render() {

        const cameraStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -70]
                    })
                }
            ]
        }

        const likeStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -130]
                    })
                }
            ]
        }

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        }

        return (
            <View style = {[styles.container, styles.tamanho]}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.submenu, likeStyle]}>
                        <Icon name="heart" size={20} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.submenu, cameraStyle]}>
                        <Icon name="camera" size={20} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <Icon name="plus" size={24} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tamanho: {
        bottom: 80,
        right: 60,
    },
    container: {
        alignItems: 'center',
        position: 'absolute'
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
            width: 0
        }
    },
    menu: {
        backgroundColor: '#00213B'
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#00213B',
    }
})