/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Shedrack's Blog",
  author: 'Shedrack Akintayo',
  headerTitle: 'Shedrack Akintayo',
  description: 'A blog for byte-sized articles on things that interest me',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'http://sheddy.xyz',
  siteRepo: 'https://github.com/hacktivist123/sheddy-xyz-new',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/social-card.png',
  github: 'https://github.com/hacktivist123',
  twitter: 'https://twitter.com/coder_blvck',
  youtube: 'https://www.youtube.com/channel/UCUnHbLI4hUJzmCEw_66YaFg',
  linkedin: 'https://www.linkedin.com/in/shedrackakintayo',
  locale: 'en-US',
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'disqus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
  },
}

module.exports = siteMetadata
