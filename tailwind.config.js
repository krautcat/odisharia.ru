const production = !process.env.ROLLUP_WATCH; 

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },

  purge: {
    content: [
      "./src/**/*.svelte",
    ],
    // this is for extracting Svelte `class:` syntax but is not perfect yet, see below
    defaultExtractor: content => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
      const broadMatchesWithoutTrailingSlash = broadMatches.map(match => _.trimEnd(match, '\\'))
      const matches = broadMatches
        .concat(broadMatchesWithoutTrailingSlash)
      return matches
    },
    enabled: production // disable purge in dev
  },
}
