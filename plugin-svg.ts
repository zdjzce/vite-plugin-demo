import { Plugin } from "vite";
import { compileTemplate } from "vue/compiler-sfc";
import { promises } from "fs";

/**
  * 1. 拦截 svg 路径
  * 2. 读取 svg，使用 readfile 或者 svgo 的 optimize
  * 3. 将 svg 转成 component, 需要处理 style 标签的情况
  * 4. component is 穿进去的参数 会渲染成一个 Tag
 **/
export default function svgLoader(): Plugin {
  const svgRegex = /\.svg(\?(url|component))?$/
  return {
    name: 'vite-svg-plugin',
    enforce: 'pre',
    async load(id) {
      const match = svgRegex.exec(id);
      console.log('match:', match)
      if (!match) return
      debugger
      
      const [path, query] = id.split('?', 2) 
      let svg

      try {
        svg = await promises.readFile(path, 'utf-8')
      } catch (error) {
        console.error(id, '----', error)
      }

      if (query === 'url') {
        return `export default ${JSON.stringify(id)}`
      }

      if (query === 'component') {
        const styleRegex = /<style>(.*?)<\/style>/g
        // Vue 没法识别 style 标签，将style作为字符串传入 component Vue 会自己创建这个标签。然后包裹原始的内容。
        svg = svg.replace(styleRegex, '<component is="style">$1</component>')
        console.log('svg:', svg)

        const { code } = compileTemplate({
          id: JSON.stringify(id),
          source: svg,
          filename: path,
          transformAssetUrls: false
        })

        console.log('code:', code)
        // 将render函数导出去 才能使用组件
        return `${code} \n export default { render: render }`
      }

    }
  }
}