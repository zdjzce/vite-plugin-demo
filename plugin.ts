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
    resolveId: function (id) {
      console.log('resolve path id:', id)
      console.log('arguments---------', arguments)
      if (id === virtualModuleName) {
        return virtualModuleId
      }

      if (id === virtualEnvName) {
        return virtualEnvId
      }

    },
    load: (id) => {
      console.log('require id:', id)
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


export { 
  virtualModulePlugin
}