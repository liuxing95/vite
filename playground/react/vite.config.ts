import path from 'path'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import { normalizePath } from 'vite'

const variablePath = normalizePath(path.resolve('./variable.less'))
console.log('variablePath', variablePath)

const config: UserConfig = {
  mode: 'development',
  plugins: [react()],
  build: {
    // to make tests faster
    minify: false
  },
  css: {
    preprocessorOptions: {
      less: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  // 即第三方包出现了问题该怎么办 通过patch-package修改库代码和编写 Esbuild 插件修改模块加载的内容。
  optimizeDeps: {
    entries: ['./App.jsx'],
    force: true,
    include: ['lodash-es']
  }
}

export default config
