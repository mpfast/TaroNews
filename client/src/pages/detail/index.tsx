import Taro, { Component, Config } from '@tarojs/taro'
import { WebView } from '@tarojs/components'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '资讯详情'
  }
  state = {
    href: ''
  }

  onShareAppMessage() {
    const href = encodeURIComponent(this.$router.params.href)
    return {
      title: '热门资讯',
      path: '/pages/detail/index?href=' + href
    }
  }

  componentWillMount() {
    const href = decodeURIComponent(this.$router.params.href)
    this.setState({
      href: href.replace('http://mp.weixin.qq.com', 'https://mpfast.cn/mp')
    })
  }
  render() {
    return <WebView src={this.state.href} />
  }
}
