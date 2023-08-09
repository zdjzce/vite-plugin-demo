// vite.config.ts
import { defineConfig } from "file:///Users/zdj/practice/vite-plugin-demo/node_modules/.pnpm/vite@4.4.5_@types+node@20.4.8/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/zdj/practice/vite-plugin-demo/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// plugin.ts
var virtualModuleName = "virtual:module";
var virtualModuleId = "\0" + virtualModuleName;
var virtualEnvName = "virtual:env";
var virtualEnvId = "\0" + virtualEnvName;
function virtualModulePlugin() {
  let env = null;
  return {
    name: "vite-plugin-virtual-module",
    configResolved: (config) => {
      env = config;
    },
    resolveId(id) {
      if (id === virtualModuleName) {
        return virtualModuleId;
      }
      if (id === virtualEnvName) {
        return virtualEnvId;
      }
    },
    load: (id) => {
      if (id === virtualModuleId) {
        return 'export default { test: "i am test value" }';
      }
      if (id === virtualEnvId) {
        return `export default ${JSON.stringify(env)}`;
      }
    }
  };
}

// plugin-svg.ts
import { compileTemplate } from "file:///Users/zdj/practice/vite-plugin-demo/node_modules/.pnpm/vue@3.3.4/node_modules/vue/compiler-sfc/index.mjs";
import { promises } from "fs";
function svgLoader() {
  const svgRegex = /\.svg(\?(url|component))?$/;
  return {
    name: "vite-svg-plugin",
    enforce: "pre",
    async load(id) {
      const match = svgRegex.exec(id);
      console.log("match:", match);
      if (!match)
        return;
      debugger;
      const [path2, query] = id.split("?", 2);
      let svg;
      try {
        svg = promises.readFile(id);
      } catch (error) {
        console.error(id, "----", error);
      }
      if (query === "url") {
        return `export default ${JSON.stringify(id)}`;
      }
      if (query === "component") {
        const styleRegex = /<style>(.*?)<\/style>/g;
        svg = svg.replace(styleRegex, '<component is="style">$1</component>');
        console.log("svg:", svg);
        const { code } = compileTemplate({
          id: JSON.stringify(id),
          source: svg,
          filename: path2,
          transformAssetUrls: false
        });
        console.log("code:", code);
        return `${code} 
 export default { render: render }`;
      }
    }
  };
}

// vite.config.ts
import path from "path";
var __vite_injected_original_dirname = "/Users/zdj/practice/vite-plugin-demo";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [vue(), virtualModulePlugin(), svgLoader()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2luLnRzIiwgInBsdWdpbi1zdmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemRqL3ByYWN0aWNlL3ZpdGUtcGx1Z2luLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96ZGovcHJhY3RpY2Uvdml0ZS1wbHVnaW4tZGVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemRqL3ByYWN0aWNlL3ZpdGUtcGx1Z2luLWRlbW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyB2aXJ0dWFsTW9kdWxlUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4nXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJy4vcGx1Z2luLXN2ZydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW3Z1ZSgpLCAgdmlydHVhbE1vZHVsZVBsdWdpbigpLCBzdmdMb2FkZXIoKV0sXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pkai9wcmFjdGljZS92aXRlLXBsdWdpbi1kZW1vXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemRqL3ByYWN0aWNlL3ZpdGUtcGx1Z2luLWRlbW8vcGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96ZGovcHJhY3RpY2Uvdml0ZS1wbHVnaW4tZGVtby9wbHVnaW4udHNcIjtpbXBvcnQgeyBwcm9taXNlcyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgUGx1Z2luLCBSZXNvbHZlZENvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBjb21waWxlVGVtcGxhdGUgfSBmcm9tIFwidnVlL2NvbXBpbGVyLXNmY1wiO1xuXG5cbmNvbnN0IHZpcnR1YWxNb2R1bGVOYW1lID0gJ3ZpcnR1YWw6bW9kdWxlJ1xuLy8gVml0ZVx1ODlDNFx1NUI5QVx1NTk4Mlx1Njc5Q1x1NjYyRlx1ODY1QVx1NjJERlx1NkEyMVx1NTc1N1x1RkYwQ1x1OERFRlx1NUY4NFx1NTI0RFx1OTcwMFx1ODk4MVx1NTJBMFx1NEUwQSBcXDBcbmNvbnN0IHZpcnR1YWxNb2R1bGVJZCA9ICdcXDAnICsgdmlydHVhbE1vZHVsZU5hbWVcblxuY29uc3QgdmlydHVhbEVudk5hbWUgPSAndmlydHVhbDplbnYnXG5jb25zdCB2aXJ0dWFsRW52SWQgPSAnXFwwJyArIHZpcnR1YWxFbnZOYW1lXG5cbmZ1bmN0aW9uIHZpcnR1YWxNb2R1bGVQbHVnaW4oKTogUGx1Z2luIHtcblxuICBsZXQgZW52OiBSZXNvbHZlZENvbmZpZyB8IG51bGwgPSBudWxsXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tdmlydHVhbC1tb2R1bGUnLFxuICAgIGNvbmZpZ1Jlc29sdmVkOiAoY29uZmlnKSA9PiB7XG4gICAgICBlbnYgPSBjb25maWdcbiAgICB9LFxuICAgIHJlc29sdmVJZChpZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3Jlc29sdmUgcGF0aCBpZDonLCBpZClcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdhcmd1bWVudHMtLS0tLS0tLS0nLCBhcmd1bWVudHMpXG4gICAgICBpZiAoaWQgPT09IHZpcnR1YWxNb2R1bGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB2aXJ0dWFsTW9kdWxlSWRcbiAgICAgIH1cblxuICAgICAgaWYgKGlkID09PSB2aXJ0dWFsRW52TmFtZSkge1xuICAgICAgICByZXR1cm4gdmlydHVhbEVudklkXG4gICAgICB9XG5cbiAgICB9LFxuICAgIGxvYWQ6IChpZCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlcXVpcmUgaWQ6JywgaWQpXG4gICAgICBpZiAoaWQgPT09IHZpcnR1YWxNb2R1bGVJZCkge1xuICAgICAgICAvLyBcdTUyQTBcdThGN0RcdTg2NUFcdTYyREZcdTZBMjFcdTU3NTdcbiAgICAgICAgcmV0dXJuICdleHBvcnQgZGVmYXVsdCB7IHRlc3Q6IFwiaSBhbSB0ZXN0IHZhbHVlXCIgfScgICAgICAgIFxuICAgICAgfVxuXG4gICAgICBpZiAoaWQgPT09IHZpcnR1YWxFbnZJZCkge1xuICAgICAgICByZXR1cm4gYGV4cG9ydCBkZWZhdWx0ICR7SlNPTi5zdHJpbmdpZnkoZW52KX1gXG4gICAgICB9XG4gICAgfVxuXG4gIH1cbn1cblxuXG5leHBvcnQgeyBcbiAgdmlydHVhbE1vZHVsZVBsdWdpblxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pkai9wcmFjdGljZS92aXRlLXBsdWdpbi1kZW1vXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemRqL3ByYWN0aWNlL3ZpdGUtcGx1Z2luLWRlbW8vcGx1Z2luLXN2Zy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemRqL3ByYWN0aWNlL3ZpdGUtcGx1Z2luLWRlbW8vcGx1Z2luLXN2Zy50c1wiO2ltcG9ydCB7IFBsdWdpbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBjb21waWxlVGVtcGxhdGUgfSBmcm9tIFwidnVlL2NvbXBpbGVyLXNmY1wiO1xuaW1wb3J0IHsgcHJvbWlzZXMgfSBmcm9tIFwiZnNcIjtcblxuLyoqXG4gICogMS4gXHU2MkU2XHU2MjJBIHN2ZyBcdThERUZcdTVGODRcbiAgKiAyLiBcdThCRkJcdTUzRDYgc3ZnXHVGRjBDXHU0RjdGXHU3NTI4IHJlYWRmaWxlIFx1NjIxNlx1ODAwNSBzdmdvIFx1NzY4NCBvcHRpbWl6ZVxuICAqIDMuIFx1NUMwNiBzdmcgXHU4RjZDXHU2MjEwIGNvbXBvbmVudCwgXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2IHN0eWxlIFx1NjgwN1x1N0I3RVx1NzY4NFx1NjBDNVx1NTFCNVxuICAqIDQuIGNvbXBvbmVudCBpcyBcdTdBN0ZcdThGREJcdTUzQkJcdTc2ODRcdTUzQzJcdTY1NzAgXHU0RjFBXHU2RTMyXHU2N0QzXHU2MjEwXHU0RTAwXHU0RTJBIFRhZ1xuICoqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ZnTG9hZGVyKCk6IFBsdWdpbiB7XG4gIGNvbnN0IHN2Z1JlZ2V4ID0gL1xcLnN2ZyhcXD8odXJsfGNvbXBvbmVudCkpPyQvXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZpdGUtc3ZnLXBsdWdpbicsXG4gICAgZW5mb3JjZTogJ3ByZScsXG4gICAgYXN5bmMgbG9hZChpZCkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdmdSZWdleC5leGVjKGlkKTtcbiAgICAgIGNvbnNvbGUubG9nKCdtYXRjaDonLCBtYXRjaClcbiAgICAgIGlmICghbWF0Y2gpIHJldHVyblxuICAgICAgZGVidWdnZXJcbiAgICAgIFxuICAgICAgY29uc3QgW3BhdGgsIHF1ZXJ5XSA9IGlkLnNwbGl0KCc/JywgMilcbiAgICAgIGxldCBzdmdcblxuICAgICAgdHJ5IHtcbiAgICAgICAgc3ZnID0gcHJvbWlzZXMucmVhZEZpbGUoaWQpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGlkLCAnLS0tLScsIGVycm9yKVxuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkgPT09ICd1cmwnKSB7XG4gICAgICAgIHJldHVybiBgZXhwb3J0IGRlZmF1bHQgJHtKU09OLnN0cmluZ2lmeShpZCl9YFxuICAgICAgfVxuXG4gICAgICBpZiAocXVlcnkgPT09ICdjb21wb25lbnQnKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlUmVnZXggPSAvPHN0eWxlPiguKj8pPFxcL3N0eWxlPi9nXG4gICAgICAgIC8vIFZ1ZSBcdTZDQTFcdTZDRDVcdThCQzZcdTUyMkIgc3R5bGUgXHU2ODA3XHU3QjdFXHVGRjBDXHU1QzA2c3R5bGVcdTRGNUNcdTRFM0FcdTVCNTdcdTdCMjZcdTRFMzJcdTRGMjBcdTUxNjUgY29tcG9uZW50IFZ1ZSBcdTRGMUFcdTgxRUFcdTVERjFcdTUyMUJcdTVFRkFcdThGRDlcdTRFMkFcdTY4MDdcdTdCN0VcdTMwMDJcdTcxMzZcdTU0MEVcdTUzMDVcdTg4RjlcdTUzOUZcdTU5Q0JcdTc2ODRcdTUxODVcdTVCQjlcdTMwMDJcbiAgICAgICAgc3ZnID0gc3ZnLnJlcGxhY2Uoc3R5bGVSZWdleCwgJzxjb21wb25lbnQgaXM9XCJzdHlsZVwiPiQxPC9jb21wb25lbnQ+JylcbiAgICAgICAgY29uc29sZS5sb2coJ3N2ZzonLCBzdmcpXG5cbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBjb21waWxlVGVtcGxhdGUoe1xuICAgICAgICAgIGlkOiBKU09OLnN0cmluZ2lmeShpZCksXG4gICAgICAgICAgc291cmNlOiBzdmcsXG4gICAgICAgICAgZmlsZW5hbWU6IHBhdGgsXG4gICAgICAgICAgdHJhbnNmb3JtQXNzZXRVcmxzOiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2RlOicsIGNvZGUpXG4gICAgICAgIC8vIFx1NUMwNnJlbmRlclx1NTFGRFx1NjU3MFx1NUJGQ1x1NTFGQVx1NTNCQiBcdTYyNERcdTgwRkRcdTRGN0ZcdTc1MjhcdTdFQzRcdTRFRjZcbiAgICAgICAgcmV0dXJuIGAke2NvZGV9IFxcbiBleHBvcnQgZGVmYXVsdCB7IHJlbmRlcjogcmVuZGVyIH1gXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULE9BQU8sU0FBUzs7O0FDSWhCLElBQU0sb0JBQW9CO0FBRTFCLElBQU0sa0JBQWtCLE9BQU87QUFFL0IsSUFBTSxpQkFBaUI7QUFDdkIsSUFBTSxlQUFlLE9BQU87QUFFNUIsU0FBUyxzQkFBOEI7QUFFckMsTUFBSSxNQUE2QjtBQUVqQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixnQkFBZ0IsQ0FBQyxXQUFXO0FBQzFCLFlBQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxVQUFVLElBQUk7QUFHWixVQUFJLE9BQU8sbUJBQW1CO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxPQUFPLGdCQUFnQjtBQUN6QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBRUY7QUFBQSxJQUNBLE1BQU0sQ0FBQyxPQUFPO0FBRVosVUFBSSxPQUFPLGlCQUFpQjtBQUUxQixlQUFPO0FBQUEsTUFDVDtBQUVBLFVBQUksT0FBTyxjQUFjO0FBQ3ZCLGVBQU8sa0JBQWtCLEtBQUssVUFBVSxHQUFHO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUNGOzs7QUM3Q0EsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxnQkFBZ0I7QUFRVixTQUFSLFlBQXFDO0FBQzFDLFFBQU0sV0FBVztBQUNqQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxNQUFNLEtBQUssSUFBSTtBQUNiLFlBQU0sUUFBUSxTQUFTLEtBQUssRUFBRTtBQUM5QixjQUFRLElBQUksVUFBVSxLQUFLO0FBQzNCLFVBQUksQ0FBQztBQUFPO0FBQ1o7QUFFQSxZQUFNLENBQUNBLE9BQU0sS0FBSyxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDckMsVUFBSTtBQUVKLFVBQUk7QUFDRixjQUFNLFNBQVMsU0FBUyxFQUFFO0FBQUEsTUFDNUIsU0FBUyxPQUFQO0FBQ0EsZ0JBQVEsTUFBTSxJQUFJLFFBQVEsS0FBSztBQUFBLE1BQ2pDO0FBRUEsVUFBSSxVQUFVLE9BQU87QUFDbkIsZUFBTyxrQkFBa0IsS0FBSyxVQUFVLEVBQUU7QUFBQSxNQUM1QztBQUVBLFVBQUksVUFBVSxhQUFhO0FBQ3pCLGNBQU0sYUFBYTtBQUVuQixjQUFNLElBQUksUUFBUSxZQUFZLHNDQUFzQztBQUNwRSxnQkFBUSxJQUFJLFFBQVEsR0FBRztBQUV2QixjQUFNLEVBQUUsS0FBSyxJQUFJLGdCQUFnQjtBQUFBLFVBQy9CLElBQUksS0FBSyxVQUFVLEVBQUU7QUFBQSxVQUNyQixRQUFRO0FBQUEsVUFDUixVQUFVQTtBQUFBLFVBQ1Ysb0JBQW9CO0FBQUEsUUFDdEIsQ0FBQztBQUVELGdCQUFRLElBQUksU0FBUyxJQUFJO0FBRXpCLGVBQU8sR0FBRztBQUFBO0FBQUEsTUFDWjtBQUFBLElBRUY7QUFBQSxFQUNGO0FBQ0Y7OztBRmxEQSxPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBSSxvQkFBb0IsR0FBRyxVQUFVLENBQUM7QUFDdEQsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
