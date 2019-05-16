import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
const publicPath = '/manageView'

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: publicPath + '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  { path: publicPath + '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: publicPath+'/',
    component: Layout,
    redirect: publicPath + '/login',
    hidden: true
  },
  {
    path: publicPath + '/home',
    component: Layout,
    redirect: publicPath + '/home/carousel',
    name: 'Home',
    meta: { title: '首页配置项', icon: 'example' },
    children: [
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/carousel/index'),
        meta: { title: '轮播图' }
      },
      // {
      //   path: 'excellent',
      //   name: 'Excellent',
      //   component: () => import('@/views/excellent/index'),
      //   meta: { title: '精品工程' }
      // },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: '基础信息' }
      }
    ]
  },
  {
    path: publicPath + '/notice',
    component: Layout,
    redirect: publicPath + '/notice/index',
    meta: {
      title: '通知公告', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/create'), // Parent router-view
        name: 'notice',
        meta: { title: '通知公告' }
      },
      {
        path: 'list',
        name: 'noticeList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '文章列表' }
      }
    ]
  },
  {
    path: publicPath + '/information',
    component: Layout,
    redirect: publicPath + '/information/index',
    meta: {
      title: '中标信息', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/create'), // Parent router-view
        name: 'information',
        meta: { title: '中标信息' }
      },
      {
        path: 'informationList',
        name: 'informationList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '文章列表' }
      }
    ]
  },
  {
    path: publicPath + '/about',
    component: Layout,
    redirect: publicPath + '/about/index',
    name: 'About',
    meta: {
      title: '关于我们', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/aboutUs/index'), // Parent router-view
        name: 'Index',
        meta: { title: '关于我们' }
      }
    ]
  },
  {
    path: publicPath + '/news',
    component: Layout,
    redirect: publicPath + '/news/index',
    name: 'News',
    meta: {
      title: '新闻中心', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/create'), // Parent router-view
        name: 'news',
        meta: { title: '新闻中心' }
      },
      {
        path: 'newsList',
        name: 'newsList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '文章列表' }
      }
    ]
  },
  {
    path: publicPath + '/department',
    component: Layout,
    redirect: publicPath + '/department/index',
    meta: {
      title: '业务领域', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/create'), // Parent router-view
        name: 'department',
        meta: { title: '业务领域-分支机构' }
      },
      {
        path: 'departmentList',
        name: 'departmentList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '分支机构-文章列表' }
      },
      {
        path: 'layout',
        component: () => import('@/views/aboutUs/index'), // Parent router-view
        name: 'layout',
        meta: { title: '业务领域-经营布局' }
      }
    ]
  },
  {
    path: publicPath + '/project',
    component: Layout,
    redirect: publicPath + '/project/index',
    meta: {
      title: '业绩荣誉', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/create'), // Parent router-view
        name: 'project',
        meta: { title: '业绩荣誉-精品工程' }
      },
      {
        path: 'projectList',
        name: 'projectList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '文章列表' }
      }
    ]
  },
  {
    path: publicPath + '/career',
    component: Layout,
    redirect: publicPath + '/career/talent',
    meta: {
      title: '职业规划', icon: 'example'
    },
    children: [
      {
        path: 'talent',
        component: () => import('@/views/aboutUs/index'),
        name: 'talent',
        meta: { title: '人才战略' }
      },
      {
        path: 'hiring',
        component: () => import('@/views/news/create'),
        name: 'hiring',
        meta: { title: '招聘信息' }
      },
      {
        path: 'hiringList',
        name: 'hiringList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '招聘信息-文章列表' }
      },
      {
        path: 'education',
        component: () => import('@/views/news/create'),
        name: 'education',
        meta: { title: '教育培训' }
      },
      {
        path: 'educationList',
        name: 'educationList',
        component: () => import('@/views/news/list'), // Parent router-view
        meta: { title: '教育培训-文章列表' }
      }
    ]
  },
  // {
  //   path: '/list',
  //   component: Layout,
  //   children: [
  //     {
  //       component: () => import('@/views/news/list'), // Parent router-view
  //       name: 'Index',
  //       path: 'index',
  //       meta: { title: '文章列表', icon: 'example' }
  //     }
  //   ]
  // },
  {
    path: publicPath + '/edit',
    component: Layout,
    name: 'Edit',
    redirect: publicPath + '/edit/index',
    meta: {
      title: '编辑', icon: 'example'
    },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/edit'), // Parent router-view
        name: 'Index',
        meta: { title: '编辑' }
      }
    ]
  },
  {
    path: publicPath + '/links',
    component: Layout,
    redirect: publicPath + '/links/index',
    name: 'Link',
    meta: {
      title: '友情链接', icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/links/index'), // Parent router-view
        name: 'link',
        meta: { title: '友情链接' }
      }
    ]
  },
  { path: '*', redirect: publicPath + '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
