import Taro, { Component, Config } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '关于本小程序'
  }
  onShareAppMessage() {
    return {
      title: '热门资讯',
      path: '/pages/index/index'
    }
  }
  render() {
    return (
      <View className="about">
        <View className="at-article">
          <View className="at-article__content">
            <View className="at-article__section">
              <AtDivider content="欢迎赞赏，请我喝杯咖啡" />
              <Image
                className="at-article__img"
                src="./donate.jpg"
                mode="widthFix"
                lazyLoad
                showMenuByLongpress
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
