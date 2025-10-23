// vite.config.ts
import { loadEnv } from "file:///D:/project/react-admin-platform/node_modules/.pnpm/vite@4.5.0_@types+node@20.10.6_less@4.2.0_terser@5.26.0/node_modules/vite/dist/node/index.js";
import react from "file:///D:/project/react-admin-platform/node_modules/.pnpm/@vitejs+plugin-react@4.2.1__d36fa08bbd741439c2bccffbd23a97e4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/project/react-admin-platform/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_f6a3ec86693320a9a874fd6740ef1833/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/project/react-admin-platform/node_modules/.pnpm/vite-plugin-mock@2.9.8_mock_ad99ed0dfaa9c74da3281a0df44a7f38/node_modules/vite-plugin-mock/dist/index.js";

// build/utils.ts
function wrapperEnv(envConf) {
  const result = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    result[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return result;
}

// vite.config.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\project\\react-admin-platform";
var vite_config_default = ({ command, mode }) => {
  const root = process.cwd();
  const isBuild = command === "build";
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv;
  return {
    base: "./",
    server: {
      // Listening on all local ips
      host: true,
      open: true,
      port: VITE_PORT,
      proxy: {
        // 选项写法
        "/api": {
          target: "http://localhost:8201",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        mockPath: "mock",
        ignore: /^_/,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from 'mock/_createProductionServer';

          setupProdMockServer()
          `
      })
    ],
    build: {
      target: "es2015",
      cssTarget: "chrome86",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          // used to delete console and debugger in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      chunkSizeWarningLimit: 2e3
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHJlYWN0LWFkbWluLXBsYXRmb3JtXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHJlYWN0LWFkbWluLXBsYXRmb3JtXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3JlYWN0LWFkbWluLXBsYXRmb3JtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBDb25maWdFbnYsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJ1xyXG4vLyBcdTk3MDBcdTg5ODFcdTVCODlcdTg4QzUgQHR5cGluZ3Mvbm9kZSBcdTYzRDJcdTRFRjZcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXHJcbmV4cG9ydCBkZWZhdWx0ICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcclxuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJ1xyXG5cclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNvbnZlcnRlZCB0byBkaWZmZXJlbnQgdHlwaW5nc1xyXG4gIGNvbnN0IHZpdGVFbnY6IGFueSA9IHdyYXBwZXJFbnYoZW52KVxyXG4gIGNvbnN0IHsgVklURV9QT1JULCBWSVRFX0RST1BfQ09OU09MRSB9ID0gdml0ZUVudlxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvLyBMaXN0ZW5pbmcgb24gYWxsIGxvY2FsIGlwc1xyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBwb3J0OiBWSVRFX1BPUlQsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgLy8gXHU5MDA5XHU5ODc5XHU1MTk5XHU2Q0Q1XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgyMDEnLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcclxuICAgICAgfSksXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXHJcbiAgICAgICAgaWdub3JlOiAvXl8vLFxyXG4gICAgICAgIGxvY2FsRW5hYmxlZDogIWlzQnVpbGQsXHJcbiAgICAgICAgcHJvZEVuYWJsZWQ6IGlzQnVpbGQsXHJcbiAgICAgICAgaW5qZWN0Q29kZTogYFxyXG4gICAgICAgICAgaW1wb3J0IHsgc2V0dXBQcm9kTW9ja1NlcnZlciB9IGZyb20gJ21vY2svX2NyZWF0ZVByb2R1Y3Rpb25TZXJ2ZXInO1xyXG5cclxuICAgICAgICAgIHNldHVwUHJvZE1vY2tTZXJ2ZXIoKVxyXG4gICAgICAgICAgYFxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuXHJcbiAgICBidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdlczIwMTUnLFxyXG4gICAgICBjc3NUYXJnZXQ6ICdjaHJvbWU4NicsXHJcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSxcclxuICAgICAgICAgIC8vIHVzZWQgdG8gZGVsZXRlIGNvbnNvbGUgYW5kIGRlYnVnZ2VyIGluIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcclxuICAgICAgICAgIGRyb3BfY29uc29sZTogVklURV9EUk9QX0NPTlNPTEVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMFxyXG4gICAgfSxcclxuXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccmVhY3QtYWRtaW4tcGxhdGZvcm1cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccmVhY3QtYWRtaW4tcGxhdGZvcm1cXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvcmVhY3QtYWRtaW4tcGxhdGZvcm0vYnVpbGQvdXRpbHMudHNcIjtkZWNsYXJlIHR5cGUgUmVjb3JkYWJsZTxUID0gYW55PiA9IFJlY29yZDxzdHJpbmcsIFQ+XHJcblxyXG5pbnRlcmZhY2UgVml0ZUVudiB7XHJcbiAgVklURV9QT1JUOiBudW1iZXJcclxuICBWSVRFX1BST1hZOiBbc3RyaW5nLCBzdHJpbmddW11cclxuICBWSVRFX0RST1BfQ09OU09MRTogYm9vbGVhblxyXG59XHJcblxyXG4vLyByZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9XHJcblxyXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xyXG4gICAgbGV0IHJlYWxOYW1lID0gZW52Q29uZltlbnZOYW1lXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJylcclxuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUE9SVCcpIHtcclxuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BST1hZJyAmJiByZWFsTmFtZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlYWxOYW1lID0gJydcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdFtlbnZOYW1lXSA9IHJlYWxOYW1lXHJcblxyXG4gICAgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdID0gSlNPTi5zdHJpbmdpZnkocmVhbE5hbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixPQUFPLFdBQVc7QUFDbEIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxxQkFBcUI7OztBQ0t2QixTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxTQUFjLENBQUM7QUFFckIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFDMUMsUUFBSSxXQUFXLFFBQVEsT0FBTyxFQUFFLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQVcsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFFdkUsUUFBSSxZQUFZLGFBQWE7QUFDM0IsaUJBQVcsT0FBTyxRQUFRO0FBQUEsSUFDNUI7QUFFQSxRQUFJLFlBQVksZ0JBQWdCLFVBQVU7QUFDeEMsVUFBSTtBQUNGLG1CQUFXLEtBQUssTUFBTSxTQUFTLFFBQVEsTUFBTSxHQUFHLENBQUM7QUFBQSxNQUNuRCxTQUFTLE9BQU87QUFDZCxtQkFBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBRUEsV0FBTyxPQUFPLElBQUk7QUFFbEIsUUFBSSxPQUFPLGFBQWEsVUFBVTtBQUNoQyxjQUFRLElBQUksT0FBTyxJQUFJO0FBQUEsSUFDekIsV0FBVyxPQUFPLGFBQWEsVUFBVTtBQUN2QyxjQUFRLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxRQUFRO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUOzs7QUQvQkEsU0FBUyxlQUFlO0FBUHhCLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUE2QjtBQUMzRCxRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLFFBQU0sVUFBVSxZQUFZO0FBRTVCLFFBQU0sTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUc5QixRQUFNLFVBQWUsV0FBVyxHQUFHO0FBQ25DLFFBQU0sRUFBRSxXQUFXLGtCQUFrQixJQUFJO0FBRXpDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBO0FBQUEsUUFFTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDckQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYyxDQUFDO0FBQUEsUUFDZixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtkLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixlQUFlO0FBQUE7QUFBQSxVQUVmLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
