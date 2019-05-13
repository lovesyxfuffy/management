import request from '@/utils/request'

export function uploadImg(file) {
  return request({
    url: '/manage/img/upload',
    method: 'post',
    data: file
  })
}

export function carsouleImg(data) {
  return request({
    url: '/manage/carsouleImg/upload',
    method: 'post',
    data: data
  })
}

export function getCarsouleImg() {
  return request({
    url: '/front/common/getHeadImgs',
    method: 'post'
  })
}
