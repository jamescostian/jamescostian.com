// TODO: don't just assume this is the homepage, account for the fact that the user might be visiting #blog/something
// And don't forget to window.addEventListener('hashchange', () => {}, false)
window.fetch('blog/manifest.json')
  .then(res => res.json())
  .then(manifest => {
    const articleEls = manifest.map(meta => {
      const articleEl = document.createElement('article')
      const heading = document.createElement('h4')
      heading.textContent = meta.title
      articleEl.appendChild(heading)
      const previewParagraphs = meta.preview.split('\n').map(p => {
        const pEl = document.createElement('p')
        pEl.textContent = p
        return pEl
      })
      for (let paragraph of previewParagraphs) {
        articleEl.appendChild(paragraph)
      }
      const readMore = document.createElement('a')
      readMore.textContent = 'Read more'
      readMore.className = 'read-more'
      readMore.href = '#blog/' + encodeURIComponent(meta.date)
      articleEl.appendChild(readMore)
      return articleEl
    })
    const blogEl = document.getElementById('blog')
    blogEl.innerHTML = '' // Remove the old content which tells users that the blog hasn't loaded yet
    for (let articleEl of articleEls) {
      blogEl.appendChild(articleEl)
    }
  })
