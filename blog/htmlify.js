// Convert all of the .md files here to .html files
const {readFileSync, writeFileSync} = require('fs')
const {join} = require('path')
const showdown = require('showdown')
const glob = require('glob')
const converter = new showdown.Converter()
converter.setFlavor('github')

const htmlBeginning = `<!DOCTYPE html>
<html class="blog">
  <head>
    <meta charset="utf-8">
    <title>James Costian's Blog</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet" type="text/css">
    <link href="../bundle.css" rel="stylesheet" type="text/css">
    <link href="../highlight/styles/atom-one-dark.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <section class="blog" id="blog">
      <article class="post">
`
const htmlEnd = `
      </article>
    </section>
    <script src="../highlight/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad()</script>
  </body>
</html>`

glob(join(__dirname, '*.md'), (err, files) => {
  if (err) {
    throw err
  }
  for (let file of files) {
    const htmlStr = converter.makeHtml(readFileSync(file).toString())
    writeFileSync(file.substr(0, file.length - 2) + 'html', htmlBeginning + htmlStr + htmlEnd)
  }
})
