const CSS_LOADER = require.resolve('css-loader');
const STYLE_LOADER = require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const LESS_LOADER = require.resolve('less-loader');

module.exports = (neutrino) => {
  // We use cssnano with the postcss loader, so we tell
  // - css-loader not to duplicate minimization
  // - sass-loader not generate source maps
  const cssOptions = { minimize: false };
  const lessOptions = {sourceMap: false};

  // If modules are present in the neutrino config,
  // set them as include paths.
  if (neutrino.config.resolve && neutrino.config.resolve.modules) {
    lessOptions.includePaths = neutrino.config.resolve.modules.values();
  }

  neutrino.config.module.rule('less_rule').test(/antd.*\.less$/)
    .use('style')
      .loader(STYLE_LOADER)
      .end()
    .use('css')
      .loader(CSS_LOADER)
        .options(cssOptions)
        .end()
    .use('postcss')
      .loader(POSTCSS_LOADER)
      .end()
    .use('less')
      .loader(LESS_LOADER)
      .options(lessOptions);

};
