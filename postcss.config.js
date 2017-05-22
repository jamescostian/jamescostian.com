module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': {},
    'postcss-custom-media': {},
    'postcss-css-variables': {},
    cssnano: {
      mergeRules: false
    }
  }
})
