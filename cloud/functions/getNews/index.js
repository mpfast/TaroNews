const cloud = require('wx-server-sdk')
const superagent = require('superagent')
const cheerio = require('cheerio')

cloud.init()

async function getNews(url) {
  let news = []
  const { text } = await superagent.get(url)
  const $ = cheerio.load(text)

  Array.from(Array(20).keys()).map((index, item) => {
    news.push({
      image: $('.img-box a img')[index].attribs['src'],
      href: $('.txt-box h3 a')[index].attribs['href'],
      title: $('.txt-box h3 a')[index].children[0].data,
      subtitle: $('.txt-box .txt-info')[index].children[0].data,
      author: $('.txt-box .account')[index].children[0].data,
      time: $('.txt-box .s2')[index].attribs['t'],
    })
  })
  return news
}

exports.main = async (event) => {
  const url = event.url || 'https://weixin.sogou.com'
  return await getNews(url)
}

if (!Object.keys(cloud.getWXContext()).length) {
  // 如果不是在微信环境运行的话
  ;(async () => {
    const list = await getNews('https://weixin.sogou.com')
    console.log(list)
  })()
}
