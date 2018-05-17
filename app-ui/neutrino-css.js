const CSS_LOADER = require.resolve('css-loader');
const STYLE_LOADER = require.resolve('style-loader');

module.exports = (neutrino) => {
  // We use cssnano with the postcss loader, so we tell
  // - css-loader not to duplicate minimization
  // - sass-loader not generate source maps
  const cssOptions = { minimize: false };


  neutrino.config.module.rule('css_rule').test(/\.css$/)
    .use('style')
    .loader(STYLE_LOADER)
    .end()
    .use('css')
    .loader(CSS_LOADER)
    .options(cssOptions)


};
