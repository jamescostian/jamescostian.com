// TODO: don't just assume this is the homepage, account for the fact that the user might be visiting #blog/something
// And don't forget to window.addEventListener('hashchange', () => {}, false)
import setupBlogPostPreviews from './blog-post-previews.js'
setupBlogPostPreviews()
