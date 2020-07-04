const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = ({ config }: any) => {

  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  // for Typescript
  config.module.rules.push({
    test: /\.ts/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            './assets/scss/*.scss',
          ],
          rootPath
        }
      },
    ],
  })

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    rootPath
  ]

  return config
}
