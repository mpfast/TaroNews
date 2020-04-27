const cloud = require('wx-server-sdk')
const superagent = require('superagent')
const cheerio = require('cheerio')

cloud.init()

async function getNews(url) {
  let news = []
  const { text } = await superagent.get(url)
  const $ = cheerio.load(text)

  $('li span.s2').each((index, item) => {
    news.push({
      image: $('li .img-box img')[index].attribs.src,
      href: $('li .txt-box h3 a')[index].attribs.href,
      title: cheerio($('li .txt-box h3 a')[index]).text(),
      subtitle: cheerio($('li .txt-box .txt-info')[index]).text(),
      author: cheerio($('li .txt-box .account')[index]).text(),
      time: $('li .txt-box .s2')[index].attribs.t,
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
    const list = await getNews(
      'https://weixin.sogou.com/pcindex/pc/pc_3/2.html'
    )
    console.log(list)
  })()
}
