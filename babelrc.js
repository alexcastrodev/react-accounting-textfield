module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.BABEL_ENV === 'development',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['external-helpers', 'transform-class-properties'],
}
