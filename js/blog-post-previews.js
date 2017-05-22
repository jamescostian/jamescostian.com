// Setup the blog previews in #blog
export default async function () {
  // First, get the manifest (which contains info needed to make previews)
  const res = await window.fetch('blog/manifest.json')
  const manifest = await res.json()
  // Next, make an <article> out of each post in the manifest
  const articleEls = manifest.map(meta => makeArticleEl(meta))
  // Now it's time to actually update the page
  const blogEl = document.getElementById('blog')
  // Replace the old content with a title for this section, and all of the article
  blogEl.innerHTML = '<h3>Blog Posts</h3>'
  for (let articleEl of articleEls) {
    blogEl.appendChild(articleEl)
  }
}

// Given the meta data about the post (this should come from blog/manifest.json), return an HTMLElement that can be put into the page and has a nice preview of the post.
// Note: this function will allow HTML to pass through it, so do not feed it any untrusted data.
export function makeArticleEl (meta) {
  // The whole thing belongs in an article element
  const articleEl = document.createElement('article')
  articleEl.className = 'post-preview'

  // The first thing in the preview is the title
  const title = document.createElement('h4')
  title.className = 'title'
  title.innerHTML = meta.title
  articleEl.appendChild(title)

  // After the title come some paragraphs of text that preview what the article is about
  // Each of these paragraphs should be put in its own <p> element, which should then be put in the article element
  const paragraphs = meta.preview.split('\n')
  for (let text of paragraphs) {
    const pEl = document.createElement('p')
    pEl.innerHTML = text + ' ' // This space is undetectable for pretty much every paragraph, except the last one, where it separates words from "Read more"
    articleEl.appendChild(pEl)
  }

  // Finally, there should be a link to read more
  const readMore = document.createElement('a')
  readMore.innerHTML = 'Read more'
  readMore.className = 'read-more'
  readMore.href = '#blog/' + encodeURIComponent(meta.date)
  // The link should be at the end of the last paragraph
  articleEl.children[articleEl.children.length - 1].appendChild(readMore)

  return articleEl
}
