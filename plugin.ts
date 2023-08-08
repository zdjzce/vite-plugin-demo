import { promises } from "fs";
import { Plugin, ResolvedConfig } from "vite";


const virtualModuleName = 'virtual:module'
// Vite规定如果是虚拟模块，路径前需要加上 \0
const virtualModuleId = '\0' + virtualModuleName

const virtualEnvName = 'virtual:env'
const virtualEnvId = '\0' + virtualEnvName

function virtualModulePlugin(): Plugin {

  let env: ResolvedConfig | null = null

  return {
    name: 'vite-plugin-virtual-module',
    configResolved: (config) => {
      env = config
    },
    resolveId(id) {
      // console.log('resolve path id:', id)
      // console.log('arguments---------', arguments)
      if (id === virtualModuleName) {
        return virtualModuleId
      }

      if (id === virtualEnvName) {
        return virtualEnvId
      }

    },
    load: (id) => {
      // console.log('require id:', id)
      if (id === virtualModuleId) {
        // 加载虚拟模块
        return 'export default { test: "i am test value" }'        
      }

      if (id === virtualEnvId) {
        return `export default ${JSON.stringify(env)}`
      }
    }

  }
}


/**
  * 1. 拦截 svg 路径
  * 2. 读取 svg，使用 readfile 或者 svgo 的 optimize
  * 3. 将 svg 转成 component, 需要处理 style 标签的情况
  * 4. component is 穿进去的参数 会渲染成一个 Tag
 **/
function svgLoader(): Plugin {
  const svgRegex = /\.svg(\?(url|component))?$/;
  return {
    name: 'vite-svg-plugin',
    async load(id) {
      const match = svgRegex.exec(id);
      if (!match) return

      const type = match[2]
      let svg

      try {
        svg = promises.readFile(id)
      } catch (error) {
        console.error(id, '----', error)
      }

      if (type === 'url') {
        return `export default ${JSON.stringify(id)}`
      }

      if (type === 'component') {
        const styleRegex = /<style>(.*?)<\/style>/g;
        svg = svg.replace(styleRegex, '<component is="style">$1</component>');

        // const component = 
      }

    }
  }
}


export { 
  virtualModulePlugin,
  svgLoader
}