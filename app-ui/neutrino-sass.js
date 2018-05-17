const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const STYLE_LOADER = require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const LESS_LOADER = require.resolve('less-loader');

module.exports = (neutrino) => {
  // We use cssnano with the postcss loader, so we tell
  // - css-loader not to duplicate minimization
  // - sass-loader not generate source maps
  const cssOptions = { minimize: false };
  const sassOptions = { sourceMap: false };

  if(process.env.NODE_ENV === 'production') {
    sassOptions.publicPath =  '/assets/ui';
  }

  // If modules are present in the neutrino config,
  // set them as include paths.
  if (neutrino.config.resolve && neutrino.config.resolve.modules) {
    sassOptions.includePaths = neutrino.config.resolve.modules.values();
  }

  neutrino.config.module.rule('scss').test(/\.scss$/)
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
    .use('sass')
      .loader(SASS_LOADER)
        .options(sassOptions);



  /*
   {
        test: /\.scss$/,
        include: helpers.root('src', 'assets', 'css'),
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader',
              query: {
                minimize: true
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        })
      }
  * */
};
