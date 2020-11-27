/* eslint-disable import/no-extraneous-dependencies */
const { DefinePlugin } = require('webpack');

const { NODE_ENV } = process.env;

module.exports = {
  style: {
    postcss: {
      plugins: [],
      env: {
        mode: 'extends',
        stage: 0 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          'custom-media-queries': {
            importFrom: [
              {
                customMedia: {
                  '--phonePortrait': '(width <= 414px)',
                  '--phoneLandscape': '(max-width: 415px)',
                  '--tabletPortrait': '(max-width: 668px)',
                  '--tabletLandscape': '(max-width: 796px)',
                  '--desktopS': '(max-width: 1025px)',
                  '--desktopM': '(max-width: 1376px)',
                  '--desktopL': '(max-width: 1680px)',
                  '--desktopXL': '(max-width: 1921px)',
                },
              },
            ],
          },
        },
      },
    },
  },
  webpack: {
    plugins: [
      new DefinePlugin({
        __URI__: JSON.stringify('https://www.google.com'),
        __ENV__: JSON.stringify(NODE_ENV),
        __DEV__: NODE_ENV === 'development',
        __STAGE__: NODE_ENV === 'stage',
        __PROD__: NODE_ENV === 'production',
        GoL: JSON.stringify('GOGLGOLGOGOLGOG'),
      }),
    ],
  },
};
