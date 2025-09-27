import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

// Fix the assert syntax in generated Contentlayer files
async function fixContentlayerFiles() {
  try {
    const files = await glob('.contentlayer/generated/**/*.mjs')
    
    for (const file of files) {
      let content = readFileSync(file, 'utf8')
      
      // Replace assert syntax with with attribute syntax
      content = content.replace(
        /import (.+) from '(.+)' assert \{ type: 'json' \}/g,
        "import $1 from '$2' with { type: 'json' }"
      )
      
      writeFileSync(file, content)
      console.log(`Fixed: ${file}`)
    }
    
    console.log('Contentlayer files fixed successfully')
  } catch (error) {
    console.error('Error fixing Contentlayer files:', error)
  }
}

fixContentlayerFiles()
