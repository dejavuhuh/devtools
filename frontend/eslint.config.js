import antfu from '@antfu/eslint-config'

export default antfu({
  react: {
    overrides: {
      'style/jsx-sort-props': ['error', {
        callbacksLast: true,
        shorthandFirst: true,
      }],
    },
  },
  ignores: [
    'src/api/__generated/',
    'src/routeTree.gen.ts',
  ],
})
