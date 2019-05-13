import router from './router'
// import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })// NProgress configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // if (to.path === '/login') {
  //   next({ path: '/' })
  //   NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  // } else {
  //   next()
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
