import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// https://vitejs.dev/config/


export default defineConfig((env: ConfigEnv) => {
  const { command, mode } = env
  // 可以通过判断command根据不同环境设置不同配置，比如base
  return {
    plugins: [vue()],
    // 配置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'components': resolve(__dirname, 'src/components'),
        'views': resolve(__dirname, 'src/views'),
        'network': resolve(__dirname, 'src/network'),
        'router': resolve(__dirname, 'src/router'),
        'store': resolve(__dirname, 'src/store'),
        'types': resolve(__dirname, 'src/types')
      }
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer')
        ]
      },
    },
    server: {
      port: 3000,
      hmr: true
    }
  }
})
