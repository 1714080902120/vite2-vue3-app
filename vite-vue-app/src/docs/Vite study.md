# Vite study

官网链接：<a href="https://cn.vitejs.dev/">Vite</a>

## 1. 特性

- 使用Esbuild进行依赖预构建，该插件使用go编写，比目前使用js实现的预构建快10-100倍
- 只有在真正需要用到时才会请求该部分的代码，实现真正的按需加载
- 局部热更新？原话：<b>当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[[1\]](https://cn.vitejs.dev/guide/why.html#footnote-1)（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。</b>
- 依赖强缓存、源代码协商缓存
- 总之就是快

## 2. 创建

- 语法
  - `npm init vite@latest xxx`
  - `yarn create vite xxx`
  - `pnpx create-vite xxx`
- 目前支持的预设模板
  - `vanilla`
  - `vanilla-ts`
  - `vue`
  - `vue-ts`
  - `react`
  - `react-ts`
  - `preact`
  - `preact-ts`
  - `lit-element`
  - `lit-element-ts`
  - `svelte`
  - `svelte-ts`
- cd 到xxx目录里进行install
- 即可run dev

## 3. 文件目录结构

默认以当前工作目录为根目录启动开发服务器，可以通过 vite serve some/sub/dir 来指定作为开发的根目录。

- public -- 静态资源目录

  - favicon.ico -- 页面图标

- src

  - assets -- 存放图片资源等

  - components -- 存放公共组件的地方

  - App.vue -- 首页

  - main.js/ts -- js入口文件

  - shims-vue.d.ts -- 使用vue-ts后会出现，使用vue-SFC（单文件组件）时需要配置，没有会报错

  - vite-env.d.ts -- 原话：<b>Vite 默认的类型定义是写给它的 Node.js API 的。要将其补充到一个 Vite 应用的客户端代码环境中，需要添加一个 `d.ts` 声明文件同时，你也可以将 `vite/client` 添加到 `tsconfig` 中的 `compilerOptions.types` 下：</b>

    ```json
    {
      "compilerOptions": {
        "types": ["vite/client"]
      }
    }
    ```

- .gitignore -- 不必多说，不想上传到github/lab的就在这个文件里写上

- index.html -- 在根目录下，开发期间是项目的入口。原话：<b>Vite 将 `index.html` 视为源码和模块图的一部分。Vite 解析 `<script type="module" src="...">` ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 `<script type="module">` 和引用 CSS 的 `<link href>` 也能利用 Vite 特有的功能被解析。另外，`index.html` 中的 URL 将被自动转换，因此不再需要 `%PUBLIC_URL%` 占位符了。</b>

  <strong>值得一提的是Vite支持多个.html作为入口点的多页面应用模式（静态文件服务器）</strong>

- package.json

  - 可以使用npx vite直接运行

  - ```json
    {
      "scripts": {
        "dev": "vite", // 启动开发服务器
        "build": "vite build", // 为生产环境构建产物
        "serve": "vite preview" // 本地预览生产构建产物
      }
    }
    ```

  - 指令
    - --port 设置端口号
    - --https 启用https
    - --help 获取命令行选项列表
    - --force 强制Vite重新构建依赖

- README.md -- 搭建/开发流程、MIT等说明

- tsconfig.json -- ts情况下配置基础ts开发模式功能

- vite.config.ts -- 配置开发环境

- .env.xxx -- 开发环境变量配置

## 4. 功能

- 依赖解析以及预构建：<a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html">依赖预构建</a>
- 模块热重载：Vite提供了一套原生ESM的HMR API。Vite内置了HMR到Vue SFC 和 React Fast Refresh中
- 默认支持TypeScript：Vite本身仅对typescript做转译，约是tsc 的20-30倍。可安装vue-tsc对*.vue文件做类型检查
- <b>注意因为 `esbuild` 只执行转译工作而不含类型信息，所以它不支持 TypeScript 的特定功能例如常量枚举和隐式 “type-only” 导入。你必须在你的 `tsconfig.json` 中的 `compilerOptions` 里设置 `"isolatedModules": true`，这样 TS 才会警告你哪些功能无法与独立编译模式一同工作。</b>

## 5. 支持

- Vite为Vue提供第一优先支持

  - Vue 3 单文件组件支持：[@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)
  - Vue 3 JSX 支持：[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
  - Vue 2 支持：[underfin/vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

- JSX

  - `.jsx` 和 `.tsx` 文件同样开箱即用。JSX 的转译同样是通过 [esbuild](https://esbuild.github.io/)，默认为 React 16 风格。期望在 esbuild 中支持 React 17 风格的 JSX 请看 [这里](https://github.com/evanw/esbuild/issues/334)。

- CSS Modules

  - ```css
    /* example.module.css */
    .red {
      color: red;
    }
    ```

  - ```js
    // .apply-color -> applyColor
    import { applyColor } from './example.module.css'
    document.getElementById('foo').className = applyColor
    ```

- CSS 预处理器：Vite提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

  ```shell
  # .scss and .sass
  npm install -D sass
  
  # .less
  npm install -D less
  
  # .styl and .stylus
  npm install -D stylus
  ```

  如果是用的是单文件组件，可以通过 `<style lang="sass">`（或其他预处理器）自动开启。

- 静态资源处理

  - 导入一个静态资源会返回解析后的 URL：

    ```js
    import imgUrl from './img.png'
    document.getElementById('hero-img').src = imgUrl
    ```

  - 添加一些特殊的查询参数可以更改资源被引入的方式：

    ```js
    // 显式加载资源为一个 URL
    import assetAsURL from './asset.js?url'
    // 以字符串形式加载资源
    import assetAsString from './shader.glsl?raw'
    // 加载为 Web Worker
    import Worker from './worker.js?worker'
    // 在构建时 Web Worker 内联为 base64 字符串
    import InlineWorker from './worker.js?worker&inline'
    ```

    更多细节请见 [静态资源处理](https://cn.vitejs.dev/guide/assets.html)。

- JSON: 可以被直接导入 —— 同样支持具名导入：

  ```js
  // 导入整个对象
  import json from './example.json'
  // 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
  import { field } from './example.json'
  ```

- 其他还有一些，这里几乎都是直接复制官网的，所以就只复制常用的那些。

## 6. 构建优化

- CSS代码分割：Vite 会自动地将一个异步 chunk 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件。这个 CSS 文件将在该异步 chunk 加载完成时自动通过一个 `<link>` 标签载入，该异步 chunk 会保证只在 CSS 加载完毕后再执行。
- 异步chunk加载优化：Vite将使用一个预加载步骤自动重写代码，来分割动态导入调用，实现当一个模块在被请求时，它的依赖也会同时请求。

## 7. 插件

若要使用一个插件，需要将它添加到项目的 `devDependencies` 并在 `vite.config.js` 配置文件中的 `plugins` 数组中引入它。例如在vite.config.ts里引入electron

```js
// vite.config.js
const electron = require('electron')
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
      electron()
  ]
})
```

<strong style="color: rgba(60,150, 200, .8)">查看 [Plugins 章节](https://cn.vitejs.dev/plugins/) 获取官方插件信息。社区插件列表请参见 [awesome-vite](https://github.com/vitejs/awesome-vite#plugins)。而对于兼容的 Rollup 插件，请查看 [Vite Rollup 插件](https://vite-rollup-plugins.patak.dev/) 获取一个带使用说明的兼容 Rollup 官方插件列表，若列表中没有找到，则请参阅 [Rollup 插件兼容性章节](https://cn.vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility)。</strong>

- 强制插件排序：为了与某些 Rollup 插件兼容，可能需要强制执行插件的顺序，或者只在构建时使用。这应该是 Vite 插件的实现细节。可以使用 `enforce` 修饰符来强制插件的位置:

  - `pre`：在 Vite 核心插件之前调用该插件
  - 默认：在 Vite 核心插件之后调用该插件
  - `post`：在 Vite 构建插件之后调用该插件

  ```js
  // vite.config.js
  import image from '@rollup/plugin-image'
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    plugins: [
      {
        ...image(),
        enforce: 'pre'
      }
    ]
  })
  ```

  查看 [Plugins API Guide](https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering) 获取细节信息，并在 [Vite Rollup 插件](https://vite-rollup-plugins.patak.dev/) 兼容性列表中注意 `enforce` 标签和流行插件的使用说明。

- 按需应用：默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，请使用 `apply` 属性指明它们仅在 `'build'` 或 `'serve'` 模式时调用：

  ```js
  // vite.config.js
  import typescript2 from 'rollup-plugin-typescript2'
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    plugins: [
      {
        ...typescript2(),
        apply: 'build'
      }
    ]
  })
  ```

## 8. 环境变量和模式

- 环境变量：Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

  - **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
  - **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/#base)决定。
  - **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
  - **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。

- .env文件：Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vitejs.dev/config/#envdir) 中的下列文件加载额外的环境变量：

  ```markdown
  .env                # 所有情况下都会加载
  .env.local          # 所有情况下都会加载，但会被 git 忽略
  .env.[mode]         # 只在指定模式下加载
  .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
  ```

  为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：

  ```.env
  DB_PASSWORD=foobar
  VITE_SOME_KEY=123
  ```

## 9. Vite配置

当以命令行方式运行 `vite` 时，Vite 会自动解析 [项目根目录](https://cn.vitejs.dev/guide/#index-html-and-project-root) 下名为 `vite.config.js` 的文件。

- 使用defineConfig工具函数包裹代替jsdoc或者IDE提供的智能提示

  ```typescript
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    // ...
  })
  ```

  defineConfig也可以传入一个回调(支持异步),不同的情景有不同配置的情况下可以使用

  ```typescript
  export default defineConfig(await ({ command, mode }) => {
    if (command === 'serve') {
      return {
        // serve 独有配置
      }
    } else {
      return {
        // build 独有配置
      }
    }
  })
  ```

- config对象（UserConfig）属性接口（interface）以及部分属性的接口（interface）：

  ```typescript
  interface UserConfig {
      /**
       * Project root directory. Can be an absolute path, or a path relative from
       * the location of the config file itself.
       * @default process.cwd()
       */
      root?: string;
      /**
       * Base public path when served in development or production.
       * @default '/'
       */
      base?: string;
      /**
       * Directory to serve as plain static assets. Files in this directory are
       * served and copied to build dist dir as-is without transform. The value
       * can be either an absolute file system path or a path relative to <root>.
       *
       * Set to `false` or an empty string to disable copied static assets to build dist dir.
       * @default 'public'
       */
      publicDir?: string | false;
      /**
       * Directory to save cache files. Files in this directory are pre-bundled
       * deps or some other cache files that generated by vite, which can improve
       * the performance. You can use `--force` flag or manually delete the directory
       * to regenerate the cache files. The value can be either an absolute file
       * system path or a path relative to <root>.
       * @default 'node_modules/.vite'
       */
      cacheDir?: string;
      /**
       * Explicitly set a mode to run in. This will override the default mode for
       * each command, and can be overridden by the command line --mode option.
       */
      mode?: string;
      /**
       * Define global variable replacements.
       * Entries will be defined on `window` during dev and replaced during build.
       */
      define?: Record<string, any>;
      /**
       * Array of vite plugins to use.
       */
      plugins?: (PluginOption | PluginOption[])[];
      /**
       * Configure resolver
       */
      resolve?: ResolveOptions & {
          alias?: AliasOptions;
      };
      /**
       * CSS related options (preprocessors and CSS modules)
       */
      css?: CSSOptions;
      /**
       * JSON loading options
       */
      json?: JsonOptions;
      /**
       * Transform options to pass to esbuild.
       * Or set to `false` to disable esbuild.
       */
      esbuild?: ESBuildOptions | false;
      /**
       * Specify additional files to be treated as static assets.
       */
      assetsInclude?: string | RegExp | (string | RegExp)[];
      /**
       * Server specific options, e.g. host, port, https...
       */
      server?: ServerOptions;
      /**
       * Build specific options
       */
      build?: BuildOptions;
      /**
       * Dep optimization options
       */
      optimizeDeps?: DepOptimizationOptions;
      /* Excluded from this release type: ssr */
      /**
       * Log level.
       * Default: 'info'
       */
      logLevel?: LogLevel;
      /**
       * Default: true
       */
      clearScreen?: boolean;
      /**
       * Environment files directory. Can be an absolute path, or a path relative from
       * the location of the config file itself.
       * @default root
       */
      envDir?: string;
      /**
       * Import aliases
       * @deprecated use `resolve.alias` instead
       */
      alias?: AliasOptions;
      /**
       * Force Vite to always resolve listed dependencies to the same copy (from
       * project root).
       * @deprecated use `resolve.dedupe` instead
       */
      dedupe?: string[];
  }
  
  type PluginOption = Plugin | false | null | undefined;
  interface ResolveOptions {
      mainFields?: string[];
      conditions?: string[];
      extensions?: string[];
      dedupe?: string[];
  }
  /**
  * 别名配置可以传入数组或者对象，数组格式为[{ find: 'xxx', replacement: 'aaa' }]
  * 对象为{ xxx: aaa }
  */
  type AliasOptions = readonly Alias[] | { [find: string]: string }
  interface Alias {
      find: string | RegExp
      replacement: string
      /**
       * Instructs the plugin to use an alternative resolving algorithm,
       * rather than the Rollup's resolver.
       * @default null
       */
      customResolver?: ResolverFunction | ResolverObject | null
  }
  /**
  * 
  */
  interface CSSOptions {
      /**
       * https://github.com/css-modules/postcss-modules
       */
      modules?: CSSModulesOptions | false;
      preprocessorOptions?: Record<string, any>;
      postcss?: string | (Postcss.ProcessOptions & {
          plugins?: Postcss.Plugin[];
      });
  }
  /**
  *
  */
  interface ServerOptions {
      host?: string | boolean;
      port?: number;
      /**
       * Enable TLS + HTTP/2.
       * Note: this downgrades to TLS only when the proxy option is also used.
       */
      https?: boolean | https.ServerOptions;
      /**
       * Open browser window on startup
       */
      open?: boolean | string;
      /**
       * Force dep pre-optimization regardless of whether deps have changed.
       */
      force?: boolean;
      /**
       * Configure HMR-specific options (port, host, path & protocol)
       */
      hmr?: HmrOptions | boolean;
      /**
       * chokidar watch options
       * https://github.com/paulmillr/chokidar#api
       */
      watch?: WatchOptions;
      /**
       * Configure custom proxy rules for the dev server. Expects an object
       * of `{ key: options }` pairs.
       * Uses [`http-proxy`](https://github.com/http-party/node-http-proxy).
       * Full options [here](https://github.com/http-party/node-http-proxy#options).
       *
       * Example `vite.config.js`:
       * ``` js
       * module.exports = {
       *   proxy: {
       *     // string shorthand
       *     '/foo': 'http://localhost:4567/foo',
       *     // with options
       *     '/api': {
       *       target: 'http://jsonplaceholder.typicode.com',
       *       changeOrigin: true,
       *       rewrite: path => path.replace(/^\/api/, '')
       *     }
       *   }
       * }
       * ```
       */
      proxy?: Record<string, string | ProxyOptions>;
      /**
       * Configure CORS for the dev server.
       * Uses https://github.com/expressjs/cors.
       * Set to `true` to allow all methods from any origin, or configure separately
       * using an object.
       */
      cors?: CorsOptions | boolean;
      /**
       * If enabled, vite will exit if specified port is already in use
       */
      strictPort?: boolean;
      /**
       * Create Vite dev server to be used as a middleware in an existing server
       */
      middlewareMode?: boolean | 'html' | 'ssr';
      /**
       * Prepend this folder to http requests, for use when proxying vite as a subfolder
       * Should start and end with the `/` character
       */
      base?: string;
      /**
       * Options for files served via '/\@fs/'.
       */
      fs?: FileSystemServeOptions;
  }
  /**
  *
  */
  interface ESBuildOptions extends TransformOptions_2 {
      include?: string | RegExp | string[] | RegExp[];
      exclude?: string | RegExp | string[] | RegExp[];
      jsxInject?: string;
  }
  /**
  *
  */
  interface BuildOptions {
      /**
       * Base public path when served in production.
       * @deprecated `base` is now a root-level config option.
       */
      base?: string;
      /**
       * Compatibility transform target. The transform is performed with esbuild
       * and the lowest supported target is es2015/es6. Note this only handles
       * syntax transformation and does not cover polyfills (except for dynamic
       * import)
       *
       * Default: 'modules' - Similar to `@babel/preset-env`'s targets.esmodules,
       * transpile targeting browsers that natively support dynamic es module imports.
       * https://caniuse.com/es6-module-dynamic-import
       *
       * Another special value is 'esnext' - which only performs minimal transpiling
       * (for minification compat) and assumes native dynamic imports support.
       *
       * For custom targets, see https://esbuild.github.io/api/#target and
       * https://esbuild.github.io/content-types/#javascript for more details.
       */
      target?: 'modules' | TransformOptions_2['target'] | false;
      /**
       * whether to inject dynamic import polyfill.
       * Note: does not apply to library mode.
       * @default false
       */
      polyfillDynamicImport?: boolean;
      /**
       * Directory relative from `root` where build output will be placed. If the
       * directory exists, it will be removed before the build.
       * @default 'dist'
       */
      outDir?: string;
      /**
       * Directory relative from `outDir` where the built js/css/image assets will
       * be placed.
       * @default 'assets'
       */
      assetsDir?: string;
      /**
       * Static asset files smaller than this number (in bytes) will be inlined as
       * base64 strings. Default limit is `4096` (4kb). Set to `0` to disable.
       * @default 4096
       */
      assetsInlineLimit?: number;
      /**
       * Whether to code-split CSS. When enabled, CSS in async chunks will be
       * inlined as strings in the chunk and inserted via dynamically created
       * style tags when the chunk is loaded.
       * @default true
       */
      cssCodeSplit?: boolean;
      /**
       * If `true`, a separate sourcemap file will be created. If 'inline', the
       * sourcemap will be appended to the resulting output file as data URI.
       * 'hidden' works like `true` except that the corresponding sourcemap
       * comments in the bundled files are suppressed.
       * @default false
       */
      sourcemap?: boolean | 'inline' | 'hidden';
      /**
       * Set to `false` to disable minification, or specify the minifier to use.
       * Available options are 'terser' or 'esbuild'.
       * @default 'terser'
       */
      minify?: boolean | 'terser' | 'esbuild';
      /**
       * Options for terser
       * https://terser.org/docs/api-reference#minify-options
       */
      terserOptions?: Terser.MinifyOptions;
      /**
       * Options for clean-css
       * https://github.com/jakubpawlowicz/clean-css#constructor-options
       */
      cleanCssOptions?: CleanCSS.Options;
      /**
       * Will be merged with internal rollup options.
       * https://rollupjs.org/guide/en/#big-list-of-options
       */
      rollupOptions?: RollupOptions;
      /**
       * Options to pass on to `@rollup/plugin-commonjs`
       */
      commonjsOptions?: RollupCommonJSOptions;
      /**
       * Options to pass on to `@rollup/plugin-dynamic-import-vars`
       */
      dynamicImportVarsOptions?: RollupDynamicImportVarsOptions;
      /**
       * Whether to write bundle to disk
       * @default true
       */
      write?: boolean;
      /**
       * Empty outDir on write.
       * @default true when outDir is a sub directory of project root
       */
      emptyOutDir?: boolean | null;
      /**
       * Whether to emit a manifest.json under assets dir to map hash-less filenames
       * to their hashed versions. Useful when you want to generate your own HTML
       * instead of using the one generated by Vite.
       *
       * Example:
       *
       * ```json
       * {
       *   "main.js": {
       *     "file": "main.68fe3fad.js",
       *     "css": "main.e6b63442.css",
       *     "imports": [...],
       *     "dynamicImports": [...]
       *   }
       * }
       * ```
       * @default false
       */
      manifest?: boolean;
      /**
       * Build in library mode. The value should be the global name of the lib in
       * UMD mode. This will produce esm + cjs + umd bundle formats with default
       * configurations that are suitable for distributing libraries.
       */
      lib?: LibraryOptions | false;
      /**
       * Produce SSR oriented build. Note this requires specifying SSR entry via
       * `rollupOptions.input`.
       */
      ssr?: boolean | string;
      /**
       * Generate SSR manifest for determining style links and asset preload
       * directives in production.
       */
      ssrManifest?: boolean;
      /**
       * Set to false to disable brotli compressed size reporting for build.
       * Can slightly improve build speed.
       */
      brotliSize?: boolean;
      /**
       * Adjust chunk size warning limit (in kbs).
       * @default 500
       */
      chunkSizeWarningLimit?: number;
      /**
       * Rollup watch options
       * https://rollupjs.org/guide/en/#watchoptions
       */
      watch?: WatcherOptions | null;
  }
  ```

- 使用回调时传入env对象作为参数

  ```typescript
  interface UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
  interface ConfigEnv {
      command: 'build' | 'serve';
      mode: string;
  }
  ```

