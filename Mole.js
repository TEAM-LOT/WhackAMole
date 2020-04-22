import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';

export default class Mole extends Component {
  constructor(props) {
    super(props);

    this.mole = null;
  }

  pop = () => {
    this.isPopping = true;
    this.mole.play({
      type: "appear",
      fps: 24,
      onFinish: () => {
        this.actionTimeout = setTimeout(() => {
          this.mole.play({
            type: "hide",
            fps: 24,
            onFinish: () => {
              this.isPopping= false;
              this.props.onFinishPopping(this.props.index);
            }
          })
        }, 1000);
      }
    })
  }

  whack = () => {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SpriteSheet
          ref={ref => (this.mole = ref)}
          source={Images.sprites}
          columns={6}
          rows={8}
          width={100}
          animations={{
            idle: [0],
            appear: [1, 2, 3, 4],
            hide: [4, 3, 2, 1, 0],
            dizzy: [36, 37, 38],
            faint: [42, 43, 44, 0],
            attack: [11, 12, 13, 14, 15, 16],
            heal: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
          }}
        />
        <TouchableWithoutFeedback onPress={this.whack} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
} 