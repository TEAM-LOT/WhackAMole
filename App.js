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
  }

  render() {
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

            
          </SafeAreaView>
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
    fontSize: 21,
    color: 'white',
    fontFamily: Constants.FONT_LITITAONE_REGULAR
  },
  levelNumber: {
    fontSize: 17,
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
    fontSize: 17,
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
  }
})