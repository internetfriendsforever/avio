import pkg from './package.json'

const unpkg = id => {
  const version = pkg.dependencies[id]
  return `https://unpkg.com/${id}@${version}?module`
}

export default {
  input: './src/index.js',

  external: [
    'hammerjs',
    'kefir',
    'wobble'
  ],

  output: [
    {
      file: 'public/library/esm.js',
      format: 'esm',
      paths: unpkg
    },

    {
      file: 'public/library/cjs.js',
      format: 'cjs'
    },

    {
      file: 'public/library/iife.js',
      format: 'iife',
      name: 'avio',
      globals: {
        'hammerjs': 'Hammer',
        'kefir': 'Kefir',
        'wobble': 'Wobble'
      }
    }
  ]
}
