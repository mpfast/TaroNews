import Taro, { Component } from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'

import './me.scss'

export default class Home extends Component {
  goToAbout() {
    Taro.navigateTo({
      url: '/pages/about/index'
    })
  }
  render() {
    return (
      <View className="me">
        <View className="header"></View>
        <View className="profile">
          <View className="at-row at-row__align--center">
            <View className="at-col at-col-3 at-col--auto">
              <AtAvatar circle openData={{ type: 'userAvatarUrl' }}></AtAvatar>
            </View>
            <View className="at-col">
              <OpenData type="userNickName" />
            </View>
          </View>
        </View>
        <AtList>
          <AtListItem
            title="关于本小程序"
            arrow="right"
            onClick={this.goToAbout}
            iconInfo={{ size: 25, color: '#8b2708;', value: 'alert-circle' }}
          />
        </AtList>
      </View>
    )
  }
}
