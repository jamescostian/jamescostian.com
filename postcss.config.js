module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': {},
    'postcss-custom-media': {},
    cssnano: {
      mergeRules: false
    }
  }
})
