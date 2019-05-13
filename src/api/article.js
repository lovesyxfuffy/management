import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/manage/article/list',
    method: 'post',
    data
  })
}

export function fetchArticleById(id) {
  return request({
    url: '/front/content/getArticleContent/' + id,
    method: 'post'
  })
}

export function fetchArticleByModel(model) {
  return request({
    url: '/front/content/getArticleByModel/' + model,
    method: 'post'
  })
}

export function delArticle(id) {
  return request({
    url: '/manage/article/delete/' + id,
    method: 'post'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/manage/article/upload',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/manage/article/update',
    method: 'post',
    data
  })
}
