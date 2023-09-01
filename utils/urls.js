const { sortDownDate } = require('./sort')

module.exports = (locals, count, date) => {
  date = date == 'created' ? 'date' : 'updated'

  let posts = [].concat(locals.posts.toArray())
  let urls = posts.map((post) => {
    return {
      date: post[date].format('yyyy-MM-DD HH:mm:ss'),
      permalink: post.permalink
    }
  })
  // Desc sort by date
  let sort_urls = sortDownDate(urls, 'date')
  return sort_urls
    .slice(0, count || undefined)
    .map((post) => post.permalink)
    .join('\n')
}
