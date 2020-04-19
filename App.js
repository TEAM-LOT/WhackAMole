/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
} from "react-native";
import Images from './assets/Images';
import Constants from './Constants'

import Mole from './Mole';

const DEFAULT_TIME = 5;
const DEFAULT_STATE = {
  level: 1,
  score: 0,
  time: DEFAULT_TIME,
  cleared: false,
  paused: false,
  gameover: false,
  health: 100
}

export default class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = DEFAULT_STATE;
    this.moles = [];
  }

  render() {
    let healthBarWidth = (Constants.MAX_WIDTH - Constants.XR * 100 - Constants.XR * 60 - Constants.XR * 6) * this.state.health / 100;
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} resizeMode="stretch" source={Images.background} />
        <View style={styles.topPanel}>
          <SafeAreaView >
            <View style={styles.statsContainer}>
              <View style={styles.stats}>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelTitle}>Level</Text>
                  <Text style={styles.levelNumber}>{this.state.level}</Text>
                </View>
              </View>
              <View style={styles.stats}>
                <View style={styles.timeBar}>
                  <Text style={styles.timeNumber}>{this.state.time}</Text>
                </View>
                <Image style={styles.timeIcon} resizeMode="stretch" source={Images.timeIcon} />
              </View>
              <View style={styles.stats}>
                <View style={styles.scoreBar} >
                  <Text style={styles.scoreNumber}>{this.state.score}</Text>
                </View>
                <Image style={styles.scoreIcon} resizeMode="stretch" source={Images.scoreIcon} />
              </View>
              <View style={styles.stats}>
                <TouchableWithoutFeedback onPress={this.pause}>
                  <View style={styles.pauseButton}>
                    <Image style={styles.pauseButtonIcon} resizeMode="stretch" source={Images.pauseIcon} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.healthBarContainer}>
              <View style={styles.healthBar}>
                <View style={[styles.healthBarInner, { width: healthBarWidth}]} />
              </View>
              <Image style={styles.healthIcon} resizeMode="stretch" source={Images.healthIcon} />
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.playArea}>
          {Array.apply(null, Array(4)).map((el, rowIdx) => {
            return (
              <View style={styles.playRow} key={rowIdx}>
                {Array.apply(null, Array(3)).map((el, colIdx) => {
                  let moleIdx = (rowIdx * 3) + colIdx;

                  return (
                    <View style={styles.playCell} key={colIdx}>
                      <Mole
                        index={moleIdx}
                        ref={(ref) => { this.moles[moleIdx] = ref }}
                      />
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </View> 
    )
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',   //縦並びに
  },
  backgroundImage: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    position: 'absolute'
  },
  topPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Constants.YR * 250,
    flexDirection: 'column'
  },
  statsContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.YR * 120,
    flexDirection: 'row'
  },
  stats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelContainer: {
    width: Constants.YR * 80,
    height: Constants.YR * 80,
    backgroundColor: '#ff1a1a',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  levelTitle: {
    fontSize: Constants.YR * 25,
    color: 'white',
    fontFamily: Constants.FONT_LITITAONE_REGULAR
  },
  levelNumber: {
    fontSize: Constants.YR * 21,
    color: 'white',
    fontFamily: Constants.FONT_LITITAONE_REGULAR
  },
  timeIcon: {
    position: 'absolute',
    left: 0,
    width: Constants.YR * 40,
    height: Constants.YR * 40
  },
  timeBar: {
    height: Constants.YR * 25,
    position: 'absolute',
    left: 20,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeNumber: {
    fontSize: Constants.YR * 22,
    color: 'black',
    fontFamily: Constants.FONT_LITITAONE_REGULAR
  },
  scoreIcon: {
    position: 'absolute',
    left: 0,
    width: Constants.YR * 40,
    height: Constants.YR * 40
  },
  scoreBar: {
    height: Constants.YR * 25,
    position: 'absolute',
    left: 20,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreNumber: {
    fontSize: Constants.YR * 21,
    color: 'black',
    fontFamily: Constants.FONT_LITITAONE_REGULAR
  },
  pauseButton: {
    width: Constants.YR * 50,
    height: Constants.YR * 50,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pauseButtonIcon: {
    width: Constants.YR * 25,
    height: Constants.YR * 25
  },
  healthBarContainer: {
    height: Constants.YR * 40,
    width: Constants.MAX_WIDTH - Constants.XR * 120,
    marginLeft: Constants.XR * 60,
  },
  healthIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Constants.YR * 40,
    height: Constants.YR * 40
  },
  healthBar: {
    height: Constants.YR * 20,
    width: Constants.MAX_WIDTH - Constants.XR * 100 - Constants.XR * 60,
    marginLeft: Constants.XR * 40,
    marginTop: Constants.YR * 10,
    backgroundColor: 'white',
    borderRadius: Constants.YR * 10
  },
  healthBarInner: {
    position: 'absolute',
    backgroundColor: '#ff1a1a',
    left: Constants.XR * 3,
    top: Constants.XR * 3,
    bottom: Constants.YR * 3,
    borderRadius: Constants.YR * 8
  },
  playArea: {
    width: Constants.MAX_WIDTH,
    marginTop: Constants.YR * 250,
    height: Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112,
    flexDirection: 'column',
  },
  playRow: {
    height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
    width: Constants.MAX_WIDTH,
    flexDirection: 'row',
  },
  playCell: {
    width: Constants.MAX_WIDTH / 3,
    height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
    alignItems: 'center'
  }
})