const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2', // commonjs模块 具有module.exports接口可导出给其他库使用的方法或组件
  },
  "externals": {
    "react": "commonjs react" // 使用调用库的react依赖, 而不是使用打包时本项目bundle中的react
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  }
};
