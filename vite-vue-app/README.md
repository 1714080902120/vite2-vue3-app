## 从零开始搭建一个vite2-vue3-typescript项目

项目中涉及到了vue3,vite2,element-plus,axios,vue-router,vuex,mockjs

## 1. 创建项目

1. 使用yarn创建一个vue-ts的vite-app：yarn create vite vite-vue-app, 然后选择vue -> vue-ts

2. cd 到 vite-vue-app目录中，yarn install

3. 引入其他插件

   - yarn add vue-router@next
   - yarn add vuex@next
   - yarn add axios
   - yarn add mockjs

4. 分别创建对应的文件夹

5. 配置最简单的vite-config.ts

   ```typescript
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
       server: {
         port: 3000,
         hmr: true
       }
     }
   })
   ```

这些是目前关于vite的配置，接下来需要对三个插件进行配置

## 2. 配置vue-router

官网：<a href="https://next.router.vuejs.org/zh/">vue-router</a>

1. 进入router目录下创建index.ts文件

2. 从vue-router导入需要的模块

   ```typescript
   import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
   ```

3. 创建Router实例

```typescript
export default createRouter({
  routes,
  history: createWebHashHistory()
})
```

其中createWebHashHistory()的作用是使用hash模式

剩余的都照旧

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('views/home/Home.vue')
const About = () => import('views/about/About.vue')
const Page404 = () => import('views/404.vue')

const Name = () => import('views/home/components/Name.vue')
const Info = () => import('views/home/components/Info.vue')


const HomeChildren: RouteRecordRaw[] = [
  {
    path: '/home/',
    component: Name,
  },
  {
    path: '/home/info',
    component: Info
  }
]


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    redirect: '/home/'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/',
    children: HomeChildren
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/404',
    component: Page404
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
```

整合起来就是：

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('views/home/Home.vue')
const About = () => import('views/about/About.vue')
const Page404 = () => import('views/404.vue')

const Name = () => import('views/home/components/Name.vue')
const Info = () => import('views/home/components/Info.vue')


const HomeChildren: RouteRecordRaw[] = [
  {
    path: '/home/',
    component: Name,

  },
  {
    path: '/home/info',
    component: Info
  }
]


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    redirect: '/home/'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/',
    children: HomeChildren
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/404',
    component: Page404
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]


export default createRouter({
  routes,
  history: createWebHashHistory()
})
```

4. 最后在main.ts中引入并use

   ```typescript
   import router from 'router/index'
   
   createApp(App).use(router).mount('#app')
   ```

5. 另外有几个点需要注意

   - 其中use需要在mount之前和createApp之后

   - 在ts模式下使用别名导入是会报错的，所以需要在tsconfig.ts中进行配置

     ```json
     "compilerOptions": {
     	"baseUrl": "./",
     	...
         "paths": {
           "@/*": ["*","src/*"],
           "router/*": ["*", "src/router/*"],
           "store/*": ["*", "src/store/*"],
           "network/*": ["*", "src/network/*"],
           "views/*": ["*", "src/views/*"],
           "components/*": ["*", "src/components/*"]，
            "types/*": ["*", "src/types/*"]
         }
     ```
     
     baseUrl和paths都需要配置，否则无法识别

## 3. 配置vuex

vuex和vue-router的步骤相似

官网： <a href="https://next.vuex.vuejs.org/">vuex</a>

1. 在store文件夹下创建(我个人习惯)：

   - index.ts
   - state.ts
   - getters.ts
   - mutations.ts
   - actions.ts
   - modules.ts

2. index.ts中导入其它模块

   ```typescript
   import { createStore } from 'vuex'
   
   import state from './state'
   import mutations from './mutations'
   import actions from './actions'
   import getters from './getters'
   import modules from './modules'
   
   export default createStore({
     state,
     mutations,
     actions,
     getters,
     modules
   })
   
   ```

3. state.ts中创建并导出数据

   ```typescript
   import { People, State } from "types/store"
   
   const people: People[] = [
     {
       name: 'Tom',
       sex: 'male',
       age: 22,
       job: 'it'
     },
     {
       name: 'Marry',
       sex: 'female',
       age: 23,
       job: 'it'
     },
     {
       name: 'Jack',
       sex: 'male',
       age: 25,
       job: 'it'
     }
   ]
   
   
   const state: State = {
     people
   }
   
   export default state
   
   ```

4. 创建types文件夹，这个文件夹用来存放所有的type/interface/class，让类型和变量分开，方便维护。types文件夹下创建store文件夹，新建index.d.ts文件（别忘了在vite.config.ts和tsconfig.ts中更新别名types）

   ```typescript
   export interface People {
     name: string;
     sex?: string;
     age?: number;
     job?: string;
   }
   
   export interface State {
     people: People[]
   }
   ```

5. 创建getters.ts

   ```typescript
   import { GetterTree } from 'vuex'
   import { State } from 'types/store'
   
   const getters: GetterTree<State, any> = {
     getAllNames (state) {
       return state?.people.map(e => e.name)
     }
   }
   
   export default getters
   ```

6. 创建actions.ts

   ```typescript
   import { ActionTree } from 'vuex'
   import { State } from 'types/store'
   import { handleChangePeopleJob } from '@/common/constant'
   
   type Payload = {
     index: number;
     name: string;
   }
   
   const mutations: ActionTree<State, any> = {
     [handleChangePeopleJob] ({ state, commit }, payload: Payload) {
       commit(handleChangePeopleJob, payload)
     }
   }
   
   export default mutations
   
   ```

7. 创建mutations.ts

   ```typescript
   import { MutationTree } from 'vuex'
   import { State } from 'types/store'
   import { handleChangePeopleJob } from '@/common/constant'
   
   const mutations: MutationTree<State> = {
     [handleChangePeopleJob] (state, { index, job }) {
       state.people[index].job = job
     }
   }
   
   export default mutations
   
   ```

8. 创建modules.ts

   ```typescript
   import { ModuleTree } from 'vuex'
   
   const modules: ModuleTree<any> = {
   
   }
   
   export default modules
   ```

9. 在main.ts中引入store并use

   ```typescript
   import { createApp } from 'vue'
   import App from './App.vue'
   import router from 'router/index'
   import store from 'store/index'
   
   createApp(App).use(router).use(store).mount('#app')
   ```

   

## 4. 配置axios

Github：<a href="https://github.com/axios/axios">axios</a>

1. 进入network文件夹下，创建request.ts文件

2. 在根目录下创建.env.development文件，在文件中设置请求接口的REQUEST_BASE_URL

   ```
   REQUEST_BASE_URL=http://localhost:4000/
   ```

   后面会引入mockjs让axios能使用到

3. 导入并创建实例

   ```typescript
   import axios, { AxiosInstance } from 'axios'
   import { REQUEST_TIMEOUT } from '@/common/constant'
   
   const instance: AxiosInstance = axios.create({
     baseURL: import.meta.env.REQUEST_BASE_URL as string,
     timeout: REQUEST_TIMEOUT
   })
   ```

   其中REQUEST_TIMEOUT为3000

4. 对请求和返回进行拦截

   ```typescript
       // 拦截
       instance.interceptors.request.use(config => {
         const token = window.localStorage.getItem('tokens')
         if (token) config.headers['token'] = token
         return config
       }, errorMessage)
     
       instance.interceptors.response.use(response => {
         const { status, data, statusText } = response
         if (status === 200) {
           return data
         } else {
           errorMessage(`status: ${status}, message:${statusText}`)
         }
       })
   ```

5. 进行处理，用promise包裹，最终再返回

   ```typescript
   import axios, { AxiosInstance } from 'axios'
   import { REQUEST_TIMEOUT } from '@/common/constant'
   import { errorMessage } from '@/common/utils'
   
   export function request (axiosConfig: any) {
     return new Promise((resolve, reject) => {
       const instance: AxiosInstance = axios.create({
         baseURL: import.meta.env.REQUEST_BASE_URL as string,
         timeout: REQUEST_TIMEOUT
       })
     
       // 拦截
       instance.interceptors.request.use(config => {
         const token = window.localStorage.getItem('tokens')
         if (token) config.headers['token'] = token
         return config
       }, errorMessage)
     
       instance.interceptors.response.use(response => {
         const { status, data, statusText } = response
         if (status === 200) {
           return data
         } else {
           errorMessage(`status: ${status}, message:${statusText}`)
         }
       })
       
       instance(axiosConfig)
       .then(resolve)
       .catch(reject)
     })
   }
   ```

## 6. 配置mockjs

官网：<a href="https://github.com/nuysoft/Mock/wiki">mockjs</a>

1. 新建mock文件夹，进入mock文件夹创建index.ts作为入口文件，然后创建mock.ts用于封装mock

2. 简单封装mock

   ```typescript
   import { CreateMock } from "types/mock"
   const Mock = require('mockjs')
   
   // 这里的callback需要返回一个函数，函数参数为options，由mock传入自动执行函数
   export const createMock: CreateMock = (url: string | RegExp, callback: Function) => {
     Mock.mock(url, callback(Mock))
   }
   ```

3. 在mock文件夹下新建home.ts，用于实现具体返回数据

   ```typescript
   import { GetPeopleListOptions } from "types/mock";
   import { createMock } from "./mock";
   
   const getPeopleList = createMock('people-list', (Mock: any) => {
     const Random = Mock.Random
     Random.extend({
       sex: function (e: any) {
         return this.pick([
           'male', 'female', 'middle'
         ])
       },
       job: function (e: any) {
         return this.pick(['医生', '护士', '开发', '测试', '运营', '设计', '产品', '律师', '演员'])
       }
     })
     return (options: GetPeopleListOptions) => {
       const { limit = 20, skip = 0 } = options
       const start = limit * skip
       const end = start + limit
       return Mock.mock({
         [`list|500`]: {
           'name|string':'@name',
           'sex|string': '@sex',
           'age|20-35': 20,
           'job|string': '@job'
         }
       }).slice(start, end)
     }
   })
   
   export default {
     getPeopleList
   }
   ```

4. 在index.ts中导入home.ts导出的模块

   ```typescript
   import * as home from './home'
   ```

5. 在main.ts中引入才能起作用

   ```typescript
   require('@/mock/index')
   ```

## 7.重写vuex里的数据，改为通过接口请求

1. 在network中新建home.ts文件，然后在文件中写上请求接口

   ```typescript
   import request from './request'
   
   export function getPeopleList ({ limit = 20, skip = 0 }) {
     return request({
       url: '/people-list',
       method: 'get',
       params: {
         limit,
         skip
       }
     })
   }
   ```

2. 将state里的people数据初始化为空数组[]

   ```typescript
   const state: State = {
     people: []
   }
   ```

3. 进入actions.ts中，新增

   ```typescript
     [setPeopleList] ({ commit }, payload) {
       commit(setPeopleList, payload)
     }
   ```

4. 进入mutations.ts中新增

   ```typescript
     [setPeopleList] (state, { list }) {
       state.people.push(...list)
     }
   ```

5. 那么数据这块基本上就完成了，接着对css插件进行配置

## 8. 引入css处理器

Vite提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

```shell
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

如果是用的是单文件组件，可以通过 `<style lang="sass">`（或其他预处理器）自动开启。

我个人比较喜欢less，因此安装less

```shell
yarn add less --dev
```

接着引入postcss-loader以及autoprefixer自动配置前缀

```shell
yarn add autoprefixer --save
```

然后配置postcss，官网给出的原话是内联的 PostCSS 配置（格式同 `postcss.config.js`），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径。其路径搜索是通过 [postcss-load-config](https://github.com/postcss/postcss-load-config) 实现的。

我个人不喜欢另外再配置个文件，所以我在vite.config.ts中进行配置

```typescript
    css: {
      postcss: {
        plugins: [
          require('autoprefixer')
        ]
      }
    },
```

那么css这块也处理好了，最后引入element-plus

## 9. 引入element-plus

官网：<a href="https://element-plus.gitee.io/#/zh-CN/">element-plus</a>

官网也有提供vite的模板：<a href="https://github.com/element-plus/element-plus-vite-starter">element-plus-vite-starter</a>

1. 安装

   ```shell
   yarn add element-plus --save
   ```

2. 按需引入/全量引入，我这配置全量引入，在mian.ts中引入

   ```typescript
   // element-plus
   import ElementPlus from 'element-plus'
   import 'element-plus/lib/theme-chalk/index.css'
   
   // 然后use
   .use(ElementPlus).
   ```



## 10. 踩坑

1. vue-router不再支持*匹配，需要用特定的方法，链接：<a href="https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes">关于\*匹配的问题</a>

2. autoprefixer无效，需要在package.json文件中添加

   ```json
     "browserslist": [
       "> 1%",
       "last 7 versions",
       "not ie <= 8",
       "ios >= 8",
       "android >= 4.0"
     ]
   ```

   

<h3 style="color: rgb(10, 120, 200);">到这里就基本上配置完成了，接下来就是体验vue3开发的快乐！</h3>

