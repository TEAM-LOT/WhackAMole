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

    this.mole = null;           //もぐら本体
    this.actionTimeout = null;  //アニメーション用
    this.isPopping = false;     //飛び出る
    this.isFeisty = false;      //気力
    this.isHealing = false;     //回復もぐら
    this.isWhacked = false;     //叩かれた
    this.isAttacking = false;   //攻撃した
  }

  /**
    * 飛び出る
    * @return void
   */
  pop = () => {
    this.isWhacked = false;
    this.isPopping = true;
    this.isAttacking = false;

    //40%：攻撃あり、57%：表示だけ、3%：回復もぐら
    this.isFeisty = Math.random() < 0.6;
    if (!this.isFeisty) {
      this.isHealing = Math.random() < 0.05;
    }

    if (this.isHealing) {
      this.mole.play({  //playはSpriteSheetのアニメ関数
        type: "heal",   //回復もぐら
        fps: 24,
        onFinish: () => {
          this.actionTimeout = setTimeout(() => {
            this.mole.play({
              type: "hide",
              fps: 24,
              onFinish: () => {
                this.isPopping = false;
                this.props.onFinishPopping(this.props.index);
              }
            })
          }, 1000);
        }
      })
    } else {
      this.mole.play({
        type: "appear",
        fps: 24,
        onFinish: () => {
          if(this.isFeisty) {   //もぐらの攻撃
            this.actionTimeout = setTimeout(() => {
              this.isAttacking = true;
              this.props.onDamage();
              this.mole.play({
                type: "attack",
                fps: 12,
                onFinish: () => {
                  this.mole.play({
                    type: "hide",
                    fps: 24,
                    onFinish: () => {
                      this.isPopping = false;
                      this.props.onFinishPopping(this.props.index);
                    }
                  })
                }
              })
            }, 1000);
          } else {
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
        }
      })
    }
  }

  /**
   * 叩く
   * @return void
   */
  whack = () => {
        console.log(`wack1 ${this.isPopping} ${this.isWhacked} ${this.isAttacking}`);

    if (!this.isPopping || this.isWhacked || this.isAttacking) {  //非表示 or 叩かれてる or 攻撃してきた 場合はreturn
      return;
    }

    console.log('wack2');

    //やっつけたので、以降のもぐらアニメーションは無効に
    if (this.actionTimeout) {
      clearTimeout(this.actionTimeout);
    }

    this.isWhacked = true;    //叩かれたフラグ、連続押し防止
    this.isFeisty = false;    //念のため

    this.props.onScore();
    if (this.isHealing) {
      this.props.onHeal();
    }

    this.mole.play({
      type: "dizzy",    //めまい
      fps: 24,
      onFinish: () => {
        this.mole.play({
          type: "faint",    //気絶、失神いう意味でフェイント(feint)ではない
          fps: 24,
          onFinish: () => {
            this.isPopping = false;
            this.props.onFinishPopping(this.props.index);
          }
        })
      }
    })
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