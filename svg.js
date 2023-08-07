import { promises } from 'fs'
import { compileTemplate } from 'vue/compiler-sfc'
import { optimize as optimizeSvg } from 'svgo'

export default function svgLoader (options = {}) {
  const { svgoConfig, svgo, defaultImport } = options

  const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      debugger
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      const importType = query || defaultImport

      if (importType === 'url') {
        return // Use default svg loader
      }

      let svg

      try {
        svg = await promises.readFile(path, 'utf-8')
      } catch (ex) {
        console.warn('\n', `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`)
        return
      }
      console.log('svg 0:', svg)

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`
      }
      console.log('svg 1:', svg)

      if (svgo !== false && query !== 'skipsvgo') {
        svg = optimizeSvg(svg, {
          ...svgoConfig,
          path
        }).data
      }
      
      console.log('svg 2:', svg)

      // svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component')

      // const { code } = compileTemplate({
      //   id: JSON.stringify(id),
      //   source: svg,
      //   filename: path,
      //   transformAssetUrls: false
      // })

      // return `${code}\nexport default { render: render }`
      return `export default { test: 1 }`
    }
  }
}
