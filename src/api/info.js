import request from '@/utils/request'

export function setInfo(data) {
  return request({
    url: '/manage/info/setting',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/front/common/config',
    method: 'post'
  })
}

