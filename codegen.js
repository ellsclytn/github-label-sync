module.exports = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          Accept: 'application/vnd.github.bane-preview+json'
        }
      }
    }
  ],
  documents: 'src/**/query.ts',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        immutableTypes: true,
        avoidOptionals: true
      }
    }
  }
}
