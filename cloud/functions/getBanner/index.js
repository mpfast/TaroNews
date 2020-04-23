const cloud = require('wx-server-sdk')
const superagent = require('superagent')
const cheerio = require('cheerio')

cloud.init()

async function getBanner(url) {
  let banners = []
  const { text } = await superagent.get(url)
  const $ = cheerio.load(text)

  $('.sd-slider-item').each((index, item) => {
    banners.push({
      href: item.attribs.href,
      image: $('.sd-slider img')[index].attribs.src,
    })
  })
  return banners
}

exports.main = async () => {
  return await getBanner('https://weixin.sogou.com')
}

if (!Object.keys(cloud.getWXContext()).length) {
  // 如果不是在微信环境运行的话
  ;(async () => {
    const list = await getBanner('https://weixin.sogou.com')
    console.log(list)
  })()
}
