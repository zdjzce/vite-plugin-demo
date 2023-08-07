import { Plugin } from "vite";


const virtualModuleName = 'virtual:module'
// Vite规定如果是虚拟模块，路径前需要加上 \0
const virtualModuleId = '\0' + virtualModuleName

function virtualModulePlugin(): Plugin {
  return {
    name: 'vite-plugin-virtual-module',
    resolveId: function (id) {
      console.log('resolve path id:', id)
      console.log('arguments---------', arguments)
      if (id === virtualModuleName) {
        return virtualModuleId
      }
    },
    load: (id) => {
      console.log('require id:', id)
      if (id === virtualModuleId) {
        // 加载虚拟模块
        return 'export default { test: "i am test value" }'        
      }
    }

  }
}


export { 
  virtualModulePlugin
}